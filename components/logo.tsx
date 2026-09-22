export function DrishtiLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      className={className}
      role="img"
      aria-label="Drishti AI — Retinal Screening"
    >
      <g transform="translate(4, 4)">
        <path
          d="M1 16C5 7 14 1 24 1C34 1 43 7 47 16C43 25 34 31 24 31C14 31 5 25 1 16Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="16" r="3.5" fill="currentColor" />
        <path
          d="M24 5V9M24 23V27M13 16H17M31 16H35"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      </g>
      <text x="60" y="24" fontFamily="var(--font-sans)" fontWeight="700" fontSize="17" letterSpacing="0.08em" fill="currentColor">
        DRISHTI
      </text>
      <text x="133" y="24" fontFamily="var(--font-sans)" fontWeight="700" fontSize="17" letterSpacing="0.08em" className="fill-primary">
        AI
      </text>
      <text x="60" y="34" fontFamily="var(--font-sans)" fontWeight="500" fontSize="7" letterSpacing="0.18em" className="fill-on-surface-variant">
        RETINAL SCREENING
      </text>
    </svg>
  )
}
