"use client";

import { useState } from "react";
import { BlurText } from "@/components/ui/blur-text";
import { CodePreview } from "@/components/site/code-preview";

export default function BlurTextPageClient({ codeEndpoint }: { codeEndpoint: string }) {
    const [replayKey1, setReplayKey1] = useState(0);
    const [replayKey2, setReplayKey2] = useState(0);

    return (
        <div className="max-w-4xl space-y-16 pb-20">
            {/* Header */}
            <div className="relative">
                <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            Text Animations
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-5 pb-2 text-white">
                        Blur Text
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        A cinematic depth-of-field effect resolving into perfect typography. Smoothly interpolates CSS filters to draw focus exactly when elements enter the viewport.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview codeEndpoint={codeEndpoint}>
                <div className="w-full flex flex-col items-center justify-center gap-12 py-10">
                    {/* Primary Hero Demo */}
                    <div className="text-center relative">
                        {/* Interactive Re-Trigger Area */}
                        <div
                            className="group cursor-pointer inline-block"
                            onClick={() => setReplayKey1(prev => prev + 1)}
                        >
                            <BlurText
                                key={replayKey1}
                                className="text-4xl md:text-6xl font-black font-sans tracking-tighter text-white inline-flex flex-wrap justify-center py-4"
                                splitBy="chars"
                                stagger={0.04}
                                once={true}
                            >
                                Cinematic Focus.
                            </BlurText>
                            <p className="text-white/30 text-sm mt-0 font-mono uppercase tracking-widest group-hover:text-emerald-400/80 transition-colors">(Click to Re-Animate)</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 w-full max-w-xl border-t border-white/[0.05] pt-12">
                        {/* Word Level Demo */}
                        <div className="flex flex-col gap-2">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">Word-By-Word Parsing</span>
                            <div
                                className="group cursor-pointer inline-block"
                                onClick={() => setReplayKey2(prev => prev + 1)}
                            >
                                <BlurText
                                    key={replayKey2}
                                    className="text-2xl md:text-3xl font-light text-white/80 tracking-tight"
                                    splitBy="words"
                                    stagger={0.15}
                                    duration={1}
                                    once={true}
                                >
                                    Ideas start completely unformed. Out of the chaos, extreme clarity naturally emerges.
                                </BlurText>
                                <p className="text-white/30 text-[10px] mt-2 font-mono uppercase tracking-widest group-hover:text-emerald-400/80 transition-colors">(Click to Re-Animate)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CodePreview>

            {/* How It Works */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 text-white">How it works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { step: "01", title: "Span Arrays", desc: "The component rips the raw string apart and isolates spacing vs letters into multiple depth arrays to prevent flex breakage." },
                        { step: "02", title: "Filter Interpolation", desc: "Instead of complex 3D perspective math, this relies on raw GPU accelerated CSS filter blur transitions natively tracked by Framer Motion." },
                        { step: "03", title: "Sequential Staggering", desc: "Allows uniform and consistent stagger delays regardless if it applies to an array of 5 words or 40 individual letters." },
                        { step: "04", title: "Viewport Execution", desc: "Automatically hooks useInView to track if it should execute its entry or reversal depending on state." },
                    ].map((item) => (
                        <div key={item.step} className="group relative p-6 rounded-[2rem] border border-white/[0.05] bg-[#050505] overflow-hidden hover:border-white/[0.1] transition-colors duration-500">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono text-white/40 bg-white/[0.05] border border-white/[0.05] mb-4">
                                STEP {item.step}
                            </span>
                            <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-[13px] text-white/50 leading-relaxed font-light">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Props */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 text-white">Props</h2>
                <div className="w-full border border-white/[0.05] rounded-[2rem] overflow-x-auto bg-[#050505] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <table className="w-full text-[13px] min-w-[600px]">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Prop</th>
                                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Type</th>
                                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Default</th>
                                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-white/60 font-light divide-y divide-white/[0.02]">
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">children</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">—</td>
                                <td className="px-6 py-4">The text string to be animated. (Must be a direct string).</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">splitBy</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">&quot;chars&quot; | &quot;words&quot;</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">&quot;chars&quot;</td>
                                <td className="px-6 py-4">Determines if staggering splits individual letters or full words.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">stagger</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">0.05</td>
                                <td className="px-6 py-4">Delay between each character&apos;s entrance animation.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">duration</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">0.8</td>
                                <td className="px-6 py-4">The duration of the blur and opacity fade transition.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">once</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">boolean</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">false</td>
                                <td className="px-6 py-4">If false, the animation resets and re-enters every time it scrolls into view.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Installation */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 text-white">Installation</h2>
                <div className="group relative p-6 rounded-[2rem] border border-white/[0.05] bg-[#050505] overflow-hidden">
                    <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">1. Install Dependencies</p>
                    <pre className="flex items-center justify-between font-mono text-[13px] text-emerald-400/90 bg-[#111] p-3 rounded-xl border border-white/[0.05] shadow-inner mb-6 overflow-x-auto">
                        <code>npm install framer-motion</code>
                    </pre>
                    <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">2. Copy Source</p>
                    <p className="text-[13px] text-white/60 font-light leading-relaxed">Simply drop the source code into your <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">/components/ui</code> folder.</p>
                </div>
            </div>
        </div>
    );
}
