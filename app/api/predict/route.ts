import { NextResponse } from "next/server"
import { HFInferenceError, runHFInference } from "@/lib/hf-inference"
import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE_BYTES, assessImageQuality } from "@/lib/image-quality"
import { MOCK_MODEL_INFO, runMockExplainability, runMockInference } from "@/lib/mock-inference"
import { RECOMMENDATIONS } from "@/lib/recommendations"
import { DR_CLASSES, type PredictResponse } from "@/lib/types"

export const runtime = "nodejs"
export const maxDuration = 60

const HF_MODEL_INFO = {
  architecture: "EfficientNet-B0",
  version: "sayon-mitra024/drishti-ai-inference",
  mock: false,
  source: "huggingface-space",
} as const

// Explicit opt-in only. The real Hugging Face backend is the default path —
// see lib/hf-inference.ts. Set MOCK_MODE=true for local UI development
// without calling the real backend (e.g. no HF_TOKEN configured yet).
const MOCK_MODE = process.env.MOCK_MODE === "true"

function errorStatusForKind(kind: HFInferenceError["kind"]): number {
  switch (kind) {
    case "config":
      return 500
    case "auth":
      return 502
    case "timeout":
      return 504
    case "unavailable":
      return 503
    case "malformed":
      return 502
    default:
      return 500
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("image")

    if (!file || !(file instanceof File)) {
      return NextResponse.json<PredictResponse>(
        { success: false, error: "Missing 'image' field in multipart/form-data body." },
        { status: 400 },
      )
    }

    if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json<PredictResponse>(
        { success: false, error: `Unsupported file type: ${file.type}. Accepted: JPG, JPEG, PNG.` },
        { status: 400 },
      )
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json<PredictResponse>(
        { success: false, error: `File too large: ${file.size} bytes. Maximum is ${MAX_FILE_SIZE_BYTES} bytes.` },
        { status: 400 },
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let quality
    try {
      quality = await assessImageQuality(buffer)
    } catch {
      return NextResponse.json<PredictResponse>(
        { success: false, error: "Unable to read image. The file may be corrupted or not a valid JPG/PNG." },
        { status: 400 },
      )
    }

    if (MOCK_MODE) {
      const { classId, className, confidence, probabilities } = runMockInference(buffer)
      const explainability = runMockExplainability(buffer, classId)

      return NextResponse.json<PredictResponse>({
        success: true,
        prediction: { class_id: classId, class_name: className, confidence },
        probabilities,
        explainability,
        recommendation: RECOMMENDATIONS[className],
        quality,
        model: MOCK_MODEL_INFO,
      })
    }

    try {
      const { prediction, probabilities, explainability } = await runHFInference(buffer)

      // Validate the probability distribution before returning it, same as
      // the mock path — defends against a backend regression, not a sign
      // this route doubts a working model.
      const values = Object.values(probabilities)
      const validDistribution =
        values.length === DR_CLASSES.length &&
        values.every((v) => Number.isFinite(v) && v >= 0) &&
        Math.abs(values.reduce((a, b) => a + b, 0) - 1) < 0.05

      if (!validDistribution) {
        return NextResponse.json<PredictResponse>(
          { success: false, error: "Inference backend returned a malformed probability distribution." },
          { status: 502 },
        )
      }

      const response: PredictResponse = {
        success: true,
        prediction,
        probabilities,
        explainability,
        recommendation: RECOMMENDATIONS[prediction.class_name],
        quality,
        model: HF_MODEL_INFO,
      }

      return NextResponse.json(response)
    } catch (err) {
      if (err instanceof HFInferenceError) {
        return NextResponse.json<PredictResponse>(
          { success: false, error: err.message },
          { status: errorStatusForKind(err.kind) },
        )
      }
      return NextResponse.json<PredictResponse>(
        { success: false, error: "Unexpected error while contacting the inference backend." },
        { status: 500 },
      )
    }
  } catch {
    return NextResponse.json<PredictResponse>(
      { success: false, error: "Unexpected server error while processing the request." },
      { status: 500 },
    )
  }
}
