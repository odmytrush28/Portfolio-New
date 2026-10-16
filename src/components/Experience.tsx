import { useEffect, useRef } from 'react';
import { experience } from '../data/content';
import { SectionHead } from './SectionHead';
import './Experience.css';

export function Experience() {
  const listRef = useRef<HTMLOListElement | null>(null);

  // Draw the timeline as the visitor scrolls through it.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      list.style.setProperty('--progress', '1');
      return;
    }
    let raf = 0;
    const update = () => {
      const r = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.6 - r.top) / r.height;
      list.style.setProperty('--progress', String(Math.max(0, Math.min(1, p))));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Experience"
          id="experience-title"
          title={
            <>
              Where the evidence <em>comes from.</em>
            </>
          }
          lede="Consulting, financial services, real estate and technology — across two countries, in four languages."
        />

        <ol className="timeline" ref={listRef} role="list">
          {experience.map((r, i) => (
            <li key={r.title + r.period} className="timeline__item reveal" style={{ ['--i' as string]: 0 }}>
              <div className="timeline__meta">
                <span className="timeline__period mono">{r.period}</span>
                <span className="timeline__place">{r.place}</span>
                {r.current && <span className="timeline__now mono">Current</span>}
              </div>
              <span className="timeline__dot" aria-hidden="true" data-n={String(experience.length - i).padStart(2, '0')} />
              <article className="timeline__card">
                <p className="timeline__org mono">{r.org}</p>
                <h3>{r.title}</h3>
                <p className="timeline__summary">{r.summary}</p>
                <ul className="timeline__bullets">
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <ul className="chip-list" role="list" aria-label="Skills used">
                  {r.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
