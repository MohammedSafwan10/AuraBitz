"use client";
import dynamic from "next/dynamic";
import { WebGLLoader } from "@/components/ui/webgl-loader";

import { motion } from "framer-motion";
import { BlurText } from "@/components/ui/blur-text";
import { KineticButton } from "@/components/ui/kinetic-button";
const WebGLLiquidAurora = dynamic(() => import("@/components/ui/webgl-liquid-aurora").then((mod) => mod.WebGLLiquidAurora), { ssr: false, loading: () => <WebGLLoader /> });

export function Hero04() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col overflow-hidden border-y border-white/[0.05]">
            {/* 
        The WebGLLiquidAurora relies entirely on fragment shader math instead of rendering
        3D geometry, achieving 60 FPS Apple-level liquid gradients. 
      */}
            <WebGLLiquidAurora className="absolute inset-0 z-0">
                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center h-full text-center pointer-events-none">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-6 px-4 py-2 border border-rose-500/20 rounded-full bg-white/[0.02] backdrop-blur-md flex items-center gap-3 shadow-[0_0_20px_rgba(225,29,72,0.1)]"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(225,29,72,0.8)] animate-pulse" />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-rose-100/70 uppercase">
                            Liquid State Achieved
                        </span>
                    </motion.div>

                    {/* High Fashion Typography Over Liquid Velvet */}
                    <h1 className="text-6xl md:text-[120px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8 leading-[0.8] overflow-visible py-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        <BlurText splitBy="words" stagger={0.06} delay={0.1} duration={1.2}>
                            Liquid.
                        </BlurText>
                    </h1>

                    {/* Focused Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-2xl text-white/50 font-medium max-w-2xl mb-12 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] selection:bg-rose-500/30"
                    >
                        A completely fluid mesh simulation calculated entirely via fragment shader. It flows organically and responds to your physical interaction on the screen.
                    </motion.p>

                    {/* Action Group */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-6 pointer-events-auto"
                    >
                        <div className="h-14 w-64 relative group">
                            <div className="absolute inset-0 bg-rose-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
                            <KineticButton className="w-full h-full bg-white text-black font-semibold rounded-full text-base border-0 shadow-[0_0_30px_rgba(255,255,255,0.1)] tracking-wide">
                                Experience Physics
                            </KineticButton>
                        </div>

                        <button className="h-14 px-8 text-sm font-semibold text-white/60 rounded-full group transition-all hover:text-white border border-white/10 hover:border-white/30 bg-black/50 backdrop-blur-md">
                            View Source →
                        </button>
                    </motion.div>
                </div>
            </WebGLLiquidAurora>
        </section>
    );
}
