"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Header } from "@/components/site/header";
import { KineticButton } from "@/components/ui/kinetic-button";
import { HolographicCard } from "@/components/ui/holographic-card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Box, Layers, Zap, Triangle, Copy, Gauge, Palette, Code2, Sparkles } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden selection:bg-white/30 selection:text-white">
      <Header />

      {/* ── CRISP GRID BACKGROUND (hero only) ── */}
      <div className="absolute inset-0 z-0 h-[100vh] w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 1: HERO — Split layout (text left, bento right)   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-[1400px] mx-auto w-full px-8 lg:px-12 gap-12 pt-28 pb-20 min-h-[90vh]">
        {/* LEFT: Hero Text */}
        <div className="flex-1 flex flex-col items-start text-left max-w-xl">
          <motion.div
            initial="hidden" animate="visible" custom={0} variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/[0.02]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">AuraBitz Core v1.0</span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="text-5xl lg:text-7xl font-medium tracking-tight leading-[1.05] mb-5 text-white"
          >
            Engineering <span className="text-white/40 italic font-serif">perfection.</span><br />
            Component by component.
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="text-base text-white/40 mb-10 leading-relaxed font-light max-w-lg"
          >
            Architectural-grade React components. Precision-crafted animations, extreme performance, and absolutely uncompromising minimal aesthetics.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="flex flex-row items-center gap-3"
          >
            <Link href="/docs">
              <KineticButton className="bg-white text-black hover:bg-neutral-200 h-10 px-5 rounded-full text-sm font-medium shadow-[0_0_40px_rgba(255,255,255,0.1)]" magneticPull={0.2}>
                Explore Components
              </KineticButton>
            </Link>
            <Link href="https://github.com" target="_blank">
              <KineticButton className="bg-transparent text-white hover:bg-white/5 border border-white/10 h-10 px-5 rounded-full text-sm font-medium" magneticPull={0.1}>
                GitHub
              </KineticButton>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: Live Bento Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-2xl grid grid-cols-2 grid-rows-2 gap-4 h-[55vh] min-h-[400px]"
        >
          {/* Holographic */}
          <div className="group relative rounded-2xl border border-white/5 bg-[#050505] overflow-hidden flex flex-col hover:border-white/10 transition-colors">
            <div className="p-4 flex-1 flex flex-col items-center justify-center relative z-10">
              <HolographicCard className="w-full max-w-[200px] h-28 p-4 flex flex-col justify-end gap-1 border-white/5 bg-black/50 shadow-2xl">
                <span className="text-[9px] font-mono text-white/40 tracking-widest block">LAYER 01</span>
                <span className="font-medium text-white/80 text-xs block">Holographic Tilt</span>
              </HolographicCard>
            </div>
          </div>

          {/* Kinetic */}
          <div className="group relative rounded-2xl border border-white/5 bg-[#050505] overflow-hidden flex flex-col items-center justify-center hover:border-white/10 transition-colors p-6">
            <Zap className="w-4 h-4 text-white/20 absolute top-4 right-4" />
            <KineticButton className="bg-white/[0.03] text-white border border-white/10 hover:bg-white/[0.08] text-xs py-2 px-4" magneticPull={0.4}>
              Kinetic Feedback
            </KineticButton>
            <p className="text-white/30 text-[10px] mt-4 text-center max-w-[140px] leading-relaxed">Spring physics pointer tracking</p>
          </div>

          {/* Spotlight — full width bottom */}
          <div className="col-span-2 group relative rounded-2xl border border-white/5 bg-[#050505] overflow-hidden flex flex-col md:flex-row items-center hover:border-white/10 transition-colors p-6 gap-6">
            <div className="flex-1 text-left">
              <Layers className="w-4 h-4 text-white/30 mb-3" />
              <h3 className="text-sm font-medium mb-1 text-white/90">Laser Tracing</h3>
              <p className="text-white/30 text-[10px] leading-relaxed max-w-[180px]">Hardware-accelerated edge illumination that hugs element boundaries.</p>
            </div>
            <div className="flex-1 w-full">
              <SpotlightCard className="w-full h-20 p-4 flex flex-col justify-center border-white/5 bg-black" spotlightColor="rgba(255, 255, 255, 0.8)">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Instance Alpha</span>
                <span className="font-medium text-white/70 text-xs">Focus Edge</span>
              </SpotlightCard>
            </div>
          </div>
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
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
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
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
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
      {/* SECTION 4: COMPONENT OVERVIEW — Feature Deep Dive          */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">Components</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-5">Precision execution.</h2>
            <p className="text-white/40 max-w-lg mx-auto text-base leading-relaxed">
              Each component pushes the boundary of what standard React UI can deliver. Here is a closer look.
            </p>
          </div>

          {/* Feature Row 1: Holographic Card */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={0} variants={fadeUp}
            className="flex flex-col md:flex-row items-center gap-12 mb-20"
          >
            <div className="flex-1">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-white/40">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-3">Holographic Card</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                3D perspective transforms driven by spring-smoothed pointer coordinates. A micro-grid texture and localized radial reflection create a physical, machined-metal feel instead of cheap rainbow gradients.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/30" /> Spring-smoothed 3D tilt via Framer Motion</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/30" /> Cursor-tracked radial reflection layer</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/30" /> Sub-pixel micro-grid texture overlay</li>
              </ul>
              <Link href="/docs/holographic-card" className="inline-flex items-center mt-6 text-sm text-white/60 hover:text-white transition-colors">
                View documentation →
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <HolographicCard className="w-72 h-48 p-6 flex flex-col justify-end gap-2 border-white/5 bg-black shadow-2xl">
                <span className="text-[9px] font-mono text-white/40 tracking-widest block">LAYER 01</span>
                <span className="font-medium text-white/80 text-sm block">Hover to interact</span>
              </HolographicCard>
            </div>
          </motion.div>

          {/* Feature Row 2: Spotlight Card (reversed) */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={0} variants={fadeUp}
            className="flex flex-col md:flex-row-reverse items-center gap-12 mb-20"
          >
            <div className="flex-1">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-white/40">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-3">Spotlight Card</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                Advanced CSS composite masking (XOR) ensures the spotlight gradient paints exclusively on the 1px border edge. The interior stays pitch black while the edge illuminates precisely under the cursor.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/30" /> CSS maskComposite: exclude (XOR technique)</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/30" /> Configurable spotlight color via prop</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/30" /> Zero JavaScript animation overhead</li>
              </ul>
              <Link href="/docs/spotlight-card" className="inline-flex items-center mt-6 text-sm text-white/60 hover:text-white transition-colors">
                View documentation →
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <SpotlightCard className="w-72 h-40 p-6 flex flex-col justify-center" spotlightColor="rgba(255, 255, 255, 0.8)">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Instance</span>
                <span className="font-medium text-white/70 text-sm">Trace the edge</span>
              </SpotlightCard>
            </div>
          </motion.div>

          {/* Feature Row 3: Kinetic Button */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={0} variants={fadeUp}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-white/40">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-3">Kinetic Button</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                Magnetic spring mechanics subtly pull the button toward the cursor. An internal radial flare tracks the exact pointer position inside the element for a tactile, hardware-like feedback.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/30" /> Configurable magnetic pull strength</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/30" /> Internal cursor-tracking radial flare</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/30" /> Spring physics via Framer Motion</li>
              </ul>
              <Link href="/docs/kinetic-button" className="inline-flex items-center mt-6 text-sm text-white/60 hover:text-white transition-colors">
                View documentation →
              </Link>
            </div>
            <div className="flex-1 flex justify-center gap-4">
              <KineticButton className="bg-white text-black hover:bg-neutral-200 text-sm" magneticPull={0.3}>
                Primary
              </KineticButton>
              <KineticButton className="bg-white/[0.03] text-white border border-white/10 hover:bg-white/[0.08] text-sm" magneticPull={0.3}>
                Secondary
              </KineticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 5: TECH STACK                                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 py-28 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">Built on</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-12">Modern foundations.</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { name: "Next.js", detail: "App Router" },
              { name: "Tailwind CSS", detail: "v4" },
              { name: "Framer Motion", detail: "Animations" },
              { name: "TypeScript", detail: "Strict mode" },
            ].map((tech) => (
              <div key={tech.name} className="bg-[#050505] py-10 px-6 flex flex-col items-center">
                <span className="text-sm font-medium text-white/80 mb-1">{tech.name}</span>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{tech.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 6: CTA                                             */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 py-28 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-5">
            Ready to build<br /><span className="text-white/40 italic font-serif">something extraordinary?</span>
          </h2>
          <p className="text-white/40 text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Stop settling for generic components. Start shipping interfaces that make people stop scrolling.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/docs">
              <KineticButton className="bg-white text-black hover:bg-neutral-200 h-12 px-8 rounded-full text-sm font-medium shadow-[0_0_40px_rgba(255,255,255,0.1)]" magneticPull={0.2}>
                Get Started
              </KineticButton>
            </Link>
          </div>
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
