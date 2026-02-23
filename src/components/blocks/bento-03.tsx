"use client";

import { motion } from "framer-motion";
import { GridSystem } from "@/components/ui/grid-system";
import { SplitText } from "@/components/ui/split-text";
import { KineticText } from "@/components/ui/kinetic-text";
import { TextPressure } from "@/components/ui/text-pressure";
import { ShuffleText } from "@/components/ui/shuffle";
import { ArrowDownRight, AlignLeft, Hexagon, Quote } from "lucide-react";

export function Bento03() {
    return (
        <section className="relative w-full min-h-[140vh] bg-black py-24 px-4 md:px-8 border-y border-white/[0.05] overflow-hidden flex flex-col items-center">

            {/* Architectural Grid Background */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <GridSystem type="dot" size={30} color="rgba(255,255,255,0.15)" fadeMask="linear" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12">

                {/* Header: Editorial Brutalism */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
                        <span className="w-2 h-2 bg-white" />
                        Print Edition 03
                    </div>
                    <div className="w-full flex-wrap justify-between items-end border-b-2 border-white pb-8 hidden md:flex">
                        <h2 className="text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                            <SplitText animation="slideUp" duration={0.8} stagger={0.02} splitBy="chars">
                                Brutal
                            </SplitText>
                            <br />
                            <SplitText animation="slideUp" duration={0.8} delay={0.2} stagger={0.02} splitBy="chars">
                                Design.
                            </SplitText>
                        </h2>
                        <div className="text-right pb-2">
                            <p className="text-white/60 font-mono text-sm max-w-xs">
                                Information architecture structured through raw typography and negative space constraint.
                            </p>
                            <div className="mt-4 text-xs font-mono uppercase tracking-widest text-white/30">
                                <ShuffleText texts={["Vol. 2026 // GEN-UI", "MCMXC // ARCHIVE"]} />
                            </div>
                        </div>
                    </div>
                    {/* Mobile Header Box */}
                    <div className="md:hidden border-b-2 border-white pb-8">
                        <h2 className="text-6xl font-black tracking-tighter uppercase leading-[0.8] mb-4">
                            BRUTAL<br />DESIGN.
                        </h2>
                        <p className="text-white/60 font-mono text-sm">
                            Information architecture structured through raw typography and negative space constraint.
                        </p>
                    </div>
                </div>

                {/* The Brutalist Grid - Gapless with thick internal borders */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[280px] w-full border-t-2 border-l-2 border-white/20">

                    {/* Card 1: Massive Headline (Spans 2 cols, 2 rows) */}
                    <div className="md:col-span-2 md:row-span-2 border-r-2 border-b-2 border-white/20 p-8 md:p-12 flex flex-col justify-between group bg-black hover:bg-white transition-colors duration-700">
                        <div className="flex justify-between items-start">
                            <AlignLeft className="w-8 h-8 text-white group-hover:text-black transition-colors duration-700" />
                            <span className="text-xs font-mono px-3 py-1 border border-white/20 text-white group-hover:border-black/20 group-hover:text-black rounded-full transition-colors duration-700">
                                <ShuffleText texts={["CORE_ENGINE", "INITIALIZING...", "STABLE_STATE"]} />
                            </span>
                        </div>

                        <div className="group-hover:text-black transition-colors duration-700">
                            {/* Text Pressure acts as a heavy interactive web object */}
                            <div className="text-white group-hover:text-black transition-colors duration-700 -ml-2 mb-6">
                                <TextPressure
                                    baseWeight={500}
                                    maxWeight={900}
                                    baseScale={1}
                                    maxScale={1.1}
                                    radius={200}
                                    className="text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85] w-full"
                                >
                                    FLEXIBLE
                                </TextPressure>
                            </div>
                            <p className="font-mono text-sm md:text-base leading-relaxed text-white/50 group-hover:text-black/60 max-w-sm mt-8 transition-colors duration-700">
                                Mathematical typography responds organically to cursor physics, creating elastic interfaces without sacrificing legibility.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Top Right (Spans 2 cols, 1 row) */}
                    <div className="md:col-span-2 md:row-span-1 border-r-2 border-b-2 border-white/20 p-8 flex flex-col justify-between bg-[#0a0a0a] overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                            <ArrowDownRight className="w-24 h-24 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight z-10 w-3/4">
                            <KineticText splitBy="words" stagger={0.1} delay={0.2}>
                                The physics of reading. Unbound.
                            </KineticText>
                        </h3>
                        <div className="flex gap-2 font-mono text-xs text-white/40 z-10 w-full justify-start">
                            <span className="border-b border-white/20 pb-1 uppercase">Read More</span>
                            <span className="border-b border-white/20 pb-1 uppercase">Watch Spec</span>
                        </div>
                    </div>

                    {/* Card 3: Middle Right (Spans 1 col, 1 row) */}
                    <div className="md:col-span-1 md:row-span-1 border-r-2 border-b-2 border-white/20 p-8 bg-black flex flex-col items-center justify-center group hover:bg-[#111] transition-colors">
                        <Hexagon className="w-16 h-16 text-white/20 group-hover:text-white transition-colors duration-500 mb-6" />
                        <div className="text-center font-mono text-xl font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
                            <ShuffleText texts={["System", "Grid", "Matrix"]} />
                            <br />
                            <ShuffleText texts={["Architecture", "Typography", "Brutalism"]} />
                        </div>
                    </div>

                    {/* Card 4: Middle Right Edge (Spans 1 col, 1 row) */}
                    <div className="md:col-span-1 md:row-span-1 border-r-2 border-b-2 border-white/20 p-8 bg-zinc-950 flex flex-col justify-between">
                        <Quote className="w-6 h-6 text-white/40" />
                        <p className="font-serif italic text-xl md:text-2xl text-white/80 leading-tight">
                            &quot;Content precedes design. Design in the absence of content is not design, it&apos;s decoration.&quot;
                        </p>
                        <span className="font-mono text-xs text-white/40 uppercase">— Jeffrey Zeldman</span>
                    </div>

                    {/* Card 5: Bottom Left Wide (Spans 3 cols, 1 row) */}
                    <div className="md:col-span-3 md:row-span-1 border-r-2 border-b-2 border-white/20 bg-black overflow-hidden relative flex flex-col justify-center px-8 md:px-12 group">
                        {/* Background kinetic text sliding */}
                        <div className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap opacity-5 z-0 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000">
                            <motion.div
                                animate={{ x: [0, -1000] }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                className="text-[150px] font-black uppercase tracking-tighter"
                            >
                                AESTHETICS OVER EVERYTHING &mdash; AESTHETICS OVER EVERYTHING &mdash;
                            </motion.div>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
                            <div>
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                                    <SplitText animation="slideDown" duration={0.6}>
                                        Aesthetic Data.
                                    </SplitText>
                                </h3>
                                <p className="text-white/60 font-mono text-sm max-w-md w-full">
                                    Structured DOM grids forcing typographic hierarchy purely through CSS restraint and Framer Motion orchestrations.
                                </p>
                            </div>
                            <button className="bg-white text-black font-mono text-sm px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#00e5ff] transition-colors shrink-0">
                                View Archive
                            </button>
                        </div>
                    </div>

                    {/* Card 6: Bottom Right Square (Spans 1 col, 1 row) */}
                    <div className="md:col-span-1 md:row-span-1 border-r-2 border-b-2 border-white/20 p-8 flex items-center justify-center bg-black hover:bg-white group transition-colors duration-500">
                        <div className="w-full flex justify-between items-center rotate-90 transform origin-center">
                            <span className="font-mono font-bold text-6xl tracking-tighter text-white group-hover:text-black transition-colors duration-500">
                                03
                            </span>
                            <div className="w-16 h-1 bg-white group-hover:bg-black transition-colors duration-500" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
