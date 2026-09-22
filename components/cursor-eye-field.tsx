"use client"

import { useEffect, useRef, useState } from "react"

type Eye = {
  id: number
  x: number // position, vw %
  y: number // position, vh %
  size: number // px, width of the eye shape
  depth: number // 0.35–1, how strongly this eye reacts (parallax layering)
}

const EYE_COUNT = 12

// Deterministic pseudo-random layout so server and client render identically
// (avoids hydration mismatches from Math.random() during render).
function seededEyes(count: number): Eye[] {
  let seed = 42
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 6 + rand() * 88,
    y: 6 + rand() * 88,
    size: 46 + rand() * 48,
    depth: 0.35 + rand() * 0.65,
  }))
}

/**
 * Fixed, full-viewport decorative background (aria-hidden, pointer-events-none,
 * -z-10 — never intercepts clicks or taps).
 *
 * - Desktop: pupils and glow follow the mouse cursor.
 * - Mobile/touch: pupils and glow follow the finger while dragging, and drift
 *   gently on device tilt when the phone is just held (no permission prompt
 *   is requested for this — iOS gates full gyroscope access behind a user
 *   gesture, so tilt is a best-effort bonus; touch-drag always works).
 * - Motion is smoothed (lerp) toward the target each frame for a slow,
 *   "guided" glide rather than an instant snap.
 */
export function CursorEyeField() {
  const [eyes] = useState<Eye[]>(() => seededEyes(EYE_COUNT))
  const eyeRefs = useRef<(HTMLDivElement | null)[]>([])
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let curX = targetX
    let curY = targetY
    let idle = 0

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
      const nx = Math.min(1, Math.max(-1, e.gamma / 30)) // left-right tilt
      const ny = Math.min(1, Math.max(-1, (e.beta - 45) / 30)) // front-back tilt
      setTarget(
        window.innerWidth / 2 + nx * window.innerWidth * 0.4,
        window.innerHeight / 2 + ny * window.innerHeight * 0.4,
      )
    }

    window.addEventListener("mousemove", onMouse, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    window.addEventListener("deviceorientation", onOrient, { passive: true } as AddEventListenerOptions)

    const tick = () => {
      // ease toward the target — this is what makes the motion feel "guided"
      curX += (targetX - curX) * 0.06
      curY += (targetY - curY) * 0.06
      idle += 0.004

      const w = window.innerWidth
      const h = window.innerHeight
      const nx = (curX / w) * 2 - 1 // -1..1 across the viewport
      const ny = (curY / h) * 2 - 1

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${nx * 26}px, ${ny * 26}px)`
      }

      eyeRefs.current.forEach((el, i) => {
        if (!el) return
        const eye = eyes[i]
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = curX - cx
        const dy = curY - cy
        const dist = Math.hypot(dx, dy) || 1
        const maxTravel = rect.width * 0.16
        const travel = Math.min(maxTravel, dist / 10) * eye.depth
        const pupil = el.querySelector<HTMLElement>("[data-pupil]")
        if (pupil) {
          pupil.style.transform = `translate(${(dx / dist) * travel}px, ${(dy / dist) * travel}px)`
        }
        // slow autonomous bob, layered per eye, so the field feels alive at rest
        const drift = Math.sin(idle * (0.5 + eye.depth)) * 3 * eye.depth
        el.style.transform = `translateY(${drift}px)`
      })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("deviceorientation", onOrient)
      cancelAnimationFrame(raf)
    }
  }, [eyes])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* soft glowing depth layer — gives the background weight/premium feel */}
      <div ref={blobRef} className="absolute inset-0 transition-transform duration-300 ease-out">
        <div className="absolute left-[12%] top-[16%] h-[42vmax] w-[42vmax] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-[12%] right-[8%] h-[38vmax] w-[38vmax] rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {eyes.map((eye, i) => (
        <div
          key={eye.id}
          ref={(el) => {
            eyeRefs.current[i] = el
          }}
          className="absolute flex items-center justify-center rounded-full border border-on-surface-variant/25 bg-surface-container/50 shadow-[0_0_28px_-8px_var(--tw-shadow-color)] shadow-primary/70 backdrop-blur-[1px] transition-transform duration-500 ease-out"
          style={{
            left: `${eye.x}%`,
            top: `${eye.y}%`,
            width: eye.size,
            height: eye.size * 0.62,
            opacity: 0.28 + eye.depth * 0.22,
          }}
        >
          <span
            data-pupil
            className="rounded-full bg-on-surface-variant transition-transform duration-100 ease-out"
            style={{ width: eye.size * 0.28, height: eye.size * 0.28 }}
          />
        </div>
      ))}
    </div>
  )
}
