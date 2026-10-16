import { useEffect, useRef } from 'react';
import './Cursor.css';

/**
 * A small, refined cursor indicator that only appears over areas marked with
 * `data-cursor="Label"` (the hero character and the "look closer" portrait).
 * Everywhere else the native cursor is untouched.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!fine || !ring || !label) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let active = false;
    let current = '';

    const loop = () => {
      const k = reduced ? 1 : 0.2;
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (active || Math.abs(x - rx) > 0.3 || Math.abs(y - ry) > 0.3) raf = requestAnimationFrame(loop);
      else raf = 0;
    };

    let seen = false;
    const evaluate = (t: Element | null) => {
      const host = t?.closest?.('[data-cursor]') as HTMLElement | null;
      const overControl = !!t?.closest?.('a, button, input, textarea, select, label');
      const text = host && !overControl ? host.getAttribute('data-cursor') || '' : '';
      if (text !== current) {
        current = text;
        label.textContent = text;
      }
      const show = !!text;
      if (show !== active) {
        active = show;
        ring.classList.toggle('is-on', show);
        document.documentElement.classList.toggle('cursor-hidden', show);
        if (show) {
          rx = x;
          ry = y;
        }
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      seen = true;
      evaluate(e.target as Element | null);
    };
    // Components call this when a label changes under a still pointer.
    const onRefresh = () => {
      if (seen) evaluate(document.elementFromPoint(x, y));
    };
    const onLeaveWindow = () => {
      active = false;
      ring.classList.remove('is-on');
      document.documentElement.classList.remove('cursor-hidden');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('cursor:refresh', onRefresh);
    document.addEventListener('pointerleave', onLeaveWindow);
    window.addEventListener('blur', onLeaveWindow);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('cursor:refresh', onRefresh);
      document.removeEventListener('pointerleave', onLeaveWindow);
      window.removeEventListener('blur', onLeaveWindow);
      document.documentElement.classList.remove('cursor-hidden');
    };
  }, []);

  return (
    <div ref={ringRef} className="cursor" aria-hidden="true">
      <span className="cursor__ring">
        <span ref={labelRef} className="cursor__label" />
      </span>
    </div>
  );
}
