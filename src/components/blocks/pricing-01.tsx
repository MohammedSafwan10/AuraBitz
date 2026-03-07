"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Crown, Gem, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Letter",
        subtitle: "Private entry",
        price: "$28",
        cadence: "/month",
        headline: "A restrained entry for independent builders who want refined access without noise.",
        accent: "from-white/16 via-white/6 to-transparent",
        cta: "Request Letter",
        note: "Personal access",
        features: [
            "Core component archive",
            "Unlimited personal projects",
            "Commercial use for solo work",
        ],
    },
    {
        name: "Edition",
        subtitle: "Editorial standard",
        price: "$88",
        cadence: "/month",
        headline: "For small product teams that want stronger visual authority and repeatable launch quality.",
        accent: "from-zinc-100/18 via-white/8 to-transparent",
        cta: "Enter Edition",
        note: "Most chosen",
        featured: true,
        features: [
            "Everything in Letter",
            "All premium blocks included",
            "Up to 5 active contributors",
        ],
    },
    {
        name: "Estate",
        subtitle: "House access",
        price: "$240",
        cadence: "/month",
        headline: "For internal studios and premium operators treating interface quality as part of the business model.",
        accent: "from-white/14 via-white/4 to-transparent",
        cta: "Secure Estate",
        note: "Studio access",
        features: [
            "Everything in Edition",
            "Studio-wide internal rollout",
            "Private preview transmissions",
        ],
    },
];

const proofs = [
    {
        icon: Crown,
        label: "Editorial logic",
        value: "Built like a membership spread, not a utility dashboard.",
    },
    {
        icon: Gem,
        label: "Surface quality",
        value: "Cold monochrome, stronger serif contrast, lower visual noise.",
    },
    {
        icon: Shield,
        label: "Commercial trust",
        value: "Structured for repeat launches, internal systems, and premium delivery.",
    },
];

export function Pricing01() {
    return (
        <section className="relative overflow-hidden border-y border-white/[0.05] bg-[#020202] px-4 py-20 md:px-8 md:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.05),transparent_24%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%)]" />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-14">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                    <div className="max-w-xl">
                        <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/35">Editorial Membership</p>
                        <h2 className="mt-5 font-serif text-5xl leading-[0.92] tracking-[-0.04em] text-white md:text-7xl">
                            Pricing written like a private invitation.
                        </h2>
                    </div>

                    <div className="max-w-2xl">
                        <p className="text-lg font-light leading-relaxed text-white/48 md:text-xl">
                            Pricing 01 is intentionally austere. Fewer visual gestures, colder surfaces, stronger serif rhythm, and a slower editorial pace that feels more like a membership artifact than a comparison grid.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.78fr_1.24fr_0.78fr]">
                    {plans.map((plan, index) => (
                        <motion.article
                            key={plan.name}
                            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "group relative overflow-hidden border border-white/[0.08] bg-[#050505] p-6 md:p-8",
                                plan.featured ? "min-h-[680px] rounded-[34px]" : "rounded-[24px]",
                                plan.featured && "xl:-translate-y-8"
                            )}
                        >
                            <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-b opacity-80", plan.accent)} />
                            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                            <div className="relative flex h-full flex-col">
                                <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
                                    <div>
                                        <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">{plan.subtitle}</p>
                                        <h3 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-white md:text-5xl">{plan.name}</h3>
                                    </div>
                                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
                                        {plan.note}
                                    </span>
                                </div>

                                <p className="mt-8 max-w-sm text-base font-light leading-relaxed text-white/52">{plan.headline}</p>

                                <div className="mt-10 flex items-end gap-2">
                                    <span className="font-serif text-6xl tracking-[-0.05em] text-white md:text-7xl">{plan.price}</span>
                                    <span className="pb-3 text-sm font-light uppercase tracking-[0.16em] text-white/30">{plan.cadence}</span>
                                </div>

                                <ul className="mt-10 flex flex-1 flex-col gap-5 border-t border-white/[0.08] pt-8">
                                    {plan.features.map((feature) => (
                                        <li key={`${plan.name}-${feature}`} className="flex items-start gap-3 text-sm leading-relaxed text-white/62">
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70">
                                                <Check size={11} />
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={cn(
                                    "mt-10 inline-flex h-12 items-center justify-between rounded-full border px-5 text-sm transition-colors duration-300",
                                    plan.featured
                                        ? "border-white bg-white text-black hover:bg-neutral-200"
                                        : "border-white/10 bg-transparent text-white hover:border-white/20 hover:bg-white/[0.05]"
                                )}>
                                    <span>{plan.cta}</span>
                                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.06] md:grid-cols-3">
                    {proofs.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div key={item.label} className="bg-[#050505] px-6 py-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70">
                                    <Icon size={16} />
                                </div>
                                <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.24em] text-white/35">{item.label}</p>
                                <p className="mt-3 text-sm leading-relaxed text-white/58">{item.value}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
