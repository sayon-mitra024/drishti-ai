"use client"

import { useMemo, useState } from "react"
import { AnalyzingLoader } from "./analyzing-loader"
import { ClinicianReview, type ReviewAction } from "./clinician-review"
import { GradcamViewer } from "./gradcam-viewer"
import { ProbabilityBars } from "./probability-bars"
import { QualityMetricsPanel } from "./quality-metrics"
import { UploadDropzone } from "./upload-dropzone"
import { WorkflowStepper, type ScreeningStage } from "./workflow-stepper"
import type { PredictResponse } from "@/lib/types"

const SEVERITY_STYLES: Record<string, string> = {
  "No DR": "bg-surface-container-low text-on-surface",
  Mild: "bg-[#FEF8EC] text-[#A36B00]",
  Moderate: "bg-secondary-fixed text-on-secondary-fixed",
  Severe: "bg-[#FDF2F3] text-primary",
  "Proliferative DR": "bg-primary text-on-primary",
}

export function ScreeningWorkspace() {
  const [stage, setStage] = useState<ScreeningStage>("capture")
  const [completedStages, setCompletedStages] = useState<Set<ScreeningStage>>(new Set())
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [result, setResult] = useState<PredictResponse | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [reviewAction, setReviewAction] = useState<ReviewAction>(null)
  const [reviewNote, setReviewNote] = useState("")

  const advance = (next: ScreeningStage, completed: ScreeningStage) => {
    setCompletedStages((prev) => new Set(prev).add(completed))
    setStage(next)
  }

  const jumpTo = (target: ScreeningStage) => {
    setStage(target)
  }

  const handleFileSelected = (selected: File) => {
    setUploadError(null)
    setApiError(null)
    setResult(null)
    setReviewAction(null)
    setReviewNote("")

    if (!["image/jpeg", "image/jpg", "image/png"].includes(selected.type)) {
      setUploadError("Unsupported file type. Please upload a JPG or PNG image.")
      return
    }
    if (selected.size > 15 * 1024 * 1024) {
      setUploadError("File too large. Maximum size is 15MB.")
      return
    }

    setFile(selected)
    setImageUrl(URL.createObjectURL(selected))
    advance("check", "capture")
  }

  const removeImage = () => {
    setFile(null)
    setImageUrl(null)
    setResult(null)
    setApiError(null)
    setStage("capture")
    setCompletedStages(new Set())
  }

  const runAnalysis = async () => {
    if (!file) return
    setIsAnalyzing(true)
    setApiError(null)
    advance("analyze", "check")

    try {
      const formData = new FormData()
      formData.append("image", file)
      const res = await fetch("/api/predict", { method: "POST", body: formData })
      const data: PredictResponse = await res.json()

      if (!res.ok || !data.success) {
        setApiError(data.error ?? "Analysis failed. Please try a different image.")
        setStage("check")
        return
      }

      setResult(data)
      advance("results", "analyze")
    } catch {
      setApiError("Network error while contacting the analysis API. Please try again.")
      setStage("check")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const goToReview = () => advance("review", "results")

  const severityBadgeClass = useMemo(
    () => (result?.prediction ? SEVERITY_STYLES[result.prediction.class_name] : ""),
    [result],
  )

  return (
    <div className="flex flex-col">
      <WorkflowStepper stage={stage} completedStages={completedStages} onJump={jumpTo} />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6">
        {stage === "capture" && (
          <section className="clinical-card flex flex-col gap-4 p-6">
            <div>
              <h2 className="text-xl font-semibold text-on-surface">Stage 01 — Capture</h2>
              <p className="text-sm text-on-surface-variant">Upload a retinal fundus photograph to begin screening.</p>
            </div>
            <UploadDropzone onFileSelected={handleFileSelected} error={uploadError} />
          </section>
        )}

        {stage === "check" && imageUrl && (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="clinical-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-surface-container-high bg-surface-container-low p-3">
                <span className="text-sm font-semibold text-on-surface">Uploaded Image</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={removeImage}
                    className="rounded px-2 py-1 text-xs font-medium text-on-surface-variant hover:bg-surface-container-high"
                  >
                    Remove
                  </button>
                  <label className="cursor-pointer rounded px-2 py-1 text-xs font-medium text-primary hover:bg-surface-container-high">
                    Replace
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      className="sr-only"
                      onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Uploaded retinal fundus" className="aspect-square w-full bg-black object-contain" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="clinical-card p-4">
                <h2 className="text-xl font-semibold text-on-surface">Stage 02 — Quality Check</h2>
                <p className="text-sm text-on-surface-variant">
                  Basic file validation passed. Full pixel-level quality metrics are computed
                  server-side during analysis.
                </p>
              </div>
              {apiError && (
                <p role="alert" className="rounded-lg bg-error-container p-3 text-sm text-on-error-container">
                  {apiError}
                </p>
              )}
              <button
                type="button"
                onClick={runAnalysis}
                className="rounded-lg bg-primary-container px-4 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary"
              >
                Continue to AI Analysis
              </button>
            </div>
          </section>
        )}

        {stage === "analyze" && imageUrl && <AnalyzingLoader imageUrl={imageUrl} />}

        {stage === "results" && result?.prediction && result.probabilities && result.explainability && result.quality && imageUrl && (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-7">
              <GradcamViewer imageUrl={imageUrl} explainability={result.explainability} />
              <QualityMetricsPanel quality={result.quality} />
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5">
              <div className="clinical-card relative overflow-hidden border-2 border-primary-container/40 p-4">
                <div className="flex items-center justify-between pb-1">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" /> AI-Assisted Screening Result
                  </span>
                  <span className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold uppercase ${severityBadgeClass}`}>
                    {result.prediction.class_name}
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <h2 className="text-2xl font-extrabold tracking-tight text-primary">{result.prediction.class_name}</h2>
                  <div className="text-right">
                    <span className="text-xl font-bold text-primary">
                      {Math.round(result.prediction.confidence * 1000) / 10}%
                    </span>
                    <span className="block font-mono text-[11px] text-on-surface-variant">AI Model Confidence</span>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-surface-container p-2">
                  <p className="text-xs leading-tight text-on-surface">
                    <strong>Mandatory notice:</strong> This output is produced by Drishti AI, an AI-assisted
                    research/screening prototype. It is NOT a diagnostic medical device and has not been
                    clinically validated. It must never be used to determine treatment or medication. Final
                    interpretation requires review by a qualified ophthalmologist or clinician.
                  </p>
                </div>
              </div>

              <div className="clinical-card flex flex-col gap-3 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Probability Distribution
                </span>
                <ProbabilityBars probabilities={result.probabilities} predictedClass={result.prediction.class_name} />
              </div>

              <div className="clinical-card flex flex-col gap-2 p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Referral Guidance
                </span>
                <p className="text-sm text-on-surface">{result.recommendation?.message}</p>
              </div>

              <button
                type="button"
                onClick={goToReview}
                className="rounded-lg bg-primary-container px-4 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary"
              >
                Continue to Clinician Review
              </button>
            </div>
          </section>
        )}

        {stage === "review" && result?.prediction && (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ClinicianReview action={reviewAction} onAction={setReviewAction} note={reviewNote} onNoteChange={setReviewNote} />
            <div className="clinical-card flex flex-col gap-3 p-4">
              <h3 className="text-base font-semibold text-on-surface">Session Summary</h3>
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Predicted class</dt>
                  <dd className="font-medium text-on-surface">{result.prediction.class_name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Confidence</dt>
                  <dd className="font-medium text-on-surface">{Math.round(result.prediction.confidence * 1000) / 10}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Clinician action</dt>
                  <dd className="font-medium text-on-surface">{reviewAction ?? "Pending"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-on-surface-variant">Model</dt>
                  <dd className="font-mono text-xs text-on-surface-variant">{result.model?.architecture}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={removeImage}
                className="mt-2 rounded-lg border border-surface-container-high bg-surface-container-lowest px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"
              >
                Start New Screening
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
