"use client"

import { useState, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"

type Props = Omit<ComponentProps<typeof Button>, "onClick"> & {
  /** Where to send the user after Google + Supabase finish (must be a same-site path). */
  nextPath?: string
}

export function GoogleOAuthButton({
  nextPath = "/dashboard",
  disabled,
  children,
  ...props
}: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const supabase = createBrowserSupabaseClient()
    const origin = window.location.origin
    const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    })

    if (error) {
      console.error("[GoogleOAuthButton]", error.message)
      setLoading(false)
      return
    }

    if (data.url) {
      window.location.assign(data.url)
    }
  }

  return (
    <Button
      type="button"
      {...props}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading ? "Redirecting…" : (children ?? "Continue with Google")}
    </Button>
  )
}
