import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/header";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <div className="relative min-h-[80vh] flex items-center justify-center py-24 pb-32">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/[0.02]">
                        <Heart size={12} className="text-emerald-400" />
                        <span className="text-[10px] uppercase font-mono tracking-widest text-white/60">Open Source</span>
                    </div>
                    <h1 className="grad-text text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">
                        Free. Forever.
                    </h1>
                    <p className="text-lg text-white/50 font-light leading-relaxed mb-4 max-w-lg mx-auto">
                        AuraBitz is completely free and open source under the MIT license. Copy, paste, and ship — no subscriptions, no paywalls, no strings attached.
                    </p>
                    <p className="text-sm text-white/30 font-light leading-relaxed mb-10 max-w-md mx-auto">
                        Every component is yours to own. Use in personal and commercial projects. Attribution appreciated but not required.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/docs"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                        >
                            Explore Components
                            <ArrowRight size={14} />
                        </Link>
                        <Link
                            href="https://github.com/MohammedSafwan10/AuraBitz"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white border border-white/10 rounded-full text-sm font-medium hover:bg-white/5 transition-colors"
                        >
                            View on GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
