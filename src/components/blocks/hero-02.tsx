"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { WebGLLoader } from "@/components/ui/webgl-loader";

const WebGLGlassCore = dynamic(
  () => import("@/components/ui/webgl-glass-core").then((module) => module.WebGLGlassCore),
  { ssr: false, loading: () => <WebGLLoader /> },
);

const reveal = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function Hero02() {
  return (
    <section className="relative min-h-[720px] w-full overflow-hidden border-y border-white/[0.06] bg-black sm:min-h-[780px] lg:min-h-[860px]">
      <WebGLGlassCore className="absolute inset-0">
        <div className="relative flex min-h-[720px] w-full flex-col sm:min-h-[780px] lg:min-h-[860px]">
          <header className="relative z-20 flex h-20 items-center border-b border-white/[0.08] px-5 sm:px-8 lg:px-12">
            <Link href="/" className="flex items-center gap-3 text-white/90" aria-label="AuraBitz home">
              <span className="relative grid h-7 w-7 place-items-center border border-white/30">
                <span className="h-2.5 w-2.5 rounded-full border border-white/70" />
              </span>
              <span className="text-sm font-semibold tracking-[-0.03em] sm:text-base">AuraBitz</span>
            </Link>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-xs text-white/55 md:flex">
              <Link href="/docs" className="transition-colors hover:text-white">Components</Link>
              <Link href="/blocks" className="transition-colors hover:text-white">Blocks</Link>
              <Link href="/docs/installation" className="transition-colors hover:text-white">Docs</Link>
            </nav>

            <div className="ml-auto flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
              <span className="hidden sm:inline">Optical engine</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.65)]" />
            </div>
          </header>

          <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-20 sm:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              <motion.p
                {...reveal}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55"
              >
                Optical engine <span className="px-2 text-cyan-200">/</span> 02
              </motion.p>

              <motion.h1
                {...reveal}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 max-w-[11ch] text-[clamp(3.65rem,8.2vw,7.8rem)] font-semibold uppercase leading-[0.82] tracking-[-0.072em] text-white"
              >
                Bend the void.
              </motion.h1>

              <motion.p
                {...reveal}
                transition={{ duration: 0.78, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 max-w-lg font-mono text-xs leading-6 tracking-[0.02em] text-white/55 sm:text-sm"
              >
                Light enters. Geometry decides what leaves.
              </motion.p>

              <motion.div
                {...reveal}
                transition={{ duration: 0.78, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
              >
                <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>
                  <Link
                    href="/blocks"
                    className="group flex h-14 min-w-48 items-center justify-between border border-white/45 bg-black/50 px-5 font-mono text-xs text-white/80 backdrop-blur-md transition-colors hover:border-white hover:text-white"
                  >
                    <span>Focus lens</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <Link
                  href="/docs/installation"
                  className="group flex h-14 min-w-36 items-center justify-between border border-white/15 bg-black/35 px-5 font-mono text-xs text-white/45 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                >
                  <span>Source</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden justify-between px-8 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 sm:flex lg:px-12">
            <span>IOR 1.52</span>
            <span>Dispersion 0.028</span>
          </div>
        </div>
      </WebGLGlassCore>
    </section>
  );
}
