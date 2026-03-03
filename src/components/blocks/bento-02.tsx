"use client";
import dynamic from "next/dynamic";
import { WebGLLoader } from "@/components/ui/webgl-loader";

import { motion } from "framer-motion";
import { HolographicCard } from "@/components/ui/holographic-card";
const WebGLLiquidAurora = dynamic(() => import("@/components/ui/webgl-liquid-aurora").then((mod) => mod.WebGLLiquidAurora), { ssr: false, loading: () => <WebGLLoader /> });
import { BlurText } from "@/components/ui/blur-text";
import { GridSystem } from "@/components/ui/grid-system";
import { CircleDollarSign, ArrowUpRight, LineChart, Wallet, CreditCard, Activity } from "lucide-react";

export function Bento02() {
    return (
        <section className="relative w-full min-h-[120vh] bg-[#030303] py-24 px-4 md:px-8 border-y border-white/[0.05] overflow-hidden flex flex-col justify-center">

            {/* Subtle premium background grid */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <GridSystem type="cross" size={60} color="rgba(255,255,255,0.03)" interactive={false} fadeMask="radial" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-16">

                {/* Header section inside the block so it stands alone */}
                <div className="flex flex-col items-center text-center gap-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="p-1 px-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                        Fintech Series 02
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/30 drop-shadow-sm">
                        <BlurText delay={0.1}>Liquid Assets.</BlurText>
                    </h2>
                    <p className="text-white/40 font-light max-w-lg text-lg mix-blend-screen leading-relaxed">
                        Iridescent cryptographic container layouts designed for modern banking, tokenomics, and high-frequency trading dashboards.
                    </p>
                </div>

                {/* The Grid: 3 columns, asymmetric masonry feel */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6 w-full">

                    {/* Card 1: Top Left - Portfolio (Spans 1 col, 1 row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <HolographicCard className="h-full w-full p-8 flex flex-col justify-between group">
                            <div className="flex items-start justify-between">
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] group-hover:bg-white/[0.08] transition-colors">
                                    <Wallet className="w-5 h-5 text-white/80" />
                                </div>
                                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">+14.2%</span>
                            </div>
                            <div>
                                <h3 className="text-white/40 text-sm font-medium mb-1">Total Balance</h3>
                                <div className="text-3xl font-bold tracking-tight text-white mb-2 font-mono">
                                    $2,408,<span className="text-white/40">194.00</span>
                                </div>
                            </div>
                        </HolographicCard>
                    </motion.div>

                    {/* Card 2: Center Massive GPU - Liquid Wealth (Spans 2 cols, 2 rows) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-2 md:row-span-2 relative group"
                    >
                        <HolographicCard className="h-full w-full overflow-hidden p-0 border-white/[0.1]">
                            {/* Inner WebGL Render placed gracefully inside */}
                            <div className="absolute inset-x-0 bottom-0 h-[60%] z-0 rounded-b-xl overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-1000">
                                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/40 to-[#0a0a0a] z-10" />
                                <WebGLLiquidAurora />
                            </div>

                            <div className="absolute inset-0 p-8 md:p-12 z-20 flex flex-col justify-between pointer-events-none">
                                <div className="flex justify-between items-start w-full">
                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                        <CircleDollarSign className="w-6 h-6 text-[#00e5ff]" />
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-mono text-white/30 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                                        <Activity className="w-3 h-3 text-[#00e5ff]" />
                                        <span>Live Market</span>
                                    </div>
                                </div>

                                <div className="max-w-md pointer-events-auto">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 drop-shadow-md">
                                        Liquid Flow
                                    </h3>
                                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 mix-blend-screen backdrop-blur-[2px]">
                                        Our proprietary liquidity engine runs fluidly in real-time. Native GPU accelerated transaction tracing mapped securely onto your dashboard.
                                    </p>
                                    <button className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black bg-white hover:bg-[#00e5ff] hover:text-black transition-colors px-6 py-3 rounded-full">
                                        Execute Trade <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </HolographicCard>
                    </motion.div>

                    {/* Card 3: Bottom Left - Analytics (Spans 1 col, 1 row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <HolographicCard className="h-full w-full p-8 flex flex-col justify-between group">
                            <div className="flex items-center justify-between">
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] group-hover:bg-white/[0.08] transition-colors">
                                    <LineChart className="w-5 h-5 text-indigo-400" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Volatility Engine</h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    Algorithmic stable-coin balancing actively mitigating massive market swings.
                                </p>
                            </div>
                        </HolographicCard>
                    </motion.div>

                    {/* Card 4: Bottom Full Width (Spans 3 cols, 1 row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="md:col-span-3 md:row-span-1"
                    >
                        <HolographicCard className="h-full w-full p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 group">
                            <div className="flex items-center gap-6">
                                <div className="min-w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00e5ff]/20 to-indigo-500/20 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
                                    <CreditCard className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight mb-2">The Aura Black Card</h3>
                                    <p className="text-white/40 text-sm max-w-lg leading-relaxed">
                                        Unlimited bandwidth. Zero foreign transaction fees. Forged from aerospace-grade tungsten and synced instantly to your liquid holdings.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-auto flex flex-col gap-3">
                                <button className="w-full md:w-auto px-8 py-3 rounded-full border border-white/20 text-white text-xs font-mono uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all text-center">
                                    Request Invite
                                </button>
                                <span className="text-[10px] text-white/30 font-mono text-center uppercase tracking-widest">
                                    Current Waitlist: 10,482
                                </span>
                            </div>
                        </HolographicCard>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
