"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { WebGLLoader } from "@/components/ui/webgl-loader";

const MeshDistortBG = dynamic(
  () => import("@/components/ui/mesh-distort-bg").then((module) => module.MeshDistortBG),
  { ssr: false, loading: () => <WebGLLoader /> },
);

const reveal = {
  initial: { opacity: 0, y: 20, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero01() {
  return (
    <section className="relative min-h-[720px] w-full overflow-hidden border-y border-white/[0.06] bg-black sm:min-h-[780px] lg:min-h-[860px]">
      <MeshDistortBG className="absolute inset-0">
        <div className="relative flex min-h-[720px] w-full flex-col sm:min-h-[780px] lg:min-h-[860px]">
          <header className="relative z-20 flex h-20 items-center border-b border-white/[0.08] px-5 sm:px-8 lg:px-12">
            <Link href="/" className="flex items-center gap-3 text-white/90" aria-label="AuraBitz home">
              <span className="relative grid h-7 w-7 place-items-center border border-white/30">
                <span className="h-2.5 w-2.5 border border-cyan-300/80" />
              </span>
              <span className="text-sm font-semibold tracking-[-0.03em] sm:text-base">AuraBitz</span>
            </Link>

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-xs text-white/55 md:flex">
              <Link href="/docs" className="transition-colors hover:text-white">Components</Link>
              <Link href="/blocks" className="transition-colors hover:text-white">Blocks</Link>
              <Link href="/docs/installation" className="transition-colors hover:text-white">Docs</Link>
            </nav>

            <div className="ml-auto flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
              <span className="hidden sm:inline">WebGL active</span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            </div>
          </header>

          <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-20 sm:px-8">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
              <motion.p
                {...reveal}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/55"
              >
                Liquid aura <span className="px-2 text-cyan-300">/</span> realtime
              </motion.p>

              <motion.h1
                {...reveal}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 max-w-[12ch] text-[clamp(4rem,10vw,8.75rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-white"
              >
                Move the light.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 h-px w-10 bg-white/25"
              />

              <motion.p
                {...reveal}
                transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-md font-mono text-xs leading-6 tracking-[0.03em] text-white/55 sm:text-sm"
              >
                A GPU-native surface shaped by motion.
              </motion.p>

              <motion.div
                {...reveal}
                transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
              >
                <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 420, damping: 28 }}>
                  <Link
                    href="/blocks"
                    className="group flex h-14 min-w-52 items-center justify-between border border-cyan-300/60 bg-black/45 px-5 font-mono text-xs text-cyan-200 backdrop-blur-md transition-colors hover:border-cyan-200 hover:bg-cyan-300/[0.07]"
                  >
                    <span>Enter field</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <Link
                  href="/docs/installation"
                  className="group flex h-14 items-center gap-6 border-b border-white/20 px-4 font-mono text-xs text-white/60 transition-colors hover:border-white/60 hover:text-white"
                >
                  <span>Inspect source</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 justify-between px-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30 sm:flex lg:px-8">
            <span>36.7783° N</span>
            <span>119.4179° W</span>
          </div>
        </div>
      </MeshDistortBG>
    </section>
  );
}
