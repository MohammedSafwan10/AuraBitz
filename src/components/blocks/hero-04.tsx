"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { WebGLLoader } from "@/components/ui/webgl-loader";

const WebGLLiquidAurora = dynamic(
    () => import("@/components/ui/webgl-liquid-aurora").then((module) => module.WebGLLiquidAurora),
    { ssr: false, loading: () => <WebGLLoader /> },
);

const reveal = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

export function Hero04() {
    return (
        <section className="relative min-h-[720px] w-full overflow-hidden border-y border-white/[0.05] bg-black md:min-h-[780px] lg:min-h-[860px]">
            <WebGLLiquidAurora className="absolute inset-0">
                <header className="pointer-events-auto flex h-16 w-full shrink-0 items-center justify-between border-b border-white/10 px-5 md:px-8">
                    <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-white/90">
                        <span className="grid size-7 place-items-center border border-white/25">
                            <span className="size-1.5 bg-cyan-300" />
                        </span>
                        AuraBitz
                    </Link>

                    <nav aria-label="Demo navigation" className="hidden items-center gap-10 text-xs text-white/50 md:flex">
                        <Link href="/docs" className="transition-colors hover:text-white">Components</Link>
                        <Link href="/blocks" className="transition-colors hover:text-white">Blocks</Link>
                        <Link href="/docs" className="transition-colors hover:text-white">Docs</Link>
                    </nav>

                    <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55 md:text-[10px]">
                        <span className="hidden sm:inline">Fluid</span>
                        <span className="hidden text-white/25 sm:inline">/</span>
                        <span>Active</span>
                        <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.85)]" />
                    </div>
                </header>

                <div className="relative flex flex-1 items-center justify-center px-6 py-16 text-center md:px-16">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.1, delayChildren: 0.12 }}
                        className="pointer-events-auto relative z-10 flex max-w-5xl flex-col items-center"
                    >
                        <motion.p
                            variants={reveal}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="mb-8 border-b border-white/30 pb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/75"
                        >
                            Liquid flow <span className="mx-2 text-cyan-300">/</span> 04
                        </motion.p>

                        <motion.h1
                            variants={reveal}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[clamp(2.9rem,6.6vw,7.25rem)] font-light leading-[0.92] tracking-[-0.055em] text-white"
                        >
                            FORM WITHOUT FORM.
                        </motion.h1>

                        <motion.p
                            variants={reveal}
                            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-8 max-w-xl text-sm leading-6 text-white/55 md:text-base"
                        >
                            A surface that follows pressure, velocity, and time.
                        </motion.p>

                        <motion.div
                            variants={reveal}
                            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-5"
                        >
                            <Link
                                href="#fluid"
                                className="group flex h-13 min-w-44 items-center justify-between gap-8 border-b border-white/45 px-2 font-mono text-xs text-white/85 transition-colors hover:border-cyan-300/80 hover:text-cyan-100"
                            >
                                Enter fluid
                                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <span className="hidden h-8 w-px bg-white/15 sm:block" />
                            <Link
                                href="#source"
                                className="group flex h-13 min-w-44 items-center justify-between gap-8 border-b border-white/25 px-2 font-mono text-xs text-white/55 transition-colors hover:border-white/70 hover:text-white"
                            >
                                View source
                                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <div className="pointer-events-none absolute bottom-7 left-7 hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/25 lg:flex">
                        <span>Pressure</span>
                        <span className="text-cyan-300/75">0.42</span>
                    </div>
                    <div className="pointer-events-none absolute bottom-7 right-7 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-white/25 lg:block">
                        Viscosity 0.84&nbsp;&nbsp;/&nbsp;&nbsp;Live
                    </div>
                </div>
            </WebGLLiquidAurora>
        </section>
    );
}
