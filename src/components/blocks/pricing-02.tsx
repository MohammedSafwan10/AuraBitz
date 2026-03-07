"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type BillingMode = "monthly" | "annual";

interface Plan {
    name: string;
    price: string;
    cadence: string;
    summary: string;
    note: string;
    accent: string;
    cta: string;
    featured?: boolean;
    features: string[];
}

const plans: Record<BillingMode, Plan[]> = {
    monthly: [
        {
            name: "Starter",
            price: "$18",
            cadence: "/mo",
            summary: "Clean access for solo launches and focused experiments.",
            note: "For sharp independent shipping",
            accent: "from-cyan-400/24 via-sky-400/10 to-transparent",
            cta: "Start clean",
            features: [
                "Core component library",
                "Unlimited personal projects",
                "Commercial use for solo work",
                "Rolling release updates",
            ],
        },
        {
            name: "Pro",
            price: "$54",
            cadence: "/mo",
            summary: "Built for repeat launches with stronger systems and better leverage.",
            note: "Most chosen for active products",
            accent: "from-cyan-300/35 via-sky-300/14 to-transparent",
            cta: "Go pro",
            featured: true,
            features: [
                "Everything in Starter",
                "All launch-ready premium blocks",
                "Up to 5 active contributors",
                "Priority release channel",
            ],
        },
        {
            name: "Scale",
            price: "$129",
            cadence: "/mo",
            summary: "Studio-grade coverage for teams standardizing premium delivery.",
            note: "For teams turning polish into advantage",
            accent: "from-sky-400/24 via-cyan-400/10 to-transparent",
            cta: "Scale it",
            features: [
                "Everything in Pro",
                "Studio-wide internal usage",
                "Priority requests and previews",
                "Expanded licensing coverage",
            ],
        },
    ],
    annual: [
        {
            name: "Starter",
            price: "$190",
            cadence: "/year",
            summary: "Clean access for solo launches and focused experiments.",
            note: "Two months saved",
            accent: "from-cyan-400/24 via-sky-400/10 to-transparent",
            cta: "Lock annual",
            features: [
                "Core component library",
                "Unlimited personal projects",
                "Commercial use for solo work",
                "Rolling release updates",
            ],
        },
        {
            name: "Pro",
            price: "$540",
            cadence: "/year",
            summary: "Built for repeat launches with stronger systems and better leverage.",
            note: "Best annual yield",
            accent: "from-cyan-300/35 via-sky-300/14 to-transparent",
            cta: "Commit pro",
            featured: true,
            features: [
                "Everything in Starter",
                "All launch-ready premium blocks",
                "Up to 5 active contributors",
                "Priority release channel",
            ],
        },
        {
            name: "Scale",
            price: "$1,290",
            cadence: "/year",
            summary: "Studio-grade coverage for teams standardizing premium delivery.",
            note: "Long-horizon studio access",
            accent: "from-sky-400/24 via-cyan-400/10 to-transparent",
            cta: "Secure scale",
            features: [
                "Everything in Pro",
                "Studio-wide internal usage",
                "Priority requests and previews",
                "Expanded licensing coverage",
            ],
        },
    ],
};

const comparisonRows = [
    { label: "Blocks", values: ["—", "Included", "Included"] },
    { label: "Contributors", values: ["1", "Up to 5", "Studio-wide"] },
    { label: "Release lane", values: ["Standard", "Priority", "Priority + previews"] },
];

export function Pricing02() {
    const [billing, setBilling] = useState<BillingMode>("monthly");
    const activePlans = plans[billing];

    return (
        <section className="relative w-full overflow-hidden border-y border-cyan-400/10 bg-[#02070c] px-4 py-20 md:px-8 md:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_15%_75%,rgba(56,189,248,0.12),transparent_20%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.12),transparent_22%)]" />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/18 bg-cyan-300/[0.06] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-100/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-200/90" />
                            Conversion Glass
                        </div>
                        <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[0.94]">
                            Clear pricing, sharpened into a colder product surface.
                        </h2>
                        <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-cyan-50/55 md:text-lg">
                            Pricing 02 stays conversion-first, but the whole system is cleaner, colder, and more product-like: tighter numerals, glassier surfaces, cyan emphasis, and less editorial softness.
                        </p>
                    </div>

                    <div className="w-full max-w-[380px] rounded-[28px] border border-cyan-300/15 bg-[#041019] p-1.5 shadow-[0_0_40px_-18px_rgba(34,211,238,0.32)]">
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            {([
                                ["monthly", "Monthly"],
                                ["annual", "Annual"],
                            ] as const).map(([value, label]) => {
                                const active = billing === value;

                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setBilling(value)}
                                        className={cn(
                                            "rounded-[22px] px-5 py-3 text-left text-sm transition-all duration-300 sm:min-h-[72px]",
                                            active ? "bg-cyan-200 text-[#021018]" : "text-cyan-50/45 hover:bg-cyan-200/[0.08] hover:text-cyan-50"
                                        )}
                                    >
                                        <span className="block text-[10px] font-mono uppercase tracking-[0.2em]">
                                            {active && value === "annual" ? "Two months off" : "Billing mode"}
                                        </span>
                                        <span className="mt-1 block font-medium">{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                    {activePlans.map((plan, index) => (
                        <motion.article
                            key={`${billing}-${plan.name}`}
                            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "group relative overflow-hidden rounded-[30px] border border-cyan-400/10 bg-[#06111a] p-6 md:p-8 backdrop-blur-xl",
                                plan.featured && "scale-[1.01] border-cyan-300/30 shadow-[0_0_110px_-34px_rgba(34,211,238,0.34)]"
                            )}
                        >
                            <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80", plan.accent)} />
                            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />

                            <div className="relative flex h-full flex-col">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-100/45">{plan.note}</p>
                                        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">{plan.name}</h3>
                                    </div>
                                    {plan.featured ? (
                                        <div className="rounded-full border border-cyan-200/20 bg-cyan-200 text-[#021018] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]">
                                            Preferred
                                        </div>
                                    ) : null}
                                </div>

                                <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-cyan-50/58">{plan.summary}</p>

                                <div className="mt-8 border-y border-cyan-300/10 py-8">
                                    <div className="flex items-end gap-2">
                                        <span className="text-5xl font-semibold tracking-tighter text-white md:text-6xl">{plan.price}</span>
                                        <span className="pb-2 text-sm font-light text-cyan-100/35">{plan.cadence}</span>
                                    </div>
                                </div>

                                <ul className="mt-8 flex flex-1 flex-col gap-4">
                                    {plan.features.map((feature) => (
                                        <li key={`${billing}-${plan.name}-${feature}`} className="flex items-start gap-3 text-sm leading-relaxed text-cyan-50/62">
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-300/14 bg-cyan-200/[0.06] text-cyan-100/90">
                                                <Check size={12} />
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={cn(
                                    "mt-10 inline-flex h-12 w-full items-center justify-between rounded-full border px-5 text-sm font-medium transition-colors duration-300",
                                    plan.featured
                                        ? "border-cyan-200 bg-cyan-200 text-[#021018] hover:bg-cyan-100"
                                        : "border-cyan-300/14 bg-cyan-200/[0.04] text-white hover:border-cyan-200/30 hover:bg-cyan-200/[0.09]"
                                )}>
                                    <span>{plan.cta}</span>
                                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="overflow-hidden rounded-[28px] border border-cyan-300/12 bg-[#06111a]">
                        <div className="grid gap-px bg-cyan-200/[0.05]">
                            <div className="grid gap-4 bg-[#07141f] px-6 py-6 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] md:items-center">
                                <div>
                                    <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-cyan-100/40">Comparison rail</p>
                                    <p className="mt-2 text-sm leading-relaxed text-cyan-50/55">A fast-read buying surface with denser product clarity and less decorative storytelling.</p>
                                </div>
                                {activePlans.map((plan) => (
                                    <div key={`${billing}-${plan.name}-rail`} className="text-left md:text-center">
                                        <p className="text-sm font-medium text-white/85">{plan.name}</p>
                                        <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.16em] text-cyan-100/35">{plan.note}</p>
                                    </div>
                                ))}
                            </div>

                            {comparisonRows.map((row) => (
                                <div key={row.label} className="grid gap-4 bg-[#041019] px-6 py-4 text-sm text-cyan-50/62 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] md:items-center">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-100/35">{row.label}</p>
                                    {row.values.map((value, valueIndex) => (
                                        <p key={`${row.label}-${valueIndex}-${value}`} className="md:text-center">{value}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-px overflow-hidden rounded-[28px] border border-cyan-300/12 bg-cyan-200/[0.05]">
                        {[
                            {
                                icon: Sparkles,
                                label: "Surface logic",
                                value: "Pricing 02 is colder, brighter, and more product-like, with glassy cyan emphasis instead of editorial softness.",
                            },
                            {
                                icon: Shield,
                                label: "Conversion layer",
                                value: "Feature density, CTA clarity, and card hierarchy are all tuned for faster commercial scanning.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.label} className="flex gap-4 bg-[#07141f] px-5 py-5">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/14 bg-cyan-200/[0.06] text-cyan-100/85">
                                        <Icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-100/40">{item.label}</p>
                                        <p className="mt-2 text-sm leading-relaxed text-cyan-50/58">{item.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
