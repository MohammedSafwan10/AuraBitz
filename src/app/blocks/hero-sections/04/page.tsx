import { Hero04 } from "@/components/blocks/hero-04";
import { CodePreview } from "@/components/site/code-preview";

const codeEndpoint = "/api/code?type=block&name=hero-04.tsx";

export default function Hero04Page() {
    return (
        <div className="w-full flex-1 flex flex-col pt-4 pb-20 max-w-7xl">
            {/* Header info for the block */}
            <div className="mb-8 pl-2">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-rose-300/50 border border-rose-500/20 rounded-full bg-rose-500/5 backdrop-blur-md shadow-[0_0_15px_rgba(225,29,72,0.1)]">
                        Hero Sections
                    </span>
                    <span className="text-white/20 text-sm">/</span>
                    <span className="text-white/80 font-mono text-xs">Hero 04</span>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">The Liquid Flow</h1>
                <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed font-light">
                    An incredibly performant fluid simulation calculated mathematically via a massive fragment shader. Rather than rendering 3D geometries, this renders a single 2D plane stretching across the screen, calculating elegant, interactive color physics directly targeting the GPU pixel pipelines. It runs flawlessly on cell phones while looking remarkably immersive.
                </p>
            </div>

            {/* Preview + Code Integration */}
            <CodePreview codeEndpoint={codeEndpoint}>
                <div className="w-full bg-black overflow-hidden relative border-y border-white/[0.05]">
                    {/* Render raw block directly representing the 100vw implementation */}
                    <Hero04 />
                </div>
            </CodePreview>

            {/* Implementation Requirements */}
            <div className="mt-16 space-y-6">
                <h2 className="grad-text text-2xl font-extrabold tracking-tighter">Requirements</h2>
                <div className="space-y-4">
                    <div className="group relative p-5 rounded-2xl border border-white/[0.05] bg-[#0a0a0a] overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <p className="text-xs text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">1. Required Primitives</p>
                        <p className="text-sm text-white/50 font-light max-w-2xl leading-relaxed mb-4">
                            You must first copy these primitives from the UI documentation index.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-mono text-white/70 bg-white/[0.05] border border-white/10 px-2 py-1 rounded">BlurText</span>
                            <span className="text-xs font-mono text-white/70 bg-white/[0.05] border border-white/10 px-2 py-1 rounded">KineticButton</span>
                            <span className="text-xs font-mono text-rose-400/70 border border-rose-500/20 bg-rose-500/5 px-2 py-1 rounded shadow-[0_0_10px_rgba(225,29,72,0.1)]">WebGLLiquidAurora</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
