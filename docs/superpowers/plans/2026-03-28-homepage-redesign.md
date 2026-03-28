# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage into a cleaner, faster, more intentional AuraBitz experience that balances conversion, product clarity, and premium visual identity.

**Architecture:** Replace the current all-in-one homepage with a composed `HomePage` entry point and focused section components. Keep the dark AuraBitz identity, but remove the rotating hero wall, reduce above-the-fold motion density, and tighten shared header/mobile-nav chrome only where it improves the homepage result.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react

---

## File Map

### Existing files to modify
- `src/app/page.tsx` — reduce to a thin route entry that renders the new homepage shell
- `src/components/site/home/data.ts` — central content model for hero proof points, curated showcase items, and workflow copy
- `src/components/site/home/workflow-section.tsx` — rewrite to match the cleaner browse → copy → ship flow
- `src/components/site/home/cta-section.tsx` — tighten final CTA copy and layout
- `src/components/site/home/home-footer.tsx` — align footer tone with the redesigned homepage
- `src/components/site/header.tsx` — add a homepage-specific surface variant and reduce chrome noise
- `src/components/site/mobile-nav.tsx` — keep nav usable on mobile while matching the lighter homepage header treatment

### New files to create
- `src/components/site/home/home-page.tsx` — homepage composition root
- `src/components/site/home/home-hero.tsx` — hero with one focal preview and clearer messaging
- `src/components/site/home/proof-strip.tsx` — compact credibility strip below the hero
- `src/components/site/home/curated-showcase-section.tsx` — selective showcase section with 3 featured component stories

### Existing files left unchanged
- `src/components/site/home/animations.ts` — existing `fadeUp`, `heroViewport`, and `defaultViewport` utilities are enough for the redesign
- `src/components/site/home/value-props-section.tsx` — left untouched for now; no homepage import after the redesign
- `src/components/site/home/tech-stack-section.tsx` — left untouched for now; no homepage import after the redesign

## Verification Strategy
- Use `npm run lint` after each task as the fast failing/passing check.
- Use `npm run build` in the final task to catch route, type, and rendering issues.
- Manual QA for the finished homepage in a browser at `/` on desktop and mobile widths.

---

### Task 1: Create the homepage shell

**Files:**
- Create: `src/components/site/home/home-page.tsx`
- Modify: `src/app/page.tsx`
- Test: `npm run lint`

- [ ] **Step 1: Write the failing route composition**

Replace `src/app/page.tsx` with:

```tsx
import { HomePage } from "@/components/site/home/home-page";

export default function Page() {
  return <HomePage />;
}
```

- [ ] **Step 2: Run lint to verify it fails**

Run:

```bash
npm run lint
```

Expected: FAIL because `@/components/site/home/home-page` does not exist yet.

- [ ] **Step 3: Write the minimal homepage shell**

Create `src/components/site/home/home-page.tsx`:

```tsx
"use client";

import { Header } from "@/components/site/header";
import { HomeFooter } from "./home-footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 selection:text-white">
      <Header />
      <main className="relative overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
          <p className="text-sm text-white/50">Homepage redesign in progress.</p>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}
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
git add src/app/page.tsx src/components/site/home/home-page.tsx
git commit -m "refactor: split homepage into a dedicated shell"
```

---

### Task 2: Build the new hero and proof strip

**Files:**
- Create: `src/components/site/home/home-hero.tsx`
- Create: `src/components/site/home/proof-strip.tsx`
- Modify: `src/components/site/home/home-page.tsx`
- Modify: `src/components/site/home/data.ts`
- Test: `npm run lint`

- [ ] **Step 1: Write the failing homepage imports**

Update `src/components/site/home/home-page.tsx` to:

```tsx
"use client";

import { Header } from "@/components/site/header";
import { HomeFooter } from "./home-footer";
import { HomeHero } from "./home-hero";
import { ProofStrip } from "./proof-strip";

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 selection:text-white">
      <Header />
      <main className="relative overflow-x-hidden">
        <HomeHero />
        <ProofStrip />
      </main>
      <HomeFooter />
    </div>
  );
}
```

- [ ] **Step 2: Run lint to verify it fails**

Run:

```bash
npm run lint
```

Expected: FAIL because `./home-hero` and `./proof-strip` do not exist yet.

- [ ] **Step 3: Implement the hero, proof strip, and shared homepage data**

Replace `src/components/site/home/data.ts` with:

```ts
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Copy,
  Gauge,
  Layers3,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

export interface ProofItem {
  label: string;
  value: string;
  detail: string;
}

export interface ShowcaseItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  eyebrow: string;
}

export interface WorkflowStepItem {
  step: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const proofItems: ProofItem[] = [
  {
    label: "Ownership",
    value: "Copy the code",
    detail: "No package lock-in. Drop the source directly into your app.",
  },
  {
    label: "Performance",
    value: "Motion with discipline",
    detail: "Effects are designed to feel premium without turning the page noisy.",
  },
  {
    label: "Adoption",
    value: "Ship in one pass",
    detail: "Browse, copy, and move straight into production work.",
  },
  {
    label: "Craft",
    value: "Made to look rare",
    detail: "AuraBitz components are tuned for presence, not generic template polish.",
  },
];

export const showcaseItems: ShowcaseItem[] = [
  {
    eyebrow: "Materials",
    title: "Holographic surfaces",
    description: "Glassy depth, lighting detail, and interaction that still feels product-ready.",
    href: "/docs/3d-physical/holographic-card",
    icon: Layers3,
  },
  {
    eyebrow: "Motion",
    title: "Kinetic feedback",
    description: "Buttons and interactions that respond with intent instead of default easing.",
    href: "/docs/3d-physical/kinetic-button",
    icon: Sparkles,
  },
  {
    eyebrow: "Typography",
    title: "Text with presence",
    description: "Display treatments that feel engineered, not pasted on after layout is done.",
    href: "/docs/text-animations/text-pressure",
    icon: ArrowUpRight,
  },
];

export const workflowSteps: WorkflowStepItem[] = [
  {
    step: "01",
    icon: Sparkles,
    title: "Browse with context",
    desc: "Evaluate live examples quickly instead of guessing from static screenshots.",
  },
  {
    step: "02",
    icon: Copy,
    title: "Copy the source",
    desc: "Take the implementation directly so your team owns the code from day one.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Ship without cleanup",
    desc: "Drop polished UI into production without fighting wrapper abstractions.",
  },
];

export const heroPrimaryPoints = [
  {
    icon: Copy,
    label: "Copy-paste ownership",
  },
  {
    icon: Gauge,
    label: "Performance-minded motion",
  },
  {
    icon: Palette,
    label: "Distinctive visual craft",
  },
];
```

Create `src/components/site/home/home-hero.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { KineticButton } from "@/components/ui/kinetic-button";
import { HolographicCard } from "@/components/ui/holographic-card";
import { fadeUp, heroViewport } from "./animations";
import { heroPrimaryPoints } from "./data";

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
            Production UI, not decoration.
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
            <Link href="/docs">
              <KineticButton className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-neutral-200" magneticPull={0.18}>
                Explore components
              </KineticButton>
            </Link>
            <Link href="/blocks">
              <KineticButton className="h-12 rounded-full border border-white/12 bg-white/[0.03] px-6 text-sm font-semibold text-white hover:bg-white/[0.08]" magneticPull={0.12}>
                Browse blocks
              </KineticButton>
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
              <div className="mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/35">
                <span>Featured preview</span>
                <span>01 / curated</span>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.5rem] border border-white/8 bg-black/40 p-5 sm:p-8">
                  <HolographicCard className="h-48 w-full rounded-[1.35rem] border border-white/10 bg-[#060606] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    <div className="flex h-full flex-col justify-between">
                      <span className="text-[10px] uppercase tracking-[0.32em] text-white/35">Signature surface</span>
                      <div>
                        <p className="text-2xl font-medium tracking-tight text-white">Holographic Card</p>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-white/48">
                          A single hero preview with enough depth to sell the system without turning the page into a carousel.
                        </p>
                      </div>
                    </div>
                  </HolographicCard>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.02] p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Approach</p>
                    <p className="mt-3 text-lg font-medium text-white/92">One focal interaction</p>
                    <p className="mt-2 text-sm leading-6 text-white/45">Less motion at once, more weight per moment.</p>
                  </div>
                  <Link
                    href="/docs/3d-physical/holographic-card"
                    className="group rounded-[1.35rem] border border-white/8 bg-white/[0.02] p-5 transition-colors hover:border-white/18 hover:bg-white/[0.04]"
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">See component</p>
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

Create `src/components/site/home/proof-strip.tsx`:

```tsx
import { proofItems } from "./data";

export function ProofStrip() {
  return (
    <section className="border-b border-white/6 bg-[#050505]/80">
      <div className="mx-auto grid max-w-7xl gap-px px-6 py-0 sm:px-8 lg:grid-cols-4 lg:px-10">
        {proofItems.map((item) => (
          <div key={item.label} className="border-t border-white/6 px-0 py-8 lg:border-l lg:border-t-0 lg:px-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">{item.label}</p>
            <p className="mt-3 text-lg font-medium tracking-tight text-white/92">{item.value}</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-white/45">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
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
git add src/components/site/home/home-page.tsx src/components/site/home/home-hero.tsx src/components/site/home/proof-strip.tsx src/components/site/home/data.ts
git commit -m "feat: add a focused homepage hero and proof strip"
```

---

### Task 3: Add the curated showcase, workflow, CTA, and refined footer

**Files:**
- Create: `src/components/site/home/curated-showcase-section.tsx`
- Modify: `src/components/site/home/home-page.tsx`
- Modify: `src/components/site/home/workflow-section.tsx`
- Modify: `src/components/site/home/cta-section.tsx`
- Modify: `src/components/site/home/home-footer.tsx`
- Test: `npm run lint`

- [ ] **Step 1: Write the failing section composition**

Update `src/components/site/home/home-page.tsx` to:

```tsx
"use client";

import { Header } from "@/components/site/header";
import { CtaSection } from "./cta-section";
import { CuratedShowcaseSection } from "./curated-showcase-section";
import { HomeFooter } from "./home-footer";
import { HomeHero } from "./home-hero";
import { ProofStrip } from "./proof-strip";
import { WorkflowSection } from "./workflow-section";

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 selection:text-white">
      <Header />
      <main className="relative overflow-x-hidden">
        <HomeHero />
        <ProofStrip />
        <CuratedShowcaseSection />
        <WorkflowSection />
        <CtaSection />
      </main>
      <HomeFooter />
    </div>
  );
}
```

- [ ] **Step 2: Run lint to verify it fails**

Run:

```bash
npm run lint
```

Expected: FAIL because `./curated-showcase-section` does not exist yet.

- [ ] **Step 3: Implement the remaining homepage sections**

Create `src/components/site/home/curated-showcase-section.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { defaultViewport, fadeUp } from "./animations";
import { showcaseItems } from "./data";

export function CuratedShowcaseSection() {
  const [featured, secondaryA, secondaryB] = showcaseItems;

  return (
    <section className="border-b border-white/6 px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mb-14 max-w-2xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/30">Curated showcase</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Fewer examples. More signal.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/48 sm:text-lg">
            The homepage should prove range without turning into a wall of equally loud previews.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            custom={1}
            variants={fadeUp}
          >
            <Link
              href={featured.href}
              className="group block rounded-[2rem] border border-white/10 bg-[#050505] p-8 transition-colors hover:border-white/20"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white/32">
                <span>{featured.eyebrow}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-14 rounded-[1.6rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] p-8">
                <featured.icon className="h-5 w-5 text-white/65" />
                <h3 className="mt-8 text-3xl font-medium tracking-tight text-white">{featured.title}</h3>
                <p className="mt-4 max-w-lg text-base leading-7 text-white/45">{featured.description}</p>
              </div>
            </Link>
          </motion.div>

          <div className="grid gap-5">
            {[secondaryA, secondaryB].map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                custom={index + 2}
                variants={fadeUp}
              >
                <Link
                  href={item.href}
                  className="group block rounded-[1.75rem] border border-white/10 bg-[#050505] p-7 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white/32">
                    <span>{item.eyebrow}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <item.icon className="mt-10 h-5 w-5 text-white/65" />
                  <h3 className="mt-6 text-2xl font-medium tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/45">{item.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

Replace `src/components/site/home/workflow-section.tsx` with:

```tsx
"use client";

import { motion } from "framer-motion";
import { defaultViewport, fadeUp } from "./animations";
import { workflowSteps } from "./data";

export function WorkflowSection() {
  return (
    <section className="border-b border-white/6 px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mb-14 max-w-2xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/30">Workflow</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Browse. Copy. Ship.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/48 sm:text-lg">
            A tighter explanation of the product: enough context to convert, without drowning the page in marketing copy.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {workflowSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              custom={index + 1}
              variants={fadeUp}
              className="rounded-[1.75rem] border border-white/10 bg-[#050505] p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/28">{item.step}</span>
                <item.icon className="h-5 w-5 text-white/48" />
              </div>
              <h3 className="mt-10 text-xl font-medium tracking-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/45">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Replace `src/components/site/home/cta-section.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { KineticButton } from "@/components/ui/kinetic-button";
import { defaultViewport, fadeUp } from "./animations";

export function CtaSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_40%,rgba(255,255,255,0.01))] px-6 py-14 sm:px-10 sm:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/30">Start here</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Build something people remember.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/48 sm:text-lg">
            Explore the catalog, copy the source, and ship UI that feels intentional from the first frame.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={1}
          variants={fadeUp}
          className="mt-10 flex justify-center"
        >
          <Link href="/docs">
            <KineticButton className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-neutral-200" magneticPull={0.16}>
              Explore components
              <ArrowUpRight className="h-4 w-4" />
            </KineticButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

Replace `src/components/site/home/home-footer.tsx` with:

```tsx
import Link from "next/link";
import { ArrowUpRight, Triangle } from "lucide-react";

export function HomeFooter() {
  return (
    <footer className="border-t border-white/6 px-6 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-[10px] font-mono uppercase tracking-[0.28em] text-white/30 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Triangle className="h-2 w-2 rotate-180 fill-white/30 text-white/30" />
          <span>AuraBitz</span>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link href="/docs" className="inline-flex items-center gap-2 hover:text-white/65">
            <span>Open docs</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <p>© 2026 Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
}
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
git add src/components/site/home/home-page.tsx src/components/site/home/curated-showcase-section.tsx src/components/site/home/workflow-section.tsx src/components/site/home/cta-section.tsx src/components/site/home/home-footer.tsx
git commit -m "feat: add a curated homepage content flow"
```

---

### Task 4: Tighten shared header chrome and finish verification

**Files:**
- Modify: `src/components/site/header.tsx`
- Modify: `src/components/site/mobile-nav.tsx`
- Modify: `src/components/site/home/home-page.tsx`
- Test: `npm run lint`
- Test: `npm run build`

- [ ] **Step 1: Write the failing homepage header variant**

Update `src/components/site/home/home-page.tsx` to:

```tsx
"use client";

import { Header } from "@/components/site/header";
import { CtaSection } from "./cta-section";
import { CuratedShowcaseSection } from "./curated-showcase-section";
import { HomeFooter } from "./home-footer";
import { HomeHero } from "./home-hero";
import { ProofStrip } from "./proof-strip";
import { WorkflowSection } from "./workflow-section";

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 selection:text-white">
      <Header surface="home" />
      <main className="relative overflow-x-hidden">
        <HomeHero />
        <ProofStrip />
        <CuratedShowcaseSection />
        <WorkflowSection />
        <CtaSection />
      </main>
      <HomeFooter />
    </div>
  );
}
```

- [ ] **Step 2: Run lint to verify it fails**

Run:

```bash
npm run lint
```

Expected: FAIL because `Header` does not accept a `surface` prop yet.

- [ ] **Step 3: Implement the homepage header/mobile-nav treatment**

Replace `src/components/site/header.tsx` with:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LucideGithub, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { SearchModal } from "./search-modal";

const navLinks = [
  { name: "Components", href: "/docs" },
  { name: "Blocks", href: "/blocks" },
  { name: "Documentation", href: "/docs/installation" },
];

type HeaderProps = {
  surface?: "default" | "home";
};

export function Header({ surface = "default" }: HeaderProps) {
  const pathname = usePathname();
  const isHomeSurface = surface === "home";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-2xl backdrop-saturate-150",
        isHomeSurface
          ? "border-white/[0.05] bg-black/45"
          : "border-white/[0.06] bg-black/60"
      )}
    >
      <div className="flex h-14 w-full items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl border border-white/12">
              <Image src="/logo-512.png" alt="AuraBitz" width={32} height={32} className="object-cover" />
            </div>
            <span className="hidden text-base font-extrabold tracking-tighter text-white sm:inline">AuraBitz</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/docs"
                  ? pathname?.startsWith("/docs") && pathname !== "/docs/installation"
                  : link.href === "/blocks"
                    ? pathname?.startsWith("/blocks")
                    : pathname === link.href || pathname?.startsWith(link.href + "/");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-[13px] font-semibold transition-all duration-200",
                    isActive
                      ? "bg-white/[0.06] text-white"
                      : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <MobileNav surface={surface} />
          <button
            onClick={() => document.dispatchEvent(new CustomEvent("open-search"))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition-all hover:border-white/15 hover:bg-white/[0.07] hover:text-white sm:h-auto sm:w-auto sm:gap-2 sm:px-3.5 sm:py-2"
            aria-label="Search components"
          >
            <Search className="h-4 w-4 sm:h-[13px] sm:w-[13px]" />
            <span className="hidden text-xs font-medium text-white/55 sm:inline">Search</span>
            <kbd className="ml-4 hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-mono text-white/20 sm:inline">⌘K</kbd>
          </button>
          <Link
            href="https://github.com/MohammedSafwan10/AuraBitz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/45 transition-all hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
          >
            <LucideGithub size={15} />
          </Link>
        </div>
      </div>
      <SearchModal />
    </header>
  );
}
```

Replace `src/components/site/mobile-nav.tsx` with:

```tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarData } from "./sidebar";

type MobileNavProps = {
  surface?: "default" | "home";
};

export function MobileNav({ surface = "default" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const topOffset = surface === "home" ? "top-[56px]" : "top-[56px]";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/45 transition-all hover:border-white/15 hover:bg-white/[0.07] hover:text-white md:hidden"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {isOpen && mounted &&
        createPortal(
          <div className="fixed inset-0 z-40 md:hidden" onWheel={(event) => event.stopPropagation()} onTouchMove={(event) => event.stopPropagation()}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <nav
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={cn(
                "absolute bottom-0 left-0 w-[88vw] max-w-sm overflow-y-auto border-r border-white/10 bg-[#050505] p-6",
                topOffset
              )}
              data-lenis-prevent
            >
              <div className="mb-8 flex flex-col gap-2">
                <Link
                  href="/blocks"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname?.startsWith("/blocks")
                      ? "bg-white/[0.05] text-white"
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  Blocks
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname?.startsWith("/docs")
                      ? "bg-white/[0.05] text-white"
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  Components
                </Link>
                <Link
                  href="/docs/installation"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname === "/docs/installation"
                      ? "bg-white/[0.05] text-white"
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  Documentation
                </Link>
              </div>

              <div className="flex flex-col gap-6">
                {sidebarData.map((category) => (
                  <div key={category.title}>
                    <h3 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/30">
                      {category.title}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {category.links.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                              isActive
                                ? "bg-white/[0.05] text-white"
                                : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                            )}
                          >
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
```

- [ ] **Step 4: Run lint to verify it passes**

Run:

```bash
npm run lint
```

Expected: PASS with exit code 0.

- [ ] **Step 5: Run a full production build**

Run:

```bash
npm run build
```

Expected: PASS with exit code 0 and no Next.js type or route errors.

- [ ] **Step 6: Manual QA in the browser**

Run:

```bash
npm run dev
```

Verify at `http://localhost:3000/`:
- hero has one clear focal point
- no rotating hero carousel remains
- proof strip reads cleanly on desktop and mobile
- curated showcase has exactly 3 featured stories
- workflow section reads as browse → copy → ship
- header feels lighter on the homepage
- mobile menu opens, closes, and scroll-locks correctly
- no horizontal overflow at 390px width

- [ ] **Step 7: Commit**

Run:

```bash
git add src/components/site/header.tsx src/components/site/mobile-nav.tsx src/components/site/home/home-page.tsx
git commit -m "refactor: tighten homepage chrome and finish redesign"
```

---

## Self-Review

### Spec coverage
- Hero requirement is implemented in Task 2 via `home-hero.tsx`.
- Proof strip requirement is implemented in Task 2 via `proof-strip.tsx`.
- Curated showcase requirement is implemented in Task 3 via `curated-showcase-section.tsx`.
- Workflow/value section requirement is implemented in Task 3 via `workflow-section.tsx`.
- Final CTA/footer requirement is implemented in Task 3.
- Shared header/mobile-nav adjustments are implemented in Task 4.
- Performance cleanup goals are addressed by removing the carousel, splitting the page into focused files, and reducing above-the-fold density across Tasks 1–4.

### Placeholder scan
- No TBD/TODO markers remain.
- Each code-changing step includes code.
- Every verification step includes exact commands.

### Type consistency
- Homepage entry point is consistently named `HomePage`.
- Header prop is consistently named `surface` with values `"default" | "home"`.
- The showcase section is consistently named `CuratedShowcaseSection`.

---

Plan complete and saved to `docs/superpowers/plans/2026-03-28-homepage-redesign.md`.

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
