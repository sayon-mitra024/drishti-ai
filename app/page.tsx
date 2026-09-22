import Link from "next/link"
import { PrototypeBanner } from "@/components/prototype-banner"
import { SiteHeader } from "@/components/site-header"

const PIPELINE_STAGES = [
  { step: "01", label: "Capture", desc: "Upload a retinal fundus photograph (JPG/PNG)." },
  { step: "02", label: "Quality Check", desc: "Heuristic checks for resolution, illumination, and focus." },
  { step: "03", label: "AI Analyze", desc: "Prototype classifier scores the image across 5 DR severity classes." },
  { step: "04", label: "Results", desc: "Confidence, probability distribution, and explainability overlay." },
  { step: "05", label: "Clinician Review", desc: "Confirm, request recapture, or refer — session-local only." },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />
      <PrototypeBanner />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 md:px-6 md:py-14">
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="clinical-card flex flex-col justify-between gap-6 p-8 xl:col-span-7">
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-1.5 rounded bg-surface-container-high px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Research Prototype
              </span>
              <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
                Intelligent retinal screening, designed for earlier clinical attention.
              </h1>
              <p className="max-w-xl leading-relaxed text-on-surface-variant">
                Upload a retinal fundus image to run the AI-assisted screening prototype:
                5-class diabetic retinopathy scoring, confidence, a Grad-CAM explainability
                overlay, and referral guidance for clinician review.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/screening"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary-container px-4 text-sm font-medium text-on-primary transition-colors hover:bg-primary"
              >
                Start New Screening
              </Link>
              <span className="font-mono text-xs text-on-surface-variant">
                No trained model connected yet — see MODEL_CARD.md
              </span>
            </div>
          </div>

          <div className="clinical-card flex flex-col gap-3 p-6 xl:col-span-5">
            <span className="text-sm font-semibold text-on-surface">Screening Pipeline</span>
            <ol className="flex flex-col gap-3">
              {PIPELINE_STAGES.map((s) => (
                <li key={s.step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-container-high font-mono text-[11px] font-semibold text-on-surface-variant">
                    {s.step}
                  </span>
                  <div>
                    <span className="block text-sm font-medium text-on-surface">{s.label}</span>
                    <span className="block text-xs text-on-surface-variant">{s.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="clinical-card flex flex-col gap-3 p-6">
          <h2 className="text-lg font-semibold text-on-surface">About this prototype</h2>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            Drishti AI is an AI-assisted diabetic retinopathy screening support tool. This build
            implements the full upload → quality check → analysis → results → clinician review
            workflow end to end. Because no trained EfficientNet checkpoint or Grad-CAM
            implementation exists in the connected repository, analysis currently runs through an
            isolated, clearly-labeled mock heuristic classifier (see{" "}
            <code className="rounded bg-surface-container px-1 font-mono text-xs">lib/mock-inference.ts</code>) instead
            of a real model. Every API response and UI surface that uses it is tagged accordingly.
            This tool does not replace an ophthalmologist and does not provide treatment
            recommendations.
          </p>
        </section>
      </div>
    </main>
  )
}
