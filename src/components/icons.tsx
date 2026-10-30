type P = { className?: string };

const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const Arrow = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Heart = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      fill="currentColor"
      d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.1 4.3 2.4.4.6 1.6.6 2 0 .7-1.3 2.2-2.4 4.3-2.4 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21Z"
    />
  </svg>
);

export const Play = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path fill="currentColor" d="M8 5.6v12.8c0 .8.9 1.3 1.6.9l10.2-6.4a1 1 0 0 0 0-1.8L9.6 4.7C8.9 4.3 8 4.8 8 5.6Z" />
  </svg>
);

export const Pause = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
    <rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
  </svg>
);

export const Expand = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);

export const Check = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base} strokeWidth={2.6}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

/** The round "verified" tick YouTube puts beside a channel name. */
export const Verified = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path d="m7.5 12.4 3 3 6-6.2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Pin = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

export const Send = ({ className = "ico" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
    <path d="M4 12 20 4l-6 16-3-7-7-1Z" />
  </svg>
);
