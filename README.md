<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0050?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-0.183-000?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" />
</p>

<h1 align="center">⚡ AuraBitz</h1>

<p align="center">
  <strong>A next-generation, experimental UI component library for motion-driven interfaces.</strong>
  <br />
  Copy. Paste. Ship something that feels alive.
</p>

<p align="center">
  <a href="#components">Components</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#philosophy">Philosophy</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## What is AuraBitz?

AuraBitz is a curated collection of **animated, interactive React components** designed for developers who want their interfaces to feel premium, alive, and cinematic — not generic.

Every component is:
- 🎯 **Copy-pasteable** — No complex installation. Grab the source, drop it in.
- ⚡ **Motion-native** — Built on Framer Motion's physics engine, not hacky `setTimeout` loops.
- 🎨 **Opinionated by design** — These aren't utility primitives. They're statement pieces.
- 📐 **Production-ready** — TypeScript, proper prop interfaces, SSR-safe.

> Think of it as the intersection of **Shadcn's copy-paste philosophy** and **Awwwards-level motion design**.

---

## Components

### 3D & Physical
| Component | Description |
|---|---|
| **Holographic Card** | Gyroscope-reactive 3D card with prismatic light refraction and depth layers |
| **Kinetic Button** | Physics-driven button with spring dynamics and magnetic cursor interactions |

### Illumination
| Component | Description |
|---|---|
| **Spotlight Card** | Cursor-tracking radial spotlight that follows mouse position in real-time |

### Backgrounds
| Component | Description |
|---|---|
| **Grid System** | Animated dot/line grid backgrounds with configurable density and glow |
| **Radial Noise** | Generative noise-based gradient backgrounds with organic movement |

### Text Animations
| Component | Description |
|---|---|
| **Kinetic Text** | Spring-physics text with per-character velocity and damping |
| **Split Text** | Word/character splitting with staggered entrance animations |
| **Blur Text** | Viewport-triggered blur-to-clear reveal with configurable stagger |
| **Scramble Reveal** | Matrix-style character scramble that reveals text progressively |
| **Circular Text** | Spinning circular badge with hover interaction modes (slowDown, speedUp, pause, goBonkers) |
| **Text Type** | Typewriter effect using native Framer Motion stagger — no setTimeout hacks |
| **Shuffle** | Infinite phrase cycling with random character scramble transitions |
| **Shiny Text** | Animated gradient shimmer sweep across text — pure CSS + motion |
| **Text Pressure** | Mouse-proximity variable font weight/stretch distortion |
| **Curved Loop** | SVG textPath marquee flowing along a sinusoidal wave curve |

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/MohammedSafwan10/AuraBitz.git
cd AuraBitz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the docs site launches with interactive previews for every component.

### 4. Use a component

Every component lives in `src/components/ui/`. Just copy the folder into your own project:

```
your-project/
└── src/
    └── components/
        └── ui/
            └── blur-text/
                └── index.tsx    ← drop it here
```

Then import and use:

```tsx
import { BlurText } from "@/components/ui/blur-text";

export default function Hero() {
    return (
        <BlurText className="text-4xl font-bold text-white">
            Ship something that feels alive.
        </BlurText>
    );
}
```

---

## Philosophy

Most UI libraries give you **utility belt** components — buttons, inputs, modals. They're necessary, but they're not what makes a user say *"whoa"*.

AuraBitz fills the gap between **functional UI** and **experience design**:

- We don't abstract away motion — we **embrace** it as a first-class citizen
- Every animation uses **physics-based easing** (springs, damping, stiffness) over linear/cubic curves
- Components are **viewport-aware** — they animate when they enter view, not on page load
- We use **native browser APIs** wherever possible — `useAnimationFrame`, `IntersectionObserver`, CSS `@property`

**If it doesn't make someone pause and inspect element, it doesn't ship.**

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Server Components, file-based routing, optimal DX |
| **Animation** | Framer Motion 12 | Physics-based springs, layout animations, gesture support |
| **3D** | Three.js + React Three Fiber | WebGL-powered 3D effects and shaders |
| **Styling** | Tailwind CSS 4 | Utility-first, zero-runtime CSS |
| **Scroll** | Lenis | Butter-smooth native scroll with momentum |
| **Language** | TypeScript 5 | Full type safety on every prop interface |

---

## Project Structure

```
aurabitz/
├── src/
│   ├── app/
│   │   ├── docs/                    # Documentation pages with live previews
│   │   │   ├── 3d-physical/
│   │   │   ├── backgrounds/
│   │   │   ├── illumination/
│   │   │   └── text-animations/
│   │   ├── layout.tsx               # Root layout with Lenis smooth scroll
│   │   └── page.tsx                 # Landing page
│   ├── components/
│   │   ├── site/                    # Sidebar, CodePreview, Navbar
│   │   └── ui/                      # ⚡ The actual components
│   │       ├── blur-text/
│   │       ├── circular-text/
│   │       ├── holographic-card/
│   │       ├── kinetic-button/
│   │       ├── scramble-reveal/
│   │       └── ...
│   └── lib/
│       └── utils.ts                 # cn() utility
├── LICENSE                          # MIT
├── package.json
└── README.md
```

---

## Contributing

AuraBitz is in active development. Contributions are welcome!

### How to contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feat/wave-text`)
3. **Build** your component in `src/components/ui/your-component/index.tsx`
4. **Add** a docs page in `src/app/docs/[category]/your-component/page.tsx`
5. **Register** it in the sidebar (`src/components/site/sidebar.tsx`)
6. **Submit** a pull request

### Component guidelines

- Must be a **single file** default export in `index.tsx`
- Must include a **TypeScript interface** for all props
- Must use **Framer Motion** for animation (no raw CSS keyframes for motion)
- Must be **SSR-safe** (use `"use client"` directive, no `window` access on mount)
- Must work with **Tailwind CSS** class merging via `cn()`

---

## Roadmap

- [ ] NPM package publishing (`npm i aurabitz`)
- [ ] CLI installer (`npx aurabitz add blur-text`)
- [ ] Dark/Light theme support
- [ ] More categories: Loaders, Transitions, Scroll Effects
- [ ] Figma design tokens
- [ ] Interactive playground with live prop editing

---

## License

MIT © [Mohammed Safwan](https://github.com/MohammedSafwan10)

Free to use in personal and commercial projects. Attribution appreciated but not required.

---

<p align="center">
  <strong>If AuraBitz made you say "whoa" — drop a ⭐</strong>
</p>
