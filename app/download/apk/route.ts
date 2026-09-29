import { NextResponse } from "next/server"

// Server-side redirect to the existing GitHub release asset. The APK is not
// hosted, copied, streamed or proxied here; the browser is simply sent on to
// GitHub. This constant lives in server code only and is not shipped in the
// page HTML or client JavaScript.
const APK_URL =
  "https://github.com/sayon-mitra024/drishti-ai-android/releases/download/v1.0.0/Drishti-AI-v1.0.0.apk"

export function GET() {
  return NextResponse.redirect(APK_URL, {
    status: 302,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  })
}