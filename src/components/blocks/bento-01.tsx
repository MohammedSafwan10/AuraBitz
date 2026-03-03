"use client";
import dynamic from "next/dynamic";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
const WebGLGlassCore = dynamic(() => import("@/components/ui/webgl-glass-core").then((mod) => mod.WebGLGlassCore), { ssr: false });
import { KineticButton } from "@/components/ui/kinetic-button";
import { BlurText } from "@/components/ui/blur-text";
import { ArrowUpRight, BarChart3, Fingerprint, Zap } from "lucide-react";

export function Bento01() {
    return (
        <section className="relative w-full min-h-screen bg-black py-24 px-4 md:px-8 border-y border-white/[0.05] overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0055ff]/5 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">

                {/* Header section inside the block so it stands alone */}
                <div className="flex flex-col items-center text-center gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="px-3 py-1 text-[11px] font-mono tracking-[0.2em] text-[#00e5ff] uppercase font-bold border border-[#00e5ff]/20 rounded-full bg-[#00e5ff]/[0.02]"
                    >
                        Holographic Ecosystem
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        <BlurText delay={0.1}>Data Structuring.</BlurText>
                    </h2>
                    <p className="text-white/40 font-light max-w-xl text-lg">
                        A physics-based, lighting-aware container system designed for absolute visual clarity and massive performance.
                    </p>
                </div>

                {/* The Grid: 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 auto-rows-[320px] gap-4 md:gap-6">

                    {/* Card 1: Huge Main Card (Spans 2 cols, 2 rows) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-2 md:row-span-2"
                    >
                        <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.15)" className="h-full w-full group">
                            {/* We drop a raw WebGL canvas into the card background */}
                            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
                                <WebGLGlassCore />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

                            <div className="relative z-20 h-full p-8 md:p-12 flex flex-col justify-end">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl w-fit backdrop-blur-md mb-6 inline-flex shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                                    <Fingerprint className="w-6 h-6 text-[#00e5ff]" />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                                    Quantum Security Core
                                </h3>
                                <p className="text-white/50 text-base md:text-lg max-w-md font-light leading-relaxed mb-8 mix-blend-screen">
                                    Military-grade encryption visualized through real-time WebGL refractive glass shaders. Absolute data sovereignty.
                                </p>
                                <KineticButton className="w-fit bg-white text-black hover:bg-[#00e5ff] transition-colors rounded-full px-8 uppercase tracking-widest text-xs font-bold">
                                    Initialize Protocol
                                </KineticButton>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* Card 2: Top Right (Spans 1 col, 1 row) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <SpotlightCard className="h-full w-full flex flex-col p-8 group">
                            <div className="flex-1">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit backdrop-blur-md mb-4 group-hover:bg-white/10 transition-colors">
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                                    Ludicrous Speed
                                </h3>
                                <p className="text-white/40 text-sm font-light leading-relaxed">
                                    Running at 120 FPS by avoiding the main thread. We execute logic natively on the GPU pipeline.
                                </p>
                            </div>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-6 mb-6" />
                            <div className="flex items-center justify-between font-mono text-xs text-white/30 uppercase tracking-widest">
                                <span>Latency</span>
                                <span className="text-yellow-400 font-bold">0.4ms</span>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* Card 3: Bottom Right (Spans 1 col, 1 row) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <SpotlightCard className="h-full w-full flex flex-col p-8 relative overflow-hidden group">
                            {/* Abstract background data rings */}
                            <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full border border-white/5 group-hover:border-[#00e5ff]/20 transition-colors duration-700" />
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-white/5 group-hover:border-[#00e5ff]/10 transition-colors duration-700 delay-100" />

                            <div className="relative z-10 flex-1">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit backdrop-blur-md mb-4 group-hover:bg-white/10 transition-colors">
                                    <BarChart3 className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                                    Deep Analytics
                                </h3>
                                <p className="text-white/40 text-sm font-light leading-relaxed">
                                    Observe user interactions, vector math bounds, and raymarching collisions in real-time.
                                </p>
                            </div>
                            <div className="relative z-10 w-fit mt-auto text-xs font-mono text-[#00e5ff] hover:text-white uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors">
                                View Dashboard <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </SpotlightCard>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
