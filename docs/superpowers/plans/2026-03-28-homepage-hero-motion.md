# Homepage Hero Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add premium animated headline motion and a controlled rotating feature preview to the homepage hero without reintroducing clutter or instability.

**Architecture:** Keep the current homepage structure and focus all behavior changes inside the hero implementation plus its supporting data. The animated headline should rotate only the leading phrase while the ending phrase stays fixed, and the preview carousel should rotate inside one stable hero frame with three curated slides and simple manual controls.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react

---

## File Map

### Existing files to modify
- `src/components/site/home/home-hero.tsx` — implement animated leading headline phrase, stable supporting copy, preview carousel, and manual controls
- `src/components/site/home/data.ts` — add hero headline phrase data plus carousel slide data for the three curated hero previews
- `src/components/site/home/animations.ts` — add a small hero-specific transition helper only if needed for repeated carousel/headline timing values

### Files expected to remain unchanged
- `src/components/site/home/home-page.tsx` — hero remains mounted in the same page composition
- `src/components/site/header.tsx` — no header changes for this focused hero update
- `src/components/site/mobile-nav.tsx` — no nav changes for this focused hero update

## Verification Strategy
- Use `npm run lint` as the primary automated verification command for each task.
- Use `npm run build` after the final task to verify the updated hero compiles inside the full app.
- Manual browser QA at `/` on desktop and mobile widths after the final task.

---

### Task 1: Add hero motion data and failing hero composition

**Files:**
- Modify: `src/components/site/home/data.ts`
- Modify: `src/components/site/home/home-hero.tsx`
- Test: `npm run lint`

- [ ] **Step 1: Write the failing hero imports and data usage**

Replace `src/components/site/home/home-hero.tsx` with this temporary failing version that expects new data exports:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HolographicCard } from "@/components/ui/holographic-card";
import { fadeUp, heroViewport } from "./animations";
import { heroHeadlinePhrases, heroPreviewSlides, heroPrimaryPoints } from "./data";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40 [mask-image:radial-gradient(circle_at_top,black,transparent_75%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-56px)] max-w-7xl gap-14 px-6 pb-20 pt-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-10 lg:pt-24">
        <div className="flex max-w-2xl flex-col justify-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={0}
            variants={fadeUp}
            className="mb-6 text-[11px] font-mono uppercase tracking-[0.35em] text-white/45"
          >
            AuraBitz / premium motion components
          </motion.p>

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={1}
            variants={fadeUp}
            className="max-w-3xl text-[clamp(3rem,8vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white"
          >
            {heroHeadlinePhrases[0]}, not decoration.
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-7 text-white/58 sm:text-lg"
          >
            AuraBitz gives you components with real visual presence: sharp motion, strong materials, and code you can actually ship.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-colors duration-300 hover:bg-neutral-200"
            >
              Explore components
            </Link>
            <Link
              href="/blocks"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/[0.08]"
            >
              Browse blocks
            </Link>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={4}
            variants={fadeUp}
            className="mt-10 grid gap-3 text-sm text-white/55 sm:grid-cols-3"
          >
            {heroPrimaryPoints.map((item) => (
              <li key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                <item.icon className="h-4 w-4 text-white/75" />
                <span>{item.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={heroViewport}
          custom={2}
          variants={fadeUp}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-[560px] rounded-[2rem] border border-white/10 bg-[#050505] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-6 sm:p-7">
              <div className="mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/60">
                <span>Featured preview</span>
                <span>{heroPreviewSlides.length} / curated</span>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.5rem] border border-white/8 bg-black/40 p-5 sm:p-8">
                  <HolographicCard className="h-48 w-full rounded-[1.35rem] border border-white/10 bg-[#060606] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    <div className="flex h-full flex-col justify-between">
                      <span className="text-[10px] uppercase tracking-[0.32em] text-white/60">{heroPreviewSlides[0].eyebrow}</span>
                      <div>
                        <p className="text-2xl font-medium tracking-tight text-white">{heroPreviewSlides[0].title}</p>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-white/48">{heroPreviewSlides[0].description}</p>
                      </div>
                    </div>
                  </HolographicCard>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.02] p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Approach</p>
                    <p className="mt-3 text-lg font-medium text-white/92">Stable carousel frame</p>
                    <p className="mt-2 text-sm leading-6 text-white/45">One active slide at a time, with controlled rotation.</p>
                  </div>
                  <Link
                    href={heroPreviewSlides[0].href}
                    className="group rounded-[1.35rem] border border-white/8 bg-white/[0.02] p-5 transition-colors hover:border-white/18 hover:bg-white/[0.04]"
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">See component</p>
                    <div className="mt-3 flex items-center justify-between text-lg font-medium text-white/92">
                      <span>Open docs</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/45">Jump straight into the source-backed example.</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run lint to verify it fails**

Run:

```bash
npm run lint
```

Expected: FAIL because `heroHeadlinePhrases` and `heroPreviewSlides` are not exported from `src/components/site/home/data.ts` yet.

- [ ] **Step 3: Add the new hero data exports**

Append these exports near the bottom of `src/components/site/home/data.ts`, before `heroPrimaryPoints`:

```ts
export interface HeroPreviewSlide {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  theme: "materials" | "motion" | "typography";
}

export const heroHeadlinePhrases = [
  "Production UI",
  "Motion systems",
  "Interface presence",
] as const;

export const heroPreviewSlides: HeroPreviewSlide[] = [
  {
    eyebrow: "Material / surface",
    title: "Holographic Card",
    description: "Glassy depth, lighting detail, and interaction that still feels product-ready.",
    href: "/docs/3d-physical/holographic-card",
    ctaLabel: "Open holographic card",
    theme: "materials",
  },
  {
    eyebrow: "Motion / interaction",
    title: "Kinetic Button",
    description: "Buttons and interactions that respond with intent instead of default easing.",
    href: "/docs/3d-physical/kinetic-button",
    ctaLabel: "Open kinetic button",
    theme: "motion",
  },
  {
    eyebrow: "Typography / dynamics",
    title: "Text Pressure",
    description: "Display treatments that feel engineered, not pasted on after layout is done.",
    href: "/docs/text-animations/text-pressure",
    ctaLabel: "Open text pressure",
    theme: "typography",
  },
];
```

- [ ] **Step 4: Run lint to verify it passes**

Run:

```bash
npm run lint
```

Expected: PASS with exit code 0.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/components/site/home/home-hero.tsx src/components/site/home/data.ts
git commit -m "feat: add hero headline and preview motion data"
```

---

### Task 2: Implement the animated headline and auto-rotating preview

**Files:**
- Modify: `src/components/site/home/home-hero.tsx`
- Modify: `src/components/site/home/animations.ts`
- Test: `npm run lint`

- [ ] **Step 1: Write the failing interactive hero logic**

Replace `src/components/site/home/home-hero.tsx` with this version that expects animation helpers which do not exist yet:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeUp, heroHeadlineTransition, heroPreviewTransition, heroViewport } from "./animations";
import { heroHeadlinePhrases, heroPreviewSlides, heroPrimaryPoints } from "./data";

export function HomeHero() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activePhrase = heroHeadlinePhrases[activePhraseIndex];
  const activeSlide = heroPreviewSlides[activeSlideIndex];

  const nextSlideIndex = useMemo(
    () => (activeSlideIndex + 1) % heroPreviewSlides.length,
    [activeSlideIndex]
  );

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActivePhraseIndex((current) => (current + 1) % heroHeadlinePhrases.length);
      setActiveSlideIndex((current) => (current + 1) % heroPreviewSlides.length);
    }, 4200);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused]);

  const showPreviousSlide = () => {
    setIsPaused(true);
    setActivePhraseIndex((current) => (current - 1 + heroHeadlinePhrases.length) % heroHeadlinePhrases.length);
    setActiveSlideIndex((current) => (current - 1 + heroPreviewSlides.length) % heroPreviewSlides.length);
  };

  const showNextSlide = () => {
    setIsPaused(true);
    setActivePhraseIndex((current) => (current + 1) % heroHeadlinePhrases.length);
    setActiveSlideIndex((current) => (current + 1) % heroPreviewSlides.length);
  };

  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40 [mask-image:radial-gradient(circle_at_top,black,transparent_75%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-56px)] max-w-7xl gap-14 px-6 pb-20 pt-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-10 lg:pt-24">
        <div className="flex max-w-2xl flex-col justify-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={0}
            variants={fadeUp}
            className="mb-6 text-[11px] font-mono uppercase tracking-[0.35em] text-white/45"
          >
            AuraBitz / premium motion components
          </motion.p>

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={1}
            variants={fadeUp}
            className="max-w-3xl text-[clamp(3rem,8vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white"
          >
            <span className="block min-h-[1.95em] sm:min-h-[1.9em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activePhrase}
                  initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(10px)" }}
                  transition={heroHeadlineTransition}
                  className="block"
                >
                  {activePhrase}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="block text-white/72">not decoration.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-7 text-white/58 sm:text-lg"
          >
            AuraBitz gives you components with real visual presence: sharp motion, strong materials, and code you can actually ship.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-colors duration-300 hover:bg-neutral-200"
            >
              Explore components
            </Link>
            <Link
              href="/blocks"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/[0.08]"
            >
              Browse blocks
            </Link>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={4}
            variants={fadeUp}
            className="mt-10 grid gap-3 text-sm text-white/55 sm:grid-cols-3"
          >
            {heroPrimaryPoints.map((item) => (
              <li key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                <item.icon className="h-4 w-4 text-white/75" />
                <span>{item.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={heroViewport}
          custom={2}
          variants={fadeUp}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-[560px] rounded-[2rem] border border-white/10 bg-[#050505] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-6 sm:p-7">
              <div className="mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/60">
                <span>Featured preview</span>
                <span>0{activeSlideIndex + 1} / 03</span>
              </div>

              <div className="grid gap-4">
                <div className="min-h-[320px] rounded-[1.5rem] border border-white/8 bg-black/40 p-5 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.title}
                      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -24, filter: "blur(10px)" }}
                      transition={heroPreviewTransition}
                      className="flex min-h-[256px] h-full flex-col justify-between rounded-[1.35rem] border border-white/10 bg-[#060606] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                    >
                      <span className="text-[10px] uppercase tracking-[0.32em] text-white/60">{activeSlide.eyebrow}</span>
                      <div>
                        <p className="text-2xl font-medium tracking-tight text-white">{activeSlide.title}</p>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-white/48">{activeSlide.description}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.02] p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Approach</p>
                    <p className="mt-3 text-lg font-medium text-white/92">Stable carousel frame</p>
                    <p className="mt-2 text-sm leading-6 text-white/45">
                      One active slide at a time, calm timing, and a fixed preview surface.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:justify-end">
                    <button
                      type="button"
                      onClick={showPreviousSlide}
                      aria-label="Show previous feature preview"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition-colors hover:bg-white/[0.08]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextSlide}
                      aria-label="Show next feature preview"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition-colors hover:bg-white/[0.08]"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2">
                    {heroPreviewSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => {
                          setIsPaused(true);
                          setActivePhraseIndex(index % heroHeadlinePhrases.length);
                          setActiveSlideIndex(index);
                        }}
                        aria-label={`Show ${slide.title}`}
                        className="group flex items-center"
                      >
                        <span
                          className={index === activeSlideIndex ? "h-2.5 w-8 rounded-full bg-white transition-all" : "h-2.5 w-2.5 rounded-full bg-white/25 transition-all group-hover:bg-white/45"}
                        />
                      </button>
                    ))}
                  </div>

                  <Link
                    href={activeSlide.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-white/88 transition-colors hover:text-white"
                  >
                    <span>{activeSlide.ctaLabel}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">
                  Next up: {heroPreviewSlides[nextSlideIndex].title}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run lint to verify it fails**

Run:

```bash
npm run lint
```

Expected: FAIL because `heroHeadlineTransition` and `heroPreviewTransition` are not exported from `src/components/site/home/animations.ts` yet.

- [ ] **Step 3: Add hero transition helpers and the animated hero implementation**

Append these exports to `src/components/site/home/animations.ts`:

```ts
export const heroHeadlineTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const heroPreviewTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
};
```

Then keep the `src/components/site/home/home-hero.tsx` code from Step 1 exactly as the final implementation for this task.

- [ ] **Step 4: Run lint to verify it passes**

Run:

```bash
npm run lint
```

Expected: PASS with exit code 0.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/components/site/home/home-hero.tsx src/components/site/home/animations.ts
git commit -m "feat: add animated hero headline and preview rotation"
```

---

### Task 3: Stabilize mobile behavior and verify full app build

**Files:**
- Modify: `src/components/site/home/home-hero.tsx`
- Test: `npm run lint`
- Test: `npm run build`

- [ ] **Step 1: Write the failing mobile stability adjustment**

Update these exact lines in `src/components/site/home/home-hero.tsx` to enforce a stable headline and preview area on smaller screens:

```tsx
<motion.h1
  initial="hidden"
  whileInView="visible"
  viewport={heroViewport}
  custom={1}
  variants={fadeUp}
  className="max-w-3xl text-[clamp(3rem,8vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white"
>
  <span className="block min-h-[1.95em] sm:min-h-[1.9em]">
```

Change it to:

```tsx
<motion.h1
  initial="hidden"
  whileInView="visible"
  viewport={heroViewport}
  custom={1}
  variants={fadeUp}
  className="max-w-3xl text-[clamp(3rem,8vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white"
>
  <span className="block min-h-[2.15em] sm:min-h-[1.9em]">
```

And change:

```tsx
<div className="min-h-[320px] rounded-[1.5rem] border border-white/8 bg-black/40 p-5 sm:p-8">
```

To:

```tsx
<div className="min-h-[340px] sm:min-h-[320px] rounded-[1.5rem] border border-white/8 bg-black/40 p-5 sm:p-8">
```

- [ ] **Step 2: Run lint to verify it still passes**

Run:

```bash
npm run lint
```

Expected: PASS with exit code 0.

- [ ] **Step 3: Run a full production build**

Run:

```bash
npm run build
```

Expected: PASS with exit code 0 and no Next.js type or route errors.

- [ ] **Step 4: Manual QA in the browser**

Run:

```bash
npm run dev
```

Verify at `http://localhost:3000/`:
- headline cycles through exactly 3 leading phrases
- fixed ending line remains visually anchored as `not decoration.`
- text remains readable during every phrase transition
- preview rotates through exactly 3 curated slides
- manual arrows work
- manual dots work
- auto-rotation pauses after manual interaction
- hero frame does not jump during slide transitions
- headline block and preview feel stable at 390px width

- [ ] **Step 5: Commit**

Run:

```bash
git add src/components/site/home/home-hero.tsx
git commit -m "fix: stabilize hero motion on mobile"
```

---

## Self-Review

### Spec coverage
- Headline word-by-word rotating leading phrase is implemented in Task 2.
- Fixed ending phrase anchor is implemented in Task 2.
- Three-slide curated preview carousel is implemented in Tasks 1 and 2.
- Auto-rotation, manual controls, and pause-on-interaction are implemented in Task 2.
- Stable frame/mobile stability requirements are covered in Task 3.
- Scope remains limited to hero files and supporting hero data.

### Placeholder scan
- No TBD/TODO markers remain.
- Each code-changing step includes exact code.
- Each verification step includes exact commands and expected outcomes.

### Type consistency
- Data exports are consistently named `heroHeadlinePhrases` and `heroPreviewSlides`.
- Transition helpers are consistently named `heroHeadlineTransition` and `heroPreviewTransition`.
- Slide type is consistently named `HeroPreviewSlide`.

---

Plan complete and saved to `docs/superpowers/plans/2026-03-28-homepage-hero-motion.md`.

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
