import type { ReactNode } from 'react';

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  id: string;
  className?: string;
};

export function SectionHead({ index, label, title, lede, id, className = '' }: Props) {
  return (
    <header className={`section-head ${className}`}>
      <p className="section-head__index reveal">
        <b>{index}</b>
        <i aria-hidden="true" />
        {label}
      </p>
      <h2 id={id} className="display reveal" style={{ ['--i' as string]: 1 }}>
        {title}
      </h2>
      {lede && (
        <p className="lede reveal" style={{ ['--i' as string]: 2 }}>
          {lede}
        </p>
      )}
    </header>
  );
}
