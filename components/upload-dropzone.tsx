"use client"

import { useCallback, useRef, useState } from "react"

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"]
const MAX_SIZE_BYTES = 15 * 1024 * 1024

export function UploadDropzone({
  onFileSelected,
  error,
}: {
  onFileSelected: (file: File) => void
  error: string | null
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return
      if (!ACCEPTED_TYPES.includes(file.type)) {
        onFileSelected(file) // let parent surface the validation error via API response too
        return
      }
      if (file.size > MAX_SIZE_BYTES) {
        onFileSelected(file)
        return
      }
      onFileSelected(file)
    },
    [onFileSelected],
  )

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFile(e.dataTransfer.files?.[0])
      }}
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
        isDragging ? "border-primary bg-primary-container/5" : "border-outline-variant bg-surface-container-low"
      }`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high text-primary">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
          <path
            d="M12 16V4M12 4L7 9M12 4l5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="font-medium text-on-surface">Drag and drop a retinal fundus image</p>
        <p className="text-sm text-on-surface-variant">JPG or PNG, up to 15MB</p>
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg bg-primary-container px-4 py-2 text-sm font-medium text-on-primary transition-colors hover:bg-primary"
      >
        Choose Image
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && (
        <p role="alert" className="rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container">
          {error}
        </p>
      )}
    </div>
  )
}
