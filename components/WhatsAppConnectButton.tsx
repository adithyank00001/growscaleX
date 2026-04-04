"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const FB_VERSION = "v19.0"

type SessionPayload = {
  wabaId: string
  phoneNumberId: string
}

function parseEmbeddedSignupMessage(raw: unknown): SessionPayload | null {
  if (typeof raw !== "string") return null
  let data: Record<string, unknown>
  try {
    data = JSON.parse(raw) as Record<string, unknown>
  } catch {
    return null
  }

  if (data.type !== "WA_EMBEDDED_SIGNUP") return null

  const finishEvents = new Set([
    "FINISH",
    "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING",
    "FINISH_WHATSAPP_BUSINESS_PLATFORM_ONBOARDING",
  ])
  const ev = data.event
  if (typeof ev !== "string" || !finishEvents.has(ev)) return null

  const inner = data.data
  if (!inner || typeof inner !== "object") return null
  const d = inner as Record<string, unknown>

  const wabaRaw = d.waba_id ?? d.wabaId
  const phoneRaw = d.phone_number_id ?? d.phoneNumberId

  const wabaId = typeof wabaRaw === "string" ? wabaRaw.trim() : ""
  const phoneNumberId = typeof phoneRaw === "string" ? phoneRaw.trim() : ""

  if (!wabaId || !phoneNumberId) return null
  return { wabaId, phoneNumberId }
}

function loadFacebookSdk(appId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve()
      return
    }
    if (window.FB) {
      resolve()
      return
    }

    window.fbAsyncInit = () => {
      try {
        window.FB?.init({
          appId,
          cookie: true,
          xfbml: true,
          version: FB_VERSION,
        })
      } catch (e) {
        reject(e)
        return
      }
      resolve()
    }

    const existing = document.getElementById("facebook-jssdk")
    if (existing) {
      const t = window.setInterval(() => {
        if (window.FB) {
          window.clearInterval(t)
          resolve()
        }
      }, 50)
      window.setTimeout(() => {
        window.clearInterval(t)
        if (!window.FB) reject(new Error("Facebook SDK load timeout"))
      }, 15000)
      return
    }

    const js = document.createElement("script")
    js.id = "facebook-jssdk"
    js.src = "https://connect.facebook.net/en_US/sdk.js"
    js.async = true
    js.defer = true
    js.onerror = () => reject(new Error("Failed to load Facebook SDK"))
    document.body.appendChild(js)
  })
}

export interface WhatsAppConnectButtonProps {
  /** Short summary from server (e.g. masked phone_number_id suffix) */
  connectionSummary?: string | null
}

export function WhatsAppConnectButton({
  connectionSummary,
}: WhatsAppConnectButtonProps) {
  const router = useRouter()
  const appId = process.env.NEXT_PUBLIC_META_APP_ID ?? ""
  const configId = process.env.NEXT_PUBLIC_META_CONFIG_ID ?? ""

  const [sdkReady, setSdkReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sessionRef = useRef<SessionPayload | null>(null)
  const codeRef = useRef<string | null>(null)

  const tryFinishSignup = useCallback(async () => {
    const code = codeRef.current
    const session = sessionRef.current
    if (!code || !session) return

    codeRef.current = null
    sessionRef.current = null

    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/whatsapp/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          code,
          waba_id: session.wabaId,
          phone_number_id: session.phoneNumberId,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        ok?: boolean
      }
      if (!res.ok) {
        setError(data.error ?? "Connection failed")
        return
      }
      router.refresh()
    } catch {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (!appId) {
      setError("Missing NEXT_PUBLIC_META_APP_ID")
      return
    }
    let cancelled = false
    loadFacebookSdk(appId)
      .then(() => {
        if (!cancelled) setSdkReady(true)
      })
      .catch(() => {
        if (!cancelled) setError("Could not load Facebook SDK")
      })
    return () => {
      cancelled = true
    }
  }, [appId])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== "https://www.facebook.com" &&
        event.origin !== "https://web.facebook.com"
      ) {
        return
      }
      const parsed = parseEmbeddedSignupMessage(event.data)
      if (!parsed) return
      sessionRef.current = parsed
      void tryFinishSignup()
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [tryFinishSignup])

  const handleClick = () => {
    setError(null)
    if (!configId) {
      setError("Missing NEXT_PUBLIC_META_CONFIG_ID")
      return
    }
    if (!window.FB) {
      setError("Facebook SDK not ready")
      return
    }

    sessionRef.current = null
    codeRef.current = null

    window.FB.login(
      (response) => {
        const code = response.authResponse?.code
        if (code) {
          codeRef.current = code
          void tryFinishSignup()
        } else if (response.status === "not_authorized") {
          setError("Facebook login was cancelled or not authorized")
        }
      },
      {
        config_id: configId,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "",
          sessionInfoVersion: "3",
        },
      }
    )
  }

  const disabled = loading || !sdkReady || !appId

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex flex-wrap items-center justify-end gap-2">
        {connectionSummary ? (
          <span className="text-xs text-muted-foreground max-w-[12rem] truncate">
            {connectionSummary}
          </span>
        ) : null}
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={disabled}
          onClick={handleClick}
        >
          {loading ? "Connecting…" : "Connect WhatsApp"}
        </Button>
      </div>
      {error ? (
        <p className="text-xs text-destructive max-w-xs text-right">{error}</p>
      ) : null}
    </div>
  )
}
