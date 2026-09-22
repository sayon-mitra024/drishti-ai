import type { Probabilities } from "@/lib/types"
import { DR_CLASSES } from "@/lib/types"

export function ProbabilityBars({ probabilities, predictedClass }: { probabilities: Probabilities; predictedClass: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      {DR_CLASSES.map((name) => {
        const value = probabilities[name]
        const pct = Math.round(value * 1000) / 10
        const isPredicted = name === predictedClass
        return (
          <div key={name} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <span className={`font-medium ${isPredicted ? "text-primary" : "text-on-surface"}`}>{name}</span>
              <span className={`font-mono text-xs ${isPredicted ? "font-semibold text-primary" : "text-on-surface-variant"}`}>
                {pct.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
              <div
                className={`h-full rounded-full transition-all ${isPredicted ? "bg-primary-container" : "bg-outline-variant"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
