"use client"

import { useEffect, useState } from "react"

const STAGES = ["Preparing image", "Analyzing retinal image", "Generating screening result", "Preparing explanation"]

export function AnalyzingLoader({ imageUrl }: { imageUrl: string }) {
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, STAGES.length - 1))
    }, 550)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="clinical-card flex flex-col items-center gap-6 p-10 text-center md:flex-row md:text-left">
      <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-primary bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="" className="h-full w-full object-cover brightness-75" />
        <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-primary/30 via-transparent to-transparent" />
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-primary shadow-[0_0_12px_#ff6978]" />
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
          <span>{STAGES[stageIndex]}…</span>
          <span className="font-bold text-primary">{Math.round(((stageIndex + 1) / STAGES.length) * 100)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
          <div
            className="h-full rounded-full bg-primary-container transition-all duration-500"
            style={{ width: `${((stageIndex + 1) / STAGES.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-on-surface-variant">
          Running the AI-assisted screening prototype on your uploaded image. See the notice above
          for what this result is and isn&apos;t.
        </p>
      </div>
    </div>
  )
}
