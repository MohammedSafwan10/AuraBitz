import { RadialNoise } from "@/components/ui/radial-noise";
import { CodePreview } from "@/components/site/code-preview";
import { getComponentSource } from "@/lib/source";

const sourceCode = getComponentSource("radial-noise");

export default function RadialNoisePage() {
    return (
        <div className="max-w-4xl space-y-16 pb-20">
            {/* Header */}
            <div className="relative">
                <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            Backgrounds
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-5 pb-2 grad-text">
                        Radial Noise
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        Physical grain built purely with mathematics. Utilizes inline SVG `feTurbulence` with a Framer Motion light ray system that physically intersects with the noise layer using color-dodge blending.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview code={sourceCode}>
                <div className="w-full flex flex-col gap-6 -mt-2">
                    {/* Primary Hero Demo */}
                    <div className="relative h-80 w-full rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                        <RadialNoise
                            spotlightSize={500}
                            glowColor="rgba(244, 63, 94, 0.4)" // Rose base
                            frequency={0.8}
                            noiseOpacity={0.5}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/20 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                                <span className="text-white font-medium tracking-wide">Rose Quartz Grain (Hover Me)</span>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Demos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="relative h-64 rounded-xl border border-white/10 overflow-hidden bg-black group">
                            <RadialNoise
                                spotlightSize={350}
                                glowColor="rgba(56, 189, 248, 0.4)" // Cyan base
                                baseColor="#00070a"
                                frequency={1.2} // tighter noise
                                noiseOpacity={0.7}
                            />
                            <div className="absolute bottom-4 left-4 pointer-events-none">
                                <span className="text-white/40 text-sm font-medium">High Frequency Cyan</span>
                            </div>
                        </div>
                        <div className="relative h-64 rounded-xl border border-white/10 overflow-hidden bg-black">
                            <RadialNoise
                                spotlightSize={450}
                                glowColor="rgba(168, 85, 247, 0.4)" // Purple base
                                frequency={0.65} // wider noise
                                noiseOpacity={0.6}
                            />
                            <div className="absolute bottom-4 left-4 pointer-events-none">
                                <span className="text-white/40 text-sm font-medium">Soft Violet Plasma</span>
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
                        { step: "01", title: "Fractal Mathematics", desc: "No massive PNG overlays. The noise is a mathematically pure SVG `<feTurbulence>` filter encoded as a data URI." },
                        { step: "02", title: "Intersection Physics", desc: "The grain layer sits in the middle. The light beam uses `mix-blend-color-dodge` to explosively burn bright color specifically onto the noise." },
                        { step: "03", title: "Idle Animations", desc: "When the mouse leaves the container, the beam physics smoothly glide the light source precisely back to the dead center." },
                        { step: "04", title: "Zero Layout Shift", desc: "Everything is absolute positioning over a `div`. This means you can drop it directly behind any component immediately." },
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
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">frequency</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">0.8</td>
                                <td className="px-6 py-4">SVG &lt;feTurbulence&gt; frequency (modifies noise scale)</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">glowColor</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">&quot;rgba(168,85,247,0.4)&quot;</td>
                                <td className="px-6 py-4">Base color used for spotlight light rays</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">noiseOpacity</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">0.5</td>
                                <td className="px-6 py-4">The physical intensity of the SVG static</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">spotlightSize</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">400</td>
                                <td className="px-6 py-4">Size of the interactive light beam radius</td>
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
                    <p className="text-[13px] text-white/60 font-light leading-relaxed">No external assets required. The fractal grain map calculates in real-time off a CSS encoded scalar SVG equation.</p>
                </div>
            </div>
        </div>
    );
}
