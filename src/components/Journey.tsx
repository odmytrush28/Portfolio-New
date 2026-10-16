import { useRef } from 'react';
import diplomaThumb from '../assets/img/qa-diploma-thumb.webp';
import diploma from '../assets/img/qa-diploma.webp';
import { credentials, education, journey, languages } from '../data/content';
import { Close } from './Icons';
import { SectionHead } from './SectionHead';
import './Journey.css';

export function Journey() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const openDiploma = () => {
    const d = dialogRef.current;
    if (!d) return;
    if (typeof d.showModal === 'function') d.showModal();
    else d.setAttribute('open', '');
  };
  const closeDiploma = () => {
    const d = dialogRef.current;
    if (!d) return;
    if (typeof d.close === 'function') d.close();
    else d.removeAttribute('open');
    openerRef.current?.focus();
  };

  return (
    <section id="journey" className="section journey on-night" aria-labelledby="journey-title">
      <div className="journey__aura" aria-hidden="true" />
      <div className="container">
        <SectionHead
          index="05"
          label="My journey"
          id="journey-title"
          title={
            <>
              Lublin → Warsaw → <em>Illinois → Chicago.</em>
            </>
          }
          lede="Two countries, four languages, one through-line: understand how things work — then help them work better."
        />

        <ol className="route reveal" role="list">
          {journey.map((j, i) => (
            <li key={j.year + j.title} className={`route__stop route__stop--${j.kind}`} style={{ ['--i' as string]: i }}>
              <span className="route__dot" aria-hidden="true" />
              {j.kind === 'move' && (
                <span className="route__flight mono" aria-hidden="true">
                  Poland → USA
                </span>
              )}
              <span className="route__year">{j.year}</span>
              <span className="route__place mono">{j.place}</span>
              <h3 className="route__title">{j.title}</h3>
              <p className="route__text">{j.text}</p>
            </li>
          ))}
        </ol>

        <div className="journey__panels">
          <div className="panel reveal">
            <h3 className="panel__title mono">Education</h3>
            <ul className="edu" role="list">
              {education.map((e) => (
                <li key={e.degree + e.years}>
                  <span className="edu__years mono">{e.years}</span>
                  <span className="edu__degree">{e.degree}</span>
                  <span className="edu__school">{e.school}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel reveal" style={{ ['--i' as string]: 1 }}>
            <h3 className="panel__title mono">Learning log</h3>
            <ul className="creds" role="list">
              {credentials.map((c) => (
                <li key={c.title} className={c.hasDiploma ? 'creds__item creds__item--feature' : 'creds__item'}>
                  {c.hasDiploma && (
                    <button
                      ref={openerRef}
                      type="button"
                      className="creds__thumb"
                      onClick={openDiploma}
                      aria-label="View the QC/QA Engineer diploma"
                    >
                      <img src={diplomaThumb} alt="" width={640} height={452} loading="lazy" decoding="async" />
                      <span className="mono">View diploma</span>
                    </button>
                  )}
                  <div>
                    <span className="creds__title">{c.title}</span>
                    {c.issuer && <span className="creds__issuer mono">{c.issuer}</span>}
                    <p className="creds__detail">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="langs reveal" aria-labelledby="langs-title">
          <h3 id="langs-title" className="panel__title mono">
            Languages I work in
          </h3>
          <ul role="list">
            {languages.map((l, i) => (
              <li key={l.name} style={{ ['--i' as string]: i }}>
                <span className="langs__hello" lang={l.name === 'Ukrainian' ? 'uk' : l.name === 'Polish' ? 'pl' : l.name === 'Russian' ? 'ru' : 'en'}>
                  {l.hello}
                </span>
                <span className="langs__name">{l.name}</span>
                <span className="langs__level mono">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-labelledby="diploma-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDiploma();
        }}
        onClose={() => openerRef.current?.focus()}
      >
        <div className="lightbox__inner">
          <div className="lightbox__bar">
            <h3 id="diploma-title">QC/QA Engineer — TOMMY Online University</h3>
            <button type="button" className="lightbox__close" onClick={closeDiploma} aria-label="Close diploma">
              <Close />
            </button>
          </div>
          <img
            src={diploma}
            width={1230}
            height={868}
            loading="lazy"
            decoding="async"
            alt="Diploma: Olesya Dmytrush has successfully completed “QC/QA Engineer” at TOMMY Online University. Modules: IT methodologies, test cases, checklists, defects, types, approaches, levels of testing, test-design techniques, requirements, metrics, program versions, performance evaluation, databases, API."
          />
        </div>
      </dialog>
    </section>
  );
}
