import type { Metadata } from "next";
import { Bento01 } from "@/components/blocks/bento-01";
import { CodePreview } from "@/components/site/code-preview";

const codeEndpoint = "/api/code?type=block&name=bento-01.tsx";

export const metadata: Metadata = {
    title: "Bento 01 - AuraBitz Blocks",
    description: "Holographic Glass connected grid.",
};

export default function Bento01Page() {
    return (
        <div className="w-full flex-1 flex flex-col pt-4 pb-20 max-w-7xl">
            {/* Header info for the block */}
            <div className="mb-8 pl-2">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        Bento Grids
                    </span>
                    <span className="text-white/20 text-sm">/</span>
                    <span className="text-white/80 font-mono text-xs">Bento 01</span>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Holographic Ecosystem</h1>
                <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed font-light">
                    The ultimate presentation of data. A perfectly spaced, visually interconnected bento layout running physics-based tracking lighting across ultra-dark refractive glass cards. The primary card contains a live WebGL instance to demonstrate rendering context blending.
                </p>
            </div>

            {/* Preview + Code Integration */}
            <CodePreview codeEndpoint={codeEndpoint}>
                <div className="w-full bg-black overflow-hidden relative border-y border-white/[0.05]">
                    <Bento01 />
                </div>
            </CodePreview>

            {/* Implementation Requirements */}
            <div className="mt-16 space-y-6">
                <h2 className="grad-text text-2xl font-extrabold tracking-tighter">Requirements</h2>
                <div className="space-y-4">
                    <div className="group relative p-5 rounded-2xl border border-white/[0.05] bg-[#0a0a0a] overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <p className="text-xs text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">1. Required UI Components</p>
                        <p className="text-sm text-white/50 font-light max-w-2xl leading-relaxed mb-4">
                            You must copy these base primitives into your `ui` directory before importing the full Bento Grid block.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-mono text-white/70 bg-white/[0.05] border border-white/10 px-2 py-1 rounded">SpotlightCard</span>
                            <span className="text-xs font-mono text-white/70 bg-white/[0.05] border border-white/10 px-2 py-1 rounded">WebGLGlassCore</span>
                            <span className="text-xs font-mono text-white/70 bg-white/[0.05] border border-white/10 px-2 py-1 rounded">KineticButton</span>
                            <span className="text-xs font-mono text-white/70 bg-white/[0.05] border border-white/10 px-2 py-1 rounded">BlurText</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
