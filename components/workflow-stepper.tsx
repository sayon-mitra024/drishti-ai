"use client"

export type ScreeningStage = "capture" | "check" | "analyze" | "results" | "review"

const STEPS: { id: ScreeningStage; index: number; label: string }[] = [
  { id: "capture", index: 1, label: "Capture" },
  { id: "check", index: 2, label: "Quality Check" },
  { id: "analyze", index: 3, label: "AI Analyze" },
  { id: "results", index: 4, label: "Results" },
  { id: "review", index: 5, label: "Clinician Review" },
]

export function WorkflowStepper({
  stage,
  completedStages,
  onJump,
}: {
  stage: ScreeningStage
  completedStages: Set<ScreeningStage>
  onJump: (stage: ScreeningStage) => void
}) {
  return (
    <div
      className="sticky top-16 z-30 border-b border-surface-container-high bg-surface-container-lowest px-4 py-3 shadow-sm md:px-6"
      role="navigation"
      aria-label="Screening pipeline progress"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto md:gap-2">
        {STEPS.map((step, i) => {
          const isActive = step.id === stage
          const isDone = completedStages.has(step.id)
          const isReachable = isDone || isActive
          return (
            <div key={step.id} className="flex items-center gap-1 md:gap-2">
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && onJump(step.id)}
                aria-current={isActive ? "step" : undefined}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                  isActive
                    ? "bg-primary-container/10"
                    : isReachable
                      ? "hover:bg-surface-container-low"
                      : "opacity-50"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold ${
                    isActive
                      ? "bg-primary-container text-on-primary"
                      : isDone
                        ? "bg-tertiary text-on-tertiary"
                        : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {isDone && !isActive ? "\u2713" : String(step.index).padStart(2, "0")}
                </span>
                <span
                  className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider ${
                    isActive ? "text-primary" : "text-on-surface-variant"
                  }`}
                >
                  {String(step.index).padStart(2, "0")} {step.label}
                </span>
              </button>
              {i < STEPS.length - 1 && <span className="h-px w-3 shrink-0 bg-outline-variant/40 md:w-4" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
