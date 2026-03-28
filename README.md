<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0050?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-0.183-000?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" />
</p>

<h1 align="center">AuraBitz</h1>

<p align="center">
  Premium motion components, WebGL interfaces, and production landing blocks built with Next.js App Router.
</p>

---

## Overview

AuraBitz is a curated component and block library focused on premium motion, high-contrast visual systems, and interactive product surfaces.

The project currently includes:

- atomic UI component docs under `/docs`
- full landing-page blocks under `/blocks`
- a redesigned homepage with an animated hero headline and rotating curated preview
- copy-pasteable component source backed by live previews and code panes

---

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Three Fiber / Drei / Three.js

---

## Run Locally

```bash
npm install
npm run dev
```

Open these routes in the browser:

- `http://localhost:3000/`
- `http://localhost:3000/docs`
- `http://localhost:3000/blocks`

Verification commands:

```bash
npm run lint
npm run build
```

---

## Project Structure

- `src/app/page.tsx` — homepage route entry
- `src/app/docs/*` — atomic component docs and previews
- `src/app/blocks/*` — full landing-page block previews
- `src/components/ui/*` — copy-pasteable component primitives
- `src/components/blocks/*` — composed landing-page blocks
- `src/components/site/*` — header, nav, search, preview shell, and homepage sections
- `src/components/site/home/*` — homepage layout, hero, proof strip, showcase, workflow, CTA, and footer
- `src/lib/source.ts` — source-code loader used by docs and block preview pages
- `docs/HERO_ARCHITECTURE_CONTEXT.md` — hero engineering and design context

---

## Current Highlights

### Homepage

The homepage now centers on:

- a cleaner premium layout
- a morphing hero headline
- a rotating featured preview carousel with manual controls
- tighter hierarchy and reduced above-the-fold clutter

### Component Docs

Current documented component categories include:

#### Text & Interaction

- `blur-text`
- `circular-text`
- `curved-loop`
- `kinetic-text`
- `scramble-reveal`
- `shuffle`
- `split-text`
- `text-pressure`
- `text-type`

#### Physical & Illumination

- `holographic-card`
- `kinetic-button`
- `spotlight-card`

#### Background Engines

- `grid-system`
- `radial-noise`
- `mesh-distort-bg`
- `webgl-glass-core`
- `webgl-liquid-aurora`
- `webgl-particle-field`
- `webgl-particle-vortex`

### Block Library

Current block categories include:

- hero sections
- bento grids
- feature showcases
- footers
- pricing tables
- testimonials

---

## Design Notes

- styling uses Tailwind CSS v4 with a dark, high-contrast visual language
- motion is Framer Motion first; WebGL layers use React Three Fiber + GLSL
- homepage hero motion is intentionally constrained to stay premium and readable
- for hero architecture decisions, see `docs/HERO_ARCHITECTURE_CONTEXT.md`

---

## License

MIT © [Mohammed Safwan](https://github.com/MohammedSafwan10)
