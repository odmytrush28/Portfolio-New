type P = { className?: string; title?: string };

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function a11y(title?: string) {
  return title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true, focusable: false };
}

export const ArrowRight = ({ className = 'arrow-right', title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowDown = ({ className = 'arrow-down', title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);
export const ArrowUp = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);
export const Download = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);
export const Mail = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const Copy = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <rect x="9" y="9" width="11" height="11" rx="2.2" />
    <path d="M15 9V6.2A2.2 2.2 0 0 0 12.8 4H6.2A2.2 2.2 0 0 0 4 6.2v6.6A2.2 2.2 0 0 0 6.2 15H9" />
  </svg>
);
export const Check = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const Pin = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);
export const Play = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M6.5 4v16l14-8-14-8Z" fill="currentColor" stroke="none" />
  </svg>
);
export const Pause = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M8.5 5.5v13M15.5 5.5v13" strokeWidth={2.4} />
  </svg>
);
export const Replay = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
    <path d="M4 4.5v4h4" />
  </svg>
);
export const Close = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Menu = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const LinkedIn = ({ className, title }: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} className={className} {...a11y(title)}>
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-3.95v-11Z"
    />
  </svg>
);
export const GitHub = ({ className, title }: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} className={className} {...a11y(title)}>
    <path
      fill="currentColor"
      d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.47.09.65-.2.65-.46v-1.6c-2.64.57-3.2-1.27-3.2-1.27-.43-1.1-1.06-1.39-1.06-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.22 1.03 2.76.79.09-.61.33-1.03.6-1.27-2.1-.24-4.32-1.05-4.32-4.68 0-1.03.37-1.88.98-2.54-.1-.24-.43-1.2.09-2.5 0 0 .8-.26 2.6.97a9 9 0 0 1 4.74 0c1.8-1.23 2.6-.97 2.6-.97.52 1.3.19 2.26.1 2.5.6.66.97 1.5.97 2.54 0 3.64-2.22 4.44-4.33 4.67.34.3.64.88.64 1.77v2.63c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z"
    />
  </svg>
);
export const Briefcase = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <rect x="3.5" y="7" width="17" height="12.5" rx="2.2" />
    <path d="M9 7V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6V7M3.5 12.5h17" />
  </svg>
);
export const Spark = ({ className, title }: P) => (
  <svg {...base} className={className} {...a11y(title)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  </svg>
);
export const MouseIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 34" width={18} height={26} className={className} aria-hidden="true" focusable="false">
    <rect x="1.5" y="1.5" width="21" height="31" rx="10.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <rect className="mouse-wheel" x="10.6" y="7" width="2.8" height="6.5" rx="1.4" fill="currentColor" />
  </svg>
);
