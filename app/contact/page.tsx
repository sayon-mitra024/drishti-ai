import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = { title: "Contact | Drishti AI", description: "Contact Drishti AI." }
export default function ContactPage() { return <main className="min-h-screen bg-background"><SiteHeader /><article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16"><h1 className="text-3xl font-semibold tracking-tight text-on-surface">Contact</h1><p className="mt-5 text-sm leading-relaxed text-on-surface-variant">For questions, collaboration, research enquiries, or feedback, please contact:</p><a className="mt-3 inline-block text-primary underline" href="mailto:sayon@sayonedu.in">sayon@sayonedu.in</a><p className="mt-6 text-sm text-on-surface-variant">Please do not send patient-identifiable information by email.</p><p className="mt-8 border-t border-surface-container-high pt-4 text-xs text-on-surface-variant">Last updated: September 28, 2026</p></article><SiteFooter /></main> }
