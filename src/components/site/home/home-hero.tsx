"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { fadeUp, heroHeadlineTransition, heroPreviewTransition, heroViewport } from "./animations";
import { heroHeadlinePhrases, heroPreviewSlides, heroPrimaryPoints } from "./data";

export function HomeHero() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const activePhrase = heroHeadlinePhrases[activePhraseIndex];
  const activeSlide = heroPreviewSlides[activeSlideIndex];
  const formattedActiveSlide = String(activeSlideIndex + 1).padStart(2, "0");
  const formattedTotalSlides = String(heroPreviewSlides.length).padStart(2, "0");
  const headlineTransition = shouldReduceMotion ? { duration: 0 } : heroHeadlineTransition;
  const previewTransition = shouldReduceMotion ? { duration: 0 } : heroPreviewTransition;
  const reducedMotionEnter = { opacity: 1 };
  const reducedMotionExit = { opacity: 0 };

  const nextSlideIndex = useMemo(
    () => (activeSlideIndex + 1) % heroPreviewSlides.length,
    [activeSlideIndex]
  );

  useEffect(() => {
    if (isPaused || shouldReduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActivePhraseIndex((current) => (current + 1) % heroHeadlinePhrases.length);
      setActiveSlideIndex((current) => (current + 1) % heroPreviewSlides.length);
    }, 4200);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused, shouldReduceMotion]);

  const pauseAutoplay = () => {
    setIsPaused(true);
  };

  const resumeAutoplay = () => {
    setIsPaused(false);
  };

  const showPreviousSlide = () => {
    pauseAutoplay();
    setActivePhraseIndex((current) => (current - 1 + heroHeadlinePhrases.length) % heroHeadlinePhrases.length);
    setActiveSlideIndex((current) => (current - 1 + heroPreviewSlides.length) % heroPreviewSlides.length);
  };

  const showNextSlide = () => {
    pauseAutoplay();
    setActivePhraseIndex((current) => (current + 1) % heroHeadlinePhrases.length);
    setActiveSlideIndex((current) => (current + 1) % heroPreviewSlides.length);
  };

  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40 [mask-image:radial-gradient(circle_at_top,black,transparent_75%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-56px)] max-w-7xl gap-14 px-6 pb-20 pt-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-10 lg:pt-24">
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
            <span className="block min-h-[2.15em] sm:min-h-[1.9em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activePhrase}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
                  animate={shouldReduceMotion ? reducedMotionEnter : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={shouldReduceMotion ? reducedMotionExit : { opacity: 0, y: -24, filter: "blur(10px)" }}
                  transition={headlineTransition}
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
                <span>{formattedActiveSlide} / {formattedTotalSlides}</span>
              </div>

              <div className="grid gap-4" onFocusCapture={pauseAutoplay}>
                <div className="min-h-[340px] sm:min-h-[320px] rounded-[1.5rem] border border-white/8 bg-black/40 p-5 sm:p-8">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeSlide.title}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
                      animate={shouldReduceMotion ? reducedMotionEnter : { opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={shouldReduceMotion ? reducedMotionExit : { opacity: 0, y: -24, filter: "blur(10px)" }}
                      transition={previewTransition}
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
                      onClick={() => {
                        if (isPaused) {
                          resumeAutoplay();
                          return;
                        }

                        pauseAutoplay();
                      }}
                      aria-label={isPaused ? "Resume feature preview autoplay" : "Pause feature preview autoplay"}
                      aria-pressed={isPaused}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-white/88 transition-colors hover:bg-white/[0.08]"
                    >
                      {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                      <span>{isPaused ? "Play" : "Pause"}</span>
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
                          pauseAutoplay();
                          setActivePhraseIndex(index % heroHeadlinePhrases.length);
                          setActiveSlideIndex(index);
                        }}
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
