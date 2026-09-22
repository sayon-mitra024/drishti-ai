"use client"

import { useState } from "react"

export type ReviewAction = "confirm" | "recapture" | "refer" | null

export function ClinicianReview({
  onAction,
  action,
  note,
  onNoteChange,
}: {
  onAction: (action: ReviewAction) => void
  action: ReviewAction
  note: string
  onNoteChange: (note: string) => void
}) {
  const [draft, setDraft] = useState(note)

  return (
    <div className="clinical-card flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-on-surface">Clinician Review</h3>
        <span className="rounded bg-surface-container px-2 py-0.5 font-mono text-[10px] uppercase text-on-surface-variant">
          In-session only — not persisted
        </span>
      </div>
      <p className="text-sm text-on-surface-variant">
        These actions are stored in this browser session only. There is no clinical record
        database wired up in this prototype (see README.md → Limitations).
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onAction("confirm")}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            action === "confirm" ? "bg-primary-container text-on-primary" : "border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
          }`}
        >
          Confirm Screening
        </button>
        <button
          type="button"
          onClick={() => onAction("recapture")}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            action === "recapture" ? "bg-tertiary text-on-tertiary" : "border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
          }`}
        >
          Request Recapture
        </button>
        <button
          type="button"
          onClick={() => onAction("refer")}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            action === "refer" ? "bg-secondary text-on-secondary" : "border border-surface-container-high bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
          }`}
        >
          Refer to Ophthalmologist
        </button>
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">Clinical Note</span>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => onNoteChange(draft)}
          rows={3}
          placeholder="Add an optional note for this screening session..."
          className="rounded-lg border border-surface-container-high bg-surface-container-lowest p-2 text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none"
        />
      </label>
    </div>
  )
}
