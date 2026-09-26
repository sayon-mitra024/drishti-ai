import Link from "next/link"
import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-container-high bg-surface-container-lowest/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center text-primary">
          <Image src="/logo.png" alt="Drishti AI" width={140} height={40} priority className="h-10 w-auto" />
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
          >
            Overview
          </Link>
          <Link
            href="/screening"
            className="rounded-lg bg-primary-container px-3 py-2 font-medium text-on-primary transition-colors hover:bg-primary"
          >
            Screening Workspace
          </Link>
        </nav>
      </div>
    </header>
  )
}