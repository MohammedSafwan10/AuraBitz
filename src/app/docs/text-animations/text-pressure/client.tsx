"use client";

import { TextPressure } from "@/components/ui/text-pressure";
import { CodePreview } from "@/components/site/code-preview";

export default function TextPressurePageClient({ codeEndpoint }: { codeEndpoint: string }) {
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
                        Text Pressure
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        A dynamic reactive typography effect that maps mouse proximity to variable font weights and scale transformations using requestAnimationFrame physics.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview codeEndpoint={codeEndpoint}>
                <div className="w-full flex flex-col items-center justify-center gap-12 py-10">
                    {/* Primary Hero Demo */}
                    <div className="text-center relative">
                        <TextPressure
                            className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
                            baseWeight={300}
                            maxWeight={900}
                            baseScale={1}
                            maxScale={1.4}
                            radius={200}
                        >
                            Hover Me
                        </TextPressure>
                    </div>

                    <div className="flex flex-col gap-6 w-full max-w-xl border-t border-white/[0.05] pt-12">
                        {/* High Range Scale */}
                        <div className="flex flex-col gap-2">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">High Scale Factor</span>
                            <div>
                                <TextPressure
                                    className="text-3xl md:text-4xl font-mono text-emerald-400"
                                    baseWeight={400}
                                    maxWeight={800}
                                    baseScale={1}
                                    maxScale={1.8}
                                    radius={120}
                                >
                                    Magnetic Field
                                </TextPressure>
                            </div>
                        </div>

                        {/* Weight Only (No Scale) */}
                        <div className="flex flex-col gap-2 pt-6 border-t border-white/[0.05]">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">Weight Only / No Scale</span>
                            <div>
                                <TextPressure
                                    className="text-3xl md:text-4xl font-medium text-white/80"
                                    baseWeight={100}
                                    maxWeight={900}
                                    baseScale={1}
                                    maxScale={1}
                                    radius={180}
                                >
                                    Variable Weight
                                </TextPressure>
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
                        { step: "01", title: "Character Mapping", desc: "The component splits sentences into individual span elements, maintaining spaces while allowing per-character manipulation." },
                        { step: "02", title: "Mouse Tracking", desc: "Tracks global cursor position via mousemove events, storing coordinates in a ref for zero-cost reads in the animation loop." },
                        { step: "03", title: "Spatial Distance", desc: "Each character calculates its bounding rect center every frame, computing the Euclidean distance to the cursor via Pythagorean theorem." },
                        { step: "04", title: "Direct DOM Manipulation", desc: "Distance maps to CSS font-weight and transform scale via requestAnimationFrame, bypassing React re-renders for buttery 60fps performance." },
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
                                <td className="px-6 py-4">The text block you wish to manipulate. Must be a direct string.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">baseWeight / maxWeight</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">400 / 900</td>
                                <td className="px-6 py-4">Minimum and maximum font weight constraints.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">baseScale / maxScale</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">1 / 1.3</td>
                                <td className="px-6 py-4">Transformation multipliers for character scaling.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">radius</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">150</td>
                                <td className="px-6 py-4">Distance in pixels required to trigger maximum distortion.</td>
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
                    <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">2. Copy Utility</p>
                    <p className="text-[13px] text-white/60 font-light leading-relaxed mb-6">Ensure your project has the <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">cn()</code> tailwind-merge utility correctly defined in <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">lib/utils.ts</code>.</p>
                    <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">3. Copy Source</p>
                    <p className="text-[13px] text-white/60 font-light leading-relaxed">Save the generated component source block to your <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">/components/ui/text-pressure/index.tsx</code> file.</p>
                </div>
            </div>
        </div>
    );
}
