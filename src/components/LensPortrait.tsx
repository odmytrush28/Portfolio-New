import { useEffect, useRef } from 'react';
import portrait from '../assets/img/portrait.webp';
import portraitLens from '../assets/img/portrait-lens.webp';

/**
 * "Look closer" — an organic, liquid reveal mask (Hero Reveal guide).
 * Base layer: the real portrait. Hidden layer: the same photo rendered as a
 * halftone "audit lens". Both layers are pixel-aligned; only the mask moves.
 */
const W = 632;
const H = 790;
const POINTS = 40;

type Blob = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  r: number;
  tr: number;
  vx: number;
  vy: number;
};

function blobPath(b: Blob, t: number, calm: boolean): string {
  const pts: [number, number][] = [];
  const speed = Math.min(1, Math.hypot(b.vx, b.vy) / 40);
  const dir = Math.atan2(b.vy, b.vx);
  const m = calm ? 0.35 : 1;
  for (let i = 0; i < POINTS; i++) {
    const a = (i / POINTS) * Math.PI * 2;
    const wobble =
      0.11 * Math.sin(2 * a + t * 0.9) +
      0.07 * Math.sin(3 * a - t * 1.3 + 1.7) +
      0.045 * Math.sin(5 * a + t * 2.1 + 0.4) +
      0.03 * Math.sin(7 * a - t * 2.7);
    // stretch slightly along the direction of travel (inertia feel)
    const stretch = 0.16 * speed * Math.cos(a - dir) ** 2;
    const rr = b.r * (1 + wobble * m + stretch);
    pts.push([b.x + Math.cos(a) * rr, b.y + Math.sin(a) * rr]);
  }
  // Closed Catmull–Rom → cubic Bézier
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < POINTS; i++) {
    const p0 = pts[(i - 1 + POINTS) % POINTS];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % POINTS];
    const p3 = pts[(i + 2) % POINTS];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + 'Z';
}

export function LensPortrait() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const b: Blob = { x: W / 2, y: H * 0.4, tx: W / 2, ty: H * 0.4, r: 0, tr: 0, vx: 0, vy: 0 };
    let raf = 0;
    let running = false;
    let inside = false;
    let inView = false;
    let lastInput = 0;
    let releaseTimer = 0;
    const t0 = performance.now();

    const scale = () => W / wrap.getBoundingClientRect().width;
    // ~300px on screen, regardless of how large the portrait renders
    const targetR = () => Math.min(W * 0.36, 150 * scale());

    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      // idle wander on touch screens so the effect is discoverable
      if (!fine && !calm && inView && now - lastInput > 2600) {
        b.tx = W * (0.5 + 0.22 * Math.sin(t * 0.45));
        b.ty = H * (0.38 + 0.12 * Math.sin(t * 0.7 + 1));
        b.tr = targetR() * 0.85;
      }
      const ease = calm ? 1 : 0.14;
      const px = b.x;
      const py = b.y;
      b.x += (b.tx - b.x) * ease;
      b.y += (b.ty - b.y) * ease;
      b.vx = b.vx * 0.8 + (b.x - px) * 0.2 * 3;
      b.vy = b.vy * 0.8 + (b.y - py) * 0.2 * 3;
      b.r += (b.tr - b.r) * (calm ? 0.35 : 0.12);
      if (b.r < 0.5 && b.tr === 0) {
        path.setAttribute('d', '');
        running = false;
        return;
      }
      path.setAttribute('d', blobPath(b, t, calm));
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const toLocal = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
    };
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      lastInput = performance.now();
      if (!inside) {
        // first contact: appear at the pointer instead of sliding in from far away
        b.x = p.x;
        b.y = p.y;
      }
      inside = true;
      b.tx = p.x;
      b.ty = p.y;
      b.tr = targetR();
      window.clearTimeout(releaseTimer);
      start();
    };
    const onLeave = (e: PointerEvent) => {
      inside = false;
      if (e.pointerType === 'touch') {
        releaseTimer = window.setTimeout(() => {
          if (!inside && fine) b.tr = 0;
        }, 1400);
        lastInput = performance.now();
        return;
      }
      b.tr = 0;
      start();
    };

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerdown', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    wrap.addEventListener('pointercancel', onLeave);

    let io: IntersectionObserver | null = null;
    if (!fine && !calm && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([en]) => {
        inView = en.isIntersecting;
        if (inView) {
          b.tr = targetR() * 0.85;
          start();
        } else {
          b.tr = 0;
        }
      });
      io.observe(wrap);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(releaseTimer);
      io?.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerdown', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      wrap.removeEventListener('pointercancel', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="lens" data-cursor="Look closer">
      <svg
        className="lens__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby="lens-title"
        preserveAspectRatio="xMidYMid slice"
      >
        <title id="lens-title">Portrait of Olesia Dmytrush</title>
        <defs>
          <filter id="lens-feather" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <mask id="lens-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <rect width={W} height={H} fill="black" />
            <path ref={pathRef} fill="white" filter="url(#lens-feather)" />
          </mask>
        </defs>
        <image href={portrait} width={W} height={H} />
        <image href={portraitLens} width={W} height={H} mask="url(#lens-mask)" />
      </svg>
      <span className="lens__corner lens__corner--tl" aria-hidden="true" />
      <span className="lens__corner lens__corner--tr" aria-hidden="true" />
      <span className="lens__corner lens__corner--bl" aria-hidden="true" />
      <span className="lens__corner lens__corner--br" aria-hidden="true" />
      <span className="lens__tag mono" aria-hidden="true">
        Subject · O. Dmytrush
      </span>
    </div>
  );
}
