import type { Metadata } from "next";
import { Feature04 } from "@/components/blocks/feature-04";
import { CodePreview } from "@/components/site/code-preview";
import { getBlockSource } from "@/lib/source";

const sourceCode = getBlockSource("feature-04.tsx");

export const metadata: Metadata = {
    title: "Feature Showcase 04 - AuraBitz Blocks",
    description: "A proof-vault feature block with sealed receipts, attestation rails, and a ledger-driven trust narrative.",
};

export default function FeatureShowcase04Page() {
    return (
        <div className="w-full max-w-7xl flex-1 flex-col pt-4 pb-20">
            <div className="relative mb-8 max-w-3xl pl-2">
                <div className="pointer-events-none absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-emerald-100/[0.06] blur-[100px]" />
                <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="rounded-full border border-emerald-100/15 bg-emerald-100/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-emerald-50/60 backdrop-blur-md shadow-[0_0_15px_rgba(74,222,128,0.08)]">
                            Feature Showcases
                        </span>
                        <span className="text-sm text-white/20">/</span>
                        <span className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-50/80">Feature 04</span>
                    </div>
                    <h1 className="mb-5 font-mono text-4xl font-extrabold uppercase tracking-[-0.08em] text-white md:text-5xl">
                        Feature 04
                        <span className="block font-serif text-[0.62em] italic normal-case tracking-tight text-white/74">Proof Vault</span>
                    </h1>
                    <p className="max-w-2xl font-mono text-[12px] uppercase leading-7 tracking-[0.14em] text-emerald-50/46">
                        A final feature chapter built as a sealed archive of evidence, where trust cues arrive as receipts, rows, and attestation events.
                    </p>
                </div>
            </div>

            <CodePreview code={sourceCode}>
                <div className="relative w-full overflow-hidden border-y border-white/[0.05] bg-black">
                    <Feature04 />
                </div>
            </CodePreview>

            <div className="mt-16 space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter text-white">Requirements</h2>
                <div className="space-y-4">
                    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0a0a0a] p-5">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <p className="mb-3 text-xs font-mono uppercase tracking-[0.1em] text-white/40">1. Required UI Components</p>
                        <p className="mb-4 max-w-2xl text-sm font-light leading-relaxed text-white/50">
                            This block stays intentionally lean: one tactile CTA primitive, Framer Motion, and a ledger-first layout language.
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