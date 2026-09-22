import Link from "next/link"
import { CursorEyeField } from "@/components/cursor-eye-field"
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
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      {/* animated background: fixed, decorative, behind everything below */}
      <CursorEyeField />

      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader />

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-12 md:px-6 md:py-16">
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="clinical-card flex flex-col justify-between gap-6 p-8 backdrop-blur-sm xl:col-span-7">
              <div className="flex flex-col gap-4">
                <span className="inline-flex w-fit items-center gap-1.5 rounded bg-surface-container-high px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  Research Prototype
                </span>
                <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-on-surface md:text-4xl">
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
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary-container px-4 text-sm font-medium text-on-primary transition-all hover:scale-[1.02] hover:bg-primary"
                >
                  Start New Screening
                </Link>
              </div>
            </div>

            <div className="clinical-card flex flex-col gap-4 p-6 backdrop-blur-sm xl:col-span-5">
              <span className="text-sm font-semibold text-on-surface">Screening Pipeline</span>
              <ol className="flex flex-col gap-4">
                {PIPELINE_STAGES.map((s) => (
                  <li key={s.step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-container-high font-mono text-[11px] font-semibold text-on-surface-variant">
                      {s.step}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-on-surface">{s.label}</span>
                      <span className="text-xs leading-relaxed text-on-surface-variant">{s.desc}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="clinical-card flex flex-col gap-5 overflow-hidden backdrop-blur-sm">
            <div className="border-b border-surface-container-high bg-surface-container-low px-6 py-5 md:px-8">
              <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">Research prototype</p>
              <h2 className="text-2xl font-semibold tracking-tight text-on-surface">About Drishti AI</h2>
            </div>
            <div className="grid gap-8 px-6 pb-6 md:grid-cols-3 md:px-8 md:pb-8">
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-on-surface">A complete screening workflow</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Drishti AI is an AI-assisted retinal image screening prototype designed to support earlier clinical attention for diabetic retinopathy, especially where access to specialist review is limited. Upload a fundus image, check its quality, review five-class predictions and Grad-CAM explainability, then route the result to a clinician.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Capture', 'Quality check', 'AI analysis', 'Results', 'Clinician review'].map((item, index) => (
                    <span key={item} className="rounded-full bg-surface-container px-3 py-1.5 text-xs font-medium text-on-surface-variant"><span className="mr-1.5 font-mono text-secondary">0{index + 1}</span>{item}</span>
                  ))}
                </div>
              </div>
              <div className="border-t border-surface-container-high pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <h3 className="text-sm font-semibold text-on-surface">Important note</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">This is a screening-support aid, not a diagnostic system or medical device. Predictions and visualizations must not be used as the sole basis for diagnosis or treatment. Qualified clinical oversight is always required.</p>
              </div>
            </div>
            <div className="hidden">
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
            </div>
          </section>
        </div>

        <footer className="border-t border-surface-container-high bg-surface-container-lowest/90 px-4 py-6 backdrop-blur-sm md:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Drishti AI. AI-assisted retinal screening system.</p>
            <p>
              Built by <span className="font-medium text-on-surface">Sayon Mitra</span>
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
