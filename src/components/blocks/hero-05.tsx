"use client";

import { motion } from "framer-motion";
import { BlurText } from "@/components/ui/blur-text";
import { KineticButton } from "@/components/ui/kinetic-button";
import { WebGLParticleVortex } from "@/components/ui/webgl-particle-vortex";

export function Hero05() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col overflow-hidden border-y border-white/[0.05]">
            {/* 
        The WebGLParticleVortex computes 250,000 independent particles flying through 
        Curl Noise on the GPU, completely detached from the DOM layer above it. 
      */}
            <WebGLParticleVortex className="absolute inset-0 z-0">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-full text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 px-5 py-2.5 border border-[#00ff9d]/30 rounded-full bg-black/40 backdrop-blur-xl flex items-center gap-4 shadow-[0_0_30px_rgba(0,255,157,0.15)]"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#00ff9d] shadow-[0_0_15px_rgba(0,255,157,0.8)] animate-pulse" />
                        <span className="text-[11px] font-mono tracking-[0.3em] text-[#00ff9d] uppercase font-bold">
                            Compute State: Massive
                        </span>
                    </motion.div>

                    {/* Brutalist AI Typography Over the Vortex */}
                    <h1 className="text-6xl md:text-[140px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent mb-6 leading-[0.8] overflow-visible py-2 drop-shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
                        <BlurText splitBy="chars" stagger={0.03} delay={0.1} duration={1.5}>
                            VORTEX
                        </BlurText>
                    </h1>

                    {/* Compute Focused Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-white/50 font-mono tracking-wide max-w-3xl mb-14 leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,1)] mix-blend-screen"
                    >
                        <span className="text-white/80 font-bold">250,000.</span> Simultaneously calculated particle metrics running flawlessly through a 3D curl noise matrix. Engage the architecture. Drag to disrupt the flow state.
                    </motion.p>

                    {/* Brutalist Action Group */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-6 pointer-events-auto"
                    >
                        <div className="h-14 w-72 relative group">
                            <div className="absolute inset-0 bg-[#00ff9d]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm" />
                            <KineticButton className="w-full h-full bg-[#00ff9d] hover:bg-white text-black font-extrabold rounded-none text-sm tracking-[0.2em] uppercase transition-colors duration-500 shadow-[0_0_30px_rgba(0,255,157,0.2)]">
                                Initialize Matrix
                            </KineticButton>
                        </div>

                        <button className="h-14 px-8 text-xs font-mono tracking-[0.2em] font-semibold text-white/50 rounded-none group transition-all hover:text-[#00ff9d] border-b border-white/10 hover:border-[#00ff9d]/50 bg-black/20 backdrop-blur-md uppercase">
                            Access Code //
                        </button>
                    </motion.div>
                </div>
            </WebGLParticleVortex>
        </section>
    );
}
