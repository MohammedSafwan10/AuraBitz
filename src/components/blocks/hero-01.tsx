"use client";
import dynamic from "next/dynamic";

import { motion } from "framer-motion";
import { BlurText } from "@/components/ui/blur-text";
import { KineticButton } from "@/components/ui/kinetic-button";
const MeshDistortBG = dynamic(() => import("@/components/ui/mesh-distort-bg").then((mod) => mod.MeshDistortBG), { ssr: false });

export function Hero01() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col overflow-hidden border-y border-white/[0.05]">
            {/* 
        This MeshDistortBG component is the secret to zero-lag. 
        It offloads all the 3D rendering to a React Three Fiber `<Canvas>` 
        on the WebGL layer, keeping the DOM clear for scrolling and text.
      */}
            <MeshDistortBG className="absolute inset-0 z-0">
                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 px-4 py-2 border border-red-500/20 rounded-full bg-black/40 backdrop-blur-md flex items-center gap-3 shadow-[0_0_30px_rgba(255,0,0,0.15)]"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_rgba(255,0,0,1)]" />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-white/70 uppercase">
                            Hardware Accelerated
                        </span>
                    </motion.div>

                    {/* Ultra-Crisp High-Performance Typography */}
                    <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter text-white mb-6 leading-[0.9] overflow-visible py-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                        <BlurText splitBy="words" stagger={0.04} duration={0.8} delay={0.1}>
                            WebGL
                        </BlurText>
                        <br />
                        <span className="text-white/80 italic font-serif tracking-tight pr-4">
                            <BlurText splitBy="words" stagger={0.04} delay={0.4} duration={0.8}>
                                Architecture.
                            </BlurText>
                        </span>
                    </h1>

                    {/* Focused Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-white/60 font-light max-w-2xl mb-12 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    >
                        True 60 FPS performance. Forget DOM trickery. Back your designs with hardware-accelerated fluid shaders running natively on the GPU.
                    </motion.p>

                    {/* Action Group */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <div className="h-12 w-48 relative group">
                            <div className="absolute inset-0 bg-red-500/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                            <KineticButton className="w-full h-full bg-white text-black font-semibold rounded-lg text-sm border-0 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                                Enter The System
                            </KineticButton>
                        </div>

                        <button className="h-12 px-8 text-sm font-semibold text-white/70 rounded-lg group transition-colors hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 flex items-center gap-2 backdrop-blur-md bg-black/20">
                            Read Architecture Docs
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 opacity-50 group-hover:opacity-100">→</span>
                        </button>
                    </motion.div>
                </div>
            </MeshDistortBG>
        </section>
    );
}
