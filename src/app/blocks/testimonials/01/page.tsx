import type { Metadata } from "next";
import { Testimonials01 } from "@/components/blocks/testimonials-01";
import { CodePreview } from "@/components/site/code-preview";

const codeEndpoint = "/api/code?type=block&name=testimonials-01.tsx";

export const metadata: Metadata = {
    title: "Testimonials 01 - AuraBitz Blocks",
    description: "Minimalist testimonial and social proof blocks.",
};

export default function TestimonialsPage() {
    return (
        <div className="w-full flex-1 flex flex-col pt-4 pb-20 max-w-7xl">
            <div className="relative mb-8 pl-2 max-w-3xl">
                <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            Landing Page Blocks
                        </span>
                        <span className="text-white/20 text-sm">/</span>
                        <span className="text-white/80 font-mono text-xs">Testimonials 01</span>
                    </div>
                    <h1 className="grad-text text-4xl md:text-5xl font-extrabold tracking-tighter mb-5">Testimonials 01</h1>
                    <p className="text-white/50 text-lg leading-relaxed font-light max-w-2xl">
                        Clean typography carousels and grid networks for establishing social proof.
                    </p>
                </div>
            </div>

            <CodePreview codeEndpoint={codeEndpoint}>
                <div className="w-full bg-black overflow-hidden relative border-y border-white/[0.05]">
                    <Testimonials01 />
                </div>
            </CodePreview>

            <div className="mt-16 space-y-6">
                <h2 className="grad-text text-2xl font-extrabold tracking-tighter">Requirements</h2>
                <div className="space-y-4">
                    <div className="group relative p-5 rounded-2xl border border-white/[0.05] bg-[#0a0a0a] overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <p className="text-xs text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">1. Dependencies</p>
                        <p className="text-sm text-white/50 font-light max-w-2xl leading-relaxed mb-4">
                            This block uses Framer Motion for entry animations and Lucide React for icons.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-mono text-white/70 bg-white/[0.05] border border-white/10 px-2 py-1 rounded">framer-motion</span>
                            <span className="text-xs font-mono text-white/70 bg-white/[0.05] border border-white/10 px-2 py-1 rounded">lucide-react</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
