import type { DRClassName, RecommendationResult } from "./types"

/**
 * Referral-support guidance only. This intentionally contains no
 * prescriptions, drug recommendations, dosages, or treatment plans —
 * see section 24 of the implementation brief and MEDICAL_SAFETY notes
 * in MODEL_CARD.md.
 */
export const RECOMMENDATIONS: Record<DRClassName, RecommendationResult> = {
  "No DR": {
    level: "routine",
    message:
      "No signs of diabetic retinopathy detected. Routine annual screening follow-up is appropriate, pending clinician confirmation.",
  },
  Mild: {
    level: "evaluate",
    message:
      "Early non-proliferative changes detected. Clinical evaluation and follow-up screening within 6–12 months is recommended.",
  },
  Moderate: {
    level: "evaluate",
    message:
      "Moderate non-proliferative changes detected. Clinical evaluation by an eye care professional is recommended.",
  },
  Severe: {
    level: "prompt",
    message:
      "Severe non-proliferative changes detected. Prompt ophthalmic evaluation is recommended.",
  },
  "Proliferative DR": {
    level: "urgent",
    message:
      "Proliferative changes detected. Urgent specialist evaluation is recommended.",
  },
}
