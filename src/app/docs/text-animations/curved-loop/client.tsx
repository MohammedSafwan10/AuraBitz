"use client";

import { CurvedLoop } from "@/components/ui/curved-loop";
import { CodePreview } from "@/components/site/code-preview";

export default function CurvedLoopPageClient({ sourceCode }: { sourceCode: string }) {
    return (
        <div className="max-w-4xl space-y-16 pb-20 overflow-x-hidden">
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
                        Curved Loop
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        Infinite circular marquee typographic systems. Native SVG path routing with seamless looping animation.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview code={sourceCode}>
                <div className="w-full flex flex-col items-center justify-center gap-12 py-16 overflow-hidden">
                    {/* Primary Hero Demo */}
                    <div className="w-full relative py-12 bg-black/50 border-y border-white/[0.02]">
                        <CurvedLoop
                            className="text-emerald-400"
                            speed={6}
                            amplitude={60}
                            frequency={400}
                        >
                            MOTION PHYSICS
                        </CurvedLoop>
                    </div>

                    <div className="flex flex-col gap-6 w-full max-w-xl border-t border-white/[0.05] pt-12">
                        {/* High Frequency Demo */}
                        <div className="flex flex-col gap-2">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider pl-4">High Frequency / Gentle Amplitude</span>
                            <div className="w-full truncate bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden py-4">
                                <CurvedLoop
                                    className="text-white/70"
                                    speed={4}
                                    amplitude={20}
                                    frequency={150}
                                >
                                    RIPPLE EFFECT
                                </CurvedLoop>
                            </div>
                        </div>

                        {/* Huge Loop Demo */}
                        <div className="flex flex-col gap-2 pt-6 border-t border-white/[0.05]">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider pl-4">Massive Lazy Curves</span>
                            <div className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden py-10">
                                <CurvedLoop
                                    className="text-blue-400 opacity-80"
                                    speed={12}
                                    amplitude={120}
                                    frequency={800}
                                >
                                    AURA AESTHETICS.
                                </CurvedLoop>
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
                        { step: "01", title: "Procedural Path Generation", desc: "Algorithmic bezier quadratic curve calculations stitch an arbitrarily long sine-wave SVG path string (M, Q, T commands)." },
                        { step: "02", title: "Actual Arc Length", desc: "SVG getTotalLength() API measures the pixel-perfect curve arc length on DOM mount, since curve length differs from straight X-axis frequency." },
                        { step: "03", title: "Seamless TextPath Offset", desc: "The textPath startOffset attribute is animated by exactly the negative arc length of one cycle. When it repeats, the transition is mathematically seamless." },
                        { step: "04", title: "Text Extrapolation", desc: "The text string is replicated dozens of times to fill the entire procedural SVG buffer length, preventing whitespace gaps on ultra-wide monitors." },
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
                                <td className="px-6 py-4">The text string injected into the procedural loop.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">speed</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">10</td>
                                <td className="px-6 py-4">Number of seconds to traverse ONE cycle. Lower = Faster.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">amplitude</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">40</td>
                                <td className="px-6 py-4">Vertical height of the sine wave peak extending into the viewport.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">frequency</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">300</td>
                                <td className="px-6 py-4">Horizontal width span of one alternating sine-wave phase.</td>
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
                        <code>npm install clsx tailwind-merge</code>
                    </pre>
                    <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">2. Copy Source</p>
                    <p className="text-[13px] text-white/60 font-light leading-relaxed mb-6">Save the generated component to <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">/components/ui/curved-loop/index.tsx</code>.</p>
                </div>
            </div>
        </div>
    );
}
