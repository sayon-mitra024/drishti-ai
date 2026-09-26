"use client"

import { useEffect, useRef } from "react"

/**
 * Fixed, full-viewport decorative background (aria-hidden, pointer-events-none,
 * z-0 — never intercepts clicks or taps).
 *
 * Redesigned from the previous version: that one scattered 12 literal
 * cartoon "eyes" (oval outline + dark pupil dot) across the page, each
 * tracking the cursor individually. On a clinical/medical site that reads as
 * gimmicky rather than premium, and it visually competes with the real
 * anatomical eye in the hero above. This version keeps the same interaction
 * idea (cursor/touch/tilt-reactive motion) but expresses it as two soft,
 * cursor-following glows — restrained, on-theme with "Clinical Precision
 * Minimalism," and not a second set of eyes.
 *
 * - Desktop: the glow drifts toward the cursor.
 * - Touch: it drifts toward the finger while dragging, and gently toward
 *   device tilt otherwise (best-effort — iOS gates full orientation access
 *   behind a permission gesture this component doesn't request).
 * - Motion is smoothed (lerp) toward the target each frame.
 */
export function CursorEyeField() {
  const blobRef = useRef<HTMLDivElement>(null)
  const blobRefSecondary = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let curX = targetX
    let curY = targetY

    const setTarget = (x: number, y: number) => {
      targetX = x
      targetY = y
    }
    const onMouse = (e: MouseEvent) => setTarget(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) setTarget(t.clientX, t.clientY)
    }
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      const nx = Math.min(1, Math.max(-1, e.gamma / 30))
      const ny = Math.min(1, Math.max(-1, (e.beta - 45) / 30))
      setTarget(
        window.innerWidth / 2 + nx * window.innerWidth * 0.4,
        window.innerHeight / 2 + ny * window.innerHeight * 0.4,
      )
    }

    window.addEventListener("mousemove", onMouse, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    window.addEventListener("deviceorientation", onOrient, { passive: true } as AddEventListenerOptions)

    const tick = () => {
      // Ease toward the target — slow and "guided" rather than an instant snap.
      curX += (targetX - curX) * 0.05
      curY += (targetY - curY) * 0.05

      const w = window.innerWidth
      const h = window.innerHeight
      const nx = (curX / w) * 2 - 1
      const ny = (curY / h) * 2 - 1

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${nx * 32}px, ${ny * 32}px)`
      }
      if (blobRefSecondary.current) {
        // Moves opposite and slower, so the two glows never fully overlap.
        blobRefSecondary.current.style.transform = `translate(${-nx * 18}px, ${-ny * 18}px)`
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("deviceorientation", onOrient)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div ref={blobRef} className="absolute left-[10%] top-[12%] h-[40vmax] w-[40vmax] rounded-full bg-primary/10 blur-3xl transition-transform duration-300 ease-out" />
      <div ref={blobRefSecondary} className="absolute bottom-[10%] right-[8%] h-[34vmax] w-[34vmax] rounded-full bg-secondary/10 blur-3xl transition-transform duration-300 ease-out" />
    </div>
  )
}