"use client";

import { CircularText } from "@/components/ui/circular-text";
import { CodePreview } from "@/components/site/code-preview";

export default function CircularTextPageClient({ sourceCode }: { sourceCode: string }) {
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
                        Circular Text
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        A badge or signature element that spins perfectly around a central origin point. Complete with dynamic hover interactions mapping entirely across native 3D rotation transforms.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview code={sourceCode}>
                <div className="w-full flex flex-wrap items-center justify-center gap-[10vw] py-20 px-4">

                    {/* Slow Down on Hover (Default) */}
                    <div className="relative group flex items-center justify-center">
                        <CircularText
                            text="• NEXT LEVEL BADGE EFFECT • EXPERIMENTAL COMPONENTS "
                            radius={80}
                            spinDuration={15}
                            className="text-white/80 transition-opacity group-hover:text-emerald-400 group-hover:bg-white/[0.02] group-hover:scale-105 duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] text-[11px]"
                        />
                        <div className="absolute text-[9px] font-mono tracking-widest uppercase text-white/30 text-center">
                            Slow<br />Down
                        </div>
                    </div>

                    {/* Go Bonkers on Hover */}
                    <div className="relative group flex items-center justify-center">
                        <CircularText
                            text="• HOVER OVER ME RIGHT NOW • I WILL GO ABSOLUTELY CRAZY "
                            radius={70}
                            spinDuration={10}
                            onHover="goBonkers"
                            className="text-white/50 transition-colors group-hover:text-red-400 group-hover:bg-white/[0.02] text-[10px]"
                        />
                        <div className="absolute text-[9px] font-mono tracking-widest uppercase text-white/30 text-center">
                            Go<br />Bonkers
                        </div>
                    </div>

                </div>
            </CodePreview>

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
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">text</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">—</td>
                                <td className="px-6 py-4">The exact string to map along the circle. Try ensuring that your string is padded evenly if looping.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">radius</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">100</td>
                                <td className="px-6 py-4">The span radius representing half of the total dimensions.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">spinDuration</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">10</td>
                                <td className="px-6 py-4">The base duration to complete a full 360-degree rotation.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">onHover</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">enum</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">&quot;slowDown&quot;</td>
                                <td className="px-6 py-4">Interaction state trigger mapped to hover commands. Values: &quot;slowDown&quot; | &quot;speedUp&quot; | &quot;pause&quot; | &quot;goBonkers&quot;</td>
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
