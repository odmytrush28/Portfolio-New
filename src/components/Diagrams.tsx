import { useReducedMotion } from '../hooks/useMotion';

/* Hand-built SVG diagrams for each case study (no screenshots are invented). */

export function PipelineDiagram() {
  const reduced = useReducedMotion();
  const steps = ['Discovery meetings', 'Requirements', 'Workflows & personas', 'Application concept', 'QA / QE input', 'Client presentation'];
  const x = 70;
  const top = 34;
  const gap = 62;
  const lastY = top + gap * (steps.length - 1);
  return (
    <svg className="dg dg--pipeline" viewBox="0 0 380 400" aria-hidden="true" focusable="false">
      <line x1={x} y1={top} x2={x} y2={lastY} className="dg__rail" />
      <line x1={x} y1={top} x2={x} y2={lastY} className="dg__rail-fill" pathLength={1} />
      {!reduced && (
        <circle r="4.5" className="dg__pulse">
          <animateMotion dur="4.8s" repeatCount="indefinite" path={`M${x},${top} L${x},${lastY}`} />
        </circle>
      )}
      {steps.map((s, i) => {
        const y = top + gap * i;
        return (
          <g key={s} className="dg__node" style={{ ['--i' as string]: i }}>
            <circle cx={x} cy={y} r="15" className="dg__ring" />
            <text x={x} y={y + 4} className="dg__num" textAnchor="middle">
              {String(i + 1).padStart(2, '0')}
            </text>
            <rect x={x + 30} y={y - 19} width="240" height="38" rx="19" className="dg__pill" />
            <text x={x + 48} y={y + 5} className="dg__label">
              {s}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ControlsDiagram() {
  const reduced = useReducedMotion();
  const nodes = ['Business process', 'IT risk', 'Control', 'Test', 'Evidence', 'Finding'];
  const cx = 200;
  const cy = 200;
  const R = 128;
  return (
    <svg className="dg dg--controls" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <circle cx={cx} cy={cy} r={R} className="dg__orbit" />
      <g className={`dg__sweep${reduced ? '' : ' is-moving'}`}>
        <circle cx={cx} cy={cy} r={R} className="dg__arc" pathLength={100} />
      </g>
      <text x={cx} y={cy - 6} textAnchor="middle" className="dg__center">
        Control-testing
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" className="dg__center dg__center--em">
        loop
      </text>
      {nodes.map((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const nx = cx + Math.cos(a) * R;
        const ny = cy + Math.sin(a) * R;
        const below = Math.sin(a) > 0.2;
        const side = Math.cos(a);
        const lx = nx + side * 0;
        const ly = below ? ny + 40 : ny - 30;
        return (
          <g key={n} className="dg__node" style={{ ['--i' as string]: i }}>
            <circle cx={nx} cy={ny} r="17" className="dg__dot" />
            <text x={nx} y={ny + 4.5} textAnchor="middle" className="dg__num">
              {i + 1}
            </text>
            <text x={lx} y={ly} textAnchor="middle" className="dg__label">
              {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function HubDiagram() {
  const reduced = useReducedMotion();
  const people = ['Agents', 'Clients', 'Lenders', 'Attorneys', 'Inspectors'];
  const content = ['Posts', 'Videos', 'Flyers', 'Presentations'];
  const cx = 200;
  const cy = 210;
  return (
    <svg className="dg dg--hub" viewBox="0 0 400 420" aria-hidden="true" focusable="false">
      {people.map((p, i) => {
        const a = Math.PI + (i / (people.length - 1)) * Math.PI;
        const x = cx + Math.cos(a) * 150;
        const y = cy + Math.sin(a) * 142;
        return (
          <g key={p} className="dg__node" style={{ ['--i' as string]: i }}>
            <line x1={cx} y1={cy} x2={x} y2={y} className="dg__spoke" />
            {!reduced && <line x1={cx} y1={cy} x2={x} y2={y} className="dg__flow" style={{ animationDelay: `${i * 0.45}s` }} />}
            <rect x={x - 46} y={y - 17} width="92" height="34" rx="17" className="dg__pill" />
            <text x={x} y={y + 5} textAnchor="middle" className="dg__label">
              {p}
            </text>
          </g>
        );
      })}
      {content.map((c, i) => {
        const x = 62 + i * 92;
        const y = 362;
        return (
          <g key={c} className="dg__node" style={{ ['--i' as string]: i + 5 }}>
            <path d={`M${cx},${cy + 48} C${cx},${cy + 90} ${x},${y - 70} ${x},${y - 16}`} className="dg__spoke dg__spoke--gold" />
            <rect x={x - 44} y={y - 16} width="88" height="32" rx="8" className="dg__tile" />
            <text x={x} y={y + 5} textAnchor="middle" className="dg__label dg__label--sm">
              {c}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="60" className="dg__core-halo" />
      <circle cx={cx} cy={cy} r="48" className="dg__core" />
      <text x={cx} y={cy - 2} textAnchor="middle" className="dg__core-label">
        Coordination
      </text>
      <text x={cx} y={cy + 13} textAnchor="middle" className="dg__core-sub">
        + content
      </text>
    </svg>
  );
}
