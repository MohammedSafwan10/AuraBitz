"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Copy,
  Crosshair,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "#25f5d0";

const sourceLines = [
  ["import", " { useRef, useFrame } ", "from", " 'react'"],
  ["import", " { MeshTransmissionMaterial } ", "from", " '@react-three/drei'"],
  ["", ""],
  ["export", " function GlassCore(props) {"],
  ["", "  const mesh = useRef()"],
  ["", ""],
  ["", "  useFrame(({ pointer }) => {"],
  ["", "    mesh.current.rotation.y += pointer.x * 0.04"],
  ["", "    mesh.current.rotation.x += pointer.y * 0.02"],
  ["", "  })"],
  ["", ""],
  ["", "  return <mesh ref={mesh} {...props} />"],
  ["", "}"],
];

const categories = ["ALL", "PHYSICS", "LIGHT", "TYPE", "WEBGL"] as const;

type PanelId = "glass" | "pressure" | "kinetic" | "particles" | "source";

const panelGrid: Record<PanelId, { columns: string; rows: string }> = {
  glass: { columns: "26% 39% 35%", rows: "55% 45%" },
  pressure: { columns: "26% 31% 43%", rows: "55% 45%" },
  kinetic: { columns: "31% 34% 35%", rows: "46% 54%" },
  particles: { columns: "25% 40% 35%", rows: "46% 54%" },
  source: { columns: "25% 32% 43%", rows: "46% 54%" },
};

const categoryFocus: Record<(typeof categories)[number], PanelId> = {
  ALL: "glass",
  PHYSICS: "kinetic",
  LIGHT: "glass",
  TYPE: "pressure",
  WEBGL: "particles",
};

export function ObservatoryHome() {
  const [activePanel, setActivePanel] = useState<PanelId>("glass");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("ALL");
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleCopy = useCallback(async () => {
    const source = sourceLines.map((line) => line.join("")).join("\n");

    try {
      await navigator.clipboard.writeText(source);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = source;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }, []);

  const handleCategoryChange = useCallback((category: (typeof categories)[number]) => {
    setActiveCategory(category);
    setActivePanel(categoryFocus[category]);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#25f5d0]/25 selection:text-white">
      <ObservatoryHeader />

      <main className="relative mx-auto min-h-[calc(100svh-72px)] max-w-[1920px] overflow-hidden border-x border-white/[0.08] bg-[#020303]">
        <div className="relative px-5 pb-20 pt-5 sm:px-8 lg:px-14 lg:pb-[76px] lg:pt-6">
          <motion.div
            className="observatory-grid mx-auto min-h-[760px] max-w-[1780px] border-l border-t border-white/[0.13] xl:grid xl:h-[calc(100svh-172px)] xl:min-h-[720px]"
            animate={
              reduceMotion
                ? undefined
                : {
                    gridTemplateColumns: panelGrid[activePanel].columns,
                    gridTemplateRows: panelGrid[activePanel].rows,
                  }
            }
            initial={false}
            transition={{ type: "spring", stiffness: 120, damping: 24, mass: 0.8 }}
            style={{
              gridTemplateColumns: panelGrid[activePanel].columns,
              gridTemplateRows: panelGrid[activePanel].rows,
            }}
          >
            <IntroPanel />
            <GlassPanel active={activePanel === "glass"} onActivate={() => setActivePanel("glass")} />
            <PressurePanel active={activePanel === "pressure"} onActivate={() => setActivePanel("pressure")} />
            <KineticPanel active={activePanel === "kinetic"} onActivate={() => setActivePanel("kinetic")} />
            <ParticlePanel active={activePanel === "particles"} onActivate={() => setActivePanel("particles")} />
            <SourcePanel active={activePanel === "source"} onActivate={() => setActivePanel("source")} onCopy={handleCopy} copied={copied} />
          </motion.div>
        </div>

        <ControlRail
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          onCopy={handleCopy}
          copied={copied}
        />

        <section
          aria-label="About AuraBitz UI"
          className="relative z-10 mx-auto max-w-[1780px] border-t border-white/[0.12] px-5 py-14 sm:px-8 lg:px-14"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#25f5d0]">
                AuraBitz UI · Open-Source Component Library
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white/95 sm:text-3xl">
                WebGL shaders, kinetic typography &amp; Framer Motion blocks for React and Next.js.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/60">
                AuraBitz UI is an open-source frontend component architecture created by{" "}
                <a href="https://iamsafwan.me/" rel="me" className="text-white/90 underline underline-offset-4 hover:text-[#25f5d0]">
                  Mohammed Safwan
                </a>{" "}
                at{" "}
                <a href="https://nexdark.com/" className="text-white/90 underline underline-offset-4 hover:text-[#25f5d0]">
                  NexDark Labs
                </a>
                . Copy and paste 28+ production-tested TypeScript, Tailwind CSS, Three.js, and Framer Motion components directly into your Next.js App Router projects — zero vendor lock-in.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
                <Link href="/docs" className="border border-white/15 px-4 py-2 text-white/85 transition-colors hover:border-[#25f5d0] hover:text-[#25f5d0]">
                  Explore 28+ Components
                </Link>
                <Link href="/blocks" className="border border-white/15 px-4 py-2 text-white/85 transition-colors hover:border-[#25f5d0] hover:text-[#25f5d0]">
                  View UI Blocks
                </Link>
                <Link href="/docs/installation" className="border border-white/15 px-4 py-2 text-white/85 transition-colors hover:border-[#25f5d0] hover:text-[#25f5d0]">
                  Installation Guide
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
              <article className="border border-white/[0.12] bg-black/60 p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-white/90">What is AuraBitz UI?</h3>
                <p className="mt-2.5 text-xs leading-5 text-white/55">
                  A free, open-source React, Next.js, and Three.js UI library focused on tactile WebGL shaders, glass surfaces, kinetic text, and interactive hero blocks.
                </p>
              </article>
              <article className="border border-white/[0.12] bg-black/60 p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-white/90">Commercial License</h3>
                <p className="mt-2.5 text-xs leading-5 text-white/55">
                  Every component ships with clean TypeScript and Tailwind CSS source code you can use in personal, startup, and commercial client projects.
                </p>
              </article>
              <article className="border border-white/[0.12] bg-black/60 p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-white/90">NexDark Ecosystem</h3>
                <p className="mt-2.5 text-xs leading-5 text-white/55">
                  Part of{" "}
                  <a href="https://nexdark.com/" className="text-white/80 underline underline-offset-2 hover:text-[#25f5d0]">NexDark Labs</a>
                  {" "}alongside{" "}
                  <a href="https://3d.nexdark.com/" className="text-white/80 underline underline-offset-2 hover:text-[#25f5d0]">NexDark 3D Studio</a>
                  {" "}and{" "}
                  <a href="https://ottero.nexdark.com/" className="text-white/80 underline underline-offset-2 hover:text-[#25f5d0]">Ottero Workspace</a>.
                </p>
              </article>
            </div>
          </div>
        </section>

        <Noise />
      </main>
    </div>
  );
}

function ObservatoryHeader() {
  return (
    <header className="relative z-50 h-[72px] border-b border-white/[0.12] bg-black">
      <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <Link href="/" className="group flex items-center gap-4" aria-label="AuraBitz home">
          <span className="relative block h-8 w-8 overflow-hidden">
            <Image
              src="/logo-512.png"
              alt=""
              fill
              sizes="32px"
              className="object-cover grayscale brightness-[2.8] contrast-200 transition-opacity group-hover:opacity-70"
            />
          </span>
          <span className="h-7 w-px bg-white/20" />
          <span className="text-lg font-semibold tracking-[-0.04em] text-white/95 sm:text-xl">AuraBitz</span>
        </Link>

        <nav className="hidden items-center font-mono text-xs text-white/72 md:flex">
          <Link className="px-8 py-3 transition-colors hover:text-white" href="/docs">Components</Link>
          <span className="h-4 w-px bg-white/15" />
          <Link className="px-8 py-3 transition-colors hover:text-white" href="/blocks">Blocks</Link>
          <span className="h-4 w-px bg-white/15" />
          <Link className="px-8 py-3 transition-colors hover:text-white" href="/docs/installation">Docs</Link>
          <Link
            href="https://github.com/MohammedSafwan10/AuraBitz"
            target="_blank"
            rel="noreferrer"
            className="ml-4 flex h-9 w-9 items-center justify-center border border-white/10 text-white/55 transition-colors hover:border-white/25 hover:text-white"
            aria-label="AuraBitz on GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
        </nav>

        <Crosshair className="h-5 w-5 text-white/65 md:hidden" />
      </div>
    </header>
  );
}

function IntroPanel() {
  return (
    <section className="relative flex min-h-[360px] flex-col border-b border-r border-white/[0.13] p-6 sm:p-9 xl:min-h-0 xl:p-[clamp(1.7rem,2.4vw,3.3rem)]">
      <CornerMarks />
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/46 sm:text-xs">
        Interactive specimens / 2026
      </p>
      <h1 className="mt-7 max-w-[11ch] text-[clamp(2.8rem,3.4vw,4.1rem)] font-semibold leading-[0.94] tracking-[-0.072em] text-white/95">
        A library of digital matter.
      </h1>
      <p className="mt-7 max-w-[30rem] font-mono text-xs leading-6 text-white/50 sm:text-sm">
        Production-ready React experiments<br className="hidden sm:block" /> with source included.
      </p>
      <Link
        href="/docs"
        className="group mt-6 inline-flex w-fit items-center gap-5 font-mono text-sm text-[#25f5d0]"
      >
        Browse all 28
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
      </Link>
      <div className="mt-auto hidden items-center gap-3 pt-8 font-mono text-[10px] text-white/25 xl:flex">
        <span className="h-px w-9 bg-white/20" />
        SYSTEM ONLINE
        <span className="h-1 w-1 rounded-full bg-[#25f5d0] shadow-[0_0_10px_#25f5d0]" />
      </div>
    </section>
  );
}

type PanelProps = { active: boolean; onActivate: () => void };

function PanelShell({
  children,
  active,
  onActivate,
  number,
  label,
  className,
}: PanelProps & { children: React.ReactNode; number: string; label: string; className?: string }) {
  return (
    <motion.section
      layout
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      className={cn(
        "group relative min-h-[350px] overflow-hidden border-b border-r border-white/[0.13] bg-black outline-none xl:min-h-0",
        active && "z-10 border-[#25f5d0]/70",
        className
      )}
      transition={{ layout: { type: "spring", stiffness: 130, damping: 25, mass: 0.8 } }}
    >
      <div className="absolute left-5 top-4 z-30 flex items-center gap-3 font-mono text-[10px] tracking-[0.06em] text-white/75 sm:text-xs">
        <span className={cn("text-white/40", active && "text-[#25f5d0]")}>{number}</span>
        <span>{label}</span>
      </div>
      <motion.span
        className="pointer-events-none absolute inset-0 z-20"
        animate={{ boxShadow: active ? "inset 0 0 0 1px rgba(37,245,208,0.34)" : "inset 0 0 0 0px rgba(37,245,208,0)" }}
        transition={{ duration: 0.25 }}
      />
      <PanelTicks active={active} />
      {children}
    </motion.section>
  );
}

function GlassPanel({ active, onActivate }: PanelProps) {
  return (
    <PanelShell active={active} onActivate={onActivate} number="01" label="GLASS CORE" className="xl:[grid-column:2] xl:[grid-row:1]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,rgba(37,245,208,0.07),transparent_42%)]" />
      <div className="absolute inset-x-0 top-[48%] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <SpectralPrism active={active} />
      <div className="absolute bottom-8 left-5 z-20 font-mono text-[9px] leading-4 text-white/35 sm:text-[10px]">
        <div>IOR&nbsp;&nbsp;&nbsp;1.52</div>
        <div>DISP&nbsp;&nbsp;0.028</div>
        <div>ROUGH&nbsp;0.02</div>
        <div>TEMP&nbsp;&nbsp;24.3°C</div>
      </div>
      <TelemetryLine active={active} />
      <ArrowDownRight className={cn("absolute right-5 top-4 z-30 h-5 w-5 transition-colors", active ? "text-[#25f5d0]" : "text-white/20")} />
    </PanelShell>
  );
}

function SpectralPrism({ active }: { active: boolean }) {
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const beamXTarget = useMotionValue(0);
  const lightXTarget = useMotionValue(0);
  const lightYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, { stiffness: 110, damping: 20, mass: 0.7 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 110, damping: 20, mass: 0.7 });
  const beamX = useSpring(beamXTarget, { stiffness: 130, damping: 22, mass: 0.55 });
  const lightX = useSpring(lightXTarget, { stiffness: 150, damping: 24, mass: 0.45 });
  const lightY = useSpring(lightYTarget, { stiffness: 150, damping: 24, mass: 0.45 });
  const reduceMotion = useReducedMotion();

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateXTarget.set(y * -18);
    rotateYTarget.set(x * 27);
    beamXTarget.set(x * 32);
    lightXTarget.set(x * 150);
    lightYTarget.set(y * 95);
  }, [beamXTarget, lightXTarget, lightYTarget, reduceMotion, rotateXTarget, rotateYTarget]);

  const resetPointer = useCallback(() => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
    beamXTarget.set(0);
    lightXTarget.set(0);
    lightYTarget.set(0);
  }, [beamXTarget, lightXTarget, lightYTarget, rotateXTarget, rotateYTarget]);

  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center pb-4 [perspective:900px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        className="relative h-[64%] w-[78%] min-w-[280px] [transform-style:preserve-3d]"
        animate={{ scale: active ? 1.03 : 0.96, y: active ? -2 : 3 }}
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
      >
        <div className="absolute left-[-45%] top-[45%] h-[3px] w-[83%] rotate-[8deg] bg-gradient-to-r from-transparent via-white to-white blur-[0.2px] shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
        <motion.div
          className="absolute left-[56%] top-[49%] h-[20%] w-[72%] origin-left -rotate-3 bg-[linear-gradient(90deg,rgba(255,255,255,.95),rgba(37,245,208,.75)_18%,rgba(55,129,255,.55)_35%,rgba(255,210,65,.46)_58%,rgba(255,70,70,.15)_78%,transparent)] blur-[4px] [clip-path:polygon(0_45%,100%_0,100%_100%,0_55%)]"
          style={{ x: beamX }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 -ml-[5.5rem] -mt-[5.5rem] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.34),rgba(37,245,208,.12)_28%,transparent_68%)] mix-blend-screen blur-xl"
          style={{ x: lightX, y: lightY }}
        />
        <svg className="relative z-10 h-full w-full overflow-visible" viewBox="0 0 420 300" aria-hidden="true">
          <defs>
            <linearGradient id="prismFaceA" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="white" stopOpacity="0.04" />
              <stop offset="0.5" stopColor="#8feee0" stopOpacity="0.13" />
              <stop offset="1" stopColor="white" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="prismEdge" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="white" stopOpacity="0.2" />
              <stop offset="0.45" stopColor="white" stopOpacity="0.9" />
              <stop offset="0.7" stopColor="#25f5d0" stopOpacity="0.38" />
              <stop offset="1" stopColor="white" stopOpacity="0.18" />
            </linearGradient>
            <filter id="edgeGlow"><feGaussianBlur stdDeviation="2.4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <motion.polygon points="205,24 94,241 326,258" fill="url(#prismFaceA)" stroke="url(#prismEdge)" strokeWidth="2" filter="url(#edgeGlow)" animate={{ opacity: active ? 1 : 0.72 }} />
          <polygon points="205,24 292,94 326,258" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.38)" strokeWidth="1.4" />
          <polygon points="94,241 292,94 326,258" fill="rgba(37,245,208,.025)" stroke="rgba(255,255,255,.28)" strokeWidth="1.2" />
          <line x1="205" y1="24" x2="326" y2="258" stroke="rgba(255,255,255,.72)" strokeWidth="1.3" />
          <line x1="94" y1="241" x2="292" y2="94" stroke="rgba(255,255,255,.25)" />
          <circle cx="224" cy="149" r="4" fill="#fff" filter="url(#edgeGlow)" />
        </svg>
      </motion.div>
    </div>
  );
}

function PressurePanel({ active, onActivate }: PanelProps) {
  return (
    <PanelShell active={active} onActivate={onActivate} number="02" label="TEXT PRESSURE" className="xl:[grid-column:3] xl:[grid-row:1]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_52%,rgba(37,245,208,0.08),transparent_18%)]" />
      <PressureLines active={active} />
      <div className="absolute inset-0 z-10 flex items-center justify-center px-7 pt-5">
        <PressureWord />
      </div>
    </PanelShell>
  );
}

function PressureWord() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  const resetLetters = useCallback(() => {
    lettersRef.current.forEach((letter) => {
      if (!letter) return;
      letter.style.transform = "translate3d(0, 0, 0) scaleX(1) scaleY(1)";
      letter.style.fontWeight = "560";
      letter.style.filter = "blur(0px)";
    });
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const container = containerRef.current;
    if (!container) return;

    lettersRef.current.forEach((letter) => {
      if (!letter) return;
      const rect = letter.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      const influence = Math.max(0, 1 - distance / 175);
      const direction = dx === 0 ? 0 : Math.sign(dx);

      letter.style.transform = `translate3d(${(-direction * influence * 9).toFixed(2)}px, ${(dy * influence * 0.06).toFixed(2)}px, 0) scaleX(${(1 + influence * 0.48).toFixed(3)}) scaleY(${(1 - influence * 0.14).toFixed(3)})`;
      letter.style.fontWeight = String(Math.round(560 + influence * 340));
      letter.style.filter = `blur(${(influence * 0.18).toFixed(2)}px)`;
    });
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetLetters}
      className="flex w-full cursor-crosshair items-center justify-center py-14"
      aria-label="Pressure"
    >
      {"PRESSURE".split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          ref={(node) => { lettersRef.current[index] = node; }}
          aria-hidden="true"
          className="inline-block origin-center text-[clamp(3.1rem,5.7vw,7rem)] leading-none tracking-[-0.12em] text-white/80 transition-[transform,font-weight,filter] duration-100 ease-out"
          style={{ fontWeight: 560 }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

function PressureLines({ active }: { active: boolean }) {
  return (
    <motion.div
      className="absolute left-[52%] top-[52%] h-0 w-0"
      animate={{ scale: active ? 1.06 : 0.9, opacity: active ? 0.7 : 0.35 }}
      transition={{ type: "spring", stiffness: 90, damping: 18 }}
    >
      {Array.from({ length: 36 }, (_, index) => (
        <span
          key={index}
          className="absolute left-0 top-0 h-px w-[420px] origin-left bg-gradient-to-r from-[#25f5d0]/65 via-white/10 to-transparent"
          style={{ transform: `rotate(${index * 10}deg) translateX(10px)` }}
        />
      ))}
    </motion.div>
  );
}

function KineticPanel({ active, onActivate }: PanelProps) {
  const xTarget = useMotionValue(0);
  const yTarget = useMotionValue(0);
  const dialTarget = useMotionValue(0);
  const tensionTarget = useMotionValue(1);
  const x = useSpring(xTarget, { stiffness: 190, damping: 16, mass: 0.55 });
  const y = useSpring(yTarget, { stiffness: 190, damping: 16, mass: 0.55 });
  const dialRotate = useSpring(dialTarget, { stiffness: 135, damping: 18, mass: 0.7 });
  const tensionScale = useSpring(tensionTarget, { stiffness: 170, damping: 20, mass: 0.5 });
  const reduceMotion = useReducedMotion();

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    xTarget.set(dx * 0.3);
    yTarget.set(dy * 0.3);
    dialTarget.set(dx * 0.16);
    tensionTarget.set(1 + Math.min(Math.hypot(dx, dy) / rect.width, 0.42));
  }, [dialTarget, reduceMotion, tensionTarget, xTarget, yTarget]);

  const resetButton = useCallback(() => {
    xTarget.set(0);
    yTarget.set(0);
    dialTarget.set(0);
    tensionTarget.set(1);
  }, [dialTarget, tensionTarget, xTarget, yTarget]);

  return (
    <PanelShell active={active} onActivate={onActivate} number="03" label="KINETIC BUTTON" className="xl:[grid-column:1] xl:[grid-row:2]">
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <motion.button
          type="button"
          className="relative flex h-36 w-36 items-center justify-center rounded-full border border-[#25f5d0]/55 font-mono text-sm tracking-[0.22em] text-white/70 shadow-[0_0_35px_rgba(37,245,208,0.06)] sm:h-40 sm:w-40"
          animate={{ scale: active ? 1.04 : 0.96 }}
          whileTap={{ scale: 0.94 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetButton}
          onBlur={resetButton}
          style={{ x, y }}
          transition={{ type: "spring", stiffness: 170, damping: 15, mass: 0.55 }}
        >
          <DialTicks rotate={dialRotate} />
          ENGAGE
          <span className="absolute right-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#25f5d0] shadow-[0_0_12px_#25f5d0]" />
        </motion.button>
        <motion.div
          className="ml-0 h-px w-[82px] origin-left bg-[#25f5d0]/75"
          animate={{ opacity: active ? 1 : 0.55 }}
          style={{ scaleX: tensionScale }}
          transition={{ duration: 0.2 }}
        />
        <div className="relative h-2.5 w-2.5 rounded-full bg-[#25f5d0] shadow-[0_0_10px_#25f5d0]" />
        <div className="ml-3 font-mono text-[10px] leading-5 text-[#25f5d0]/80">
          TENSION<br />0.72 N
        </div>
      </div>
    </PanelShell>
  );
}

function DialTicks({ rotate }: { rotate: MotionValue<number> }) {
  return (
    <motion.span className="pointer-events-none absolute inset-[-15px]" style={{ rotate }}>
      {Array.from({ length: 48 }, (_, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2 h-px w-2 origin-[-84px_center] bg-white/30"
          style={{ transform: `translateX(84px) rotate(${index * 7.5}deg)` }}
        />
      ))}
    </motion.span>
  );
}

function ParticlePanel({ active, onActivate }: PanelProps) {
  return (
    <PanelShell active={active} onActivate={onActivate} number="04" label="PARTICLE FIELD" className="xl:[grid-column:2] xl:[grid-row:2]">
      <ParticleVortex active={active} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,.05)_45%,rgba(0,0,0,.84)_100%)]" />
    </PanelShell>
  );
}

function ParticleVortex({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, inside: false });
  const activeRef = useRef(active);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current.x = (event.clientX - rect.left) / rect.width - 0.5;
    pointerRef.current.y = (event.clientY - rect.top) / rect.height - 0.5;
    pointerRef.current.inside = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointerRef.current.inside = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let elapsed = 0;
    let previousTime = performance.now();
    let animationFrame = 0;
    let isVisible = true;
    let isDocumentVisible = document.visibilityState === "visible";
    const particles = Array.from({ length: 1450 }, (_, index) => ({
      radius: 5 + Math.pow((index % 290) / 290, 0.72) * 260 + Math.random() * 14,
      angle: Math.floor(index / 290) * ((Math.PI * 2) / 5) + ((index % 290) / 290) * Math.PI * 4.7 + (Math.random() - 0.5) * 0.24,
      size: 0.35 + Math.random() * 1.25,
      alpha: 0.18 + Math.random() * 0.7,
      arm: index % 5,
    }));

    const draw = (time = performance.now()) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);
      const cx = rect.width / 2;
      const cy = rect.height / 2 + 10;
      const scale = Math.min(rect.width / 570, rect.height / 390);
      const delta = Math.min((time - previousTime) / 16.667, 2);
      previousTime = time;
      elapsed += reduceMotion ? 0 : delta * (activeRef.current ? 0.0105 : 0.0048);
      const pointer = pointerRef.current;
      const pointerX = cx + pointer.x * rect.width;
      const pointerY = cy + pointer.y * rect.height;
      const pointerRadius = 118 * scale;

      particles.forEach((particle) => {
        let spiral = particle.angle + particle.radius * 0.031 + elapsed + particle.arm * 0.07;
        const radius = particle.radius * scale;
        let x = cx + Math.cos(spiral) * radius + (pointer.inside ? pointer.x * radius * 0.035 : 0);
        let y = cy + Math.sin(spiral) * radius * 0.48 + (pointer.inside ? pointer.y * radius * 0.02 : 0);

        if (pointer.inside && !reduceMotion) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);

          if (distance < pointerRadius && distance > 0.1) {
            const force = Math.pow(1 - distance / pointerRadius, 2);
            spiral += force * 0.42;
            x += (dx / distance) * force * 32 * scale + Math.cos(spiral + Math.PI / 2) * force * 9;
            y += (dy / distance) * force * 22 * scale + Math.sin(spiral + Math.PI / 2) * force * 7;
          }
        }

        const cyan = particle.radius < 50 || particle.arm === 0;
        context.fillStyle = cyan
          ? `rgba(37,245,208,${particle.alpha * 0.75})`
          : `rgba(255,255,255,${particle.alpha})`;
        context.beginPath();
        context.arc(x, y, particle.size * scale, 0, Math.PI * 2);
        context.fill();
      });

      const glow = context.createRadialGradient(cx, cy, 0, cx, cy, 55 * scale);
      glow.addColorStop(0, "rgba(37,245,208,.95)");
      glow.addColorStop(0.08, "rgba(37,245,208,.34)");
      glow.addColorStop(1, "rgba(37,245,208,0)");
      context.fillStyle = glow;
      context.fillRect(cx - 60 * scale, cy - 60 * scale, 120 * scale, 120 * scale);
    };

    const stop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const loop = (time: number) => {
      if (!isVisible || !isDocumentVisible || reduceMotion) {
        animationFrame = 0;
        return;
      }
      draw(time);
      animationFrame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion) {
        draw();
        return;
      }
      if (!animationFrame && isVisible && isDocumentVisible) {
        previousTime = performance.now();
        animationFrame = requestAnimationFrame(loop);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      if (reduceMotion || !animationFrame) draw();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      if (isVisible) start();
      else stop();
    }, { rootMargin: "120px" });
    intersectionObserver.observe(canvas);

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      if (isDocumentVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    draw();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [reduceMotion]);

  return (
    <div
      className="absolute inset-0 cursor-crosshair [contain:strict]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}

function SourcePanel({ active, onActivate, onCopy, copied }: PanelProps & { onCopy: () => void; copied: boolean }) {
  return (
    <PanelShell active={active} onActivate={onActivate} number="05" label="SOURCE" className="xl:[grid-column:3] xl:[grid-row:2]">
      <button
        type="button"
        onClick={onCopy}
        className="absolute right-5 top-4 z-30 text-[#25f5d0]/75 transition-colors hover:text-[#25f5d0]"
        aria-label="Copy source"
      >
        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
      </button>
      <div className="absolute inset-x-5 bottom-5 top-14 overflow-hidden font-mono text-[9px] leading-[1.72] sm:text-[10px] lg:text-[11px]">
        {sourceLines.map((line, index) => (
          <div key={index} className="flex min-h-[1.72em] whitespace-pre">
            <span className="mr-5 w-4 shrink-0 text-right text-white/20">{String(index + 1).padStart(2, "0")}</span>
            <code>
              <span className="text-[#8091bd]">{line[0]}</span>
              <span className="text-white/54">{line[1]}</span>
              <span className="text-[#9ec9b8]">{line[2]}</span>
              <span className="text-[#61c7a4]">{line[3]}</span>
            </code>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function ControlRail({
  activeCategory,
  onCategoryChange,
  onCopy,
  copied,
}: {
  activeCategory: (typeof categories)[number];
  onCategoryChange: (category: (typeof categories)[number]) => void;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-40 flex h-[76px] border-t border-white/[0.13] bg-black/95 backdrop-blur-xl">
      <div className="flex min-w-0 flex-1 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "relative min-w-[92px] border-r border-white/[0.13] px-7 font-mono text-[11px] tracking-[0.08em] transition-colors sm:min-w-[120px]",
              activeCategory === category ? "text-[#25f5d0]" : "text-white/40 hover:text-white/75"
            )}
          >
            {category}
            {activeCategory === category && <motion.span layoutId="category-line" className="absolute inset-x-5 bottom-0 h-0.5 bg-[#25f5d0]" />}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="group flex w-[210px] shrink-0 items-center justify-center gap-4 border-l border-white/[0.13] font-mono text-xs tracking-[0.1em] text-[#25f5d0] transition-colors hover:bg-[#25f5d0]/[0.04] sm:w-[290px]"
      >
        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        <span className="hidden sm:inline">{copied ? "SOURCE COPIED" : "COPY SOURCE"}</span>
      </button>
    </div>
  );
}

function PanelTicks({ active }: { active: boolean }) {
  return (
    <>
      <span className={cn("absolute left-4 top-4 z-20 h-2 w-px bg-white/20", active && "bg-[#25f5d0]")} />
      <span className={cn("absolute left-4 top-4 z-20 h-px w-2 bg-white/20", active && "bg-[#25f5d0]")} />
      <span className={cn("absolute bottom-4 right-4 z-20 h-2 w-px bg-white/20", active && "bg-[#25f5d0]")} />
      <span className={cn("absolute bottom-4 right-4 z-20 h-px w-2 bg-white/20", active && "bg-[#25f5d0]")} />
    </>
  );
}

function CornerMarks() {
  return (
    <>
      <span className="absolute -left-1 -top-1 h-2 w-px bg-white/70" />
      <span className="absolute -left-1 -top-1 h-px w-2 bg-white/70" />
      <span className="absolute -bottom-1 -right-1 h-2 w-px bg-white/70" />
      <span className="absolute -bottom-1 -right-1 h-px w-2 bg-white/70" />
    </>
  );
}

function TelemetryLine({ active }: { active: boolean }) {
  return (
    <svg className="absolute bottom-5 left-[30%] z-20 h-10 w-[54%]" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M0 32 L35 31 L44 26 L51 31 L61 25 L68 29 L77 18 L84 30 L96 21 L105 28 L117 9 L125 28 L139 22 L149 31 L161 26 L169 13 L181 27 L193 24 L205 31 L218 26 L231 29 L244 24 L257 31 L269 27 L282 31 L300 30"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.3"
        initial={false}
        animate={{ pathLength: active ? 1 : 0.55, opacity: active ? 0.85 : 0.3 }}
        transition={{ duration: 0.8 }}
      />
      <path d="M0 35 H300" stroke="rgba(255,255,255,.12)" />
    </svg>
  );
}

function Noise() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 opacity-[0.035] mix-blend-screen"
      style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
