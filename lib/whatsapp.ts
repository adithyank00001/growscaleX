import axios from "axios"

const GRAPH_API_VERSION = "v19.0"
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`

/** Credentials for Cloud API sends (token + phone number id). */
export interface WhatsappSendContext {
  phoneNumberId: string
  accessToken: string
}

export type InteractiveMessageType = "button" | "list"

export interface SendInteractiveMessageParams {
  to: string
  type: InteractiveMessageType
  /** Merged into the Graph `interactive` object (e.g. `body`, `action`, optional `header` / `footer`). */
  content: Record<string, unknown>
  phoneNumberId: string
  accessToken: string
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
}: SendInteractiveMessageParams): Promise<void> {
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
  return { phoneNumberId, accessToken }
}
