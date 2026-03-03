"use client";
import dynamic from "next/dynamic";
import { WebGLLoader } from "@/components/ui/webgl-loader";

import { motion } from "framer-motion";
import { BlurText } from "@/components/ui/blur-text";
import { KineticButton } from "@/components/ui/kinetic-button";
const WebGLGlassCore = dynamic(() => import("@/components/ui/webgl-glass-core").then((mod) => mod.WebGLGlassCore), { ssr: false, loading: () => <WebGLLoader /> });

export function Hero02() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col overflow-hidden border-y border-white/[0.05]">
            {/* 
        This WebGLGlassCore component runs a dense glass geometry refracting thousands of swarming particles.
      */}
            <WebGLGlassCore className="absolute inset-0 z-0">
                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 px-4 py-2 border border-emerald-500/20 rounded-full bg-black/40 backdrop-blur-md flex items-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-white/70 uppercase">
                            Optical Refraction
                        </span>
                    </motion.div>

                    {/* Ice-Cold Premium Typography */}
                    <h1 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter text-white mb-6 leading-[0.9] overflow-visible py-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                        <span className="text-white/40 font-serif italic tracking-tight pr-4">
                            <BlurText splitBy="words" stagger={0.04} delay={0.1} duration={0.8}>
                                Structural
                            </BlurText>
                        </span>
                        <br />
                        <BlurText splitBy="words" stagger={0.04} duration={0.8} delay={0.3}>
                            Clarity.
                        </BlurText>
                    </h1>

                    {/* Focused Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-white/50 font-light max-w-2xl mb-12 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    >
                        Thousands of particles caught in the orbit of an impossible refractive geometry. Calculated with WebGL. Presented flawlessly at 60 frames per second.
                    </motion.p>

                    {/* Action Group */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
                    >
                        <div className="h-12 w-48 relative group">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                            <KineticButton className="w-full h-full bg-white text-black font-semibold rounded-lg text-sm border-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                Examine Artifact
                            </KineticButton>
                        </div>
                    </motion.div>
                </div>
            </WebGLGlassCore>
        </section>
    );
}
