import Image from "next/image"
import Link from "next/link"

const linkClass = "rounded-sm text-sm text-on-surface-variant underline-offset-4 transition-colors hover:text-on-surface hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"

export function SiteFooter() {
  return (
    <footer className="bg-surface-container-lowest/90 px-4 py-12 backdrop-blur-sm md:px-6">
      <div className="mx-auto max-w-7xl border-t border-surface-container-high pt-8">
        <nav aria-label="Footer" className="grid grid-cols-1 gap-x-8 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">
          <section className="min-[480px]:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <Image src="/logo.png" alt="Drishti AI" width={112} height={32} className="h-8 w-auto" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-surface-variant">AI-assisted retinal screening research prototype.</p>
          </section>
          <FooterGroup title="Explore">
            <Link className={linkClass} href="/">Overview</Link>
            <Link className={linkClass} href="/screening">Screening Workspace</Link>
            <Link className={linkClass} href="/about">About</Link>
          </FooterGroup>
          <FooterGroup title="Applications">
            <Link className={linkClass} href="/download">Download App</Link>
          </FooterGroup>
          <FooterGroup title="Legal">
            <Link className={linkClass} href="/legal">Copyright &amp; Licenses</Link>
            <Link className={linkClass} href="/terms">Terms of Use</Link>
            <Link className={linkClass} href="/privacy">Privacy Notice</Link>
            <Link className={linkClass} href="/disclaimer">Medical Disclaimer</Link>
          </FooterGroup>
          <FooterGroup title="Connect">
            <Link className={linkClass} href="/contact">Contact</Link>
            <a className={linkClass} href="mailto:sayon@sayonedu.in">sayon@sayonedu.in</a>
            <a className={linkClass} href="https://github.com/sayon-mitra024/drishti-ai" target="_blank" rel="noopener noreferrer">GitHub</a>
          </FooterGroup>
        </nav>
        <div className="mt-10 border-t border-surface-container-high pt-5 text-[13px] leading-relaxed text-on-surface-variant/75">
          <p>© 2026 Drishti AI. Original project materials © 2026 Sayon Mitra, except where otherwise stated.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="text-sm font-semibold text-on-surface">{title}</h2><ul className="mt-4 flex flex-col items-start gap-3">{children}</ul></section>
}