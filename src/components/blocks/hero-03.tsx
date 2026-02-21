"use client";

import { motion } from "framer-motion";
import { BlurText } from "@/components/ui/blur-text";
import { KineticButton } from "@/components/ui/kinetic-button";
import { WebGLParticleField } from "@/components/ui/webgl-particle-field";

export function Hero03() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col overflow-hidden border-y border-white/[0.05]">
            {/* 
        The WebGLParticleField runs 50,000 vertices on custom shaders directly in the GPU.
      */}
            <WebGLParticleField className="absolute inset-0 z-0">
                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 px-4 py-2 border border-cyan-500/20 rounded-full bg-black/40 backdrop-blur-md flex items-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-100/70 uppercase">
                            Data Structure Rendering
                        </span>
                    </motion.div>

                    {/* Ethereal Quantum Typography */}
                    <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter text-white mb-6 leading-[0.9] overflow-visible py-2 drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
                        <span className="text-white/30 font-serif italic tracking-tight pr-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <BlurText splitBy="words" stagger={0.04} delay={0.1} duration={0.8}>
                                Quantum
                            </BlurText>
                        </span>
                        <br />
                        <BlurText splitBy="words" stagger={0.04} duration={0.8} delay={0.3}>
                            Matrix.
                        </BlurText>
                    </h1>

                    {/* Focused Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-white/50 font-light max-w-2xl mb-12 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                    >
                        A universe in code. Rendering 50,000 unique vertices through an incredibly complex GLSL shader, creating an organic flowing particle ocean that bends toward you.
                    </motion.p>

                    {/* Action Group */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
                    >
                        <div className="h-12 w-56 relative group">
                            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                            <KineticButton className="w-full h-full bg-white text-black font-semibold rounded-lg text-sm border-0 shadow-[0_0_20px_rgba(255,255,255,0.1)] tracking-wide">
                                Initialize Sequence
                            </KineticButton>
                        </div>

                        <button className="h-12 px-8 text-sm font-semibold text-white/50 rounded-lg group transition-colors hover:text-white border border-transparent hover:border-cyan-500/20 hover:bg-cyan-500/5 flex items-center gap-2">
                            View Source Code
                        </button>
                    </motion.div>
                </div>
            </WebGLParticleField>
        </section>
    );
}
