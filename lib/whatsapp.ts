import axios from "axios"

const GRAPH_API_VERSION = "v19.0"
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`

/** Credentials + optional per-tenant template names for outbound Cloud API calls. */
export interface WhatsappSendContext {
  phoneNumberId: string
  accessToken: string
  /** Overrides TEMPLATE_COUNTRY_NAME when set */
  countryTemplate?: string | null
  /** Overrides TEMPLATE_BUDGET_NAME when set */
  budgetTemplate?: string | null
}

interface SendTemplateOptions extends WhatsappSendContext {
  to: string
  templateName: string
  languageCode?: string
}

/**
 * Low-level template sender. Sends a WhatsApp template message via Meta Cloud API.
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
        "[whatsapp] API error:",
        err.response?.status,
        JSON.stringify(err.response?.data)
      )
    } else {
      console.error("[whatsapp] Unexpected error:", err)
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

/**
 * Sends the country-selection (welcome) template — Step 1 of the funnel.
 */
export function sendCountrySelectionTemplate(
  to: string,
  ctx: WhatsappSendContext
): Promise<void> {
  const name =
    ctx.countryTemplate?.trim() ||
    process.env.TEMPLATE_COUNTRY_NAME ||
    "welcome_country_selection"
  return sendTemplate({
    to,
    templateName: name,
    phoneNumberId: ctx.phoneNumberId,
    accessToken: ctx.accessToken,
  })
}

/**
 * Sends the budget-qualification template — Step 2 of the funnel.
 */
export function sendBudgetQualificationTemplate(
  to: string,
  ctx: WhatsappSendContext
): Promise<void> {
  const name =
    ctx.budgetTemplate?.trim() ||
    process.env.TEMPLATE_BUDGET_NAME ||
    "budget_qualification"
  return sendTemplate({
    to,
    templateName: name,
    phoneNumberId: ctx.phoneNumberId,
    accessToken: ctx.accessToken,
  })
}
