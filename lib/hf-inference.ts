import { Client, handle_file } from "@gradio/client"
import { DR_CLASSES, type DRClassName, type ExplainabilityResult, type PredictionResult, type Probabilities } from "./types"

/**
 * ============================================================================
 * REAL BACKEND — private Hugging Face Space (EfficientNet-B0)
 * ============================================================================
 *
 * Connects to the already-deployed, already-tested Gradio Space at
 * `sayon-mitra024/drishti-ai-inference` via the official @gradio/client.
 * This module does NOT implement, retrain, or modify the model in any way —
 * it only calls the Space's `/predict` endpoint and adapts its two outputs
 * (prediction JSON + Grad-CAM image) into this app's existing response
 * shape (see lib/types.ts).
 *
 * The Hugging Face token (HF_TOKEN) is read from server-only environment
 * variables and is never sent to, or derivable by, the browser. The Grad-CAM
 * image is fetched here on the server (using the same token) and re-encoded
 * as a data: URL, so the browser never talks to Hugging Face directly and
 * never sees a Hugging Face-internal temp path.
 * ============================================================================
 */

const HF_SPACE = process.env.HF_SPACE_ID || "sayon-mitra024/drishti-ai-inference"
const PREDICT_ENDPOINT = "/predict"

// Reported p99 latency is ~7s; Spaces that have gone to sleep can take
// significantly longer to cold-start. 45s gives real inference room to
// complete without the UI hanging indefinitely on a truly dead backend.
const INFERENCE_TIMEOUT_MS = 45_000

export type HFErrorKind = "config" | "auth" | "unavailable" | "timeout" | "malformed"

export class HFInferenceError extends Error {
  kind: HFErrorKind
  constructor(message: string, kind: HFErrorKind) {
    super(message)
    this.name = "HFInferenceError"
    this.kind = kind
  }
}

export interface HFPredictionResult {
  prediction: PredictionResult
  probabilities: Probabilities
  explainability: ExplainabilityResult
  note?: string
}

function getToken(): `hf_${string}` {
  const token = process.env.HF_TOKEN
  if (!token) {
    throw new HFInferenceError(
      "HF_TOKEN is not configured on the server. Add it in Project Settings → Vars.",
      "config",
    )
  }
  if (!token.startsWith("hf_")) {
    throw new HFInferenceError("HF_TOKEN is configured but does not look like a valid Hugging Face token.", "config")
  }
  return token as `hf_${string}`
}

let clientPromise: Promise<Client> | null = null

function getClient(): Promise<Client> {
  if (!clientPromise) {
    const token = getToken()
    clientPromise = Client.connect(HF_SPACE, { token }).catch((err) => {
      // Don't cache a failed connection attempt — the next request should retry
      // (e.g. the Space may still be waking up from sleep).
      clientPromise = null
      throw err
    })
  }
  return clientPromise
}

class TimeoutError extends Error {}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new TimeoutError(`Timed out after ${ms}ms`)), ms)
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (err) => {
        clearTimeout(timer)
        reject(err)
      },
    )
  })
}

interface RawPrediction {
  predicted_class?: unknown
  predicted_class_index?: unknown
  confidence?: unknown
  class_probabilities?: unknown
  note?: unknown
}

interface RawFileOutput {
  url?: string
  path?: string
}

function parsePrediction(raw: unknown): {
  prediction: PredictionResult
  probabilities: Probabilities
  note?: string
} {
  if (!raw || typeof raw !== "object") {
    throw new HFInferenceError("Malformed prediction response from the inference backend.", "malformed")
  }

  const obj = raw as RawPrediction
  const classIndex = obj.predicted_class_index
  const className = obj.predicted_class
  const confidence = obj.confidence
  const classProbabilities = obj.class_probabilities

  if (
    typeof classIndex !== "number" ||
    typeof className !== "string" ||
    typeof confidence !== "number" ||
    typeof classProbabilities !== "object" ||
    classProbabilities === null
  ) {
    throw new HFInferenceError("Malformed prediction response from the inference backend.", "malformed")
  }

  if (classIndex < 0 || classIndex >= DR_CLASSES.length || DR_CLASSES[classIndex] !== className) {
    throw new HFInferenceError(
      `Inference backend returned an unrecognized class: "${className}" (index ${classIndex}).`,
      "malformed",
    )
  }

  const probabilities = {} as Probabilities
  const probsRecord = classProbabilities as Record<string, unknown>
  for (const cls of DR_CLASSES) {
    const value = probsRecord[cls]
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
      throw new HFInferenceError(`Malformed class probability for "${cls}" from the inference backend.`, "malformed")
    }
    probabilities[cls] = value
  }

  return {
    prediction: {
      class_id: classIndex,
      class_name: className as DRClassName,
      confidence,
    },
    probabilities,
    note: typeof obj.note === "string" ? obj.note : undefined,
  }
}

async function parseGradcam(raw: unknown, token: string): Promise<ExplainabilityResult> {
  const fileOutput = raw as RawFileOutput | null | undefined
  const url = fileOutput?.url

  if (!url) {
    return {
      available: false,
      type: "unavailable",
      notice: "Grad-CAM visualization was not returned by the inference backend for this image.",
    }
  }

  try {
    const res = await withTimeout(fetch(url, { headers: { Authorization: `Bearer ${token}` } }), 20_000)
    if (!res.ok) {
      throw new Error(`Grad-CAM fetch failed with status ${res.status}`)
    }
    const arrayBuffer = await res.arrayBuffer()
    const contentType = res.headers.get("content-type") || "image/png"
    const base64 = Buffer.from(arrayBuffer).toString("base64")

    return {
      available: true,
      type: "trained_model",
      gradcam: `data:${contentType};base64,${base64}`,
      notice:
        "Grad-CAM highlights regions that influenced the model's prediction and is not a clinically validated visualization.",
    }
  } catch {
    return {
      available: false,
      type: "unavailable",
      notice: "Grad-CAM visualization could not be retrieved from the inference backend for this image.",
    }
  }
}

/**
 * Sends the uploaded fundus image to the private Hugging Face Space and
 * returns a parsed, validated result in this app's existing response shape.
 * Throws HFInferenceError with a `kind` the API route can map to a clean
 * user-facing message and HTTP status.
 */
export async function runHFInference(imageBuffer: Buffer): Promise<HFPredictionResult> {
  const token = getToken()

  let app: Client
  try {
    app = await withTimeout(getClient(), INFERENCE_TIMEOUT_MS)
  } catch (err) {
    if (err instanceof HFInferenceError) throw err
    if (err instanceof TimeoutError) {
      throw new HFInferenceError(
        "The inference backend took too long to start. The Space may be waking up from sleep — please try again shortly.",
        "timeout",
      )
    }
    const message = err instanceof Error ? err.message : String(err)
    if (/401|403|unauthoriz|forbidden|invalid.*token/i.test(message)) {
      throw new HFInferenceError("Authentication with the inference backend failed.", "auth")
    }
    throw new HFInferenceError("Unable to connect to the inference backend. Please try again shortly.", "unavailable")
  }

  let result: { data: unknown }
  try {
    result = await withTimeout(app.predict(PREDICT_ENDPOINT, [handle_file(imageBuffer)]), INFERENCE_TIMEOUT_MS)
  } catch (err) {
    if (err instanceof TimeoutError) {
      throw new HFInferenceError(
        "The inference backend took too long to respond. Please try again shortly.",
        "timeout",
      )
    }
    const message = err instanceof Error ? err.message : String(err)
    if (/401|403|unauthoriz|forbidden/i.test(message)) {
      throw new HFInferenceError("Authentication with the inference backend failed.", "auth")
    }
    throw new HFInferenceError("The inference backend is currently unavailable. Please try again shortly.", "unavailable")
  }

  const data = result.data
  if (!Array.isArray(data) || data.length < 2) {
    throw new HFInferenceError("Malformed response shape from the inference backend.", "malformed")
  }

  const { prediction, probabilities, note } = parsePrediction(data[0])
  const explainability = await parseGradcam(data[1], token)

  return { prediction, probabilities, explainability, note }
}
