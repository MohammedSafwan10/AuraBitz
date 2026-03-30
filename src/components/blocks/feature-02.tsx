"use client";

import { useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowUpRight, Cpu, Radio, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { KineticButton } from "@/components/ui/kinetic-button";

type PipelineMetric = {
    label: string;
    value: string;
    trend?: "up" | "down" | "stable";
};

type PipelineStep = {
    id: string;
    index: string;
    title: string;
    eyebrow: string;
    description: string;
    detail: string;
    signalClass: string;
    fillClass: string;
    icon: ComponentType<{ className?: string }>;
    metrics: PipelineMetric[];
};

const steps: PipelineStep[] = [
    {
        id: "input",
        index: "01",
        title: "Capture raw intent",
        eyebrow: "Telemetry intake",
        description: "High-frequency sampling of pointer data before the interface commits to a visual decision.",
        detail: "Vectors buffer first. Outliers are filtered. Deadzones stay preserved so the surface feels authored, not automated.",
        signalClass: "text-cyan-200",
        fillClass: "from-cyan-100 via-white to-white/20",
        icon: Activity,
        metrics: [
            { label: "Sample rate", value: "240hz", trend: "up" },
            { label: "Noise floor", value: "1.2%", trend: "down" },
            { label: "Vector span", value: "84/s", trend: "stable" },
        ],
    },
    {
        id: "interpret",
        index: "02",
        title: "Translate to meaning",
        eyebrow: "Intent parse",
        description: "Trajectory, inertia, and hesitation are resolved into a confident motion profile.",
        detail: "The system classifies intent in under 12ms, then hands off a motion recipe instead of a raw event stream.",
        signalClass: "text-violet-200",
        fillClass: "from-violet-100 via-white to-white/20",
        icon: Cpu,
        metrics: [
            { label: "Parse", value: "11.8ms", trend: "down" },
            { label: "Confidence", value: "98.4%", trend: "up" },
            { label: "Nodes", value: "7 active", trend: "stable" },
        ],
    },
    {
        id: "verify",
        index: "03",
        title: "Seal state integrity",
        eyebrow: "Trust lock",
        description: "Logic state is signed before it reaches the visual layer, so the surface never performs fiction.",
        detail: "Every transition is paired with a verification cue. Visual confidence is earned by state, not decoration.",
        signalClass: "text-emerald-200",
        fillClass: "from-emerald-100 via-white to-white/20",
        icon: ShieldCheck,
        metrics: [
            { label: "Hash", value: "ed25519", trend: "stable" },
            { label: "Lock", value: "Secured", trend: "stable" },
            { label: "Sync", value: "1:1", trend: "stable" },
        ],
    },
    {
        id: "illuminate",
        index: "04",
        title: "Render physical finality",
        eyebrow: "Surface output",
        description: "The confirmed state is released into light, weight, and damping tuned specifically for the device.",
        detail: "Overshoot, blur decay, and luminous emphasis land only after the system is fully certain of the state.",
        signalClass: "text-amber-100",
        fillClass: "from-amber-50 via-white to-white/20",
        icon: Sparkles,
        metrics: [
            { label: "Frame pace", value: "120fps", trend: "stable" },
            { label: "Draw cost", value: "0.8ms", trend: "down" },
            { label: "Mass tune", value: "Adaptive", trend: "up" },
        ],
    },
];

export function Feature02() {
    const [activeId, setActiveId] = useState(steps[1].id);
    const activeIndex = steps.findIndex((step) => step.id === activeId);
    const activeStep = steps[activeIndex] ?? steps[1];
    const hasMultipleSteps = steps.length > 1;

    useEffect(() => {
        if (!hasMultipleSteps) {
            return;
        }

        const interval = window.setInterval(() => {
            setActiveId((prev) => {
                const index = steps.findIndex((step) => step.id === prev);
                return steps[(index + 1) % steps.length].id;
            });
        }, 4800);

        return () => window.clearInterval(interval);
    }, [hasMultipleSteps]);

    return (
        <section className="relative overflow-hidden rounded-[2.75rem] border border-cyan-300/12 bg-[#02030a]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,139,250,0.06)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(103,232,249,0.12),transparent_22%),radial-gradient(circle_at_82%_0%,rgba(167,139,250,0.12),transparent_30%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />

            <div className="relative z-10 grid gap-10 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-10 lg:py-10">
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <div className="mb-8 max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 border border-cyan-200/20 bg-cyan-200/[0.04] px-3 py-1.5">
                            <Radio className="h-3.5 w-3.5 text-cyan-200/70" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-cyan-100/70">Feature Showcase 02</span>
                        </div>
                        <h2 className="max-w-xl font-mono text-[2.35rem] uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-[4.75rem]">
                            Instrument-grade
                            <span className="block text-cyan-100/82">architecture rail</span>
                        </h2>
                        <p className="mt-5 max-w-lg font-mono text-[11px] uppercase leading-6 tracking-[0.16em] text-cyan-100/40 sm:text-[12px]">
                            System-first composition. Diagnostic typography. Colder signal contrast. Built to feel like the engine room rather than another cinematic panel.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {steps.map((step) => {
                            const isActive = step.id === activeStep.id;

                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    onClick={() => setActiveId(step.id)}
                                    className={cn(
                                        "group w-full border px-4 py-4 text-left transition-colors sm:px-5",
                                        isActive
                                            ? "border-cyan-200/22 bg-cyan-200/[0.06]"
                                            : "border-cyan-300/[0.08] bg-[#060916] hover:border-cyan-200/15 hover:bg-[#081021]"
                                    )}
                                >
                                    <div className="mb-3 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-100/30">
                                        <span className={cn("transition-colors", isActive ? step.signalClass : "text-cyan-100/28")}>Node {step.index}</span>
                                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-200/20 to-transparent" />
                                    </div>
                                    <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-white/88">{step.title}</div>
                                    <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-100/38">{step.eyebrow}</p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                        <KineticButton className="h-12 rounded-none border border-cyan-100/30 bg-cyan-100 px-6 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-[#031018] shadow-[0_0_28px_rgba(103,232,249,0.18)]">
                            Open control layer
                        </KineticButton>
                        <button className="inline-flex h-12 items-center justify-center gap-2 border border-cyan-200/18 bg-cyan-200/[0.03] px-6 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-cyan-100/72 transition-colors hover:bg-cyan-200/[0.07] hover:text-cyan-50">
                            Inspect architecture
                            <ArrowUpRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="grid gap-3 sm:grid-cols-4">
                        {steps.map((step, index) => {
                            const isActive = step.id === activeStep.id;

                            return (
                                <button
                                    key={`${step.id}-chip`}
                                    type="button"
                                    onClick={() => setActiveId(step.id)}
                                    className={cn(
                                        "relative overflow-hidden rounded-[0.95rem] border border-cyan-200/[0.08] bg-[#060916] p-4 text-left transition-colors",
                                        isActive && "border-cyan-200/20 bg-cyan-200/[0.06]"
                                    )}
                                >
                                    <div className="mb-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-100/34">
                                        <span>{step.index}</span>
                                        <span>{index === activeIndex ? "Live" : "Queued"}</span>
                                    </div>
                                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/82">{step.eyebrow}</div>
                                    <div className="mt-2 h-1.5 bg-cyan-100/[0.06]">
                                        <motion.div
                                            animate={{ width: `${38 + index * 13 + (isActive ? 12 : 0)}%` }}
                                            transition={{ type: "spring", stiffness: 160, damping: 22 }}
                                            className={cn("h-full bg-gradient-to-r", step.fillClass)}
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="overflow-hidden rounded-[1.8rem] border border-cyan-200/[0.09] bg-[#040611]">
                        <div className="border-b border-cyan-200/[0.08] p-5 sm:p-6">
                            <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                                <div>
                                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-100/34">Live architecture readout</div>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeStep.id}
                                            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                                            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="mt-4 flex items-end gap-4">
                                                <span className="font-mono text-5xl font-medium tracking-[-0.12em] text-cyan-100/20">{activeStep.index}</span>
                                                <div className="pb-1 text-sm font-mono uppercase tracking-[0.28em] text-cyan-100/38">{activeStep.eyebrow}</div>
                                            </div>
                                            <h3 className="mt-4 max-w-xl font-mono text-2xl uppercase tracking-[-0.05em] text-white sm:text-3xl">
                                                {activeStep.title}
                                            </h3>
                                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cyan-100/50 sm:text-base">
                                                {activeStep.description}
                                            </p>
                                            <p className="mt-3 max-w-xl font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-cyan-100/34">{activeStep.detail}</p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-3">
                                    {activeStep.metrics.map((metric, index) => (
                                        <motion.div
                                            key={`${activeStep.id}-${metric.label}`}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.06, type: "spring", stiffness: 180, damping: 20 }}
                                            className="rounded-[0.95rem] border border-cyan-200/[0.08] bg-cyan-200/[0.03] p-4"
                                        >
                                            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-cyan-100/34">
                                                <span>{metric.label}</span>
                                                <span>
                                                    {metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "—"}
                                                </span>
                                            </div>
                                            <div className="mt-4 font-mono text-lg font-medium uppercase tracking-[0.04em] text-white/90">{metric.value}</div>
                                            <div className="mt-4 h-1.5 bg-cyan-100/[0.06]">
                                                <motion.div
                                                    animate={{ width: `${46 + index * 14 + activeIndex * 6}%` }}
                                                    transition={{ type: "spring", stiffness: 160, damping: 22 }}
                                                    className={cn("h-full bg-gradient-to-r", activeStep.fillClass)}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative p-5 sm:p-6">
                            <motion.div
                                animate={{ x: ["-20%", "110%"] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                                className="pointer-events-none absolute inset-y-0 w-40 bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.12),transparent)] blur-xl"
                            />

                            <div className="rounded-[1.25rem] border border-cyan-200/[0.08] bg-[#050916] p-4 sm:p-6">
                                <div className="mb-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-100/30">
                                    <span>Architecture rail</span>
                                    <span>Node {activeStep.index} / 04</span>
                                </div>

                                <div className="space-y-4">
                                    {steps.map((step, index) => {
                                        const isActive = step.id === activeStep.id;
                                        const alignLeft = index % 2 === 0;
                                        const Icon = step.icon;

                                        const card = (
                                            <motion.button
                                                type="button"
                                                onClick={() => setActiveId(step.id)}
                                                whileHover={{ x: alignLeft ? -4 : 4, y: -2 }}
                                                whileTap={{ scale: 0.995 }}
                                                className={cn(
                                                    "rounded-[0.95rem] border p-4 text-left transition-colors sm:p-5",
                                                    isActive
                                                        ? "border-cyan-200/18 bg-cyan-200/[0.05]"
                                                        : "border-cyan-200/[0.08] bg-[#070c18] hover:border-cyan-200/15 hover:bg-[#091122]"
                                                )}
                                            >
                                                <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-100/34">
                                                    <span className={cn(isActive ? step.signalClass : "text-cyan-100/30")}>{step.eyebrow}</span>
                                                    <span>{step.index}</span>
                                                </div>
                                                <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-white/90">{step.title}</div>
                                                <p className="mt-2 text-[11px] font-mono uppercase leading-6 tracking-[0.12em] text-cyan-100/40">{step.description}</p>
                                            </motion.button>
                                        );

                                        return (
                                            <div
                                                key={step.id}
                                                className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] lg:items-center"
                                            >
                                                {alignLeft ? (
                                                    <>
                                                        {card}
                                                        <div className="relative flex h-16 items-center justify-center">
                                                            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/[0.08]" />
                                                            <div className="absolute right-1/2 top-1/2 h-px w-8 -translate-y-1/2 bg-white/[0.08]" />
                                                            <motion.div
                                                                animate={{ scale: isActive ? 1.06 : 1, opacity: isActive ? 1 : 0.75 }}
                                                                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                                                className={cn(
                                                                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/12 bg-[#040713]",
                                                                    isActive && "border-cyan-200/26 bg-cyan-200/[0.05]"
                                                                )}
                                                            >
                                                                <Icon className={cn("h-4 w-4 text-white/55", isActive && step.signalClass)} />
                                                            </motion.div>
                                                        </div>
                                                        <div className="hidden lg:block" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="hidden lg:block" />
                                                        <div className="relative flex h-16 items-center justify-center">
                                                            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/[0.08]" />
                                                            <div className="absolute left-1/2 top-1/2 h-px w-8 -translate-y-1/2 bg-white/[0.08]" />
                                                            <motion.div
                                                                animate={{ scale: isActive ? 1.06 : 1, opacity: isActive ? 1 : 0.75 }}
                                                                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                                                className={cn(
                                                                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/12 bg-[#040713]",
                                                                    isActive && "border-cyan-200/26 bg-cyan-200/[0.05]"
                                                                )}
                                                            >
                                                                <Icon className={cn("h-4 w-4 text-white/55", isActive && step.signalClass)} />
                                                            </motion.div>
                                                        </div>
                                                        {card}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

