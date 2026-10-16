import { useState, type FormEvent } from 'react';
import { profile } from '../data/content';
import { useMagnetic } from '../hooks/useMotion';
import { ArrowRight, ArrowUp, Briefcase, Check, Copy, Download, GitHub, LinkedIn, Pin } from './Icons';
import { SectionHead } from './SectionHead';
import './Contact.css';

const BASE = import.meta.env.BASE_URL;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const sendRef = useMagnetic<HTMLButtonElement>(0.18);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = profile.email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) {
      setError('Please write a short message first.');
      return;
    }
    setError('');
    const who = [name.trim(), org.trim()].filter(Boolean).join(', ');
    const subject = who ? `Hello from ${who}` : 'Hello from your portfolio';
    const body = `${msg.trim()}\n\n${name.trim() ? `— ${name.trim()}` : ''}${org.trim() ? `\n${org.trim()}` : ''}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__bg" aria-hidden="true">
        <div className="grain" />
      </div>
      <div className="container contact__grid">
        <div className="contact__copy">
          <SectionHead
            index="06"
            label="Contact"
            id="contact-title"
            title={
              <>
                Let’s build something <em>that holds up.</em>
              </>
            }
            lede="I’m looking for QA, IT risk / GRC and business-analyst roles — remote or hybrid. If your team cares about getting things right, I’d love to talk."
          />

          <div className="email reveal">
            <span className="email__label mono">Email</span>
            <div className="email__row">
              <a className="email__addr" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <button type="button" className="email__copy" onClick={copy} aria-label="Copy email address">
                {copied ? <Check /> : <Copy />}
              </button>
              <span className={`email__toast${copied ? ' is-on' : ''}`} role="status" aria-live="polite">
                {copied ? 'Copied to clipboard' : ''}
              </span>
            </div>
          </div>

          <ul className="contact__facts reveal" role="list">
            <li>
              <Pin /> {profile.location}
            </li>
            <li>
              <Briefcase /> Prefers {profile.workStyle.toLowerCase()} roles
            </li>
          </ul>

          <div className="contact__open reveal">
            <span className="mono">Open to</span>
            <ul className="chip-list" role="list">
              {profile.openTo.map((r) => (
                <li key={r} className="chip">
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="contact__actions reveal">
            <a className="btn btn--primary" href={`${BASE}${profile.resume.href}`} download={profile.resume.fileName}>
              <Download /> Download résumé
            </a>
            {profile.links.linkedin && (
              <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedIn /> LinkedIn
              </a>
            )}
            {profile.links.github && (
              <a className="btn btn--ghost" href={profile.links.github} target="_blank" rel="noopener noreferrer">
                <GitHub /> GitHub
              </a>
            )}
          </div>
        </div>

        <div className="composer reveal" style={{ ['--i' as string]: 1 }}>
          <div className="composer__head">
            <img
              className="composer__avatar"
              src={`${BASE}media/story/stroll-poster.webp`}
              alt=""
              width={540}
              height={960}
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="composer__title">Coffee refilled. Ready when you are.</p>
              <p className="composer__sub">Write a quick note — it opens in your email app.</p>
            </div>
          </div>
          <form className="composer__form" onSubmit={onSubmit} noValidate>
            <div className="field-row">
              <label className="field">
                <span>Your name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="field">
                <span>Company</span>
                <input value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" />
              </label>
            </div>
            <label className="field">
              <span>Message</span>
              <textarea
                rows={5}
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                  if (error) setError('');
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'composer-error' : 'composer-hint'}
                placeholder="Hi Olesia — we’re hiring a QA analyst and…"
              />
            </label>
            {error ? (
              <p id="composer-error" className="composer__error" role="alert">
                {error}
              </p>
            ) : (
              <p id="composer-hint" className="composer__hint">
                Nothing is stored on this site.
              </p>
            )}
            <button ref={sendRef} type="submit" className="btn btn--primary composer__send">
              Open in email <ArrowRight />
            </button>
          </form>
        </div>
      </div>

      <footer className="footer container">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.locationShort}
        </p>
        <p className="footer__made">Character story: “Spills become skills.” Built with React + Vite.</p>
        <a className="footer__top" href="#home">
          Back to top <ArrowUp />
        </a>
      </footer>
    </section>
  );
}
