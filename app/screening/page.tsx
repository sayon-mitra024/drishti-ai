import { PrototypeBanner } from "@/components/prototype-banner"
import { ScreeningWorkspace } from "@/components/screening-workspace"
import { SiteHeader } from "@/components/site-header"

export default function ScreeningPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />
      <PrototypeBanner />
      <ScreeningWorkspace />
    </main>
  )
}
