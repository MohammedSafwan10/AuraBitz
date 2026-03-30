"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeUp, heroHeadlineTransition, heroPreviewTransition, heroViewport } from "./animations";
import { heroHeadlinePhrases, heroPrimaryPoints, heroPreviewSlides } from "./data";

export function HomeHero() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const activePhrase = heroHeadlinePhrases[activePhraseIndex] ?? heroHeadlinePhrases[0];
  const activeSlide = heroPreviewSlides[activeSlideIndex] ?? heroPreviewSlides[0];
  const hasMultipleSlides = heroPreviewSlides.length > 1;

  useEffect(() => {
    if (shouldReduceMotion || !hasMultipleSlides) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlideIndex((current) => (current + 1) % heroPreviewSlides.length);
      setActivePhraseIndex((current) => (current + 1) % heroHeadlinePhrases.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [hasMultipleSlides, shouldReduceMotion]);

  const selectSlide = (index: number) => {
    setActiveSlideIndex(index);
    setActivePhraseIndex(index % heroHeadlinePhrases.length);
  };

  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_32%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(0,194,255,0.14),transparent_24%),radial-gradient(circle_at_16%_22%,rgba(135,88,255,0.16),transparent_26%),radial-gradient(circle_at_50%_78%,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      <div className="absolute inset-x-0 top-0 h-[20rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-56px)] max-w-7xl items-center gap-7 px-6 pb-8 pt-12 sm:px-8 md:gap-9 md:pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.84fr)] lg:px-10 lg:pt-14">
        <div className="flex max-w-[34rem] flex-col justify-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={0}
            variants={fadeUp}
            className="mb-3 text-[10px] font-mono uppercase tracking-[0.36em] text-white/38"
          >
            AuraBitz / premium motion library
          </motion.p>

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={1}
            variants={fadeUp}
            className="max-w-[12ch] text-[clamp(2.55rem,5.4vw,4.45rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-white"
          >
            <span className="block min-h-[2.15em] sm:min-h-[1.92em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activePhrase}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -18, filter: "blur(8px)" }}
                  transition={shouldReduceMotion ? { duration: 0 } : heroHeadlineTransition}
                  className="block"
                >
                  {activePhrase}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="block text-white/60">that feels premium.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={2}
            variants={fadeUp}
            className="mt-4 max-w-[31rem] text-sm leading-6 text-white/44 sm:text-[15px] sm:leading-[1.7]"
          >
            Components and blocks with stronger motion, darker materials, and cleaner visual weight.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={heroViewport}
            custom={3}
            variants={fadeUp}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
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
            className="mt-6 grid gap-2 text-sm text-white/55 sm:grid-cols-3"
          >
            {heroPrimaryPoints.map((item) => (
              <li key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 backdrop-blur-sm">
                <item.icon className="h-4 w-4 text-white/78" />
                <span className="text-[13px] tracking-[-0.01em] text-white/62">{item.label}</span>
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
          className="flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[470px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#040404] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.48)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_46%)]" />
            <div className="absolute -right-8 top-10 h-32 w-32 rounded-full bg-cyan-400/12 blur-3xl" />
            <div className="absolute -left-10 bottom-6 h-32 w-32 rounded-full bg-violet-500/12 blur-3xl" />
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <div className="relative rounded-[1.55rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4">
              <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/50">
                <span>Featured preview</span>
                <span>{String(activeSlideIndex + 1).padStart(2, "0")} / {String(heroPreviewSlides.length).padStart(2, "0")}</span>
              </div>

              <div className="grid gap-3.5">
                <div className="relative overflow-hidden rounded-[1.4rem] border border-white/8 bg-black/45 p-3.5">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeSlide.title}
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -18, filter: "blur(8px)" }}
                      transition={shouldReduceMotion ? { duration: 0 } : heroPreviewTransition}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_38%,transparent_62%,rgba(255,255,255,0.04))]" />
                      <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-white/6 blur-2xl" />
                      <div className="relative flex min-h-[228px] flex-col justify-between rounded-[1.2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.3))] p-4.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-[10px] uppercase tracking-[0.34em] text-white/52">{activeSlide.eyebrow}</span>
                          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/46">
                            {activeSlide.theme}
                          </div>
                        </div>
                        <div className="space-y-2.5">
                          <p className="max-w-sm text-[1.7rem] font-medium leading-[0.96] tracking-[-0.04em] text-white">
                            {activeSlide.title}
                          </p>
                          <p className="max-w-sm text-sm leading-5.5 text-white/42">{activeSlide.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3 backdrop-blur-sm">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Surface</p>
                            <p className="mt-1.5 text-sm text-white/78">Premium dark</p>
                          </div>
                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3 backdrop-blur-sm">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Use case</p>
                            <p className="mt-1.5 text-sm text-white/78">Hero-grade UI</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.02] p-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/52">Why it lands</p>
                    <p className="mt-2.5 text-[15px] font-medium tracking-[-0.02em] text-white/90">Cinematic energy. Cleaner organization.</p>
                    <p className="mt-1.5 text-sm leading-5.5 text-white/41">
                      One hero, one message, one focused preview. Easier to scan, easier to trust.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.02] p-3.5">
                  <div className="flex items-center gap-2">
                    {heroPreviewSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => selectSlide(index)}
                        aria-label={`Show ${slide.title}`}
                        aria-pressed={index === activeSlideIndex}
                        className="group flex items-center"
                      >
                        <span
                          className={index === activeSlideIndex ? "h-2.5 w-8 rounded-full bg-white transition-all" : "h-2.5 w-2.5 rounded-full bg-white/25 transition-all group-hover:bg-white/45"}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => selectSlide((activeSlideIndex - 1 + heroPreviewSlides.length) % heroPreviewSlides.length)}
                      aria-label="Show previous feature preview"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition-colors hover:bg-white/[0.08]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => selectSlide((activeSlideIndex + 1) % heroPreviewSlides.length)}
                      aria-label="Show next feature preview"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition-colors hover:bg-white/[0.08]"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <Link
                      href={activeSlide.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-white/88 transition-colors hover:text-white"
                    >
                      <span>{activeSlide.ctaLabel}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
