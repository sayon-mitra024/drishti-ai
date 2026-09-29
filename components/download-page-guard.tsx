"use client"

import { useEffect } from "react"

/**
 * Light-touch, /download-only deterrent. Mounted only by app/download/page.tsx,
 * so listeners exist only while that page is on screen and are removed on
 * navigation. It stops the context menu and the common DevTools / View Source
 * shortcuts. It is NOT security: browser menus, the URL bar (view-source:),
 * and the Network panel remain available to anyone who looks for them.
 */
export function DownloadPageGuard() {
  useEffect(() => {
    const onContextMenu = (e: Event) => e.preventDefault()

    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      const code = e.code
      const blocked =
        e.key === "F12" ||
        // Inspect / console / picker (Chrome, Edge, Firefox): Ctrl|Cmd + Shift + I/J/C/K
        (mod && e.shiftKey && (code === "KeyI" || code === "KeyJ" || code === "KeyC" || code === "KeyK")) ||
        // View source
        (mod && !e.shiftKey && !e.altKey && code === "KeyU") ||
        // macOS: Cmd + Option + I/J/C/U
        (e.metaKey && e.altKey && (code === "KeyI" || code === "KeyJ" || code === "KeyC" || code === "KeyU"))

      if (blocked) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    document.addEventListener("contextmenu", onContextMenu)
    document.addEventListener("keydown", onKeyDown, true)
    return () => {
      document.removeEventListener("contextmenu", onContextMenu)
      document.removeEventListener("keydown", onKeyDown, true)
    }
  }, [])

  return null
}