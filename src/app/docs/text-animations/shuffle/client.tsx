"use client";

import { ShuffleText } from "@/components/ui/shuffle";
import { CodePreview } from "@/components/site/code-preview";

export default function ShufflePageClient({ codeEndpoint }: { codeEndpoint: string }) {

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
                        Shuffle
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        A seamless transitioning string shuffle loop utilizing Framer Motion&apos;s physical frames to randomly scramble letters as they shift from one string into another.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview codeEndpoint={codeEndpoint}>
                <div className="relative w-full flex flex-col items-center justify-center p-8 gap-8">

                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="text-[10px] uppercase font-mono tracking-widest text-[#555] mb-2 px-3 py-1 border border-white/[0.05] rounded-full bg-white/[0.02]">
                            Endless Phrase Loop
                        </div>
                        <div className="text-3xl md:text-5xl font-black font-mono tracking-tight text-emerald-400">
                            <ShuffleText
                                texts={["EXPERIMENTAL UI", "AESTHETIC COMPONENTS", "NEXT LEVEL MAGIC", "FRACKING SICK SHUFFLE", "SEAMLESS ANIMATIONS"]}
                                interval={4000}
                                shuffleDuration={1.2}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-10 items-center text-center border-t border-white/10 pt-10">
                        <div className="text-[10px] uppercase font-mono tracking-widest text-[#555] mb-2 px-3 py-1 border border-white/[0.05] rounded-full bg-white/[0.02]">
                            Binary Decoder
                        </div>
                        <div className="text-2xl font-light font-mono tracking-widest text-white/80">
                            <span>{">"} STATUS: </span>
                            <ShuffleText
                                texts={["ONLINE", "ENCRYPTED", "SECURE", "VERIFIED"]}
                                interval={2000}
                                shuffleDuration={0.5}
                                characterSet="01"
                                className="text-red-400 font-bold"
                            />
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
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">texts</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string[]</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">—</td>
                                <td className="px-6 py-4">Direct array of formatted strings to cycle endlessly.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">interval</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">3000</td>
                                <td className="px-6 py-4">Interval duration (miliseconds) waiting before switching target string.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">shuffleDuration</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">0.8</td>
                                <td className="px-6 py-4">Framer duration (seconds) required across the full transition duration.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">characterSet</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">az.. !@#</td>
                                <td className="px-6 py-4">The exact literal character string map that Randomizer utilizes to generate gibberish. Good for hex encoding sequences mapping bits directly.</td>
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
