import { Feature02 } from "@/components/blocks/feature-02";
import { CodePreview } from "@/components/site/code-preview";
import { getBlockSource } from "@/lib/source";

const sourceCode = getBlockSource("feature-02.tsx");

export const metadata = {
    title: "Feature Showcase 02 - AuraBitz Blocks",
    description: "An instrument-grade architecture block with a live system rail, diagnostic readouts, and sharper technical composition.",
};

export default function FeatureShowcase02Page() {
    return (
        <div className="w-full flex-1 flex flex-col pt-4 pb-20 max-w-7xl">
            <div className="relative mb-8 pl-2 max-w-3xl">
                <div className="absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-cyan-200/[0.06] blur-[100px] pointer-events-none" />
                <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="rounded-full border border-cyan-200/15 bg-cyan-200/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-cyan-100/60 backdrop-blur-md shadow-[0_0_15px_rgba(103,232,249,0.08)]">
                            Feature Showcases
                        </span>
                        <span className="text-sm text-white/20">/</span>
                        <span className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-100/80">Feature 02</span>
                    </div>
                    <h1 className="mb-5 font-mono text-4xl font-extrabold uppercase tracking-[-0.08em] text-white md:text-5xl">Feature Showcase 02</h1>
                    <p className="max-w-2xl font-mono text-[12px] uppercase leading-7 tracking-[0.14em] text-cyan-100/46">
                        A sharper systems block that reads like operating architecture instead of another premium hero card.
                    </p>
                </div>
            </div>

            <CodePreview code={sourceCode}>
                <div className="relative w-full overflow-hidden border-y border-white/[0.05] bg-black">
                    <Feature02 />
                </div>
            </CodePreview>

            <div className="mt-16 space-y-6">
                <h2 className="grad-text text-2xl font-extrabold tracking-tighter">Requirements</h2>
                <div className="space-y-4">
                    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0a0a0a] p-5">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <p className="mb-3 text-xs font-mono uppercase tracking-[0.1em] text-white/40">1. Required UI Components</p>
                        <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-white/50">
                            This block stays lean and relies on one physical CTA primitive plus Framer Motion for the apparatus choreography.
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
