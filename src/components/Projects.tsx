import { useId, useState } from 'react';
import { projects, type Project } from '../data/content';
import { ControlsDiagram, HubDiagram, PipelineDiagram } from './Diagrams';
import { SectionHead } from './SectionHead';
import './Projects.css';

const VISUALS: Record<Project['visual'], { el: JSX.Element; caption: string }> = {
  pipeline: { el: <PipelineDiagram />, caption: 'How the project flows — from discovery meetings to the client presentation.' },
  controls: { el: <ControlsDiagram />, caption: 'The control-testing loop behind IT audit & assurance work.' },
  hub: { el: <HubDiagram />, caption: 'Everyone a transaction touches — plus the content that keeps listings visible.' },
};

function Case({ p, flip }: { p: Project; flip: boolean }) {
  const [open, setOpen] = useState(false);
  const regionId = useId();
  const v = VISUALS[p.visual];

  return (
    <article className={`case case--${p.id}${flip ? ' case--flip' : ''}`} aria-labelledby={`case-${p.id}`}>
      <figure className={`case__visual case__visual--${p.visual} reveal`}>
        <div className="case__diagram">{v.el}</div>
        <figcaption className="case__caption mono">{v.caption}</figcaption>
      </figure>

      <div className="case__body">
        <p className="case__kicker mono reveal">
          <span className="case__num">{p.index}</span>
          {p.kicker}
        </p>
        <h3 id={`case-${p.id}`} className="case__title display reveal">
          {p.title}
        </h3>

        <dl className="case__meta reveal">
          <div>
            <dt>Role</dt>
            <dd>{p.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{p.period}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className={`status status--${p.status.toLowerCase().replace(/\s+/g, '-')}`}>{p.status}</span>
            </dd>
          </div>
        </dl>

        <div className="case__pg reveal">
          <div>
            <h4 className="case__h mono">The problem</h4>
            <p>{p.challenge}</p>
          </div>
          <div>
            <h4 className="case__h mono">The goal</h4>
            <p>{p.goal}</p>
          </div>
        </div>

        <div className="case__more" data-open={open}>
          <div id={regionId} className="case__more-inner" role="region" aria-label={`${p.title} — full case study`}>
            <div className="case__more-content">
              <h4 className="case__h mono">What I did</h4>
              <ul className="case__list">
                {p.did.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <h4 className="case__h mono">Deliverables</h4>
              <ul className="chip-list" role="list">
                {p.deliverables.map((d) => (
                  <li key={d} className="chip">
                    {d}
                  </li>
                ))}
              </ul>

              <h4 className="case__h mono">Result</h4>
              <p>{p.outcome}</p>

              <blockquote className="case__why">
                <span className="mono">Why it matters</span>
                <p>{p.whyItMatters}</p>
              </blockquote>

              {p.confidential && <p className="case__note">{p.confidential}</p>}
            </div>
          </div>
        </div>

        <div className="case__foot reveal">
          <button
            type="button"
            className="case__toggle"
            aria-expanded={open}
            aria-controls={regionId}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="case__toggle-icon" aria-hidden="true" />
            {open ? 'Close case study' : 'Read the full case study'}
          </button>
          <ul className="chip-list case__tags" role="list" aria-label="Skills">
            {p.tags.slice(0, 4).map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          index="04"
          label="Projects"
          id="projects-title"
          title={
            <>
              Case studies from <em>real work.</em>
            </>
          }
          lede="What the problem was, what I did, what came out of it — and why each one makes me a better tester, analyst and risk thinker."
        />
        <div className="projects__list">
          {projects.map((p, i) => (
            <Case key={p.id} p={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
