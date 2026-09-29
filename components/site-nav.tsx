"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"

const DESKTOP_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/download", label: "Product" },
  { href: "/screening", label: "Screening Workspace", cta: true },
]

const MOBILE_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/download", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/screening", label: "Screening Workspace", cta: true },
]

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/")
}

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = () => setOpen(false)
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    mq.addEventListener("change", onChange)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
      mq.removeEventListener("change", onChange)
    }
  }, [open])

  return (
    <>
      {/* Desktop */}
      <nav aria-label="Primary" className="hidden items-center gap-1 text-sm md:flex">
        {DESKTOP_LINKS.map((l) => {
          const active = isActive(pathname, l.href)
          const style = l.cta
            ? active
              ? "bg-primary text-on-primary"
              : "bg-primary-container text-on-primary hover:bg-primary"
            : active
              ? "bg-surface-container-low text-on-surface"
              : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-lg px-3 py-2 font-medium transition-colors ${focus} ${style}`}
            >
              {l.label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile toggle */}
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container-low md:hidden ${focus}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* Mobile panel (anchored to the sticky header) */}
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          className="menu-in absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-surface-container-high bg-surface-container-lowest shadow-lg md:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col gap-1 p-3">
            {MOBILE_LINKS.map((l) => {
              const active = isActive(pathname, l.href)
              const style = l.cta
                ? "mt-2 justify-center bg-primary-container text-on-primary hover:bg-primary"
                : active
                  ? "bg-surface-container-low text-on-surface"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center rounded-lg px-4 text-base font-medium transition-colors ${focus} ${style}`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}