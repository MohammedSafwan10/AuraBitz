"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pricingTiers = [
    {
        name: "Free",
        description: "Perfect for hobbyists exploring the basics of 3D UI.",
        monthlyPrice: "₹0",
        annualPrice: "₹0",
        features: [
            "Access to 5 basic components",
            "Community support in Discord",
            "Basic documentation",
            "Personal use license",
        ],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Plus",
        description: "Everything you need to build premium production apps.",
        monthlyPrice: "₹999",
        annualPrice: "₹799",
        originalAnnualPrice: "₹999", // For strikethrough psychology
        features: [
            "Full library of 30+ components",
            "Commercial use license",
            "Monthly updates",
            "Email support",
            "Cancel anytime",
        ],
        cta: "Upgrade to Plus",
        highlight: true,
        badge: "Most Popular",
    },
    {
        name: "Pro",
        description: "For elite developers shipping world-class digital experiences.",
        monthlyPrice: "₹2,499",
        annualPrice: "₹1,999",
        originalAnnualPrice: "₹2,499",
        features: [
            "Everything in Plus",
            "Figma design files and tokens",
            "Physical physics & 3D engines",
            "Priority bug fixing (24hr SLA)",
            "Custom component requests",
        ],
        cta: "Get Pro License",
        highlight: false,
    }
];

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <div className="relative min-h-screen py-24 pb-32 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/[0.03] blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                        <Sparkles size={12} className="text-white/60" />
                        <span className="text-[10px] uppercase font-mono tracking-widest text-white/60">Unlock Premium Aesthetic</span>
                    </div>
                    <h1 className="grad-text text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">
                        Invest in your interface.
                    </h1>
                    <p className="text-lg text-white/50 font-light leading-relaxed mb-10">
                        Stop wasting hours building complex animations from scratch. Get architectural-grade components that instantly elevate your app&apos;s perceived value.
                    </p>

                    {/* Toggle Switch */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={cn("text-sm font-medium transition-colors", !isAnnual ? "text-white" : "text-white/40")}>Monthly</span>

                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative w-14 h-7 rounded-full bg-white/10 border border-white/10 transition-colors hover:bg-white/15 focus:outline-none"
                        >
                            <div className={cn(
                                "absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ease-in-out shadow-[0_0_10px_rgba(255,255,255,0.3)]",
                                isAnnual ? "translate-x-7" : "translate-x-0"
                            )} />
                        </button>

                        <div className="flex items-center gap-2">
                            <span className={cn("text-sm font-medium transition-colors", isAnnual ? "text-white" : "text-white/40")}>Annually</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Save 20%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={cn(
                                "relative rounded-[2rem] p-8 transition-all duration-300 flex flex-col h-full",
                                tier.highlight
                                    ? "bg-gradient-to-b from-[#111] to-[#050505] border border-white/15 shadow-[0_0_50px_rgba(255,255,255,0.05)] md:-translate-y-4 z-10"
                                    : "bg-[#050505] border border-white/[0.05] hover:border-white/[0.08] hover:-translate-y-1"
                            )}
                        >
                            {/* Pro Highlight Glow Line */}
                            {tier.highlight && (
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.4] to-transparent" />
                            )}

                            {/* Pro Badge */}
                            {tier.badge && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-black text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                                    <Zap size={10} fill="currentColor" />
                                    {tier.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={cn(
                                    "text-xl font-bold tracking-tight mb-3",
                                    tier.highlight ? "text-white" : "text-white/80"
                                )}>
                                    {tier.name}
                                </h3>
                                <p className="text-sm font-light text-white/50 leading-relaxed mb-6 h-12">
                                    {tier.description}
                                </p>

                                {/* Price Display */}
                                <div className="flex flex-col gap-1 min-h-[80px]">
                                    {isAnnual && tier.originalAnnualPrice && (
                                        <div className="text-sm text-white/30 font-medium line-through decoration-white/20">
                                            {tier.originalAnnualPrice}/mo
                                        </div>
                                    )}
                                    <div className="flex items-baseline gap-2">
                                        <span className={cn(
                                            "font-extrabold tracking-tighter",
                                            tier.name === "Free" ? "text-4xl" : "text-5xl",
                                            tier.highlight ? "text-white" : "text-white/90"
                                        )}>
                                            {isAnnual ? tier.annualPrice : tier.monthlyPrice}
                                        </span>
                                        <div className="flex flex-col items-start leading-none">
                                            {tier.name !== "Free" && (
                                                <span className="text-sm font-medium text-white/40">/mo</span>
                                            )}
                                        </div>
                                    </div>
                                    {isAnnual && tier.name !== "Free" && (
                                        <div className="text-[11px] text-emerald-400 font-medium mt-1">
                                            Billed annually
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Features list */}
                            <ul className="space-y-4 mb-8 flex-grow">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex gap-3 text-[13px] font-light text-white/70">
                                        <Check size={16} className={cn(
                                            "flex-shrink-0 mt-0.5",
                                            tier.highlight ? "text-white" : "text-white/40"
                                        )} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                className={cn(
                                    "w-full py-4 px-4 rounded-xl text-[13px] font-bold transition-all duration-300 flex items-center justify-center gap-2 group",
                                    tier.highlight
                                        ? "bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                        : "bg-white/[0.03] text-white border border-white/[0.05] hover:bg-white/[0.08]"
                                )}
                            >
                                {tier.cta}
                                <ArrowRight size={14} className={cn(
                                    "transition-transform duration-300",
                                    tier.highlight ? "group-hover:translate-x-1" : "opacity-50 group-hover:opacity-100 group-hover:translate-x-1"
                                )} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Trust/Social Proof Section */}
                <div className="mt-32 max-w-3xl mx-auto text-center border-t border-white/[0.05] pt-16">
                    <h4 className="text-xl font-bold tracking-tight text-white mb-4">You&apos;re in good company</h4>
                    <p className="text-sm text-white/40 mb-10 font-light">Join thousands of developers building the next generation of web interfaces.</p>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale">
                        {/* Fake logos using text for now to create the "Trust" aesthetic */}
                        <div className="font-mono text-xl font-bold tracking-tighter">ACME CORP</div>
                        <div className="font-serif text-xl font-bold italic">GlobalTech</div>
                        <div className="font-sans text-xl font-black uppercase tracking-widest">NEXUS</div>
                        <div className="font-mono text-xl font-medium lowercase">start.up</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
