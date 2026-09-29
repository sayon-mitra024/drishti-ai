import Link from "next/link"
import Image from "next/image"
import { SiteNav } from "@/components/site-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-container-high bg-surface-container-lowest/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center text-primary">
          <Image src="/logo.png" alt="Drishti AI" width={140} height={40} priority className="h-8 w-auto sm:h-10" />
        </Link>
        <SiteNav />
      </div>
    </header>
  )
}