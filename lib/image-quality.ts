import sharp from "sharp"
import type { QualityMetrics } from "./types"

const MIN_DIMENSION = 256

/**
 * Real, non-ML heuristic image-quality checks computed from the actual
 * uploaded image bytes via sharp (resolution + per-channel brightness
 * statistics). This is explicitly a prototype heuristic layer, not a
 * trained image-quality model — see ARCHITECTURE.md → "Future Image
 * Quality Model".
 */
export async function assessImageQuality(buffer: Buffer): Promise<QualityMetrics> {
  const image = sharp(buffer)
  const metadata = await image.metadata()
  const stats = await image.stats()

  const width = metadata.width ?? 0
  const height = metadata.height ?? 0
  const format = metadata.format ?? "unknown"

  const meanBrightness =
    stats.channels.slice(0, 3).reduce((sum, c) => sum + c.mean, 0) /
    Math.min(3, stats.channels.length)
  const illumination = Math.max(0, Math.min(100, (1 - Math.abs(meanBrightness - 128) / 128) * 100))

  const meanStdDev =
    stats.channels.slice(0, 3).reduce((sum, c) => sum + c.stdev, 0) /
    Math.min(3, stats.channels.length)
  const focusClarity = Math.max(0, Math.min(100, (meanStdDev / 70) * 100))

  const resolutionScore =
    width >= MIN_DIMENSION && height >= MIN_DIMENSION
      ? 100
      : Math.max(0, (Math.min(width, height) / MIN_DIMENSION) * 100)

  const notes: string[] = []
  if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
    notes.push(`Image resolution ${width}x${height} is below the recommended minimum of ${MIN_DIMENSION}px.`)
  }
  if (illumination < 40) {
    notes.push("Illumination is outside the expected range (too dark or too bright).")
  }
  if (focusClarity < 15) {
    notes.push("Low contrast detected — image may be blurred or low quality.")
  }

  const passed = notes.length === 0

  return {
    passed,
    width,
    height,
    format,
    focusClarity: Math.round(focusClarity * 10) / 10,
    illumination: Math.round(illumination * 10) / 10,
    resolutionScore: Math.round(resolutionScore * 10) / 10,
    notes,
  }
}

export const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"]
export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024 // 15MB
