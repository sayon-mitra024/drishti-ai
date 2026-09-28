import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = { title: "About | Drishti AI", description: "About the Drishti AI retinal screening research prototype." }

export default function AboutPage() {
  return <PageShell title="About Drishti AI">
    <p>Drishti AI is a research prototype exploring AI-assisted screening for diabetic retinopathy from retinal fundus images.</p>
    <h2>Goal</h2><p>It explores whether explainable, low-cost screening support could assist screening workflows in settings with limited access to eye specialists, including rural and underserved settings.</p>
    <h2>How it works</h2><p>A retinal fundus image is processed through a deep-learning model based on EfficientNet-B0 to estimate diabetic-retinopathy severity. Grad-CAM provides an explanatory visualization of regions associated with the model output; it does not prove why the model made a decision.</p>
    <h2>Status and development</h2><p>Drishti AI was developed as a Smart India Hackathon 2026 project and research effort, based on the repository&apos;s existing documentation. It is a research prototype and is not clinically validated.</p>
    <h2>Built by</h2><p>Technical implementation and development: Sayon Mitra</p><p>Project/team attribution can be updated when confirmed by the project owner.</p>
    <p><Link className="text-primary underline" href="https://github.com/sayon-mitra024/drishti-ai">GitHub</Link> · <Link className="text-primary underline" href="/contact">Contact</Link></p>
    <LastUpdated />
  </PageShell>
}

function PageShell({ title, children }: { title: string; children: React.ReactNode }) { return <main className="min-h-screen bg-background"><SiteHeader /><article className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-12 text-sm leading-relaxed text-on-surface-variant md:px-6 md:py-16"><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">Drishti AI</p><h1 className="text-3xl font-semibold tracking-tight text-on-surface">{title}</h1>{children}</article><SiteFooter /></main> }
function LastUpdated() { return <p className="border-t border-surface-container-high pt-4 text-xs">Last updated: September 28, 2026</p> }
