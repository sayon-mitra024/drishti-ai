"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface EyeScrollHeroProps {
  /** Folder in /public holding the extracted frame sequence. */
  framesBasePath?: string
  /** How many frames are in the sequence (frame-001.jpg .. frame-{count}.jpg). */
  frameCount?: number
}

// How much scroll distance (in viewport heights) the hero consumes before
// handing off to the rest of the page.
const SCROLL_VH_DESKTOP = 320
const SCROLL_VH_MOBILE = 220
const MOBILE_BREAKPOINT_PX = 768

// Frame held for prefers-reduced-motion users.
const REDUCED_MOTION_PROGRESS = 0.55

// How quickly the displayed frame "catches up" to the real target each
// animation frame. Lower = smoother/more eased, higher = snappier/more
// direct. This is what turns a mechanical 1:1 scroll-to-frame mapping into
// a smooth, premium-feeling scrub.
const EASING = 0.14

// How fast the click-triggered open/close animation completes, in progress
// units per second (1 = full sweep in exactly one second).
const CLICK_ANIMATION_SPEED = 0.9

function pad3(n: number) {
  return String(n).padStart(3, "0")
}
const FRAME_FILE_START = 1
function frameFileName(index: number) {
  return `frame-${pad3(index + FRAME_FILE_START)}.jpg`
}
function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export function EyeScrollHero({
  framesBasePath = "/eye-frames",
  frameCount = 80,
}: EyeScrollHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameIndexRef = useRef(-1)

  // The real scroll-derived progress (0-1), recomputed every animation frame.
  const scrollProgressRef = useRef(0)
  // The progress actually shown on screen, eased toward whichever target is
  // active (scroll, or a click-triggered animation).
  const displayProgressRef = useRef(0)
  // When set, a click-triggered open/close animation is in control instead
  // of the scroll position. Cleared the instant the user scrolls again.
  const clickOverrideRef = useRef<{ target: number } | null>(null)

  const loopRef = useRef<number | null>(null)

  const [loadedCount, setLoadedCount] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [sectionHeight, setSectionHeight] = useState(`${SCROLL_VH_DESKTOP}vh`)

  const isReady = loadedCount > 0

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(query.matches)
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    query.addEventListener("change", handleChange)
    return () => query.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      if (prefersReducedMotion) {
        setSectionHeight("100vh")
        return
      }
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT_PX
      setSectionHeight(`${isMobile ? SCROLL_VH_MOBILE : SCROLL_VH_DESKTOP}vh`)
    }
    updateHeight()
    window.addEventListener("resize", updateHeight, { passive: true })
    return () => window.removeEventListener("resize", updateHeight)
  }, [prefersReducedMotion])

  // Preload every frame.
  useEffect(() => {
    let cancelled = false
    let loaded = 0
    const images: HTMLImageElement[] = new Array(frameCount)
    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.src = `${framesBasePath}/${frameFileName(i)}`
      img.onload = () => {
        if (cancelled) return
        loaded += 1
        setLoadedCount(loaded)
      }
      images[i] = img
    }
    framesRef.current = images
    return () => {
      cancelled = true
    }
  }, [framesBasePath, frameCount])

  const drawFrameForProgress = useCallback((progress: number) => {
    const frames = framesRef.current
    if (!frames.length) return
    let index = Math.min(frames.length - 1, Math.round(progress * (frames.length - 1)))
    // If the exact target frame hasn't loaded yet, fall back to the nearest
    // earlier loaded frame so the image never goes blank.
    while (index > 0 && !frames[index]?.complete) index--
    if (index === currentFrameIndexRef.current) return
    const frame = frames[index]
    if (!frame || !frame.complete) return
    currentFrameIndexRef.current = index
    if (imgRef.current) imgRef.current.src = frame.src
  }, [])

  const applyProgress = useCallback(
    (progress: number) => {
      drawFrameForProgress(progress)
      const textFade = Math.min(progress / 0.3, 1)
      if (headlineRef.current) {
        headlineRef.current.style.opacity = String(1 - textFade)
        headlineRef.current.style.transform = `translateY(${-textFade * 16}px)`
      }
      const indicatorFade = Math.min(progress / 0.08, 1)
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = String(1 - indicatorFade)
      }
    },
    [drawFrameForProgress],
  )

  // Recompute the real scroll-based progress from current layout.
  const measureScrollProgress = useCallback(() => {
    const section = sectionRef.current
    if (!section) return 0
    const rect = section.getBoundingClientRect()
    const scrollableDistance = rect.height - window.innerHeight
    if (scrollableDistance <= 0) return rect.top <= 0 ? 1 : 0
    return clamp(-rect.top / scrollableDistance, 0, 1)
  }, [])

  // A real user scroll always reclaims control from any click animation.
  const handleScroll = useCallback(() => {
    clickOverrideRef.current = null
  }, [])

  // The eye click toggles open <-> closed, animating smoothly, independent
  // of scroll, until the user scrolls again.
  const handleEyeClick = useCallback(() => {
    if (prefersReducedMotion) return
    const openMoreThanHalf = displayProgressRef.current > 0.5
    clickOverrideRef.current = { target: openMoreThanHalf ? 0 : 1 }
  }, [prefersReducedMotion])

  // Continuous animation loop: every frame, decide the target (click
  // override, or live scroll position), ease the displayed progress toward
  // it, and paint. This runs independently of scroll-event timing, which is
  // both smoother and more robust than recomputing only when a scroll event
  // fires (immune to browsers throttling scroll events, e.g. on mobile).
  useEffect(() => {
    if (prefersReducedMotion) {
      applyProgress(REDUCED_MOTION_PROGRESS)
      return
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    let lastTime = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000)
      lastTime = now

      scrollProgressRef.current = measureScrollProgress()

      const override = clickOverrideRef.current
      if (override) {
        const step = CLICK_ANIMATION_SPEED * dt
        const diff = override.target - displayProgressRef.current
        if (Math.abs(diff) <= step) {
          displayProgressRef.current = override.target
          clickOverrideRef.current = null // animation finished
        } else {
          displayProgressRef.current += Math.sign(diff) * step
        }
      } else {
        // Ease toward the live scroll position.
        displayProgressRef.current +=
          (scrollProgressRef.current - displayProgressRef.current) * EASING
      }

      applyProgress(displayProgressRef.current)
      loopRef.current = requestAnimationFrame(tick)
    }

    loopRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (loopRef.current !== null) cancelAnimationFrame(loopRef.current)
    }
  }, [prefersReducedMotion, handleScroll, measureScrollProgress, applyProgress])

  // Show frame 0 the instant frames start arriving, even before any scroll.
  useEffect(() => {
    if (loadedCount > 0 && currentFrameIndexRef.current === -1) {
      applyProgress(prefersReducedMotion ? REDUCED_MOTION_PROGRESS : 0)
    }
  }, [loadedCount, prefersReducedMotion, applyProgress])

  return (
    <section ref={sectionRef} style={{ height: sectionHeight }} className="relative">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-background px-4 py-10">
        <div
          ref={headlineRef}
          className="pointer-events-none flex flex-col items-center gap-4 text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded bg-surface-container-high px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Drishti AI · Retinal Screening
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-on-surface md:text-5xl">
            See what the eye reveals.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-on-surface-variant md:text-base">
            Scroll to look inside, from the intact eye to the retinal vessels an AI-assisted screen analyzes.
          </p>
        </div>

        <div
          className="relative aspect-[16/9] w-full max-w-2xl cursor-pointer"
          onClick={handleEyeClick}
          role="button"
          tabIndex={0}
          aria-label="Toggle eye animation"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleEyeClick()
            }
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- frame src is
              swapped imperatively many times a second; next/image's
              re-render/optimization pipeline isn't a fit for that. */}
          <img
            ref={imgRef}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="h-full w-full select-none object-contain transition-transform duration-300 ease-out hover:scale-[1.02]"
          />

          {!isReady && (
            <div aria-hidden className="absolute inset-0 flex items-center justify-center">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
            </div>
          )}
        </div>

        {!prefersReducedMotion && (
          <div
            ref={indicatorRef}
            aria-hidden
            className="pointer-events-none flex flex-col items-center gap-2 text-on-surface-variant"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <span className="h-6 w-px bg-on-surface-variant/40" />
          </div>
        )}
      </div>
    </section>
  )
}