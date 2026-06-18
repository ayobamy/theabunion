/** A slim gold divider with a central leaf — used between sections. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 24"
      className={`h-6 w-[clamp(160px,42vw,220px)] ${className}`}
      aria-hidden="true"
    >
      <g
        stroke="var(--gold)"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      >
        <line x1="14" y1="12" x2="88" y2="12" />
        <line x1="132" y1="12" x2="206" y2="12" />
        <circle cx="96" cy="12" r="1.6" fill="var(--gold)" stroke="none" />
        <circle cx="124" cy="12" r="1.6" fill="var(--gold)" stroke="none" />
      </g>
      <path
        d="M110 3 C115 8 115 16 110 21 C105 16 105 8 110 3 Z"
        fill="var(--gold)"
      />
    </svg>
  );
}
