"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Radio, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type BillingMode = "monthly" | "annual";

interface Plan {
    name: string;
    price: string;
    cadence: string;
    note: string;
    description: string;
    accent: string;
    cta: string;
    featured?: boolean;
    specs: string[];
    features: string[];
}

const plans: Record<BillingMode, Plan[]> = {
    monthly: [
        {
            name: "Input",
            price: "$16",
            cadence: "/month",
            note: "Independent calibration",
            description: "A clean entry point for solo operators who want stronger visual systems without unnecessary weight.",
            accent: "from-amber-300/25 via-orange-300/10 to-transparent",
            cta: "Open input",
            specs: ["Core kit", "Solo usage", "Release feed"],
            features: [
                "Core component set",
                "Unlimited personal and client experiments",
                "Standard release access",
                "Commercial use for solo work",
            ],
        },
        {
            name: "Channel",
            price: "$48",
            cadence: "/month",
            note: "Primary control lane",
            description: "The balanced lane for teams that want repeated launch capability, polished surfaces, and less decision friction.",
            accent: "from-orange-300/35 via-amber-200/12 to-transparent",
            cta: "Lock channel",
            featured: true,
            specs: ["Full system", "5 contributors", "Priority lane"],
            features: [
                "Everything in Input",
                "Full component + blocks library",
                "Up to 5 active contributors",
                "Priority release lane",
            ],
        },
        {
            name: "Broadcast",
            price: "$118",
            cadence: "/month",
            note: "Wide deployment",
            description: "For studios and internal product groups standardizing premium execution across multiple surfaces.",
            accent: "from-rose-300/28 via-orange-300/10 to-transparent",
            cta: "Enable broadcast",
            specs: ["Studio scope", "Internal rollout", "Preview access"],
            features: [
                "Everything in Channel",
                "Studio-wide internal usage",
                "Priority previews and request lane",
                "Expanded licensing coverage",
            ],
        },
    ],
    annual: [
        {
            name: "Input",
            price: "$168",
            cadence: "/year",
            note: "Independent calibration",
            description: "A clean entry point for solo operators who want stronger visual systems without unnecessary weight.",
            accent: "from-amber-300/25 via-orange-300/10 to-transparent",
            cta: "Commit input",
            specs: ["Core kit", "Solo usage", "2 months saved"],
            features: [
                "Core component set",
                "Unlimited personal and client experiments",
                "Standard release access",
                "Commercial use for solo work",
            ],
        },
        {
            name: "Channel",
            price: "$480",
            cadence: "/year",
            note: "Primary control lane",
            description: "The balanced lane for teams that want repeated launch capability, polished surfaces, and less decision friction.",
            accent: "from-orange-300/35 via-amber-200/12 to-transparent",
            cta: "Commit channel",
            featured: true,
            specs: ["Full system", "5 contributors", "Best annual value"],
            features: [
                "Everything in Input",
                "Full component + blocks library",
                "Up to 5 active contributors",
                "Priority release lane",
            ],
        },
        {
            name: "Broadcast",
            price: "$1,180",
            cadence: "/year",
            note: "Wide deployment",
            description: "For studios and internal product groups standardizing premium execution across multiple surfaces.",
            accent: "from-rose-300/28 via-orange-300/10 to-transparent",
            cta: "Commit broadcast",
            specs: ["Studio scope", "Internal rollout", "Preview access"],
            features: [
                "Everything in Channel",
                "Studio-wide internal usage",
                "Priority previews and request lane",
                "Expanded licensing coverage",
            ],
        },
    ],
};

const railRows = [
    { label: "Blocks", values: ["Selective", "Full access", "Full access"] },
    { label: "Contributors", values: ["1", "Up to 5", "Studio-wide"] },
    { label: "Release lane", values: ["Standard", "Priority", "Priority + previews"] },
    { label: "License scope", values: ["Solo", "Team", "Studio"] },
];

export function Pricing03() {
    const [billing, setBilling] = useState<BillingMode>("monthly");
    const activePlans = plans[billing];

    return (
        <section className="relative w-full overflow-hidden border-y border-orange-300/10 bg-[#080401] px-4 py-20 md:px-8 md:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(251,191,36,0.14),transparent_24%),radial-gradient(circle_at_86%_22%,rgba(251,146,60,0.12),transparent_26%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_34%)]" />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-amber-200/18 bg-amber-100/[0.06] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.28em] text-amber-100/70">
                            <Radio className="h-3.5 w-3.5 text-amber-200/80" />
                            Switchboard
                        </div>
                        <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[0.94]">
                            A familiar pricing flow, rebuilt like a warm instrument panel.
                        </h2>
                        <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-amber-50/58 md:text-lg">
                            Pricing 03 keeps the common three-tier structure, but the whole surface feels calibrated, warmer, and more mechanical. Less SaaS card grid, more precision control deck.
                        </p>
                    </div>

                    <div className="w-full max-w-[380px] rounded-[28px] border border-amber-200/16 bg-[#140a03] p-1.5 shadow-[0_0_60px_-24px_rgba(251,146,60,0.35)]">
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
                                            active ? "bg-amber-100 text-[#1b0f05]" : "text-amber-50/45 hover:bg-amber-100/[0.08] hover:text-amber-50"
                                        )}
                                    >
                                        <span className="block text-[10px] font-mono uppercase tracking-[0.18em]">
                                            {active && value === "annual" ? "Stabilized rate" : "Billing mode"}
                                        </span>
                                        <span className="mt-1 block font-medium">{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[34px] border border-amber-200/14 bg-[#120903]">
                    <div className="grid gap-px bg-amber-100/[0.06] xl:grid-cols-3">
                        {activePlans.map((plan, index) => (
                            <motion.article
                                key={`${billing}-${plan.name}`}
                                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "group relative bg-[#100701] px-6 py-8 md:px-8",
                                    plan.featured && "bg-[#160a02]"
                                )}
                            >
                                <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80", plan.accent)} />
                                <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/35 to-transparent" />

                                <div className="relative flex h-full flex-col">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-100/42">{plan.note}</p>
                                            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">{plan.name}</h3>
                                        </div>
                                        {plan.featured ? (
                                            <div className="rounded-full border border-amber-200/25 bg-amber-100/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-amber-50/90">
                                                Primary lane
                                            </div>
                                        ) : null}
                                    </div>

                                    <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-amber-50/58">{plan.description}</p>

                                    <div className="mt-8 border-y border-amber-200/10 py-8">
                                        <div className="flex items-end gap-2">
                                            <span className="text-5xl font-semibold tracking-tighter text-white md:text-6xl">{plan.price}</span>
                                            <span className="pb-2 text-sm font-light text-amber-100/35">{plan.cadence}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-amber-200/10 bg-amber-100/[0.05]">
                                        {plan.specs.map((spec) => (
                                            <div key={`${billing}-${plan.name}-${spec}`} className="bg-[#0b0501] px-4 py-3 text-[11px] font-mono uppercase tracking-[0.16em] text-amber-50/50">
                                                {spec}
                                            </div>
                                        ))}
                                    </div>

                                    <ul className="mt-8 flex flex-1 flex-col gap-4">
                                        {plan.features.map((feature) => (
                                            <li key={`${billing}-${plan.name}-${feature}`} className="flex items-start gap-3 text-sm leading-relaxed text-amber-50/62">
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-200/14 bg-amber-100/[0.06] text-amber-50/90">
                                                    <Check size={12} />
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={cn(
                                        "mt-10 inline-flex h-12 w-full items-center justify-between rounded-full border px-5 text-sm font-medium transition-colors duration-300",
                                        plan.featured
                                            ? "border-amber-200/25 bg-amber-100 text-black hover:bg-amber-50"
                                            : "border-amber-200/12 bg-amber-100/[0.05] text-white hover:border-amber-200/24 hover:bg-amber-100/[0.1]"
                                    )}>
                                        <span>{plan.cta}</span>
                                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="overflow-hidden rounded-[28px] border border-amber-200/12 bg-[#120903]">
                        <div className="grid gap-px bg-amber-100/[0.05]">
                            <div className="grid gap-4 bg-[#150b03] px-6 py-6 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] md:items-center">
                                <div>
                                    <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-amber-100/40">Control rail</p>
                                    <p className="mt-2 text-sm leading-relaxed text-amber-50/56">A compressed comparison strip that keeps the entire system feeling like one calibrated surface.</p>
                                </div>
                                {activePlans.map((plan) => (
                                    <div key={`${billing}-${plan.name}-rail`} className="text-left md:text-center">
                                        <p className="text-sm font-medium text-white/85">{plan.name}</p>
                                        <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.16em] text-amber-100/35">{plan.note}</p>
                                    </div>
                                ))}
                            </div>

                            {railRows.map((row) => (
                                <div key={row.label} className="grid gap-4 bg-[#0d0601] px-6 py-4 text-sm text-amber-50/62 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] md:items-center">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-100/35">{row.label}</p>
                                    {row.values.map((value, valueIndex) => (
                                        <p key={`${row.label}-${valueIndex}-${value}`} className="md:text-center">{value}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-px overflow-hidden rounded-[28px] border border-amber-200/12 bg-amber-100/[0.05]">
                        {[
                            {
                                icon: Sparkles,
                                label: "Accent logic",
                                value: "Amber, copper, and darker hardware surfaces make Pricing 03 feel calibrated and mechanical rather than digital-glass or editorial.",
                            },
                            {
                                icon: Radio,
                                label: "Unified form",
                                value: "The whole silhouette is treated like a single control surface, which makes it feel more engineered than card-based.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.label} className="flex gap-4 bg-[#150b03] px-5 py-5">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-200/14 bg-amber-100/[0.06] text-amber-50/85">
                                        <Icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-100/40">{item.label}</p>
                                        <p className="mt-2 text-sm leading-relaxed text-amber-50/58">{item.value}</p>
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
