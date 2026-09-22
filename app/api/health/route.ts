import { NextResponse } from "next/server"
import { MOCK_MODEL_INFO } from "@/lib/mock-inference"

export async function GET() {
  const mockMode = process.env.MOCK_MODE === "true"
  const hfConfigured = Boolean(process.env.HF_TOKEN)
  const hfSpace = process.env.HF_SPACE_ID || "sayon-mitra024/drishti-ai-inference"

  return NextResponse.json({
    status: "ok",
    mock_mode: mockMode,
    model_loaded: mockMode ? false : hfConfigured,
    backend: mockMode ? "mock" : "huggingface-space",
    huggingface_space: mockMode ? null : hfSpace,
    huggingface_token_configured: mockMode ? null : hfConfigured,
    model_architecture: mockMode ? MOCK_MODEL_INFO.architecture : "EfficientNet-B0",
    model_version: mockMode ? MOCK_MODEL_INFO.version : hfSpace,
  })
}
