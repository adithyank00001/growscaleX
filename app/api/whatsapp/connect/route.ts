import { NextResponse } from "next/server"
import axios from "axios"
import { z } from "zod"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { WhatsappAccountInsert } from "@/lib/supabase/types"

const GRAPH_API_VERSION = "v19.0"
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`

const bodySchema = z.object({
  code: z.string().min(1),
  waba_id: z.string().min(1).optional(),
  phone_number_id: z.string().min(1).optional(),
})

async function fetchFirstPhoneNumberId(
  wabaId: string,
  accessToken: string
): Promise<string | null> {
  try {
    const res = await axios.get<{ data?: Array<{ id?: string }> }>(
      `${GRAPH_BASE}/${wabaId}/phone_numbers`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    const first = res.data?.data?.[0]
    return first?.id ?? null
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "[whatsapp/connect] phone_numbers error:",
        err.response?.status,
        JSON.stringify(err.response?.data)
      )
    }
    return null
  }
}

export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { code, waba_id: wabaIdIn, phone_number_id: phoneIdIn } = parsed.data

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const clientId =
    process.env.META_APP_ID ?? process.env.NEXT_PUBLIC_META_APP_ID
  const clientSecret = process.env.META_APP_SECRET

  if (!clientId || !clientSecret) {
    console.error("[whatsapp/connect] Missing META_APP_ID or META_APP_SECRET")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  let accessToken: string
  try {
    const tokenRes = await axios.get<{
      access_token?: string
      error?: { message?: string }
    }>(`${GRAPH_BASE}/oauth/access_token`, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: "",
      },
    })

    const token = tokenRes.data?.access_token
    if (!token) {
      console.error(
        "[whatsapp/connect] Token exchange failed:",
        JSON.stringify(tokenRes.data)
      )
      return NextResponse.json(
        { error: "Could not exchange authorization code" },
        { status: 502 }
      )
    }
    accessToken = token
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "[whatsapp/connect] Graph token error:",
        err.response?.status,
        JSON.stringify(err.response?.data)
      )
    } else {
      console.error("[whatsapp/connect] Token exchange error:", err)
    }
    return NextResponse.json(
      { error: "Could not exchange authorization code" },
      { status: 502 }
    )
  }

  let wabaId = wabaIdIn?.trim()
  let phoneNumberId = phoneIdIn?.trim()

  if (wabaId && !phoneNumberId) {
    phoneNumberId = (await fetchFirstPhoneNumberId(wabaId, accessToken)) ?? ""
  }

  if (!wabaId || !phoneNumberId) {
    return NextResponse.json(
      {
        error:
          "Missing WhatsApp account ids. Finish Embedded Signup and ensure the session event ran before retrying.",
      },
      { status: 400 }
    )
  }

  const countryTemplate =
    process.env.TEMPLATE_COUNTRY_NAME ?? "welcome_country_selection"
  const budgetTemplate =
    process.env.TEMPLATE_BUDGET_NAME ?? "budget_qualification"

  const row: WhatsappAccountInsert = {
    user_id: user.id,
    waba_id: wabaId,
    phone_number_id: phoneNumberId,
    access_token: accessToken,
    country_template: countryTemplate,
    budget_template: budgetTemplate,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("whatsapp_accounts").upsert(row, {
    onConflict: "phone_number_id",
    ignoreDuplicates: false,
  })

  if (error) {
    console.error("[whatsapp/connect] Supabase upsert error:", error)
    return NextResponse.json({ error: "Could not save account" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
