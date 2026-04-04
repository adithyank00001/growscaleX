export {}

declare global {
  interface Window {
    fbAsyncInit?: () => void
    FB?: FacebookJsSdk
  }
}

interface FacebookJsSdk {
  init: (params: {
    appId: string
    cookie?: boolean
    xfbml?: boolean
    version: string
  }) => void
  login: (
    callback: (response: FacebookLoginResponse) => void,
    options?: Record<string, unknown>
  ) => void
}

interface FacebookLoginResponse {
  status?: string
  authResponse?: {
    code?: string
  }
}
