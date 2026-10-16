import { useEffect, useRef, useState } from 'react';
import { nav, profile } from '../data/content';
import { useActiveSection } from '../hooks/useMotion';
import { Close, Download, Menu } from './Icons';
import './Nav.css';

const IDS = nav.map((n) => n.id);
const BASE = import.meta.env.BASE_URL;

export function Nav() {
  const active = useActiveSection(IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a, button');
    focusables?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__bar container">
        <a href="#home" className="nav__brand" aria-label={`${profile.name} — back to top`}>
          <span className="nav__mark" aria-hidden="true">
            O<i>D</i>
          </span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul role="list">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} aria-current={active === n.id ? 'true' : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--ghost btn--sm nav__resume" href={`${BASE}${profile.resume.href}`} download={profile.resume.fileName}>
          <Download /> Résumé
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>
      <span className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <div id="mobile-menu" ref={panelRef} className="nav__panel" hidden={!open}>
        <nav aria-label="Mobile">
          <ol role="list">
            {nav.map((n, i) => (
              <li key={n.id} style={{ ['--i' as string]: i }}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)}>
                  <span className="mono">0{i + 1}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="nav__panel-foot">
          <a className="btn btn--primary" href={`${BASE}${profile.resume.href}`} download={profile.resume.fileName}>
            <Download /> Download résumé
          </a>
          <a className="text-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </div>
    </header>
  );
}
