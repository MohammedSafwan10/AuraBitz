"use client";

import { motion } from "framer-motion";
import { GridSystem } from "@/components/ui/grid-system";
import { SplitText } from "@/components/ui/split-text";
import { KineticButton } from "@/components/ui/kinetic-button";
import { ParallaxFloatingCard } from "@/components/ui/parallax-floating-card";
import { Globe, Code, ArrowUpRight, Zap, Target } from "lucide-react";

export function Bento05() {
    return (
        <section className="relative w-full min-h-[140vh] bg-[#020202] py-32 px-4 md:px-8 border-y border-white/[0.05] overflow-hidden flex flex-col items-center perspective-[2000px]">

            {/* Massive Deep Spatial Background */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center mix-blend-screen opacity-40">
                <GridSystem type="line" size={120} color="rgba(255,255,255,0.08)" />
                {/* Center glowing focal point */}
                <div className="absolute w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen translate-x-40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">

                {/* Header Sequence */}
                <div className="flex flex-col items-center text-center gap-6 mb-24 w-full max-w-4xl mx-auto">
                    <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white/70 font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                        Spatial Computing OS
                    </div>

                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20">
                        <SplitText animation="slideUp" duration={0.8} stagger={0.03} splitBy="words">
                            The Infinite Canvas.
                        </SplitText>
                    </h2>

                    <p className="text-lg text-white/50 font-light max-w-2xl leading-relaxed">
                        Cards unbound by traditional DOM physics. Parallax planes float freely in Z-space, reacting natively to cursor position with specular lighting.
                    </p>
                </div>

                {/* The Floating Architecture (Breaking the rigid Grid) */}
                <div className="relative w-full h-[800px] flex justify-center items-center isolate">

                    {/* Background Float 1: Bottom Left */}
                    <div className="absolute left-0 bottom-10 w-full md:w-[400px] h-[300px]">
                        <ParallaxFloatingCard depth={1} className="w-full h-full p-8 flex flex-col justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <Code className="w-5 h-5 text-indigo-400" />
                                <span className="font-mono text-xs uppercase text-white/50">DOM Abstraction</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Preserve-3D</h3>
                                <p className="text-sm text-white/50 font-mono">Elements translate organically on the Z-axis.</p>
                            </div>
                        </ParallaxFloatingCard>
                    </div>

                    {/* Background Float 2: Top Right */}
                    <div className="absolute right-0 top-10 w-full md:w-[400px] h-[350px]">
                        <ParallaxFloatingCard depth={1.5} className="w-full h-full p-8 flex flex-col justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <Target className="w-5 h-5 text-cyan-400" />
                                <span className="font-mono text-xs uppercase text-white/50">Raycast Lighting</span>
                            </div>
                            <div>
                                <div className="w-full h-24 mb-6 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                                    <GridSystem type="cross" size={15} color="rgba(255,255,255,0.2)" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Live Specular</h3>
                                <p className="text-sm text-white/50 font-mono">Mathematical highlights track coordinates.</p>
                            </div>
                        </ParallaxFloatingCard>
                    </div>

                    {/* Foreground Hero / Center Mass */}
                    <div className="absolute z-30 w-full md:w-[500px] h-[500px]">
                        <ParallaxFloatingCard depth={3} className="w-full h-full p-10 flex flex-col bg-white/[0.04] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] items-center justify-center text-center">

                            <motion.div
                                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center mb-8 backdrop-blur-md"
                                animate={{ rotateY: 360 }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <Globe className="w-10 h-10 text-white" />
                            </motion.div>

                            <h3 className="text-4xl font-bold text-white tracking-tight mb-4">
                                Spatial Intelligence
                            </h3>

                            <p className="text-white/60 font-mono text-sm leading-relaxed mb-8 px-4">
                                Experience interfaces that exist beyond the flat screen. Enter a volumetric layout where components breathe.
                            </p>

                            <KineticButton className="bg-white text-black font-mono font-bold tracking-widest hover:bg-cyan-300 transition-colors px-12 py-4">
                                Enter Vision
                            </KineticButton>

                        </ParallaxFloatingCard>
                    </div>

                    {/* Deep Background Floater: Top Left */}
                    <div className="absolute left-[10%] top-[5%] w-[200px] h-[200px] hidden md:block">
                        <ParallaxFloatingCard depth={0.5} className="w-full h-full p-6 flex flex-col justify-center items-center bg-white/[0.01] blur-[2px]">
                            <Zap className="w-8 h-8 text-white/30" />
                        </ParallaxFloatingCard>
                    </div>

                    {/* Deep Background Floater: Bottom Right */}
                    <div className="absolute right-[15%] bottom-[10%] w-[250px] h-[150px] hidden md:block z-40">
                        <ParallaxFloatingCard depth={4} className="w-full h-full p-6 flex flex-col justify-center items-center bg-white/[0.05] border-white/20">
                            <ArrowUpRight className="w-8 h-8 text-white" />
                            <span className="text-xs uppercase font-mono font-bold mt-2">Interact</span>
                        </ParallaxFloatingCard>
                    </div>

                </div>
            </div>
        </section>
    );
}
