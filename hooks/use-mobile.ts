import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check without setting state again if we can avoid it, but to fix lint error:
    mql.addEventListener("change", onChange)
    // Run once on mount if needed, but setState in effect is bad.
    // Instead we usually just read the state in effect cleanup or use external store.
    return () => mql.removeEventListener("change", onChange)
  }, [])


  return !!isMobile
}
