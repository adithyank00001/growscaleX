import { NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import {
  sendBudgetQualificationTemplate,
  sendCountrySelectionTemplate,
} from "@/lib/whatsapp"
import type { LeadInsert } from "@/lib/supabase/types"

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

    // No messages array → status update (delivered/read) — ignore silently
    if (!value?.messages?.length) {
      return new NextResponse("OK", { status: 200 })
    }

    const message = value.messages[0]
    const contact = value.contacts?.[0]

    // ── 1. Ignore echoes (business-originated messages) ──────────────────────
    if (message.is_echo === true || message.type === "system") {
      return new NextResponse("OK", { status: 200 })
    }

    const fromPhone = message.from
    if (!fromPhone) {
      console.error("[webhook] Missing `from` phone number in message")
      return new NextResponse("OK", { status: 200 })
    }

    const fullName = contact?.profile?.name ?? null
    const supabase = createServiceRoleClient()

    // ── 2. Upsert lead (create on first contact, update name if provided) ────
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

    // ── 3. Inbound text — start funnel at Step 1, or pause if mid-funnel ───────
    if (message.type === "text") {
      if (lead.is_paused) {
        return new NextResponse("OK", { status: 200 })
      }

      const atFunnelEntry =
        lead.current_step === 1 &&
        (lead.country_choice == null || lead.country_choice === "")

      if (atFunnelEntry) {
        await sendCountrySelectionTemplate(fromPhone)
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

    // ── 4. is_paused gate — hard stop for automation ──────────────────────────
    if (lead.is_paused) {
      console.log(`[webhook] Ignoring message from paused lead ${fromPhone}`)
      return new NextResponse("OK", { status: 200 })
    }

    // ── 5. Linear funnel — button_reply only ─────────────────────────────────
    if (
      message.type === "interactive" &&
      message.interactive?.type === "button_reply"
    ) {
      const buttonTitle = message.interactive.button_reply?.title ?? ""

      if (lead.current_step === 1) {
        // Country selection received → advance to Step 2, send budget template
        await supabase
          .from("leads")
          .update({
            country_choice: buttonTitle,
            current_step: 2,
            updated_at: new Date().toISOString(),
          })
          .eq("phone_number", fromPhone)

        await sendBudgetQualificationTemplate(fromPhone)
        console.log(`[webhook] ${fromPhone} → Step 2 (country: ${buttonTitle})`)

      } else if (lead.current_step === 2) {
        // Budget selection received → qualify lead, Step 3
        await supabase
          .from("leads")
          .update({
            budget_choice: buttonTitle,
            status: "qualified",
            current_step: 3,
            updated_at: new Date().toISOString(),
          })
          .eq("phone_number", fromPhone)

        console.log(`[webhook] ${fromPhone} → Step 3 qualified (budget: ${buttonTitle})`)

      } else {
        // Lead is at step 3 (already qualified) — nothing to do
        console.log(`[webhook] ${fromPhone} already at step ${lead.current_step}, ignoring`)
      }
    }

    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    // Always return 200 so Meta does not retry-storm the endpoint
    console.error("[webhook] Unhandled error:", error)
    return new NextResponse("OK", { status: 200 })
  }
}
