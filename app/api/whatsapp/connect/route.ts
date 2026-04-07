import { NextResponse } from "next/server"
import axios from "axios"
import { z } from "zod"
import { appendDebugSessionLog } from "@/lib/debug-session-log"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { WhatsappAccountInsert } from "@/lib/supabase/types"

const GRAPH_API_VERSION = "v25.0"
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`
/** Stops the connect flow from hanging forever if Meta Graph is slow or unreachable. */
const GRAPH_REQUEST_TIMEOUT_MS = 25_000

const bodySchema = z.object({
  code: z.string().min(1),
  waba_id: z.string().min(1).optional(),
  phone_number_id: z.string().min(1).optional(),
  /** Set true when onboarding via WhatsApp Business App (coexistence / QR). */
  is_coexistence: z.boolean().optional(),
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
        timeout: GRAPH_REQUEST_TIMEOUT_MS,
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
  const routeT0 = Date.now()
  // #region agent log
  void appendDebugSessionLog({
    sessionId: "cfb0f4",
    hypothesisId: "H3",
    location: "connect/route.ts:POST-entry",
    message: "connect POST handler entered",
    data: {},
    timestamp: routeT0,
  }).catch(() => {})
  // #endregion

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

  const {
    code,
    waba_id: wabaIdIn,
    phone_number_id: phoneIdIn,
    is_coexistence: isCoexistenceIn,
  } = parsed.data

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // #region agent log
    void appendDebugSessionLog({
      sessionId: "cfb0f4",
      hypothesisId: "H4",
      location: "connect/route.ts:unauthorized",
      message: "No Supabase user on connect POST",
      data: { elapsedMs: Date.now() - routeT0 },
      timestamp: Date.now(),
    }).catch(() => {})
    // #endregion
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
    // #region agent log
    void appendDebugSessionLog({
      sessionId: "cfb0f4",
      hypothesisId: "H3",
      location: "connect/route.ts:before-token-exchange",
      message: "Calling Graph oauth/access_token",
      data: { elapsedMs: Date.now() - routeT0 },
      timestamp: Date.now(),
    }).catch(() => {})
    // #endregion
    const tokenRes = await axios.get<{
      access_token?: string
      error?: { message?: string }
    }>(`${GRAPH_BASE}/oauth/access_token`, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        // Embedded Signup with config_id: empty redirect_uri per Meta docs
        redirect_uri: "",
      },
      timeout: GRAPH_REQUEST_TIMEOUT_MS,
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
    console.log(
      "[whatsapp/connect] OAuth code exchanged (Cloud API + coexistence onboarding use the same token endpoint)"
    )
    // #region agent log
    void appendDebugSessionLog({
      sessionId: "cfb0f4",
      hypothesisId: "H3",
      location: "connect/route.ts:token-ok",
      message: "Graph token exchange succeeded",
      data: { elapsedMs: Date.now() - routeT0 },
      timestamp: Date.now(),
    }).catch(() => {})
    // #endregion
  } catch (err) {
    // #region agent log
    void appendDebugSessionLog({
      sessionId: "cfb0f4",
      hypothesisId: "H3",
      location: "connect/route.ts:token-error",
      message: "Graph token exchange failed or threw",
      data: {
        elapsedMs: Date.now() - routeT0,
        axiosStatus: axios.isAxiosError(err) ? err.response?.status : null,
        axiosCode: axios.isAxiosError(err) ? err.code : null,
      },
      timestamp: Date.now(),
    }).catch(() => {})
    // #endregion
    if (axios.isAxiosError(err)) {
      console.error(
        "[whatsapp/connect] Graph token error:",
        err.response?.status,
        JSON.stringify(err.response?.data)
      )
    } else {
      console.error("[whatsapp/connect] Token exchange error:", err)
    }
    const timedOut =
      axios.isAxiosError(err) &&
      (err.code === "ECONNABORTED" ||
        String(err.message).toLowerCase().includes("timeout"))
    return NextResponse.json(
      {
        error: timedOut
          ? "Meta did not respond in time. Check your network and try again."
          : "Could not exchange authorization code",
      },
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

  const wabaNumeric = /^\d+$/.test(wabaId)
  const phoneIdNumeric = /^\d+$/.test(phoneNumberId)
  console.log("[whatsapp/connect] Resolved ids for whatsapp_accounts row:", {
    waba_id: wabaId,
    phone_number_id: phoneNumberId,
    waba_id_numeric_id_shape: wabaNumeric,
    phone_number_id_numeric_id_shape: phoneIdNumeric,
    coexistence_flow: isCoexistenceIn === true,
  })
  if (!wabaNumeric || !phoneIdNumeric) {
    console.warn(
      "[whatsapp/connect] Unexpected id format (expected numeric Graph ids). Saving anyway."
    )
  }

  const isCoexistence = isCoexistenceIn === true

  const row: WhatsappAccountInsert = {
    user_id: user.id,
    waba_id: wabaId,
    phone_number_id: phoneNumberId,
    access_token: accessToken,
    country_template: null,
    budget_template: null,
    is_coexistence: isCoexistence,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("whatsapp_accounts").upsert(row, {
    onConflict: "phone_number_id",
    ignoreDuplicates: false,
  })

  if (error) {
    console.error("[whatsapp/connect] Supabase upsert error:", error)
    // #region agent log
    void appendDebugSessionLog({
      sessionId: "cfb0f4",
      hypothesisId: "H3",
      location: "connect/route.ts:upsert-fail",
      message: "Supabase upsert failed",
      data: {
        code: error.code,
        elapsedMs: Date.now() - routeT0,
      },
      timestamp: Date.now(),
    }).catch(() => {})
    // #endregion
    return NextResponse.json({ error: "Could not save account" }, { status: 500 })
  }

  // #region agent log
  void appendDebugSessionLog({
    sessionId: "cfb0f4",
    hypothesisId: "H3",
    location: "connect/route.ts:success",
    message: "connect POST completed ok",
    data: { elapsedMs: Date.now() - routeT0 },
    timestamp: Date.now(),
  }).catch(() => {})
  // #endregion
  return NextResponse.json({ ok: true })
}
