import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DownloadButton } from "@/components/download-button"
import { DownloadPageGuard } from "@/components/download-page-guard"

const TITLE = "Drishti AI — Download the Android App"
const DESCRIPTION =
  "Download Drishti AI, an offline AI-assisted retinal screening research prototype for Android."
const CANONICAL = "https://drishti.sayonedu.in/download"

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Drishti AI",
    type: "website",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
}

// Add real screenshots from the Android app here, e.g.
// { src: "/screenshots/results.png", alt: "Results screen showing severity class and CAM overlay" }
const SCREENSHOTS: { src: string; alt: string }[] = []

const ANDROID_FACTS = [
  { label: "Platform", value: "Android" },
  { label: "Version", value: "1.0.0" },
  { label: "File type", value: "APK" },
  { label: "File size", value: "169 MB" },
  { label: "Distribution", value: "Direct download" },
]

const IOS_FACTS = [
  { label: "Platform", value: "iOS" },
  { label: "Status", value: "Coming soon" },
]

const BUILD_INFO = [
  { label: "Version", value: "1.0.0" },
  { label: "Platform", value: "Android" },
  { label: "Distribution", value: "Direct APK download" },
  { label: "AI inference", value: "On-device" },
  { label: "Model", value: "EfficientNet-B0" },
  { label: "Runtime", value: "ONNX Runtime" },
  { label: "Explainability", value: "CAM-based visualization" },
]

const FEATURES = [
  {
    title: "Runs on the device",
    desc: "The model runs on the phone itself, so analysis does not depend on continuous cloud inference.",
  },
  {
    title: "Retinal image screening",
    desc: "An AI-assisted screening workflow for retinal fundus images.",
  },
  {
    title: "Five-class severity grading",
    desc: "Diabetic retinopathy severity is classified into five classes, from No DR to Proliferative DR.",
  },
  {
    title: "Visual explainability",
    desc: "A CAM-based visualization shows which regions of the image the model attended to.",
  },
]

export default function DownloadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DownloadPageGuard />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-12 md:px-6 md:pb-14 md:pt-20">
          <div className="max-w-2xl">
            <Image
              src="/logo.png"
              alt=""
              width={140}
              height={40}
              className="reveal h-9 w-auto"
              style={{ "--i": 0 } as React.CSSProperties}
            />
            <h1
              className="reveal mt-6 text-4xl font-semibold tracking-tight text-on-surface md:text-6xl"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              Drishti AI
            </h1>
            <p
              className="reveal mt-2 text-xl font-medium text-primary md:text-2xl"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              AI-Assisted Retinal Screening
            </p>
            <p
              className="reveal mt-4 max-w-xl leading-relaxed text-on-surface-variant"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              An offline AI-assisted retinal screening research prototype with on-device AI
              inference and explainability.
            </p>

            <div className="reveal mt-8 flex flex-col gap-4" style={{ "--i": 4 } as React.CSSProperties}>
              <DownloadButton className="w-full sm:w-fit" />
              <p className="flex flex-wrap gap-y-1 text-sm text-on-surface-variant [&>*+*]:ml-3 [&>*+*]:border-l [&>*+*]:border-outline-variant [&>*+*]:pl-3">
                <span>Android</span>
                <span>Version 1.0.0</span>
                <span>APK • 169 MB</span>
              </p>
              <p className="max-w-md text-xs leading-relaxed text-on-surface-variant">
                No account or sign-up needed. Android may ask you to allow installs from your
                browser or file manager the first time.
              </p>
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section id="platforms" aria-labelledby="platforms-heading" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-6 md:px-6">
          <h2 id="platforms-heading" className="text-2xl font-semibold tracking-tight text-on-surface">
            Choose your platform
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
            {/* Android: available, primary */}
            <article
              className="soft-raised reveal flex flex-col gap-6 p-6 md:p-8"
              style={{ "--i": 5 } as React.CSSProperties}
              aria-labelledby="android-name"
            >
              <div className="flex items-start gap-4">
                <PlatformIcon kind="android" />
                <div className="min-w-0 flex-1">
                  <h3 id="android-name" className="text-xl font-semibold text-on-surface">
                    Drishti AI
                  </h3>
                  <p className="text-sm text-on-surface-variant">AI-Assisted Retinal Screening</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary-fixed px-3 py-1 text-xs font-semibold text-on-secondary-fixed">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  Available
                </span>
              </div>

              <FactList facts={ANDROID_FACTS} />

              <DownloadButton className="w-full sm:w-fit" />
            </article>

            {/* iOS: coming soon, secondary. No link, no store badge. */}
            <article
              className="reveal flex flex-col gap-6 rounded-2xl border border-surface-container-high bg-surface-container-low p-6 md:p-8"
              style={{ "--i": 6 } as React.CSSProperties}
              aria-labelledby="ios-name"
            >
              <div className="flex items-start gap-4">
                <PlatformIcon kind="ios" />
                <div className="min-w-0 flex-1">
                  <h3 id="ios-name" className="text-xl font-semibold text-on-surface">
                    iOS
                  </h3>
                  <p className="text-sm text-on-surface-variant">Not yet available</p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant">
                  Coming soon
                </span>
              </div>

              <FactList facts={IOS_FACTS} />

              <button
                type="button"
                disabled
                className="inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-surface-container-high px-6 text-base font-medium text-on-surface-variant sm:w-fit"
              >
                Coming soon
              </button>
            </article>
          </div>
        </section>

        {/* Build info + features */}
        <section aria-labelledby="about-build-heading" className="reveal-scroll mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 id="about-build-heading" className="text-2xl font-semibold tracking-tight text-on-surface">
                About this build
              </h2>
              <dl className="clinical-card mt-6 flex flex-col px-5 py-2">
                {BUILD_INFO.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-surface-container-high py-3 text-sm last:border-0"
                  >
                    <dt className="text-on-surface-variant">{row.label}</dt>
                    <dd className="text-right font-medium text-on-surface">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-on-surface">What it does</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {FEATURES.map((f) => (
                  <li key={f.title} className="clinical-card p-5">
                    <h3 className="text-sm font-semibold text-on-surface">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{f.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section aria-labelledby="screens-heading" className="reveal-scroll mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
          <h2 id="screens-heading" className="text-2xl font-semibold tracking-tight text-on-surface">
            Inside the app
          </h2>
          {SCREENSHOTS.length > 0 ? (
            <ul
              role="region"
              aria-label="App screenshots, scroll horizontally"
              tabIndex={0}
              className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:mx-0 md:px-0"
            >
              {SCREENSHOTS.map((s) => (
                <li key={s.src} className="w-[68%] shrink-0 snap-center sm:w-56">
                  <div className="soft-raised relative aspect-[9/19] overflow-hidden p-2">
                    <Image src={s.src} alt={s.alt} fill sizes="(max-width: 640px) 68vw, 224px" className="rounded-xl object-cover" />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="soft-inset mt-6 px-6 py-10 text-center">
              <p className="text-sm font-medium text-on-surface">Screenshots will appear here</p>
              <p className="mt-1 text-sm text-on-surface-variant">Real screens from the Android app are being added.</p>
            </div>
          )}
        </section>

        {/* Research notice */}
        <section aria-labelledby="notice-heading" className="reveal-scroll mx-auto w-full max-w-7xl px-4 pb-16 pt-6 md:px-6">
          <div className="clinical-card border-l-4 border-l-secondary p-6 md:p-8">
            <h2 id="notice-heading" className="text-lg font-semibold text-on-surface">
              Research prototype
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-on-surface-variant">
              Drishti AI is an AI-assisted retinal screening research prototype intended for
              research, educational, and demonstration purposes. It is not a diagnostic device,
              has not been clinically validated, and should not replace evaluation by a qualified
              healthcare professional.
            </p>
            <Link
              href="/disclaimer"
              className="mt-4 inline-flex rounded-sm text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Read the medical disclaimer
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function FactList({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="soft-inset grid grid-cols-2 gap-x-4 gap-y-3 p-4 sm:grid-cols-3">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="text-xs text-on-surface-variant">{f.label}</dt>
          <dd className="mt-0.5 text-sm font-medium text-on-surface">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function PlatformIcon({ kind }: { kind: "android" | "ios" }) {
  const android = kind === "android"
  return (
    <span
      aria-hidden="true"
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
        android ? "bg-primary-container text-on-primary" : "bg-surface-container-high text-on-surface-variant"
      }`}
    >
      {android ? (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M5 16a7 7 0 0 1 14 0Z" stroke="none" />
          <path d="M8.5 9.5 7 7M15.5 9.5 17 7" fill="none" />
          <circle cx="9.5" cy="13" r="0.9" fill="var(--color-primary-container)" stroke="none" />
          <circle cx="14.5" cy="13" r="0.9" fill="var(--color-primary-container)" stroke="none" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="3" width="10" height="18" rx="2.5" />
          <path d="M11 18h2" />
        </svg>
      )}
    </span>
  )
}