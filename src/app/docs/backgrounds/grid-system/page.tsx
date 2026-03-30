import { GridSystem } from "@/components/ui/grid-system";
import { CodePreview } from "@/components/site/code-preview";

const codeEndpoint = "/api/code?type=component&name=grid-system";

export default function GridSystemPage() {
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
                        Grid System
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        A high-performance architectural background component. Features three distinct patterns (dots, lines, crosses), physics-based interactive raycasting, and infinite linear drift.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview codeEndpoint={codeEndpoint}>
                <div className="w-full flex flex-col gap-6 -mt-2">
                    {/* Primary Hero Demo */}
                    <div className="relative h-80 w-full rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                        <GridSystem
                            type="cross"
                            size={40}
                            animated={true}
                            fadeMask="radial"
                            color="rgba(255,255,255,0.06)"
                            interactiveColor="rgba(56,189,248,0.8)" // Cyan glow
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                                <span className="text-white font-medium tracking-wide">Interactive Cross Pattern (Animated)</span>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Demos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="relative h-64 rounded-xl border border-white/10 overflow-hidden bg-black group">
                            <GridSystem
                                type="dot"
                                size={30}
                                animated={false}
                                fadeMask="linear" // fading out at the bottom
                                color="rgba(255,255,255,0.08)"
                                interactiveColor="rgba(255,255,255,1)"
                            />
                            <div className="absolute bottom-4 left-4 pointer-events-none">
                                <span className="text-white/40 text-sm font-medium">Dot Matrix</span>
                            </div>
                        </div>
                        <div className="relative h-64 rounded-xl border border-white/10 overflow-hidden bg-black">
                            <GridSystem
                                type="line"
                                size={50}
                                animated={true}
                                fadeMask="radial"
                                color="rgba(168,85,247,0.15)" // Purple base
                                interactiveColor="rgba(168,85,247,1)" // Purple glow
                            />
                            <div className="absolute bottom-4 left-4 pointer-events-none">
                                <span className="text-purple-400/40 text-sm font-medium">Line Topology</span>
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
                        { step: "01", title: "Dynamic SVG Generation", desc: "Rather than heavy nested divs, the pattern generates mathematically perfect SVGs directly encoded into ultra-fast CSS `backgroundImage` data URIs." },
                        { step: "02", title: "Dual Layer Architecture", desc: "The background is composed of a dim static layer, and a perfectly aligned bright \"interactive\" layer." },
                        { step: "03", title: "Spotlight Masking", desc: "Using Framer Motion useSpring, a radial-gradient mask follows the cursor, revealing the bright layer only in a 150px radius." },
                        { step: "04", title: "Infinite 0-Cost Drift", desc: "The `animated` prop uses pure CSS transforms (translateX/Y) on a 200% sized container. Zero Javascript overhead for infinite scrolling." },
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
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">type</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">&quot;dot&quot; | &quot;line&quot; | &quot;cross&quot;</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">&quot;dot&quot;</td>
                                <td className="px-6 py-4">The architectural geometry of the grid.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">size</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">40</td>
                                <td className="px-6 py-4">Pixel dimension of each grid cell square.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">color</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">{`"rgba(255,255,255,0.05)"`}</td>
                                <td className="px-6 py-4">The dim ambient color of the grid.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">interactiveColor</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">{`"rgba(255,255,255,0.8)"`}</td>
                                <td className="px-6 py-4">The bright color revealed when hovered.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">fadeMask</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">&quot;radial&quot; | &quot;linear&quot; | &quot;none&quot;</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">&quot;radial&quot;</td>
                                <td className="px-6 py-4">Global layout mask gradient behavior.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">animated</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">boolean</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">false</td>
                                <td className="px-6 py-4">Infinite 60s diagonal steady drift.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Installation */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 grad-text">Installation</h2>
                <div className="group relative p-6 rounded-[2rem] border border-white/[0.05] bg-[#050505] overflow-hidden">
                    <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">1. Add CSS Animation</p>
                    <p className="text-[13px] text-white/60 font-light leading-relaxed mb-4">Add the <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">grid-drift</code> animation to your Tailwind configuration (globals.css for Tailwind v4).</p>
                    <pre className="flex items-center justify-between font-mono text-[13px] text-emerald-400/90 bg-[#111] p-4 rounded-xl border border-white/[0.05] shadow-inner overflow-x-auto mb-6">
                        <code>{`@theme inline {
  --animate-grid-drift: grid-drift 60s linear infinite;
}
@keyframes grid-drift {
  0% { transform: translateX(-50%) translateY(-50%); }
  100% { transform: translateX(0) translateY(0); }
}`}</code>
                    </pre>

                    <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em] mt-8">2. Component Setup</p>
                    <pre className="flex items-center justify-between font-mono text-[13px] text-emerald-400/90 bg-[#111] p-3 rounded-xl border border-white/[0.05] shadow-inner mb-6 overflow-x-auto">
                        <code>npm install framer-motion</code>
                    </pre>
                    <p className="text-[13px] text-white/60 font-light leading-relaxed">Copy the <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">GridSystem</code> source code into your UI library folder.</p>
                </div>
            </div>
        </div>
    );
}
