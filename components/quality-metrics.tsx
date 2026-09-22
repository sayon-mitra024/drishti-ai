import type { QualityMetrics } from "@/lib/types"

const METRICS: { key: keyof QualityMetrics; label: string; suffix?: string }[] = [
  { key: "resolutionScore", label: "Resolution", suffix: "%" },
  { key: "illumination", label: "Illumination", suffix: "%" },
  { key: "focusClarity", label: "Focus / Contrast", suffix: "%" },
]

export function QualityMetricsPanel({ quality }: { quality: QualityMetrics }) {
  return (
    <div className="clinical-card flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-on-surface">Image Quality Check</h3>
        <span
          className={`rounded px-2 py-0.5 font-mono text-[11px] font-semibold uppercase ${
            quality.passed ? "bg-[#EDF7F2] text-[#1B7F52]" : "bg-[#FEF8EC] text-[#A36B00]"
          }`}
        >
          {quality.passed ? "Passed" : "Review Needed"}
        </span>
      </div>
      <p className="text-xs text-on-surface-variant">
        Prototype heuristic checks computed from the actual uploaded image (resolution + pixel
        statistics) — not a trained image-quality model. {quality.width}×{quality.height}px,{" "}
        {quality.format.toUpperCase()}.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {METRICS.map((m) => {
          const value = quality[m.key] as number
          return (
            <div key={m.key} className="rounded-lg border border-surface-container-high bg-surface-container-low p-2">
              <span className="block text-[11px] text-on-surface-variant">{m.label}</span>
              <span className="block font-mono text-sm font-semibold text-on-surface">
                {value}
                {m.suffix}
              </span>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-surface-container">
                <div className="h-full rounded-full bg-tertiary" style={{ width: `${Math.min(100, value)}%` }} />
              </div>
            </div>
          )
        })}
      </div>
      {quality.notes.length > 0 && (
        <ul className="flex flex-col gap-1 text-sm text-on-surface-variant">
          {quality.notes.map((note, i) => (
            <li key={i} className="flex gap-1.5">
              <span aria-hidden="true">•</span>
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
