"use client"

import { useEffect, useRef, useState } from "react"

type Phase = "idle" | "preparing" | "started"

const LABEL: Record<Phase, string> = {
  idle: "Download APK",
  preparing: "Preparing download…",
  started: "Download started",
}

/**
 * Real link to the same-origin redirect route, so the browser performs the
 * actual download (works without JS, and JS never intercepts navigation).
 * The button only reflects what we genuinely know: the click happened, and
 * the request was handed to the browser. A browser cannot report byte
 * progress for a cross-origin GitHub download, so no percentage is shown.
 */
export function DownloadButton({ className = "" }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>("idle")
  const timers = useRef<number[]>([])

  useEffect(() => {
    const t = timers.current
    return () => t.forEach((id) => window.clearTimeout(id))
  }, [])

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (phase !== "idle") {
      e.preventDefault() // ignore repeat clicks while active
      return
    }
    setPhase("preparing")
    timers.current.push(
      window.setTimeout(() => setPhase("started"), 900),
      window.setTimeout(() => setPhase("idle"), 5000),
    )
  }

  const busy = phase !== "idle"

  return (
    <>
      <a
        href="/download/apk"
        onClick={onClick}
        aria-disabled={busy}
        className={`soft-btn relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl px-6 text-base font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          phase === "started" ? "bg-primary" : "bg-primary-container hover:bg-primary"
        } ${busy ? "cursor-default" : ""} ${className}`}
      >
        {phase === "idle" && <DownloadGlyph />}
        {phase === "preparing" && <Spinner />}
        {phase === "started" && <CheckGlyph />}
        <span>{LABEL[phase]}</span>
      </a>
      <span role="status" aria-live="polite" className="sr-only">
        {busy ? LABEL[phase] : ""}
      </span>
    </>
  )
}

function DownloadGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3v10m0 0-4-4m4 4 4-4M4 16h12" />
    </svg>
  )
}

function CheckGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 motion-safe:animate-spin" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="10" cy="10" r="7" opacity="0.3" />
      <path d="M10 3a7 7 0 0 1 7 7" />
    </svg>
  )
}