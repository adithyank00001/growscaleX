import axios from "axios"

const GRAPH_API_VERSION = "v19.0"
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`

/** Meta coexistence numbers are subject to ~20 MPS outbound; space sends ~55ms apart per phone id. */
const COEXISTENCE_MIN_INTERVAL_MS = 55
const coexistenceLastSentMs = new Map<string, number>()

async function throttleCoexistenceMps(phoneNumberId: string): Promise<void> {
  const now = Date.now()
  const last = coexistenceLastSentMs.get(phoneNumberId) ?? 0
  const elapsed = now - last
  if (elapsed < COEXISTENCE_MIN_INTERVAL_MS) {
    await new Promise((r) =>
      setTimeout(r, COEXISTENCE_MIN_INTERVAL_MS - elapsed)
    )
  }
  coexistenceLastSentMs.set(phoneNumberId, Date.now())
}

/** Credentials for Cloud API sends (token + phone number id). */
export interface WhatsappSendContext {
  phoneNumberId: string
  accessToken: string
  /** True when this Cloud API number is linked via WhatsApp Business App coexistence (stricter throughput). */
  is_coexistence?: boolean
}

export type InteractiveMessageType = "button" | "list"

export interface SendInteractiveMessageParams {
  to: string
  type: InteractiveMessageType
  /** Merged into the Graph `interactive` object (e.g. `body`, `action`, optional `header` / `footer`). */
  content: Record<string, unknown>
  phoneNumberId: string
  accessToken: string
  /** When true, applies coexistence-friendly spacing before the Graph request (~20 MPS). */
  is_coexistence?: boolean
}

/**
 * Sends a free-form interactive message (reply buttons or list) inside the customer service window.
 */
export async function sendInteractiveMessage({
  to,
  type,
  content,
  phoneNumberId,
  accessToken,
  is_coexistence,
}: SendInteractiveMessageParams): Promise<void> {
  if (is_coexistence) {
    await throttleCoexistenceMps(phoneNumberId)
  }

  try {
    await axios.post(
      `${BASE_URL}/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
          ...content,
          type,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "[whatsapp] interactive API error:",
        err.response?.status,
        JSON.stringify(err.response?.data)
      )
    } else {
      console.error("[whatsapp] interactive unexpected error:", err)
    }
    throw err
  }
}

interface SendTemplateOptions extends WhatsappSendContext {
  to: string
  templateName: string
  languageCode?: string
}

/**
 * Sends a WhatsApp template message (marketing / outside session window).
 */
export async function sendTemplate({
  to,
  templateName,
  languageCode = "en",
  phoneNumberId,
  accessToken,
}: SendTemplateOptions): Promise<void> {
  try {
    await axios.post(
      `${BASE_URL}/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: { code: languageCode },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "[whatsapp] template API error:",
        err.response?.status,
        JSON.stringify(err.response?.data)
      )
    } else {
      console.error("[whatsapp] template unexpected error:", err)
    }
    throw err
  }
}

/** Reads default Cloud API credentials from env (single-tenant fallback). */
export function getEnvMessagingContext(): WhatsappSendContext | null {
  const phoneNumberId = process.env.PHONE_NUMBER_ID
  const accessToken = process.env.WHATSAPP_TOKEN
  if (!phoneNumberId || !accessToken) {
    console.error("[whatsapp] Missing PHONE_NUMBER_ID or WHATSAPP_TOKEN env vars")
    return null
  }
  return {
    phoneNumberId,
    accessToken,
    is_coexistence: process.env.WHATSAPP_COEXISTENCE === "true",
  }
}
