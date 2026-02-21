"use client";

import { KineticButton } from "@/components/ui/kinetic-button";
import { CodePreview } from "@/components/site/code-preview";

export default function KineticButtonPageClient({ sourceCode }: { sourceCode: string }) {
    return (
        <div className="max-w-4xl space-y-16">
            {/* Header */}
            <div className="relative">
                <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            3D &amp; Physical
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-5 pb-2 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                        Kinetic Button
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        A magnetically responsive button that displaces toward the cursor with spring physics, paired with a precision shimmer that tracks the pointer position across the surface.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview code={sourceCode}>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <KineticButton variant="primary" magneticPull={0.15}>
                        Let&apos;s Go
                    </KineticButton>
                    <KineticButton variant="secondary" magneticPull={0.25}>
                        Secondary
                    </KineticButton>
                    <KineticButton variant="ghost" magneticPull={0.35}>
                        Ghost
                    </KineticButton>
                    <KineticButton variant="danger" magneticPull={0.2}>
                        Delete
                    </KineticButton>
                </div>
            </CodePreview>

            {/* How It Works */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">How it works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { step: "01", title: "Magnetic Field", desc: "Cursor distance from button center is multiplied by magneticPull to compute displacement vector." },
                        { step: "02", title: "Interactive Physics", desc: "Framer Motion scales physical tap response down to 0.95 with tight spring metrics." },
                        { step: "03", title: "Edge Highlight", desc: "A CSS masked pseudo-element creates a stunning illuminated tracking border on glassmorphic variants." },
                    ].map((item) => (
                        <div key={item.step} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                            <span className="text-[10px] font-mono text-white/20 tracking-widest">{item.step}</span>
                            <h3 className="text-sm font-medium text-white mt-2 mb-1">{item.title}</h3>
                            <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Props */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">Props</h2>
                <div className="border border-white/[0.05] rounded-2xl overflow-hidden bg-black/40 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                                <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">Prop</th>
                                <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">Type</th>
                                <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">Default</th>
                                <th className="text-left px-5 py-3 text-white/40 font-medium text-xs uppercase tracking-wider">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-white/60">
                            <tr className="border-b border-white/[0.04]">
                                <td className="px-5 py-3 font-mono text-xs text-white/80">children</td>
                                <td className="px-5 py-3 font-mono text-xs text-emerald-400/70">ReactNode</td>
                                <td className="px-5 py-3 text-white/30">—</td>
                                <td className="px-5 py-3 text-xs">Button label content</td>
                            </tr>
                            <tr className="border-b border-white/[0.04]">
                                <td className="px-5 py-3 font-mono text-xs text-white/80">magneticPull</td>
                                <td className="px-5 py-3 font-mono text-xs text-emerald-400/70">number</td>
                                <td className="px-5 py-3 font-mono text-xs text-white/30">0.2</td>
                                <td className="px-5 py-3 text-xs">Strength of magnetic displacement (0→1)</td>
                            </tr>
                            <tr className="border-b border-white/[0.04]">
                                <td className="px-5 py-3 font-mono text-xs text-white/80">variant</td>
                                <td className="px-5 py-3 font-mono text-xs text-emerald-400/70">&quot;primary&quot; | &quot;secondary&quot; | &quot;ghost&quot; | &quot;danger&quot;</td>
                                <td className="px-5 py-3 font-mono text-xs text-white/30">&quot;primary&quot;</td>
                                <td className="px-5 py-3 text-xs">Architectural preset style class</td>
                            </tr>
                            <tr>
                                <td className="px-5 py-3 font-mono text-xs text-white/80">className</td>
                                <td className="px-5 py-3 font-mono text-xs text-emerald-400/70">string</td>
                                <td className="px-5 py-3 text-white/30">—</td>
                                <td className="px-5 py-3 text-xs">Tailwind classes for color, size, border</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-white/30">Also extends all native <code className="text-white/50 bg-white/5 px-1 rounded">HTMLButtonElement</code> attributes (onClick, disabled, etc.)</p>
            </div>

            {/* Installation */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">Installation</h2>
                <div className="group relative p-5 rounded-2xl border border-white/[0.05] bg-[#0a0a0a] overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <p className="text-xs text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">Dependencies</p>
                    <pre className="flex items-center justify-between font-mono text-[13px] text-emerald-400/90 bg-black/50 p-3 rounded-xl border border-white/[0.05]">
                        <code>npm install framer-motion</code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
