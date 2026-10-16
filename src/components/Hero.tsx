import { useCallback, useEffect, useRef, useState } from 'react';
import { hero, profile, storyCaptions as C } from '../data/content';
import { useFinePointer, useMagnetic, useReducedMotion } from '../hooks/useMotion';
import { ArrowDown, ArrowRight, Download, MouseIcon, Pause, Play, Replay } from './Icons';
import './Hero.css';

/* ─────────────────────────────────────────────────────────────
   The story: five clips from Olesia's character animation.
   stroll (loop) → trip → kneel (still) → look L/R → spill → glow → final (still)
   Cursor ZONES choose intentional states — the character never
   follows the pointer.
   ───────────────────────────────────────────────────────────── */

const BASE = import.meta.env.BASE_URL;
const media = (f: string) => `${BASE}media/story/${f}`;

type Clip = 'stroll' | 'trip' | 'look' | 'spill' | 'glow';
type Still = 'kneel' | 'final';
type Layer = Clip | Still;
type Phase = 'stroll' | 'trip' | 'kneel' | 'look' | 'spill' | 'glow' | 'final';
type Zone = 'none' | 'left' | 'center' | 'right';

/** H.264 MP4 first (smallest, plays everywhere); VP9 WebM as a fallback. */
const CLIPS: Record<Clip, { name: string; poster: string }> = {
  stroll: { name: 'stroll', poster: media('stroll-poster.webp') },
  trip: { name: 'trip', poster: media('trip-end.webp') },
  look: { name: 'look', poster: media('look-poster.webp') },
  spill: { name: 'spill', poster: media('spill-poster.webp') },
  glow: { name: 'glow', poster: media('glow-poster.webp') },
};
const STILLS: Record<Still, string> = {
  kneel: media('trip-end.webp'),
  final: media('glow-end.webp'),
};

const CHAPTERS: { id: Phase[]; label: string }[] = [
  { id: ['stroll'], label: 'Walk' },
  { id: ['trip', 'kneel'], label: 'Plot twist' },
  { id: ['look'], label: 'Look around' },
  { id: ['spill', 'glow', 'final'], label: 'Spill → skills' },
];

function waitForData(v: HTMLVideoElement, timeout = 6000): Promise<void> {
  if (v.readyState >= 3) return Promise.resolve();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      v.removeEventListener('canplay', finish);
      v.removeEventListener('loadeddata', finish);
      v.removeEventListener('error', finish);
      resolve();
    };
    v.addEventListener('canplay', finish);
    v.addEventListener('loadeddata', finish);
    v.addEventListener('error', finish);
    if (v.preload !== 'auto') v.preload = 'auto';
    if (v.networkState === HTMLMediaElement.NETWORK_EMPTY || v.readyState === 0) v.load();
    window.setTimeout(finish, timeout);
  });
}

export function Hero() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const zonesEnabled = fine && !reduced;

  const [phase, setPhaseState] = useState<Phase>(reduced ? 'final' : 'stroll');
  const [layer, setLayer] = useState<Layer>(reduced ? 'final' : 'stroll');
  const [mirrored, setMirrored] = useState(false);
  const [caption, setCaption] = useState<string>(reduced ? C.final : '');
  const [zone, setZoneState] = useState<Zone>('none');
  const [paused, setPaused] = useState(reduced);
  const [loading, setLoading] = useState(false);
  const [auto, setAuto] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const vids = useRef<Partial<Record<Clip, HTMLVideoElement | null>>>({});
  const phaseRef = useRef<Phase>(phase);
  const zoneRef = useRef<Zone>('none');
  const autoRef = useRef(false);
  const pausedRef = useRef(paused);
  const visibleRef = useRef(true);
  const lookDirRef = useRef<'left' | 'right'>('right');
  const runId = useRef(0);
  const timers = useRef<number[]>([]);
  const primaryRef = useMagnetic<HTMLAnchorElement>(0.22);

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  };
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const pauseAllExcept = (keep?: Clip) => {
    (Object.keys(vids.current) as Clip[]).forEach((k) => {
      const v = vids.current[k];
      if (v && k !== keep && !v.paused) v.pause();
    });
  };

  /** Play a clip from the start once it can play; switch the visible layer only when ready. */
  const playClip = useCallback(async (clip: Clip, id: number, loop = false) => {
    const v = vids.current[clip];
    if (!v) return false;
    v.loop = loop;
    v.muted = true;
    if (v.readyState < 3) setLoading(true);
    await waitForData(v);
    if (id !== runId.current) return false;
    setLoading(false);
    try {
      v.currentTime = 0;
    } catch {
      /* ignore */
    }
    pauseAllExcept(clip);
    setLayer(clip);
    if (!pausedRef.current && visibleRef.current) {
      await v.play().catch(() => undefined);
    }
    return true;
  }, []);

  /* ── The state machine ─────────────────────────────────────── */
  const go = useCallback(
    (next: Phase, opts: { dir?: 'left' | 'right'; quiet?: boolean } = {}) => {
      clearTimers();
      const id = ++runId.current;
      phaseRef.current = next;
      setPhaseState(next);

      switch (next) {
        case 'stroll': {
          setMirrored(false);
          setCaption(zoneCaption(zoneRef.current));
          void playClip('stroll', id, true);
          break;
        }
        case 'trip': {
          setCaption(C.trip);
          void playClip('trip', id).then((ok) => {
            if (ok) later(() => id === runId.current && setCaption(C.tripEnd), 4300);
          });
          break;
        }
        case 'kneel': {
          pauseAllExcept();
          setLayer('kneel');
          setMirrored(false);
          if (!opts.quiet) setCaption(C.tripEnd);
          if (autoRef.current) {
            later(() => go('look', { dir: lookDirRef.current }), 700);
          } else {
            later(() => id === runId.current && setCaption(C.kneelHint), opts.quiet ? 900 : 1500);
            if (zoneRef.current === 'center') later(() => zoneRef.current === 'center' && go('spill'), 1300);
          }
          break;
        }
        case 'look': {
          const dir = opts.dir ?? 'right';
          lookDirRef.current = dir;
          setMirrored(dir === 'left');
          setCaption(dir === 'left' ? C.lookLeft : C.lookRight);
          void playClip('look', id);
          break;
        }
        case 'spill': {
          setMirrored(false);
          setCaption(C.greet[0]);
          later(() => id === runId.current && setCaption(C.greet[1]), 1300);
          void playClip('spill', id);
          break;
        }
        case 'glow': {
          setCaption(C.glow);
          void playClip('glow', id);
          break;
        }
        case 'final': {
          pauseAllExcept();
          setLayer('final');
          setCaption(C.final);
          autoRef.current = false;
          setAuto(false);
          break;
        }
      }
    },
    [playClip],
  );

  /** What happens when a clip ends. */
  const onEnded = useCallback(
    (clip: Clip) => {
      if (clip !== phaseRef.current && !(clip === 'look' && phaseRef.current === 'look')) return;
      const id = runId.current;
      if (clip === 'trip') go('kneel');
      if (clip === 'look') {
        // hold the reaction ~1.2s (≈2.5s total), then return to the resting state
        later(() => {
          if (id !== runId.current) return;
          if (autoRef.current) {
            if (lookDirRef.current === 'right') go('look', { dir: 'left' });
            else go('spill');
          } else go('kneel', { quiet: true });
        }, 1150);
      }
      if (clip === 'spill') go('glow');
      if (clip === 'glow') go('final');
    },
    [go],
  );

  /* ── Zones (desktop) ─────────────────────────────────────── */
  const zoneCaption = (z: Zone) =>
    z === 'left' ? C.idleLeft : z === 'right' ? C.idleRight : z === 'center' ? C.idleCenter : '';

  const onZone = useCallback(
    (z: Zone) => {
      if (z === zoneRef.current) return;
      zoneRef.current = z;
      setZoneState(z);
      if (pausedRef.current || autoRef.current) return;
      const p = phaseRef.current;
      if (p === 'stroll') {
        setCaption(zoneCaption(z));
        if (z === 'center') {
          clearTimers();
          later(() => zoneRef.current === 'center' && phaseRef.current === 'stroll' && go('trip'), 450);
        }
      } else if (p === 'kneel') {
        if (z === 'left' || z === 'right') go('look', { dir: z });
        if (z === 'center') later(() => zoneRef.current === 'center' && phaseRef.current === 'kneel' && go('spill'), 600);
      }
    },
    [go],
  );

  useEffect(() => {
    const el = heroRef.current;
    const stage = stageRef.current;
    if (!el || !stage || !zonesEnabled) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = stage.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const half = r.width * 0.34;
        const z: Zone = e.clientX < cx - half ? 'left' : e.clientX > cx + half ? 'right' : 'center';
        onZone(z);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      onZone('none');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [zonesEnabled, onZone]);

  /* Cursor label follows the zone */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const label =
      zone === 'center'
        ? phase === 'stroll'
          ? 'Say hi'
          : phase === 'kneel'
            ? 'Help her up'
            : phase === 'final'
              ? 'Spills → skills'
              : ''
        : '';
    if (label) el.setAttribute('data-cursor', label);
    else el.removeAttribute('data-cursor');
    window.dispatchEvent(new Event('cursor:refresh'));
  }, [zone, phase]);

  /* ── Start, preload, visibility ─────────────────────────── */
  useEffect(() => {
    if (reduced) return;
    const v = vids.current.stroll;
    if (v) {
      v.muted = true;
      v.loop = true;
      v.play().catch(() => undefined);
    }
    // Warm up the next clips when the browser is idle.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const warm = () => {
      (['trip', 'look'] as Clip[]).forEach((k) => {
        const el = vids.current[k];
        if (el && el.preload !== 'auto') {
          el.preload = 'auto';
          el.load();
        }
      });
      window.setTimeout(() => {
        (['spill', 'glow'] as Clip[]).forEach((k) => {
          const el = vids.current[k];
          if (el && el.preload !== 'auto') {
            el.preload = 'auto';
            el.load();
          }
        });
      }, 2500);
    };
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number })
      .requestIdleCallback;
    let t = 0;
    const kick = () => {
      if (ric) ric(warm, { timeout: 2500 });
      else t = window.setTimeout(warm, 1200);
    };
    if (document.readyState === 'complete') kick();
    else window.addEventListener('load', kick, { once: true });
    return () => {
      window.removeEventListener('load', kick);
      window.clearTimeout(t);
    };
  }, [reduced]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        const p = phaseRef.current;
        const clip = (['stroll', 'trip', 'look', 'spill', 'glow'] as Clip[]).includes(p as Clip) ? (p as Clip) : null;
        const v = clip ? vids.current[clip] : null;
        if (!v) return;
        if (!entry.isIntersecting) v.pause();
        else if (!pausedRef.current) v.play().catch(() => undefined);
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => clearTimers(), []);

  /* ── Controls ─────────────────────────────────────────── */
  const playStory = () => {
    pausedRef.current = false;
    setPaused(false);
    autoRef.current = true;
    setAuto(true);
    lookDirRef.current = 'right';
    const p = phaseRef.current;
    if (p === 'kneel' || p === 'look') go('look', { dir: 'right' });
    else go('trip');
  };
  const replay = () => {
    autoRef.current = false;
    setAuto(false);
    pausedRef.current = false;
    setPaused(false);
    go('stroll');
  };
  const togglePause = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    const p = phaseRef.current;
    const clip = (['stroll', 'trip', 'look', 'spill', 'glow'] as Clip[]).includes(p as Clip) ? (p as Clip) : null;
    const v = clip ? vids.current[clip] : null;
    if (next) {
      clearTimers();
      v?.pause();
    } else {
      if (v) {
        if (v.ended) onEnded(clip as Clip);
        else v.play().catch(() => undefined);
      } else if (p === 'kneel') {
        go('kneel', { quiet: true });
      }
    }
  };

  const chapterIndex = CHAPTERS.findIndex((c) => c.id.includes(phase));
  const showPlay = phase === 'stroll' || phase === 'kneel' || (reduced && phase === 'final');
  const canPause = !reduced && ['stroll', 'trip', 'look', 'spill', 'glow'].includes(phase);

  return (
    <section id="home" className="hero" ref={heroRef} aria-labelledby="hero-title" data-zone={zone}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow" />
        <div className="hero__words">
          {hero.backdropWords.map((w, i) => (
            <span key={w} style={{ ['--i' as string]: i }}>
              {w}
            </span>
          ))}
        </div>
        <div className="grain" />
      </div>

      <div className="hero__inner container">
        {/* LEFT — intro */}
        <div className="hero__top">
          <p className="hero__note">
            <span className="hero__note-name">{hero.greeting}</span>
            <span className="hero__roles">
              {profile.roles.map((r, i) => (
                <span key={r}>
                  {r}
                  {i < profile.roles.length - 1 && <i aria-hidden="true">·</i>}
                </span>
              ))}
            </span>
          </p>
          <h1 id="hero-title" className="hero__title display">
            <span className="sr-only">{profile.name} — </span>
            <span className="hero__line">{hero.headline[0]}</span>
            <span className="hero__line">{hero.headline[1]}</span>
            <span className="hero__line">
              <em>{hero.headline[2]}</em>
            </span>
          </h1>
        </div>

        <div className="hero__bottom">
          <p className="hero__lede">{hero.lede}</p>
          <div className="hero__ctas">
            <a ref={primaryRef} href="#projects" className="btn btn--primary">
              View my work <ArrowRight />
            </a>
            <a href="#about" className="btn btn--ghost">
              About me
            </a>
          </div>
          <div className="hero__links">
            <a className="text-link" href={`${BASE}${profile.resume.href}`} download={profile.resume.fileName}>
              <Download /> Download résumé
            </a>
            <a className="text-link" href="#contact">
              Get in touch <ArrowRight />
            </a>
          </div>
        </div>

        {/* CENTER — the character */}
        <div className="hero__stage-wrap">
          <div
            ref={stageRef}
            className={`stage is-${phase}${loading ? ' is-loading' : ''}`}
            data-cursor-zone="story"
          >
            <figure className="stage__frame">
              {(Object.keys(CLIPS) as Clip[]).map((k) => (
                <video
                  key={k}
                  ref={(el) => {
                    vids.current[k] = el;
                  }}
                  className={`stage__layer${layer === k ? ' is-active' : ''}${k === 'look' && mirrored ? ' is-mirrored' : ''}`}
                  poster={CLIPS[k].poster}
                  muted
                  playsInline
                  preload={k === 'stroll' && !reduced ? 'auto' : 'none'}
                  loop={k === 'stroll'}
                  disablePictureInPicture
                  aria-hidden="true"
                  tabIndex={-1}
                  onEnded={() => onEnded(k)}
                >
                  <source src={media(`${CLIPS[k].name}.mp4`)} type="video/mp4" />
                  <source src={media(`${CLIPS[k].name}.webm`)} type="video/webm" />
                </video>
              ))}
              {(Object.keys(STILLS) as Still[]).map((k) => (
                <img
                  key={k}
                  className={`stage__layer${layer === k ? ' is-active' : ''}`}
                  src={STILLS[k]}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  loading={k === 'final' && reduced ? 'eager' : 'lazy'}
                  width={540}
                  height={960}
                />
              ))}
              <figcaption className="sr-only">
                Animated short: Olesia’s character walks down a sunny street with a coffee cup labeled “CREATE.”,
                trips and spills it, looks around — and the spill turns into five glowing strengths: leadership,
                problem-solving, connection, creativity and resilience.
              </figcaption>
              <span className="stage__spinner" aria-hidden="true" />
              <span className="stage__shade" aria-hidden="true" />
            </figure>

            <div className="stage__controls">
              <ol className="stage__chapters" aria-label="Story chapters">
                {CHAPTERS.map((c, i) => (
                  <li
                    key={c.label}
                    className={i === chapterIndex ? 'is-current' : i < chapterIndex ? 'is-done' : ''}
                    aria-current={i === chapterIndex ? 'step' : undefined}
                  >
                    <span className="sr-only">{c.label}</span>
                  </li>
                ))}
              </ol>
              <div className="stage__buttons">
                {canPause && (
                  <button
                    type="button"
                    className="stage__btn stage__btn--icon"
                    onClick={togglePause}
                    aria-pressed={paused}
                    aria-label={paused ? 'Resume animation' : 'Pause animation'}
                  >
                    {paused ? <Play /> : <Pause />}
                  </button>
                )}
                {showPlay && !auto && (
                  <button type="button" className="stage__btn" onClick={playStory}>
                    <Play /> {phase === 'kneel' ? 'Continue story' : 'Play the story'}
                  </button>
                )}
                {phase === 'final' && !reduced && (
                  <button type="button" className="stage__btn" onClick={replay}>
                    <Replay /> Replay
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — contextual message */}
        <aside className="hero__aside" aria-hidden="true">
          <div className={`bubble${caption ? ' has-text' : ''}`}>
            <span className="bubble__label mono">
              <i /> {phase === 'final' ? 'outcome' : 'status'}
            </span>
            <p key={caption} className="bubble__text">
              {caption || (zonesEnabled ? 'Move your cursor into the scene.' : 'Press play to watch her story.')}
            </p>
            {phase === 'final' && (
              <a className="bubble__cta" href="#about" tabIndex={-1}>
                {C.cta} <ArrowDown />
              </a>
            )}
          </div>
          {zonesEnabled && (
            <div className="zones">
              <div className="zones__hint">
                <MouseIcon className="zones__mouse" />
                <span>Left, center, right — she reacts.</span>
              </div>
              <ol className="zones__track">
                {(['left', 'center', 'right'] as Zone[]).map((z) => (
                  <li key={z} className={zone === z ? 'is-on' : ''}>
                    {z}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>
      </div>

      <a className="hero__scroll" href="#about">
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
