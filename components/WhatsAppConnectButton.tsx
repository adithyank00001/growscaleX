"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { waConnectTrace } from "@/lib/wa-connect-trace"

const FB_VERSION = "v25.0"

function agentDebugLog(entry: Record<string, unknown>): void {
  void waConnectTrace(entry).catch(() => {})
}

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

function isNgrokFreeTunnelHost(): boolean {
  if (typeof window === "undefined") return false
  return window.location.hostname.includes("ngrok-free.app")
}

function initFacebookSdk(appId: string): void {
  if (!window.FB) return
  // @types/facebook-js-sdk omits `status`; the runtime SDK accepts it (used for ngrok).
  const params: {
    appId: string
    cookie: boolean
    xfbml: boolean
    version: string
    status?: boolean
  } = {
    appId,
    cookie: true,
    xfbml: true,
    version: FB_VERSION,
  }
  if (isNgrokFreeTunnelHost()) {
    params.status = true
  }
  window.FB.init(params as Parameters<typeof window.FB.init>[0])
}

/**
 * One in-flight load per appId so React Strict Mode / double effects do not
 * overwrite fbAsyncInit and strand a promise (stuck "Loading…" forever).
 */
const inflightFacebookSdkByAppId = new Map<string, Promise<void>>()

/**
 * Loads connect.facebook.net/sdk.js once and ensures FB.init runs for this appId.
 * Important for ngrok / React Strict Mode: if window.FB already exists we still call init.
 */
function ensureFacebookSdkReady(appId: string): Promise<void> {
  const existing = inflightFacebookSdkByAppId.get(appId)
  if (existing) return existing

  const inner = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve()
      return
    }

    let settled = false
    const finish = () => {
      if (settled) return
      try {
        if (!window.FB) {
          settled = true
          reject(new Error("Facebook SDK missing after load"))
          return
        }
        initFacebookSdk(appId)
        settled = true
        resolve()
      } catch (e) {
        settled = true
        reject(e)
      }
    }

    if (window.FB) {
      finish()
      return
    }

    window.fbAsyncInit = () => {
      finish()
    }

    const existing = document.getElementById("facebook-jssdk")
    if (existing) {
      const t = window.setInterval(() => {
        if (window.FB) {
          window.clearInterval(t)
          finish()
        }
      }, 50)
      window.setTimeout(() => {
        window.clearInterval(t)
        if (!settled && !window.FB) {
          settled = true
          reject(new Error("Facebook SDK load timeout"))
        }
      }, 20000)
      return
    }

    const js = document.createElement("script")
    js.id = "facebook-jssdk"
    js.src = "https://connect.facebook.net/en_US/sdk.js"
    js.async = true
    js.defer = true
    js.crossOrigin = "anonymous"
    js.onerror = () => {
      if (settled) return
      settled = true
      reject(new Error("Failed to load Facebook SDK"))
    }
    if (process.env.NODE_ENV === "development") {
      console.info(
        "[WhatsAppConnect] Adding script:",
        js.src,
        "(look for this host in Network if you see no sdk.js row)"
      )
    }
    document.body.appendChild(js)
  })

  // Fails stuck "Loading…" if sdk.js never runs (tunnel, ad blocker, network).
  const outer = new Promise<void>((resolve, reject) => {
    const t = window.setTimeout(() => {
      reject(new Error("Facebook SDK load timeout"))
    }, 25000)
    inner
      .then(() => {
        window.clearTimeout(t)
        resolve()
      })
      .catch((e) => {
        window.clearTimeout(t)
        reject(e)
      })
  })

  const tracked = outer.finally(() => {
    inflightFacebookSdkByAppId.delete(appId)
  })
  inflightFacebookSdkByAppId.set(appId, tracked)
  return tracked
}

export interface WhatsAppConnectButtonProps {
  /** Short summary from server (e.g. masked phone_number_id suffix) */
  connectionSummary?: string | null
  /**
   * Passed from the server so the Facebook script always loads even when the
   * client bundle does not inline NEXT_PUBLIC_* (some dev/tunnel setups).
   */
  metaAppId?: string | null
  metaConfigId?: string | null
}

export function WhatsAppConnectButton({
  connectionSummary,
  metaAppId: metaAppIdProp,
  metaConfigId: metaConfigIdProp,
}: WhatsAppConnectButtonProps) {
  const router = useRouter()
  // Props from server first (reliable on ngrok); then client env from .env.local
  const appId = (
    metaAppIdProp ??
    process.env.NEXT_PUBLIC_META_APP_ID ??
    ""
  ).trim()
  const configId = (
    metaConfigIdProp ??
    process.env.NEXT_PUBLIC_META_CONFIG_ID ??
    ""
  ).trim()

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return
    const pubApp = process.env.NEXT_PUBLIC_META_APP_ID?.trim()
    const pubCfg = process.env.NEXT_PUBLIC_META_CONFIG_ID?.trim()
    if (!pubApp) {
      console.warn(
        "[WhatsAppConnect] NEXT_PUBLIC_META_APP_ID is missing in the client bundle. Add it to .env.local and restart the dev server (props from the server may still supply the app id)."
      )
    }
    if (!pubCfg) {
      console.warn(
        "[WhatsAppConnect] NEXT_PUBLIC_META_CONFIG_ID is missing in the client bundle. Add it to .env.local and restart the dev server (props from the server may still supply the config id)."
      )
    }
  }, [])

  useEffect(() => {
    agentDebugLog({
      hypothesisId: "CLIENT_BOOT",
      location: "WhatsAppConnectButton.tsx:mount",
      message: "WhatsAppConnectButton mounted",
      data: {
        host: typeof window !== "undefined" ? window.location.hostname : "",
        hasAppId: Boolean(appId),
        hasConfigId: Boolean(configId),
        hadFbOnMount: typeof window !== "undefined" && Boolean(window.FB),
      },
      timestamp: Date.now(),
    })
  }, [appId, configId])

  const [sdkReady, setSdkReady] = useState(false)
  const [sdkLoading, setSdkLoading] = useState(true)
  const [sdkAttempt, setSdkAttempt] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sessionRef = useRef<SessionPayload | null>(null)
  const codeRef = useRef<string | null>(null)

  const tryFinishSignup = useCallback(async () => {
    const code = codeRef.current
    const session = sessionRef.current
    if (!code || !session) {
      // #region agent log
      agentDebugLog({
        hypothesisId: "H5",
        location: "WhatsAppConnectButton.tsx:tryFinish-early",
        message: "Skipped finish (missing code or session)",
        data: { hasCode: Boolean(code), hasSession: Boolean(session) },
        timestamp: Date.now(),
      })
      // #endregion
      return
    }

    codeRef.current = null
    sessionRef.current = null

    setLoading(true)
    setError(null)
    const t0 = Date.now()
    // #region agent log
    agentDebugLog({
      hypothesisId: "H3",
      location: "WhatsAppConnectButton.tsx:connect-fetch-start",
      message: "POST /api/whatsapp/connect starting",
      data: {},
      timestamp: t0,
    })
    // #endregion
    const connectTimeoutMs = 35_000
    const ac = new AbortController()
    const abortTimer = window.setTimeout(() => ac.abort(), connectTimeoutMs)
    try {
      const res = await fetch("/api/whatsapp/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        signal: ac.signal,
        body: JSON.stringify({
          code,
          waba_id: session.wabaId,
          phone_number_id: session.phoneNumberId,
          is_coexistence: true,
        }),
      })
      const elapsed = Date.now() - t0
      // #region agent log
      agentDebugLog({
        hypothesisId: "H3",
        location: "WhatsAppConnectButton.tsx:connect-fetch-done",
        message: "POST /api/whatsapp/connect finished",
        data: { status: res.status, elapsedMs: elapsed },
        timestamp: Date.now(),
      })
      // #endregion
      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        ok?: boolean
      }
      if (!res.ok) {
        setError(data.error ?? "Connection failed")
        return
      }
      router.refresh()
    } catch (caught) {
      const aborted =
        caught instanceof Error && caught.name === "AbortError"
      // #region agent log
      agentDebugLog({
        hypothesisId: "H3",
        location: "WhatsAppConnectButton.tsx:connect-fetch-error",
        message: "POST /api/whatsapp/connect threw",
        data: {
          elapsedMs: Date.now() - t0,
          aborted,
        },
        timestamp: Date.now(),
      })
      // #endregion
      setError(
        aborted
          ? "Connect timed out. Check your network and ngrok, then try again."
          : "Network error"
      )
    } finally {
      window.clearTimeout(abortTimer)
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (!appId) {
      // #region agent log
      agentDebugLog({
        hypothesisId: "H0",
        location: "WhatsAppConnectButton.tsx:no-app-id",
        message: "SDK effect skipped — missing Meta App ID",
        data: {},
        timestamp: Date.now(),
      })
      // #endregion
      setSdkLoading(false)
      setError(
        "Missing Meta App ID. Set NEXT_PUBLIC_META_APP_ID or META_APP_ID in .env.local and restart the dev server."
      )
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[WhatsAppConnect] Meta App ID is empty. Set env in .env.local, restart pnpm dev, and ensure the dashboard passes metaAppId from the server."
        )
      }
      return
    }

    let cancelled = false

    // FB already on the page (remount after router.refresh, etc.): do not flip back to Loading…
    if (typeof window !== "undefined" && window.FB) {
      try {
        initFacebookSdk(appId)
        // #region agent log
        agentDebugLog({
          hypothesisId: "H2-fast",
          location: "WhatsAppConnectButton.tsx:sdk-fastpath",
          message: "FB already present; init only",
          data: {},
          timestamp: Date.now(),
        })
        // #endregion
        if (!cancelled) {
          setSdkReady(true)
          setSdkLoading(false)
          setError(null)
        }
        return () => {
          cancelled = true
        }
      } catch {
        /* fall through to async loader */
      }
    }

    setSdkLoading(true)
    setSdkReady(false)
    // #region agent log
    agentDebugLog({
      hypothesisId: "H1-H2",
      location: "WhatsAppConnectButton.tsx:sdk-effect",
      message: "SDK load started",
      data: {
        host: typeof window !== "undefined" ? window.location.hostname : "",
        hasAppId: Boolean(appId),
        hasConfigId: Boolean(configId),
        ngrokFree: isNgrokFreeTunnelHost(),
      },
      timestamp: Date.now(),
    })
    // #endregion
    ensureFacebookSdkReady(appId)
      .then(() => {
        // #region agent log
        agentDebugLog({
          hypothesisId: "H2",
          location: "WhatsAppConnectButton.tsx:sdk-ready",
          message: "Facebook SDK ready",
          data: {},
          timestamp: Date.now(),
        })
        // #endregion
        if (!cancelled) {
          setSdkReady(true)
          setError(null)
        }
      })
      .catch((err) => {
        // #region agent log
        agentDebugLog({
          hypothesisId: "H1",
          location: "WhatsAppConnectButton.tsx:sdk-fail",
          message: "Facebook SDK load failed",
          data: {
            errMsg:
              err instanceof Error ? err.message : String(err ?? "unknown"),
          },
          timestamp: Date.now(),
        })
        // #endregion
        if (!cancelled) {
          setError(
            "Could not load Facebook SDK. Check ad blockers, network, and Meta app settings (add your site domain, e.g. ngrok host, under App domains)."
          )
        }
      })
      .finally(() => {
        if (!cancelled) setSdkLoading(false)
      })

    return () => {
      cancelled = true
    }
    // Single dependency avoids React dev warning when deps array length changed after HMR
    // (e.g. [appId] vs [appId, sdkAttempt]).
  }, [`${appId}:${sdkAttempt}`])

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
      setError(
        "Missing Meta config ID. Set NEXT_PUBLIC_META_CONFIG_ID (or META_CONFIG_ID) in .env.local and restart the dev server."
      )
      return
    }
    if (!window.FB) {
      setError("Facebook SDK not ready")
      return
    }

    sessionRef.current = null
    codeRef.current = null

    // #region agent log
    agentDebugLog({
      hypothesisId: "H4",
      location: "WhatsAppConnectButton.tsx:FB.login",
      message: "FB.login called",
      data: {},
      timestamp: Date.now(),
    })
    // #endregion

    // Embedded Signup: use config_id (not scope) to avoid "advanced permissions" errors
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
          // Meta "Use case" / WhatsApp Business App onboarding (coexistence)
          featureType: "whatsapp_business_app_onboarding",
          sessionInfoVersion: "3",
        },
      }
    )
  }

  const disabled = loading || !appId || sdkLoading || !sdkReady

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
          title={
            !appId
              ? "Missing Meta app id in env"
              : sdkLoading
                ? "Loading Facebook SDK…"
                : !sdkReady
                  ? "Facebook SDK not ready"
                  : undefined
          }
          onClick={handleClick}
        >
          {loading
            ? "Connecting…"
            : sdkLoading
              ? "Loading…"
              : "Connect WhatsApp"}
        </Button>
      </div>
      {error ? (
        <div className="flex flex-col items-end gap-1 max-w-xs">
          <p className="text-xs text-destructive text-right">{error}</p>
          {error.includes("Could not load Facebook SDK") ? (
            <button
              type="button"
              className="text-xs text-muted-foreground underline hover:text-foreground"
              onClick={() => {
                setError(null)
                setSdkAttempt((n) => n + 1)
              }}
            >
              Retry loading SDK
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
