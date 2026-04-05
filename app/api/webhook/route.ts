import { NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import {
  getEnvMessagingContext,
  sendInteractiveMessage,
  type WhatsappSendContext,
} from "@/lib/whatsapp"
import type { Json, LeadInsert } from "@/lib/supabase/types"

// ─── Meta payload types (minimal surface) ────────────────────────────────────

interface ButtonReply {
  id: string
  title: string
}

interface Interactive {
  type: "button_reply" | string
  button_reply?: ButtonReply
}

interface MetaMessage {
  from: string
  id: string
  type: "text" | "interactive" | "system" | string
  is_echo?: boolean
  /** Present on some echo / coexistence payloads (recipient customer). */
  to?: string
  text?: { body: string }
  interactive?: Interactive
  context?: { from: string; id: string }
}

interface MetaContact {
  profile: { name: string }
  wa_id: string
}

interface MetaValue {
  messaging_product: string
  metadata?: {
    display_phone_number?: string
    phone_number_id?: string
  }
  contacts?: MetaContact[]
  messages?: MetaMessage[]
  statuses?: unknown[]
}

interface MetaWebhookPayload {
  object: string
  entry: Array<{
    id: string
    changes: Array<{ value: MetaValue; field: string }>
  }>
}

// ─── Free interactive funnel (service window) ────────────────────────────────

const COUNTRY_INTERACTIVE_BODY =
  "Hello! Which country are you interested in studying in?"

const BUDGET_INTERACTIVE_BODY =
  "Great! What is your estimated tuition budget?"

function countryWelcomeContent(): Record<string, unknown> {
  return {
    body: { text: COUNTRY_INTERACTIVE_BODY },
    action: {
      buttons: [
        { type: "reply", reply: { id: "country_uk", title: "UK" } },
        { type: "reply", reply: { id: "country_usa", title: "USA" } },
        { type: "reply", reply: { id: "country_canada", title: "Canada" } },
      ],
    },
  }
}

function budgetQuestionContent(): Record<string, unknown> {
  return {
    body: { text: BUDGET_INTERACTIVE_BODY },
    action: {
      buttons: [
        { type: "reply", reply: { id: "budget_10k_20k", title: "$10k-$20k" } },
        { type: "reply", reply: { id: "budget_20k_30k", title: "$20k-$30k" } },
        { type: "reply", reply: { id: "budget_30k_plus", title: "$30k+" } },
      ],
    },
  }
}

async function sendCountryWelcome(
  to: string,
  ctx: WhatsappSendContext
): Promise<void> {
  await sendInteractiveMessage({
    to,
    type: "button",
    content: countryWelcomeContent(),
    phoneNumberId: ctx.phoneNumberId,
    accessToken: ctx.accessToken,
    is_coexistence: ctx.is_coexistence,
  })
}

async function sendBudgetQuestion(
  to: string,
  ctx: WhatsappSendContext
): Promise<void> {
  await sendInteractiveMessage({
    to,
    type: "button",
    content: budgetQuestionContent(),
    phoneNumberId: ctx.phoneNumberId,
    accessToken: ctx.accessToken,
    is_coexistence: ctx.is_coexistence,
  })
}

/** Customer phone when business sends an echo (mobile app); best-effort across payload shapes. */
function echoRecipientPhone(
  message: MetaMessage,
  contact?: MetaContact
): string | null {
  const direct = message.to?.trim()
  if (direct) return direct
  const wa = contact?.wa_id?.trim()
  if (wa) return wa
  return null
}

/** Log mobile / Business App echoes for dashboard sync — does not run the bot funnel. */
async function persistCoexistenceEcho(
  supabase: ReturnType<typeof createServiceRoleClient>,
  phoneNumberIdMeta: string | undefined,
  message: MetaMessage,
  value: MetaValue,
  contact?: MetaContact
): Promise<void> {
  const textBody = message.text?.body ?? null
  const payload = {
    message,
    metadata: value.metadata ?? null,
    contacts: value.contacts ?? null,
  } as unknown as Json

  const { error: insertErr } = await supabase.from("whatsapp_sync_messages").insert({
    phone_number_id: phoneNumberIdMeta ?? null,
    is_echo: true,
    wa_message_id: message.id,
    from_wa_id: message.from,
    to_wa_id: echoRecipientPhone(message, contact),
    message_type: message.type,
    text_body: textBody ? textBody.slice(0, 4000) : null,
    payload,
  })

  if (insertErr) {
    console.error("[webhook] whatsapp_sync_messages insert error:", insertErr)
  }

  const customerPhone = echoRecipientPhone(message, contact)
  if (customerPhone) {
    const { error: leadErr } = await supabase.from("leads").upsert(
      {
        phone_number: customerPhone,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "phone_number" }
    )
    if (leadErr) {
      console.error("[webhook] lead upsert (echo sync) error:", leadErr)
    }
  }
}

async function safeInteractiveSend(
  label: string,
  fn: () => Promise<void>
): Promise<void> {
  try {
    await fn()
  } catch (e) {
    console.error(`[webhook] ${label} failed:`, e)
  }
}

// ─── GET — Meta webhook verification ─────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }

  return new NextResponse("Forbidden", { status: 403 })
}

// ─── POST — Inbound message router ───────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: MetaWebhookPayload

  try {
    body = await request.json()
  } catch {
    console.error("[webhook] Failed to parse JSON body")
    return new NextResponse("OK", { status: 200 })
  }

  try {
    const value = body?.entry?.[0]?.changes?.[0]?.value

    if (!value?.messages?.length) {
      return new NextResponse("OK", { status: 200 })
    }

    const supabase = createServiceRoleClient()
    const phoneNumberIdMeta = value.metadata?.phone_number_id

    let messagingCtx: WhatsappSendContext | null = null
    if (phoneNumberIdMeta) {
      const { data: account } = await supabase
        .from("whatsapp_accounts")
        .select("phone_number_id, access_token, is_coexistence")
        .eq("phone_number_id", phoneNumberIdMeta)
        .maybeSingle()

      if (account) {
        messagingCtx = {
          phoneNumberId: account.phone_number_id,
          accessToken: account.access_token,
          is_coexistence: account.is_coexistence === true,
        }
      }
    }
    if (!messagingCtx) {
      messagingCtx = getEnvMessagingContext()
    }

    const message = value.messages[0]
    const contact = value.contacts?.[0]

    if (message.type === "system") {
      return new NextResponse("OK", { status: 200 })
    }

    // Coexistence: messages sent from the WhatsApp Business mobile app arrive as echoes.
    // Persist for dashboard sync; never auto-reply (no interactive funnel).
    if (message.is_echo === true) {
      await persistCoexistenceEcho(
        supabase,
        phoneNumberIdMeta,
        message,
        value,
        contact
      )
      return new NextResponse("OK", { status: 200 })
    }

    const fromPhone = message.from
    if (!fromPhone) {
      console.error("[webhook] Missing `from` phone number in message")
      return new NextResponse("OK", { status: 200 })
    }

    const fullName = contact?.profile?.name ?? null

    const upsertPayload: LeadInsert = {
      phone_number: fromPhone,
      full_name: fullName,
      updated_at: new Date().toISOString(),
    }

    const { data: lead, error: upsertError } = await supabase
      .from("leads")
      .upsert(upsertPayload, { onConflict: "phone_number" })
      .select()
      .single()

    if (upsertError || !lead) {
      console.error("[webhook] DB upsert error:", upsertError)
      return new NextResponse("OK", { status: 200 })
    }

    // ── Inbound text — welcome via interactive buttons (no template) ─────────
    if (message.type === "text") {
      if (lead.is_paused) {
        return new NextResponse("OK", { status: 200 })
      }

      const atFunnelEntry =
        lead.current_step === 1 &&
        (lead.country_choice == null || lead.country_choice === "")

      if (atFunnelEntry) {
        if (!messagingCtx) {
          console.error(
            "[webhook] Cannot send country welcome: no Cloud API credentials"
          )
        } else {
          await safeInteractiveSend("country welcome", () =>
            sendCountryWelcome(fromPhone, messagingCtx!)
          )
        }
        return new NextResponse("OK", { status: 200 })
      }

      if (lead.current_step === 2 || lead.current_step === 3) {
        await supabase
          .from("leads")
          .update({ is_paused: true, updated_at: new Date().toISOString() })
          .eq("phone_number", fromPhone)
      }

      return new NextResponse("OK", { status: 200 })
    }

    if (lead.is_paused) {
      console.log(`[webhook] Ignoring message from paused lead ${fromPhone}`)
      return new NextResponse("OK", { status: 200 })
    }

    // ── Interactive replies (button taps) ─────────────────────────────────────
    if (
      message.type === "interactive" &&
      message.interactive?.type === "button_reply"
    ) {
      const replyId = message.interactive.button_reply?.id ?? ""
      const buttonTitle = message.interactive.button_reply?.title ?? ""

      if (lead.current_step === 1 && replyId.startsWith("country_")) {
        await supabase
          .from("leads")
          .update({
            country_choice: buttonTitle,
            current_step: 2,
            updated_at: new Date().toISOString(),
          })
          .eq("phone_number", fromPhone)

        if (!messagingCtx) {
          console.error(
            "[webhook] Cannot send budget question: no Cloud API credentials"
          )
        } else {
          await safeInteractiveSend("budget question", () =>
            sendBudgetQuestion(fromPhone, messagingCtx!)
          )
        }
        console.log(`[webhook] ${fromPhone} → Step 2 (country: ${buttonTitle})`)
      } else if (
        lead.current_step === 2 &&
        replyId.startsWith("budget_")
      ) {
        await supabase
          .from("leads")
          .update({
            budget_choice: buttonTitle,
            status: "qualified",
            current_step: 3,
            updated_at: new Date().toISOString(),
          })
          .eq("phone_number", fromPhone)

        console.log(
          `[webhook] ${fromPhone} → Step 3 qualified (budget: ${buttonTitle})`
        )
      } else {
        console.log(
          `[webhook] ${fromPhone} unexpected interactive at step ${lead.current_step} id=${replyId}`
        )
      }
    }

    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    console.error("[webhook] Unhandled error:", error)
    return new NextResponse("OK", { status: 200 })
  }
}
