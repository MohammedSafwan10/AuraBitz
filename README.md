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
  Premium motion + WebGL components and production landing blocks built with Next.js App Router.
</p>

---

## Current Status (Updated: February 21, 2026)

- Atomic component docs live under `/docs`
- Full landing blocks live under `/blocks`
- Hero section archive now includes `Hero 01` through `Hero 06`
- `webgl-raymarch-silk` has been removed from workspace
- `Hero 06` now uses layered motion-driven DOM visuals (no silk engine dependency)

---

## Run Locally

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000/docs`
- `http://localhost:3000/blocks`

Build and lint:

```bash
npm run build
npm run lint
```

---

## Architecture

- `src/app/docs/*`: Atomic component documentation and previews
- `src/app/blocks/*`: Full landing-page blocks (hero, pricing, testimonials, etc.)
- `src/components/ui/*`: Raw source for copy-pasteable components
- `src/components/blocks/*`: Composed block implementations
- `src/components/site/*`: Site shell (header, sidebars, search modal, mobile nav, preview UI)
- `src/lib/source.ts`: Block source-code loader used by the preview/code tabs

---

## Component Inventory

### Text & Interaction

- `blur-text`
- `circular-text`
- `curved-loop`
- `kinetic-text`
- `scramble-reveal`
- `shuffle`
- `split-text`
- `text-pressure`
- `text-type`

### Physical & Illumination

- `holographic-card`
- `kinetic-button`
- `spotlight-card`

### Background Engines

- `grid-system`
- `radial-noise`
- `mesh-distort-bg`
- `webgl-glass-core`
- `webgl-liquid-aurora`
- `webgl-particle-field`
- `webgl-particle-vortex`

---

## Block Inventory

### Hero Sections

- `Hero 01`
- `Hero 02`
- `Hero 03`
- `Hero 04`
- `Hero 05`
- `Hero 06`

### Additional Block Categories (Scaffolded)

- `bento-grids`
- `feature-showcases`
- `footers`
- `pricing-tables`
- `testimonials`

---

## Notes

- Styling uses Tailwind CSS v4 with strict black-stage visual language.
- Motion is Framer Motion first; WebGL layers use React Three Fiber + GLSL.
- For hero architecture decisions, see `docs/HERO_ARCHITECTURE_CONTEXT.md`.

---

## License

MIT © [Mohammed Safwan](https://github.com/MohammedSafwan10)
