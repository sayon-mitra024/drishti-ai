// Exact class labels and order returned by the EfficientNet-B0 model served
// from the Hugging Face Space (sayon-mitra024/drishti-ai-inference). Must
// match `predicted_class` / `class_probabilities` keys exactly.
export const DR_CLASSES = ["No DR", "Mild", "Moderate", "Severe", "Proliferative DR"] as const

export type DRClassName = (typeof DR_CLASSES)[number]

export interface PredictionResult {
  class_id: number
  class_name: DRClassName
  confidence: number
}

export type Probabilities = Record<DRClassName, number>

export interface ExplainabilityResult {
  available: boolean
  type: "illustrative_mock" | "trained_model" | "unavailable"
  gradcam?: string
  notice: string
  hotspots?: { cx: number; cy: number; r: number; weight: number }[]
}

export interface RecommendationResult {
  level: "routine" | "evaluate" | "prompt" | "urgent"
  message: string
}

export interface QualityMetrics {
  passed: boolean
  width: number
  height: number
  format: string
  focusClarity: number
  illumination: number
  resolutionScore: number
  notes: string[]
}

export interface ModelInfo {
  architecture: string
  version: string
  mock: boolean
  source?: string
}

export interface PredictResponse {
  success: boolean
  error?: string
  prediction?: PredictionResult
  probabilities?: Probabilities
  explainability?: ExplainabilityResult
  recommendation?: RecommendationResult
  quality?: QualityMetrics
  model?: ModelInfo
}
