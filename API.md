# API Reference

## `POST /api/predict`

Runs the screening pipeline (validation → quality check → real inference via Hugging
Face → explainability → recommendation) on one uploaded image.

**Request:** `multipart/form-data`

| Field | Type | Required | Notes |
|---|---|---|---|
| `image` | File | yes | JPG/JPEG/PNG, ≤ 15MB |

**Response `200`:**

```json
{
  "success": true,
  "prediction": { "class_id": 2, "class_name": "Moderate", "confidence": 0.4123 },
  "probabilities": {
    "No DR": 0.0512,
    "Mild": 0.1830,
    "Moderate": 0.4123,
    "Severe": 0.2900,
    "Proliferative DR": 0.0635
  },
  "explainability": {
    "available": true,
    "type": "trained_model",
    "gradcam": "data:image/png;base64,iVBORw0KG...",
    "notice": "Grad-CAM highlights regions that influenced the model's prediction and is not a clinically validated visualization."
  },
  "recommendation": {
    "level": "evaluate",
    "message": "Moderate non-proliferative changes detected. Clinical evaluation by an eye care professional is recommended."
  },
  "quality": {
    "passed": true,
    "width": 2048,
    "height": 2048,
    "format": "jpeg",
    "focusClarity": 62.4,
    "illumination": 88.1,
    "resolutionScore": 100,
    "notes": []
  },
  "model": {
    "architecture": "EfficientNet-B0",
    "version": "sayon-mitra024/drishti-ai-inference",
    "mock": false,
    "source": "huggingface-space"
  }
}
```

> The example above is illustrative documentation only. `prediction`, `probabilities`,
> and `explainability.gradcam` are the real, live values returned by the model for the
> specific uploaded image.

The `explainability.gradcam` field is a `data:` URL (base64-encoded PNG/JPEG). It is
fetched server-side from the Hugging Face Space (with the server-only `HF_TOKEN`) and
re-encoded before being sent to the browser — the browser never receives a
Hugging Face-internal file path or talks to Hugging Face directly.

**Error responses:**

| Status | Cause |
|---|---|
| 400 | Missing `image` field, unsupported file type, file too large, or unreadable/corrupt image |
| 500 | Unexpected server error, or `HF_TOKEN` missing/misconfigured (`error.kind === "config"`) |
| 502 | Malformed response from the inference backend, or Hugging Face authentication failure |
| 503 | Hugging Face Space is unreachable |
| 504 | Inference backend timed out (e.g. Space cold-starting from sleep) |

```json
{ "success": false, "error": "Unsupported file type: image/gif. Accepted: JPG, JPEG, PNG." }
```

Errors never include `HF_TOKEN`, stack traces, or any other server secret — only a
clean, user-facing message.

### Local-dev-only mock fallback

Setting `MOCK_MODE=true` (see `.env.example`) bypasses the Hugging Face backend
entirely and uses `lib/mock-inference.ts`, an isolated deterministic heuristic. Every
response from that path is tagged `model.mock: true`. This is for local UI development
without `HF_TOKEN` configured — it must never be enabled in a deployment presented as
using the real model.

## `GET /api/health`

```json
{
  "status": "ok",
  "mock_mode": false,
  "model_loaded": true,
  "backend": "huggingface-space",
  "huggingface_space": "sayon-mitra024/drishti-ai-inference",
  "huggingface_token_configured": true,
  "model_architecture": "EfficientNet-B0",
  "model_version": "sayon-mitra024/drishti-ai-inference"
}
```

`huggingface_token_configured` only reports whether `HF_TOKEN` is *present* — the token
value itself is never included in this or any other response.
