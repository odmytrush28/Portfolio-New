import { about, approach, strengths } from '../data/content';
import { LensPortrait } from './LensPortrait';
import { SectionHead } from './SectionHead';
import { StrengthIcon } from './StrengthIcon';
import './About.css';

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__grid">
          <div className="about__media reveal">
            <LensPortrait />
            <p className="about__figcap mono">
              <span>Fig. 01</span> Hover the photo — an auditor always looks closer.
            </p>
          </div>

          <div className="about__copy">
            <SectionHead
              index="01"
              label="About"
              id="about-title"
              title={
                <>
                  Auditor’s eye, <em>creator’s hands.</em>
                </>
              }
            />
            <p className="about__intro reveal">{about.intro}</p>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="about__p reveal" style={{ ['--i' as string]: i + 1 }}>
                {p}
              </p>
            ))}

            <dl className="about__facts reveal">
              {about.facts.map((f) => (
                <div key={f.label}>
                  <dt className="mono">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="about__off reveal">{about.offClock}</p>
          </div>
        </div>

        {/* How I work */}
        <div className="approach" aria-labelledby="approach-title">
          <div className="approach__head reveal">
            <p className="eyebrow">How I work</p>
            <h3 id="approach-title" className="display">
              An audit-trained way of <em>solving problems.</em>
            </h3>
          </div>
          <ol className="approach__steps" role="list">
            {approach.map((s, i) => (
              <li key={s.step} className="approach__step reveal" style={{ ['--i' as string]: i }}>
                <span className="approach__num mono">{s.step}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
                <span className="approach__src mono">{s.source}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Strengths from the story */}
        <div className="strengths reveal" aria-labelledby="strengths-title">
          <div className="strengths__head">
            <p className="eyebrow">Spills become skills</p>
            <h3 id="strengths-title" className="display">
              The five strengths from the story — <em>and where they came from.</em>
            </h3>
          </div>
          <ul className="strengths__list" role="list">
            {strengths.map((s, i) => (
              <li key={s.name} className="strength" style={{ ['--i' as string]: i }}>
                <span className="strength__icon">
                  <StrengthIcon name={s.name} />
                </span>
                <span className="strength__name">{s.name}</span>
                <span className="strength__evidence">{s.evidence}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
