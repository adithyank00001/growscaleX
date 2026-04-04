import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, responseHeaders) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          if (responseHeaders && typeof responseHeaders === "object") {
            for (const [key, headerValue] of Object.entries(responseHeaders)) {
              if (typeof headerValue === "string") {
                supabaseResponse.headers.set(key, headerValue)
              }
            }
          }
        },
      },
    }
  )

  // Refresh session (keeps auth token alive)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  function copyAuthCookiesTo(response: NextResponse) {
    for (const c of supabaseResponse.cookies.getAll()) {
      const { name, value, ...opts } = c
      response.cookies.set(name, value, opts)
    }
    return response
  }

  // Unauthenticated user tries to access /dashboard → redirect to /login
  if (!user && pathname.startsWith("/dashboard")) {
    const res = NextResponse.redirect(new URL("/login", request.url))
    return copyAuthCookiesTo(res)
  }

  // Authenticated user visits /login → redirect to /dashboard
  if (user && pathname === "/login") {
    const res = NextResponse.redirect(new URL("/dashboard", request.url))
    return copyAuthCookiesTo(res)
  }

  return supabaseResponse
}

export const config = {
  // Refresh session on pages; skip /api (Meta webhooks, etc.)
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
