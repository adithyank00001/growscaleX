import axios from "axios"

const GRAPH_API_VERSION = "v19.0"
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`

interface SendTemplateOptions {
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
}: SendTemplateOptions): Promise<void> {
  const phoneNumberId = process.env.PHONE_NUMBER_ID
  const token = process.env.WHATSAPP_TOKEN

  if (!phoneNumberId || !token) {
    console.error("[whatsapp] Missing PHONE_NUMBER_ID or WHATSAPP_TOKEN env vars")
    return
  }

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
          Authorization: `Bearer ${token}`,
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

/**
 * Sends the country-selection (welcome) template — Step 1 of the funnel.
 * Template name is read from TEMPLATE_COUNTRY_NAME env var.
 */
export function sendCountrySelectionTemplate(to: string): Promise<void> {
  return sendTemplate({
    to,
    templateName: process.env.TEMPLATE_COUNTRY_NAME ?? "welcome_country_selection",
  })
}

/**
 * Sends the budget-qualification template — Step 2 of the funnel.
 * Template name is read from TEMPLATE_BUDGET_NAME env var.
 */
export function sendBudgetQualificationTemplate(to: string): Promise<void> {
  return sendTemplate({
    to,
    templateName: process.env.TEMPLATE_BUDGET_NAME ?? "budget_qualification",
  })
}
