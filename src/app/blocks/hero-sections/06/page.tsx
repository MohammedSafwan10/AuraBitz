import { Hero06 } from "@/components/blocks/hero-06";
import { CodePreview } from "@/components/site/code-preview";
import { getBlockSource } from "@/lib/source";

const sourceCode = getBlockSource("hero-06.tsx");

export default function Hero06Page() {
    return (
        <div className="w-full flex-1 flex flex-col pt-4 pb-20 max-w-7xl">
            {/* Header info for the block */}
            <div className="mb-10 pl-2">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#00e5ff]/70 border border-[#00e5ff]/20 rounded-none bg-[#00e5ff]/5 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                        Hero Sections
                    </span>
                    <span className="text-white/20 text-sm">/</span>
                    <span className="text-white/80 font-mono text-xs font-bold tracking-wider">Hero 06</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase font-mono text-white/90">Ethereal Neural Silk</h1>
                <p className="text-white/40 text-sm mt-3 max-w-xl leading-relaxed font-mono">
                    A breathtaking demonstration of Signed Distance Fields (SDFs) and Raymarching running purely on the GPU. The background features volumetic subsurface scattering and fluid drag effects, creating an interactive, organic fabric that feels incredibly high-end.
                </p>
            </div>

            {/* Preview + Code Integration */}
            <CodePreview code={sourceCode}>
                <div className="w-full bg-[#010103] overflow-hidden relative border-y border-[#00e5ff]/[0.1] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                    {/* Render raw block directly */}
                    <Hero06 />
                </div>
            </CodePreview>

            {/* Implementation Requirements */}
            <div className="mt-16 space-y-6">
                <h2 className="grad-text text-2xl font-black font-mono tracking-tighter uppercase">Engineering Specs</h2>
                <div className="space-y-4">
                    <div className="group relative p-6 rounded-none border border-white/[0.05] bg-[#0a0a0a] overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <p className="text-xs text-[#00e5ff]/50 mb-4 font-mono uppercase tracking-[0.2em] font-bold">I. Architecture Prerequisites</p>
                        <p className="text-sm text-white/50 font-mono max-w-2xl leading-relaxed mb-6">
                            Acquire the underlying brutalist primitives before initializing the Hero block.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 bg-white/[0.03] border border-white/10 px-3 py-1.5">BlurText</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 bg-white/[0.03] border border-white/10 px-3 py-1.5">KineticButton</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-black bg-[#00e5ff] px-3 py-1.5 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]">Motion Layers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
