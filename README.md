# Olesia Dmytrush — Portfolio

Personal portfolio of **Olesia Dmytrush** — IT Audit & Assurance · QA · Business Analysis.

The site opens with an interactive character story: Olesia's animated character walks down the street with a **“CREATE.”** coffee, trips, looks around toward the visitor's cursor — and the spilled coffee turns into her five strengths. *Spills become skills.* From there the page tells a recruiter-friendly story: who she is, a skills **traceability matrix** (every skill linked to where it was used), experience, three case studies, her journey from Poland to Chicago, and contact.

---

## What's inside

| Section | What it does |
| --- | --- |
| **Hero** | Five video clips driven by a small state machine. On desktop the hero is split into **left / center / right** zones — the cursor *selects* an intentional reaction (it never “follows” the pointer). Touch devices get a **Play the story** button instead. Pause/replay controls, reduced-motion fallback. |
| **About** | Portrait with an organic, morphing **“look closer” reveal** (cursor or finger) that uncovers a pixel-aligned halftone version of the same photo. “How I work” steps and the five strengths from the story, each tied to evidence. |
| **Skills** | Traceability matrix (desktop) / evidence cards (mobile). Filter by area. No percentage bars. |
| **Experience** | Timeline that draws itself as you scroll. |
| **Projects** | Three mini case studies (problem → goal → what I did → deliverables → result → why it matters) with hand-built SVG diagrams. |
| **Journey** | Route from Lublin to Chicago, education, learning log (with the QC/QA diploma in a lightbox), languages. |
| **Contact** | Copy-to-clipboard email, résumé download, and a note composer that opens the visitor's email app (nothing is stored). |

Design ideas were combined from two guides: the **character hero with cursor zones** (laptop/zone interaction, white glow with dusty-rose → maroon edges, contextual messages, mobile-first center experience) and the **interactive hero reveal** (organic blob mask, oversized low-contrast background type, magnetic CTA with a tiny crop of the “second identity” image, small refined cursor indicator).

## Tech

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- Plain CSS with design tokens (`src/styles/tokens.css`) — no UI framework
- Self-hosted fonts via Fontsource: **Fraunces** (display), **Manrope** (text), **JetBrains Mono** (labels)
- No animation library — CSS transitions, `requestAnimationFrame`, `IntersectionObserver`
- Deployed with **GitHub Actions → GitHub Pages**

## Run it locally

You need **Node.js 20 or newer** ([download the LTS version](https://nodejs.org/)).

```bash
# 1. install dependencies (first time only)
npm install

# 2. start the dev server
npm run dev
```

Open the address it prints (usually <http://localhost:5173>). Edits reload instantly.

```bash
# production build → dist/
npm run build

# preview the production build locally
npm run preview
```

> Opening `index.html` directly from the file system will not work — the site must be served (that's what `npm run dev` / `npm run preview` do).

## Deploy to GitHub Pages

1. Create a new repository on GitHub (for example `portfolio`, or `<your-username>.github.io` for a root URL).
2. Push this folder to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Portfolio: first version"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: “GitHub Actions”.**
4. The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. Watch it under the **Actions** tab; the live URL appears there when it finishes (e.g. `https://<your-username>.github.io/<repo>/`).

All asset paths are relative (`base: './'`), so the site works both at `username.github.io/repo/` and on a custom domain. The workflow also passes the final URL to the build so the social-sharing (Open Graph) tags use absolute links.

## Editing content

Everything you read on the site lives in **`src/data/content.ts`** — no component code needs to change.

- **LinkedIn / GitHub:** fill in `profile.links.linkedin` and `profile.links.github`. The buttons appear automatically when a link is present.
- **Phone:** `profile.phone` is intentionally empty to keep it off a public site.
- **Résumé:** replace `public/resume/Olesia-Dmytrush-Resume.pdf` (keep the file name, or update `profile.resume`).
- **Skills matrix:** each skill lists the sources where it is evidenced and at what depth (`professional`, `applied`, `foundational`).
- **Story captions:** `storyCaptions` controls the messages next to the character.

## Project structure

```
├── .github/workflows/deploy.yml   # build + deploy to GitHub Pages
├── index.html                     # meta, Open Graph, JSON-LD, icons
├── public/
│   ├── media/story/               # hero clips (.mp4 + .webm fallback) and posters (.webp)
│   ├── resume/                    # downloadable résumé
│   ├── og-image.jpg               # social sharing image (1200×630)
│   └── favicon.svg, favicon-*.png, apple-touch-icon.png, site.webmanifest
├── src/
│   ├── main.tsx                   # entry: fonts, global styles
│   ├── App.tsx                    # page composition
│   ├── data/content.ts            # ← all text and facts
│   ├── hooks/useMotion.ts         # reduced motion, reveal-on-scroll, active section, magnetic
│   ├── styles/                    # tokens.css (design system), base.css
│   ├── assets/img/                # portrait, halftone lens image, diploma
│   └── components/                # one .tsx + .css per section
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Media notes

The hero clips were cut from the five original character videos (`IMG_9709–9713.MP4`) and re-encoded for the web (540×960, no audio): **MP4/H.264** (≈3.6 MB total) with **WebM/VP9** as a fallback. Only the first clip loads with the page; the rest warm up in the background when the browser is idle (and not at all when the visitor has Data Saver on).

To re-cut a clip with [ffmpeg](https://ffmpeg.org/):

```bash
ffmpeg -ss 0 -i IMG_9709.MP4 -t 7.9 -an -vf "scale=540:960" -c:v libx264 -crf 28 -preset veryslow -movflags +faststart public/media/story/stroll.mp4
```

## Accessibility & performance

- Semantic landmarks, one `h1`, ordered headings, skip link, visible focus states, keyboard-operable story controls, accessible dialog for the diploma.
- `prefers-reduced-motion`: no autoplay or scroll animation; the hero shows the final frame with a **Play the story** button.
- Moving content can be paused (WCAG 2.2.2).
- No horizontal scrolling at any width; the cursor-only interactions have touch alternatives.
- ~67 KB of JavaScript (gzipped), images in WebP, lazy-loaded media.
