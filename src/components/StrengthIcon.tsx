/** Line icons echoing the five glowing icons in the character animation. */
export function StrengthIcon({ name }: { name: string }) {
  const p = {
    width: 28,
    height: 28,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };
  switch (name) {
    case 'Leadership':
      return (
        <svg {...p}>
          <path d="M6 25V19M12 25V15M18 25V17M24 25V10" />
          <path d="M5 14.5 12 9l5 3.5L26 6" />
          <path d="M21.5 6H26v4.5" />
        </svg>
      );
    case 'Problem-solving':
      return (
        <svg {...p}>
          <path d="M7 9h5a2.5 2.5 0 1 1 5 0h5v5a2.5 2.5 0 1 1 0 5v5h-5a2.5 2.5 0 1 0-5 0H7v-5a2.5 2.5 0 1 0 0-5V9Z" />
        </svg>
      );
    case 'Connection':
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="3.5" />
          <circle cx="21.5" cy="12" r="3" />
          <path d="M4.5 25c.6-4.3 3.2-6.8 6.5-6.8s5.9 2.5 6.5 6.8" />
          <path d="M18.5 19.2c.9-.6 1.9-.9 3-.9 2.8 0 5 2.2 5.5 6" />
        </svg>
      );
    case 'Creativity':
      return (
        <svg {...p}>
          <path d="M12 22.5h8M13 26h6" />
          <path d="M16 5a7.5 7.5 0 0 0-4.6 13.4c.8.6 1.1 1.3 1.1 2.1v2h7v-2c0-.8.4-1.5 1.1-2.1A7.5 7.5 0 0 0 16 5Z" />
          <path d="M16 9.5v3M13.5 12.5h5" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M3.5 25 12 11l4.5 7 3-4.5L28.5 25h-25Z" />
          <path d="M12 11l2 3.2M19.5 13.5l1.4 2.1" />
          <path d="M22 6.5v4M22 6.5l3 1.2-3 1.2" />
        </svg>
      );
  }
}
