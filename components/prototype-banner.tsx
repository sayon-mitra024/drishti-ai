export function PrototypeBanner() {
  return (
    <div className="border-b border-tertiary/20 bg-tertiary-fixed px-4 py-2 text-center text-[11px] leading-snug text-on-tertiary-fixed md:px-6">
      This output is produced by Drishti AI, an AI-assisted research/screening prototype. It is
      NOT a diagnostic medical device and has not been clinically validated. It must never be
      used to determine treatment or medication. Grad-CAM highlights regions that influenced the
      model&apos;s prediction and is not a clinically validated visualization. Final interpretation
      requires review by a qualified ophthalmologist or clinician.
    </div>
  )
}
