import { SiteHeader } from "@/components/site-header"

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 md:px-6 md:py-16">
        <header><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">Documentation</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-on-surface">Copyright &amp; Legal</h1></header>
        {[
          ["Copyright & Ownership", "Original software, technical implementation and project-specific creative materials © 2026 Sayon Mitra, except where otherwise stated."],
          ["Third-Party Materials", "Dependencies, models, datasets, fonts, images, icons, team contributions and external services remain subject to their respective licenses, terms and rights holders."],
          ["Software License", "Original protected project materials are reserved under the project LICENSE. No additional permission is granted unless an applicable license or written permission allows it."],
          ["Research Prototype Disclaimer", "Drishti AI is an AI-assisted retinal image screening research prototype. The deployed model and its metrics are separate from this web application repository."],
          ["Medical Disclaimer", "This is not a medical device and has not been clinically validated. Outputs must not be used as the sole basis for diagnosis, treatment or clinical decisions. Qualified clinical review is required."],
          ["Reuse / Permission", "Repository visibility does not itself grant permission to reproduce, modify, publish, redistribute or create derivatives from original protected materials."],
          ["Contact", "For attribution or reuse questions, contact sayon@sayonedu.in."],
        ].map(([title, body]) => <section key={title} className="clinical-card p-6"><h2 className="text-lg font-semibold text-on-surface">{title}</h2><p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{body}</p></section>)}
      </div>
    </main>
  )
}
