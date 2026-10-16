import { useMemo, useState } from 'react';
import { levelLabels, skillGroups, sources, toolbelt, type Level, type SourceId } from '../data/content';
import { SectionHead } from './SectionHead';
import './Skills.css';

function Marker({ level }: { level: Level }) {
  return <span className={`mark mark--${level}`} aria-hidden="true" />;
}

export function Skills() {
  const [group, setGroup] = useState<string>('all');
  const [col, setCol] = useState<SourceId | null>(null);

  const visible = useMemo(() => (group === 'all' ? skillGroups : skillGroups.filter((g) => g.id === group)), [group]);
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section id="skills" className="section skills on-night" aria-labelledby="skills-title">
      <div className="skills__aura" aria-hidden="true" />
      <div className="container">
        <SectionHead
          index="02"
          label="Skills"
          id="skills-title"
          title={
            <>
              Every skill, <em>traced to evidence.</em>
            </>
          }
          lede="No percentage bars. This is a traceability matrix — the way an auditor or a QA tester checks a claim. Each skill points to where I actually used or learned it."
        />

        <div className="skills__stats reveal" aria-hidden="true">
          <span>
            <b>{total}</b> skills
          </span>
          <span>
            <b>{sources.length}</b> evidence sources
          </span>
          <span>
            <b>0</b> percentage bars
          </span>
        </div>

        <div className="skills__toolbar reveal">
          <div className="skills__filters" role="group" aria-label="Filter skills by area">
            <button type="button" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>
              All areas
            </button>
            {skillGroups.map((g) => (
              <button key={g.id} type="button" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
                {g.name}
              </button>
            ))}
          </div>
          <ul className="skills__legend" role="list" aria-label="Legend">
            {(Object.keys(levelLabels) as Level[]).map((l) => (
              <li key={l} title={levelLabels[l].hint}>
                <Marker level={l} /> {levelLabels[l].label}
                <span className="sr-only"> — {levelLabels[l].hint}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop / tablet: the matrix */}
        <div className="matrix reveal" data-col={col ?? undefined}>
          <table>
            <caption className="sr-only">
              Skills traceability matrix: rows are skills, columns are the roles, projects and training where each skill was
              used.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="matrix__skillcol">
                  Skill
                </th>
                {sources.map((s) => (
                  <th
                    key={s.id}
                    scope="col"
                    className={col === s.id ? 'is-col' : ''}
                    onMouseEnter={() => setCol(s.id)}
                    onMouseLeave={() => setCol(null)}
                  >
                    <span className="matrix__src">{s.short}</span>
                    <span className="matrix__srcdetail">{s.detail}</span>
                  </th>
                ))}
              </tr>
            </thead>
            {visible.map((g) => (
              <tbody key={g.id}>
                <tr className="matrix__group">
                  <th scope="rowgroup" colSpan={sources.length + 1}>
                    {g.name}
                  </th>
                </tr>
                {g.skills.map((sk) => (
                  <tr key={sk.name}>
                    <th scope="row">
                      <span className="matrix__name">{sk.name}</span>
                      <span className="matrix__note">{sk.note}</span>
                    </th>
                    {sources.map((s) => {
                      const lvl = sk.sources[s.id];
                      return (
                        <td
                          key={s.id}
                          className={`${lvl ? 'has' : ''}${col === s.id ? ' is-col' : ''}`}
                          onMouseEnter={() => setCol(s.id)}
                          onMouseLeave={() => setCol(null)}
                        >
                          {lvl ? (
                            <>
                              <Marker level={lvl} />
                              <span className="sr-only">
                                {levelLabels[lvl].label} — {s.label}
                              </span>
                            </>
                          ) : (
                            <span className="sr-only">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

        {/* Mobile: cards */}
        <div className="skill-cards">
          {visible.map((g) => (
            <div key={g.id} className="skill-cards__group">
              <h3 className="skill-cards__title mono">{g.name}</h3>
              <ul role="list">
                {g.skills.map((sk) => (
                  <li key={sk.name} className="skill-card">
                    <span className="skill-card__name">{sk.name}</span>
                    <p className="skill-card__note">{sk.note}</p>
                    <ul className="chip-list" role="list" aria-label="Evidence">
                      {(Object.entries(sk.sources) as [SourceId, Level][]).map(([id, lvl]) => (
                        <li key={id} className="chip">
                          <Marker level={lvl} />
                          {sources.find((s) => s.id === id)?.short}
                          <span className="sr-only"> — {levelLabels[lvl].label}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="toolbelt reveal">
          <h3 className="mono">Tools I’ve worked with</h3>
          <ul className="chip-list" role="list">
            {toolbelt.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
