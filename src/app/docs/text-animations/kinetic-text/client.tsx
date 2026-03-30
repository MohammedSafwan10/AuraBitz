"use client";

import { useState } from "react";
import { KineticText } from "@/components/ui/kinetic-text";
import { CodePreview } from "@/components/site/code-preview";

export default function KineticTextPageClient({ sourceCode }: { sourceCode: string }) {
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
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-5 pb-2 grad-text">
                        Kinetic Text
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        High-performance 3D character staggering. Physics-driven string reveals that execute on scroll visibility with independent letter tracking.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview code={sourceCode}>
                <div className="w-full flex flex-col items-center justify-center gap-12 py-10">
                    {/* Primary Hero Demo */}
                    <div className="text-center relative">
                        {/* Interactive Re-Trigger Area */}
                        <div
                            className="group cursor-pointer inline-flex flex-col items-center relative pb-8"
                            onClick={() => setReplayKey1(prev => prev + 1)}
                        >
                            <KineticText
                                key={replayKey1} // Force remount on click
                                className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white inline-flex flex-wrap justify-center py-4 drop-shadow-2xl"
                                splitBy="chars"
                                stagger={0.03}
                                once={true}
                            >
                                Next Level Animations.
                            </KineticText>
                            <p className="absolute left-1/2 top-full -translate-x-1/2 pt-2 text-white/30 text-sm font-mono uppercase tracking-widest whitespace-nowrap group-hover:text-emerald-400/80 transition-colors">(Click to Re-Animate)</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 w-full max-w-xl border-t border-white/[0.05] pt-12">
                        <div className="flex flex-col gap-2">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">Word By Word Split</span>
                            <div
                                className="group cursor-pointer inline-flex flex-col relative pb-7"
                                onClick={() => setReplayKey2(prev => prev + 1)}
                            >
                                <KineticText
                                    key={replayKey2}
                                    className="text-xl md:text-2xl font-medium text-white/80"
                                    splitBy="words"
                                    stagger={0.1}
                                    once={true}
                                >
                                    Architecture requires precision. Design requires restraint. Engineering requires both.
                                </KineticText>
                                <p className="absolute left-0 top-full pt-2 text-white/30 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap group-hover:text-emerald-400/80 transition-colors">(Click to Re-Animate)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CodePreview>

            {/* How It Works */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 grad-text">How it works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { step: "01", title: "Perspective Framing", desc: "The container uses `[perspective:1000px]` to create real physical depth when letters rotate over the X-axis." },
                        { step: "02", title: "DOM String Splitting", desc: "React natively maps over the string converting characters or words into independent Framer Motion wrapper elements." },
                        { step: "03", title: "Viewport Execution", desc: "Animations only trigger when scrolled into view using `useInView`, drastically saving background DOM performance." },
                        { step: "04", title: "Nested Springs", desc: "Double-layered motion elements allow the entrance animation to finish, while immediately handing off control to hover springs." },
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
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 grad-text">Props</h2>
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
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 grad-text">Installation</h2>
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
