"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { KineticButton } from "@/components/ui/kinetic-button";
import { TextPressure } from "@/components/ui/text-pressure";
import { heroHeadlinePhrases, heroPreviewSlides, proofItems } from "./data";

export function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activePhrase = heroHeadlinePhrases[activeIndex % heroHeadlinePhrases.length] ?? heroHeadlinePhrases[0];
  const activeSlide = heroPreviewSlides[activeIndex % heroPreviewSlides.length] ?? heroPreviewSlides[0];

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroPreviewSlides.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.12),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-56px)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.58fr)] lg:px-10">
        <div className="flex max-w-[40rem] flex-col justify-center">
          <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.34em] text-white/42">
            AuraBitz / source-first UI
          </p>

          <h1 className="max-w-[13ch] text-[clamp(3.2rem,8.4vw,7rem)] font-semibold leading-[0.84] tracking-[-0.09em] text-white">
            <span className="block min-h-[1.7em] sm:min-h-[1.68em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activePhrase}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -16, filter: "blur(8px)" }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {activePhrase}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="block text-white/42">without the clutter.</span>
          </h1>

          <p className="mt-6 max-w-[33rem] text-base leading-7 text-white/48 sm:text-lg sm:leading-8">
            Copy dark components, WebGL backgrounds, and landing blocks that are organized, responsive, and ready to edit.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-colors duration-300 hover:bg-neutral-200"
            >
              Browse components
            </Link>
            <Link
              href="/blocks"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/[0.08]"
            >
              View blocks
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-10 grid max-w-2xl gap-5 border-t border-white/8 pt-6 sm:grid-cols-3">
            {proofItems.map((item) => (
              <li key={item.label}>
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/35">{item.label}</p>
                <p className="mt-2 text-sm font-medium text-white/82">{item.value}</p>
                <p className="mt-1 text-sm leading-5 text-white/38">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-[390px] rounded-[1.45rem] border border-white/10 bg-[#050505] p-5 shadow-[0_32px_80px_rgba(0,0,0,0.34)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Now showing</p>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25">
                {String(activeIndex + 1).padStart(2, "0")} / {String(heroPreviewSlides.length).padStart(2, "0")}
              </p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -14, filter: "blur(8px)" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="py-6"
              >
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">{activeSlide.eyebrow}</p>
                <HeroLivePreview activeIndex={activeIndex} title={activeSlide.title} />
                <p className="mt-5 max-w-xs text-sm leading-6 text-white/42">{activeSlide.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 border-t border-white/8 pt-4">
              {heroPreviewSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${slide.title}`}
                  aria-pressed={index === activeIndex}
                  className="h-2 flex-1 rounded-full bg-white/12"
                >
                  <span className={index === activeIndex ? "block h-full rounded-full bg-white" : "block h-full rounded-full bg-transparent"} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroLivePreview({ activeIndex, title }: { activeIndex: number; title: string }) {
  if (title === "Kinetic Button") {
    return (
      <div className="mt-6 flex min-h-44 items-center justify-center rounded-[1.25rem] border border-white/8 bg-black/35">
        <KineticButton
          type="button"
          variant="secondary"
          magneticPull={0.26}
          className="h-14 px-8 text-sm"
        >
          Drag the light
          <ArrowUpRight className="h-4 w-4" />
        </KineticButton>
      </div>
    );
  }

  if (title === "Text Pressure") {
    return (
      <div className="mt-6 flex min-h-44 items-center justify-center rounded-[1.25rem] border border-white/8 bg-black/35 px-5">
        <TextPressure
          baseWeight={420}
          maxWeight={900}
          baseScale={1}
          maxScale={1.18}
          radius={110}
          className="text-center text-[clamp(2.3rem,7vw,4.2rem)] font-semibold leading-none tracking-[-0.08em] text-white"
        >
          PRESSURE
        </TextPressure>
      </div>
    );
  }

  return (
    <div className="mt-6 min-h-44 rounded-[1.25rem] border border-white/8 bg-black/35 p-4">
      <div className="flex items-center justify-between border-b border-white/8 pb-3">
        <div className="h-2 w-16 rounded-full bg-white/24" />
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-white/18" />
          <div className="h-2 w-2 rounded-full bg-white/18" />
          <div className="h-2 w-2 rounded-full bg-white/18" />
        </div>
      </div>
      <div className="grid gap-4 pt-6 sm:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          key={`copy-${activeIndex}`}
          initial={{ opacity: 0.45, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <div className="h-9 rounded-lg bg-white/84" />
          <div className="h-3 w-4/5 rounded-full bg-white/18" />
          <div className="h-3 w-2/3 rounded-full bg-white/12" />
        </motion.div>
        <motion.div
          key={`panel-${activeIndex}`}
          initial={{ opacity: 0.45, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"
        >
          <div className="h-16 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.38),rgba(255,255,255,0.05)_45%,transparent_72%)]" />
          <div className="mt-3 h-2 w-2/3 rounded-full bg-white/16" />
        </motion.div>
      </div>
    </div>
  );
}
