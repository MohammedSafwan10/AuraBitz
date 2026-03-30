import type { Metadata } from "next";
import { Feature03 } from "@/components/blocks/feature-03";
import { CodePreview } from "@/components/site/code-preview";
import { getBlockSource } from "@/lib/source";

const sourceCode = getBlockSource("feature-03.tsx");

export const metadata: Metadata = {
    title: "Feature Showcase 03 - AuraBitz Blocks",
    description: "A charged spatial feature block with layered depth planes, field-biased motion, and a tactile control rail.",
};

export default function FeatureShowcase03Page() {
    return (
        <div className="w-full flex-1 flex flex-col pt-4 pb-20 max-w-7xl">
            <div className="relative mb-8 max-w-3xl pl-2">
                <div className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-amber-100/[0.06] blur-[100px] pointer-events-none" />
                <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="rounded-full border border-amber-100/15 bg-amber-100/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-amber-50/60 backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.08)]">
                            Feature Showcases
                        </span>
                        <span className="text-sm text-white/20">/</span>
                        <span className="text-xs font-mono uppercase tracking-[0.18em] text-amber-50/80">Feature 03</span>
                    </div>
                    <h1 className="mb-5 text-4xl font-medium tracking-tight text-white md:text-5xl">
                        Feature Showcase
                        <span className="block font-serif italic text-amber-50/78">03</span>
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-amber-50/48">
                        A spatial motion-field block that turns flat UI into a charged, layered surface with visible bias and lift.
                    </p>
                </div>
            </div>

            <CodePreview code={sourceCode}>
                <div className="relative w-full overflow-hidden border-y border-white/[0.05] bg-black">
                    <Feature03 />
                </div>
            </CodePreview>

            <div className="mt-16 space-y-6">
                <h2 className="grad-text text-2xl font-extrabold tracking-tighter">Requirements</h2>
                <div className="space-y-4">
                    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0a0a0a] p-5">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <p className="mb-3 text-xs font-mono uppercase tracking-[0.1em] text-white/40">1. Required UI Components</p>
                        <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-white/50">
                            The block stays focused on one tactile CTA primitive and the comparison stage built entirely with layered DOM surfaces.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded border border-white/10 bg-white/[0.05] px-2 py-1 text-xs font-mono text-white/70">KineticButton</span>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0a0a0a] p-5">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <p className="mb-3 text-xs font-mono uppercase tracking-[0.1em] text-white/40">2. Install Motion Dependencies</p>
                        <pre className="overflow-x-auto rounded-xl border border-white/[0.05] bg-black/50 p-3 font-mono text-[13px] text-emerald-400/90">
                            <code>npm install framer-motion lucide-react</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
