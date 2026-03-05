"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Header } from "@/components/site/header";
import { KineticButton } from "@/components/ui/kinetic-button";
import { HolographicCard } from "@/components/ui/holographic-card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TextPressure } from "@/components/ui/text-pressure";
import { BlurText } from "@/components/ui/blur-text";
import { ScrambleReveal } from "@/components/ui/scramble-reveal";
import { SplitText } from "@/components/ui/split-text";
import { TextType } from "@/components/ui/text-type";
import { KineticText } from "@/components/ui/kinetic-text";
import { Layers, Zap, Triangle, Copy, Gauge, Palette, Code2, Sparkles, ScanLine, TextCursor } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.96 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden selection:bg-white/30 selection:text-white">
      <Header />

      {/* ── CRISP GRID BACKGROUND (hero only) ── */}
      <div className="absolute inset-0 z-0 h-[100vh] w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 1: HERO — Split layout (text left, bento right)   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12 gap-8 sm:gap-10 pt-20 sm:pt-24 pb-12 min-h-screen">
        {/* LEFT: Hero Text */}
        <div className="flex-1 flex flex-col items-start text-left max-w-xl w-full">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} custom={0} variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/[0.02]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">AuraBitz Core v1.0</span>
          </motion.div>

          <motion.h1
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} custom={1} variants={fadeUp}
            className="text-[clamp(2.6rem,11vw,4rem)] lg:text-[64px] font-medium tracking-tight leading-[1.05] mb-5 text-white"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-serif">perfection.</span><br />
            Component by component.
          </motion.h1>

          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} custom={2} variants={fadeUp}
            className="text-base text-white/50 mb-8 leading-relaxed font-light max-w-lg"
          >
            Architectural-grade React components. Precision-crafted animations, extreme performance, and absolutely uncompromising minimal aesthetics.
          </motion.p>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} custom={3} variants={fadeUp}
            className="flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Link href="/docs">
              <KineticButton className="bg-white text-black hover:bg-neutral-200 h-10 px-5 rounded-full text-sm font-medium shadow-[0_0_40px_rgba(255,255,255,0.1)]" magneticPull={0.2}>
                Explore Components
              </KineticButton>
            </Link>
            <Link href="https://github.com/MohammedSafwan10/AuraBitz" target="_blank">
              <KineticButton className="bg-transparent text-white hover:bg-white/5 border border-white/10 h-10 px-5 rounded-full text-sm font-medium" magneticPull={0.1}>
                GitHub
              </KineticButton>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: Live Bento Preview (Auto Carousel) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-xl relative flex items-center justify-center min-h-[850px] sm:min-h-[520px]"
        >
          {/* Progress Indicators */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex-col gap-3 z-20 pointer-events-none hidden lg:flex">
            {[0, 1, 2].map(i => (
              <div key={i} className={`w-1 transition-all duration-700 rounded-full ${activeSlide === i ? 'h-8 bg-white' : 'h-2 bg-white/20'}`} />
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            {activeSlide === 0 && (
              <motion.div
                key="slide0"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.96 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)", scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col gap-4 absolute"
              >
                {/* Top Hero Card - Holographic */}
                <div className="w-full relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex items-center justify-center p-8 sm:p-12 hover:border-white/20 transition-all shadow-2xl h-[260px] sm:h-[300px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
                  <HolographicCard className="w-full max-w-[280px] h-36 sm:h-44 p-4 sm:p-6 flex flex-col justify-end gap-1 text-left border-white/10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer">
                    <span className="text-[9px] font-mono text-white/40 tracking-widest block mb-1 pointer-events-none">01 // INTERFACE</span>
                    <span className="font-medium text-white/90 text-sm sm:text-base block pointer-events-none">Holographic Material</span>
                  </HolographicCard>
                </div>

                {/* Bottom Row - Split */}
                <div className="w-full flex flex-col sm:flex-row gap-4 h-auto sm:h-[180px]">
                  {/* Kinetic */}
                  <div className="flex-1 relative rounded-3xl border border-white/10 bg-[#050505] overflow-hidden flex flex-col items-center justify-center p-8 hover:border-white/20 transition-all min-h-[160px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <KineticButton className="relative z-10 bg-white/[0.03] text-white/80 border border-white/10 hover:bg-white/[0.08] hover:text-white text-xs py-3 px-6 shadow-[0_0_20px_rgba(255,255,255,0.03)] focus:outline-none" magneticPull={0.4}>
                      Kinetic Feedback
                    </KineticButton>
                    <span className="text-[10px] text-white/30 mt-5 pointer-events-none text-center">Spring-loaded physics</span>
                  </div>

                  {/* Spotlight */}
                  <div className="flex-1 relative rounded-3xl border border-white/10 bg-[#050505] p-1.5 overflow-hidden flex hover:border-white/20 transition-all min-h-[160px]">
                    <SpotlightCard className="w-full h-full p-6 flex flex-col justify-between border border-white/[0.06] bg-[#0a0a0a] rounded-2xl" spotlightColor="rgba(255, 255, 255, 0.4)">
                      <Layers className="w-4 h-4 text-white/30 pointer-events-none" />
                      <div className="pointer-events-none">
                        <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1.5 block">Edge Mask</span>
                        <span className="font-medium text-white/80 text-sm">Laser Tracing</span>
                      </div>
                    </SpotlightCard>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSlide === 1 && (
              <motion.div
                key="slide1"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.96 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)", scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col gap-4 absolute"
              >
                {/* Top Hero Card - Text Pressure */}
                <div className="w-full relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center p-5 sm:p-12 hover:border-white/20 transition-all shadow-2xl h-[260px] sm:h-[300px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
                  <span className="text-[9px] font-mono text-white/40 tracking-widest block text-center mb-6 z-10">02 // TYPOGRAPHY</span>
                  <div className="flex-1 w-full max-w-[400px] flex items-center justify-center z-10 pointer-events-auto px-2 sm:px-0">
                    <TextPressure className="text-white/90 text-4xl sm:text-6xl font-bold tracking-tighter w-full">PRESSURE</TextPressure>
                  </div>
                </div>

                {/* Bottom Row - Split */}
                <div className="w-full flex flex-col sm:flex-row gap-4 h-auto sm:h-[180px]">
                  {/* Blur Text */}
                  <div className="flex-1 relative rounded-3xl border border-white/10 bg-[#050505] overflow-hidden flex flex-col items-center justify-center p-6 hover:border-white/20 transition-all min-h-[160px]">
                    <BlurText className="text-xl font-medium text-white/90 tracking-tight" delay={0.2}>Gaussian Fade</BlurText>
                    <span className="text-[10px] text-white/30 mt-4 pointer-events-none text-center">Depth of field animation</span>
                  </div>

                  {/* Scramble Reveal */}
                  <div className="flex-1 relative rounded-3xl border border-white/10 bg-[#050505] p-6 overflow-hidden flex flex-col justify-center hover:border-white/20 transition-all min-h-[160px]">
                    <ScanLine className="w-4 h-4 text-white/30 pointer-events-none mb-3" />
                    <ScrambleReveal className="text-white/80 font-mono text-lg uppercase tracking-wider relative block w-full text-left" duration={1.5}>ENCRYPTED</ScrambleReveal>
                    <span className="text-[10px] text-white/30 mt-3 pointer-events-none">Cyberpunk reveal matrix</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSlide === 2 && (
              <motion.div
                key="slide2"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.96 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)", scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col gap-4 absolute"
              >
                {/* Top Hero Card - Split Text */}
                <div className="w-full relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center p-5 sm:p-12 hover:border-white/20 transition-all shadow-2xl h-[260px] sm:h-[300px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
                  <span className="text-[9px] font-mono text-white/40 tracking-widest block text-center mb-8 pointer-events-none z-10">03 // DYNAMICS</span>
                  <div className="w-full max-w-[380px] text-center z-10 pointer-events-auto px-4">
                    <SplitText className="text-2xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-white/90 text-center leading-[1.05]" delay={0.2}>
                      Granular sequential physics rendering.
                    </SplitText>
                  </div>
                </div>

                {/* Bottom Row - Split */}
                <div className="w-full flex flex-col sm:flex-row gap-4 h-auto sm:h-[180px]">
                  {/* Text Type */}
                  <div className="flex-1 relative rounded-3xl border border-white/10 bg-[#050505] overflow-hidden flex flex-col justify-center p-6 hover:border-white/20 transition-all min-h-[160px] text-left">
                    <TextCursor className="w-4 h-4 text-white/30 pointer-events-none mb-4" />
                    <TextType text="Terminal output..." className="text-base sm:text-lg font-mono text-emerald-400" typingSpeed={0.08} />
                    <span className="text-[10px] text-white/30 mt-3 pointer-events-none">Retro cursor injection</span>
                  </div>

                  {/* Kinetic Text */}
                  <div className="flex-1 relative rounded-3xl border border-white/10 bg-[#050505] p-6 overflow-hidden flex flex-col items-center justify-center hover:border-white/20 transition-all min-h-[160px]">
                    <div className="text-4xl text-white font-medium tracking-tight mb-2">
                      <KineticText>HOVER</KineticText>
                    </div>
                    <span className="text-[10px] text-white/30 mt-3 pointer-events-none text-center">Interactive tracking</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 2: WHY AURABITZ — Value Propositions                */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">Why AuraBitz</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-5">Not another UI kit.</h2>
            <p className="text-white/40 max-w-lg mx-auto text-base leading-relaxed">
              Every component is obsessively engineered for extreme visual quality. No runtime bloat, no wrapper packages. Just pure code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Copy className="w-5 h-5" />,
                title: "Copy & Paste",
                desc: "No npm installs, no version conflicts. Copy the source directly into your project and own it completely.",
              },
              {
                icon: <Gauge className="w-5 h-5" />,
                title: "Zero Bloat",
                desc: "Every component is self-contained. No hidden runtime dependencies, no context providers, no CSS-in-JS overhead.",
              },
              {
                icon: <Palette className="w-5 h-5" />,
                title: "Design-First",
                desc: "Built from Figma-level precision. Every radius, opacity, and timing curve is hand-tuned for premium aesthetics.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                custom={i + 1}
                variants={fadeUp}
                className="group rounded-2xl border border-white/5 bg-[#050505] p-8 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-white/40 group-hover:text-white/70 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-base font-medium text-white/90 mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 3: HOW IT WORKS — Steps                            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">How it works</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">Three steps. Ship faster.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              {
                step: "01",
                icon: <Sparkles className="w-5 h-5" />,
                title: "Pick a component",
                desc: "Browse the catalog. Every component has a live interactive preview so you see exactly what you get.",
              },
              {
                step: "02",
                icon: <Code2 className="w-5 h-5" />,
                title: "Copy the source",
                desc: "One click copies the full, production-ready source code. No package locks, no version mismatches.",
              },
              {
                step: "03",
                icon: <Zap className="w-5 h-5" />,
                title: "Ship it",
                desc: "Drop into your Next.js project. Tailwind + Framer Motion. It just works, immediately.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                custom={i + 1}
                variants={fadeUp}
                className="bg-[#050505] p-10 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-mono text-white/20 tracking-widest">{item.step}</span>
                  <div className="h-px flex-1 bg-white/5" />
                  <div className="text-white/30">{item.icon}</div>
                </div>
                <h3 className="text-lg font-medium text-white/90 mb-3">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 5: TECH STACK                                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 py-28 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} custom={0} variants={fadeUp}
            className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4"
          >
            Built on
          </motion.p>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} custom={1} variants={fadeUp}
            className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-12"
          >
            Modern foundations.
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { name: "Next.js", detail: "App Router" },
              { name: "Tailwind CSS", detail: "v4" },
              { name: "Framer Motion", detail: "Animations" },
              { name: "TypeScript", detail: "Strict mode" },
            ].map((tech, i) => (
              <motion.div
                key={tech.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                custom={i + 2}
                variants={fadeUp}
                className="bg-[#050505] py-10 px-6 flex flex-col items-center"
              >
                <span className="text-sm font-medium text-white/80 mb-1">{tech.name}</span>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{tech.detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 6: CTA                                             */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 py-28 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} custom={0} variants={fadeUp}
            className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-5"
          >
            Ready to build<br /><span className="text-white/40 italic font-serif">something extraordinary?</span>
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} custom={1} variants={fadeUp}
            className="text-white/40 text-base mb-10 max-w-lg mx-auto leading-relaxed"
          >
            Stop settling for generic components. Start shipping interfaces that make people stop scrolling.
          </motion.p>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} custom={2} variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/docs">
              <KineticButton className="bg-white text-black hover:bg-neutral-200 h-12 px-8 rounded-full text-sm font-medium shadow-[0_0_40px_rgba(255,255,255,0.1)]" magneticPull={0.2}>
                Get Started
              </KineticButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Triangle className="w-2 h-2 fill-white/30 text-white/30 rotate-180" />
            AURABITZ
          </div>
          <p>© 2026 Crafted with precision.</p>
        </div>
      </footer>
    </div>
  );
}
