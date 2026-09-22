import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

export const metadata: Metadata = {
  title: "Drishti AI — AI-Assisted Retinal Screening",
  description:
    "AI-assisted diabetic retinopathy screening prototype: upload a retinal fundus image and get a 5-class severity assessment with confidence, probability distribution, explainability overlay, and referral guidance.",
}

export const viewport: Viewport = {
  themeColor: "#fcf9f8",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-background ${geist.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
