"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Layers3, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { KineticButton } from "@/components/ui/kinetic-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrambleReveal } from "@/components/ui/scramble-reveal";
import { BlurText } from "@/components/ui/blur-text";

type FeatureMetric = {
    label: string;
    value: string;
};

type FeatureChapter = {
    id: string;
    index: string;
    eyebrow: string;
    title: string;
    description: string;
    accent: string;
    icon: React.ComponentType<{ className?: string }>;
    metrics: FeatureMetric[];
};

const chapters: FeatureChapter[] = [
    {
        id: "motion",
        index: "01",
        eyebrow: "Physical Motion",
        title: "Interfaces that answer like objects.",
        description:
            "Spring-tuned states, magnetic response, and weighty transitions that behave like engineered surfaces instead of decorative UI.",
        accent: "from-white via-white/70 to-white/10",
        icon: Zap,
        metrics: [
            { label: "Response", value: "Spring tuned" },
            { label: "Latency", value: "< 120ms feel" },
            { label: "Surface", value: "Gesture reactive" },
        ],
    },
    {
        id: "trust",
        index: "02",
        eyebrow: "Cryptographic Identity",
        title: "Trust signals embedded into the interface layer.",
        description:
            "Verification, state integrity, and reveal logic presented as visible interaction primitives instead of invisible backend-only concepts.",
        accent: "from-emerald-300 via-cyan-300 to-white/10",
        icon: ShieldCheck,
        metrics: [
            { label: "State", value: "Signed" },
            { label: "Integrity", value: "Tamper aware" },
            { label: "Reveal", value: "Verifiable" },
        ],
    },
    {
        id: "illumination",
        index: "03",
        eyebrow: "Illumination Engine",
        title: "Light used as hierarchy, not decoration.",
        description:
            "Soft beams, edge glow, and focus weighting shape attention with restraint, giving the interface depth without losing clarity.",
        accent: "from-cyan-200 via-white/70 to-white/10",
        icon: Sparkles,
        metrics: [
            { label: "Focus", value: "Depth coded" },
            { label: "Contrast", value: "Disciplined" },
            { label: "Atmosphere", value: "Cinematic" },
        ],
    },
];

function MotionSurface() {
    return (
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#040404] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.05),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
            <div className="absolute inset-x-8 top-8 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                <span>Response Matrix</span>
                <span>Motion Field</span>
            </div>
            <div className="relative z-10 flex h-full min-h-[360px] items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="grid w-full max-w-xl gap-4 sm:grid-cols-[1.15fr_0.85fr]"
                >
                    <div className="rounded-[1.75rem] border border-white/[0.07] bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                        <div className="mb-12 flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/35">Primary trigger</span>
                            <div className="h-px w-16 bg-gradient-to-r from-white/30 to-transparent" />
                        </div>
                        <KineticButton className="h-14 rounded-full border border-white/10 bg-white text-black px-7 text-sm font-semibold shadow-[0_0_60px_rgba(255,255,255,0.14)]">
                            Engage surface
                        </KineticButton>
                        <div className="mt-10 grid grid-cols-3 gap-2">
                            {["Mass", "Damping", "Intent"].map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 180, damping: 18 }}
                                    className="rounded-2xl border border-white/[0.06] bg-black/60 px-3 py-3 text-center"
                                >
                                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">{item}</div>
                                    <div className="mt-2 text-sm text-white/80">{["0.82", "18", "High"][index]}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {[72, 44, 28].map((height, index) => (
                            <motion.div
                                key={height}
                                initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.18 + index * 0.08, type: "spring", stiffness: 160, damping: 20 }}
                                className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] px-4 py-4"
                            >
                                <div className="mb-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">
                                    <span>Impulse</span>
                                    <span>0{index + 1}</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/[0.06]">
                                    <motion.div
                                        initial={{ width: "14%" }}
                                        animate={{ width: `${height}%` }}
                                        transition={{ delay: 0.3 + index * 0.12, type: "spring", stiffness: 120, damping: 18 }}
                                        className="h-full rounded-full bg-gradient-to-r from-white to-white/30"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function TrustSurface() {
    const token = useMemo(() => "AURA-9F3C-STATE-VERIFIED", []);

    return (
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#03110d] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(103,232,249,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_32%)]" />
            <div className="absolute inset-x-8 top-8 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                <span>Integrity layer</span>
                <span>Verification trace</span>
            </div>
            <div className="relative z-10 flex h-full min-h-[360px] items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="grid w-full max-w-2xl gap-4 lg:grid-cols-[0.92fr_1.08fr]"
                >
                    <SpotlightCard className="rounded-[1.75rem] border border-emerald-400/15 bg-black/50 p-6" spotlightColor="rgba(52, 211, 153, 0.25)">
                        <div className="mb-14 flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/35">Signed state</span>
                            <ShieldCheck className="h-4 w-4 text-emerald-300/70" />
                        </div>
                        <div className="space-y-4">
                            <div className="text-xs font-mono uppercase tracking-[0.22em] text-emerald-300/70">Verification token</div>
                            <ScrambleReveal className="block font-mono text-lg text-white/85 sm:text-xl" duration={1.4}>
                                {token}
                            </ScrambleReveal>
                            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-white/35">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
                                Ledger synchronized
                            </div>
                        </div>
                    </SpotlightCard>
                    <div className="grid gap-4">
                        {[
                            ["Request signature", "ed25519 / ui-state / 2.4ms"],
                            ["Seal transition", "transition hash committed"],
                            ["Expose trust cue", "surface signal published"],
                        ].map(([title, value], index) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 + index * 0.08, type: "spring", stiffness: 160, damping: 18 }}
                                className="rounded-[1.5rem] border border-white/[0.06] bg-black/45 p-5"
                            >
                                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">0{index + 1}</div>
                                <div className="text-sm text-white/85">{title}</div>
                                <div className="mt-3 text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-300/65">{value}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function LightSurface() {
    return (
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#030608] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_78%_28%,rgba(56,189,248,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
            <div className="absolute inset-x-8 top-8 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                <span>Illumination map</span>
                <span>Focus engine</span>
            </div>
            <div className="relative z-10 flex h-full min-h-[360px] items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="grid w-full max-w-2xl gap-4 lg:grid-cols-[1.05fr_0.95fr]"
                >
                    <div className="relative overflow-hidden rounded-[1.85rem] border border-white/[0.07] bg-black/40 p-6">
                        <div className="absolute left-1/2 top-10 h-36 w-36 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
                        <div className="absolute left-10 top-24 h-40 w-40 rounded-full bg-cyan-300/12 blur-3xl" />
                        <div className="absolute inset-x-6 bottom-6 top-24 rounded-[1.5rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                        <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between">
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/35">Primary beam</div>
                                <BlurText className="mt-4 block text-3xl font-semibold tracking-tight text-white/90 sm:text-4xl">
                                    Focus follows luminosity.
                                </BlurText>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {["Beam", "Edge", "Depth"].map((item) => (
                                    <div key={item} className="rounded-2xl border border-white/[0.06] bg-black/45 px-3 py-3 text-center">
                                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">{item}</div>
                                        <div className="mt-2 text-sm text-white/80">Active</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-4">
                        <SpotlightCard className="rounded-[1.6rem] border border-white/[0.06] bg-black/50 p-5" spotlightColor="rgba(125, 211, 252, 0.24)">
                            <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">Surface response</div>
                            <div className="mt-6 text-lg font-medium text-white/85">Light intensifies where decision density increases.</div>
                        </SpotlightCard>
                        <div className="rounded-[1.6rem] border border-white/[0.06] bg-black/45 p-5">
                            <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">Luminance rail</div>
                            <div className="space-y-3">
                                {[88, 61, 37].map((value, index) => (
                                    <div key={value}>
                                        <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                                            <span>{["Hero", "Content", "Meta"][index]}</span>
                                            <span>{value}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/[0.05]">
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                animate={{ width: `${value}%` }}
                                                transition={{ delay: 0.18 + index * 0.1, type: "spring", stiffness: 120, damping: 20 }}
                                                className="h-full rounded-full bg-gradient-to-r from-cyan-100 via-white to-white/20"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export function Feature01() {
    const [activeId, setActiveId] = useState(chapters[0].id);
    const activeChapter = chapters.find((chapter) => chapter.id === activeId) ?? chapters[0];

    return (
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-[#020202]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-700", activeChapter.accent)} />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 grid gap-10 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-10 lg:py-10">
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <div className="mb-8 max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                            <Layers3 className="h-3.5 w-3.5 text-white/50" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">Feature Showcase 01</span>
                        </div>
                        <h2 className="max-w-lg text-3xl font-medium tracking-tight text-white sm:text-5xl">
                            A feature block that feels like a launch sequence.
                        </h2>
                        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base">
                            Three editorial chapters. One dominant stage. Every transition is spring-driven and every proof point earns its place.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {chapters.map((chapter) => {
                            const isActive = chapter.id === activeChapter.id;
                            const Icon = chapter.icon;

                            return (
                                <motion.button
                                    key={chapter.id}
                                    type="button"
                                    onClick={() => setActiveId(chapter.id)}
                                    whileTap={{ scale: 0.99 }}
                                    className={cn(
                                        "group relative w-full overflow-hidden rounded-[1.75rem] border px-4 py-4 text-left transition-colors sm:px-5",
                                        isActive
                                            ? "border-white/12 bg-white/[0.06]"
                                            : "border-white/[0.05] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                                    )}
                                >
                                    <div className={cn("absolute inset-0 opacity-0 transition-opacity duration-500", isActive && "opacity-100")}>
                                        <div className={cn("absolute inset-0 bg-gradient-to-r opacity-20", chapter.accent)} />
                                    </div>
                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/40">
                                            <Icon className="h-4 w-4 text-white/70" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex items-center gap-3">
                                                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">{chapter.index}</span>
                                                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                            </div>
                                            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/35">{chapter.eyebrow}</div>
                                            <div className="mt-2 text-base font-medium tracking-tight text-white/88 sm:text-lg">{chapter.title}</div>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <KineticButton className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-black">
                            Copy this block
                        </KineticButton>
                        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.05] hover:text-white">
                            Inspect structure
                            <ArrowUpRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="space-y-5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeChapter.id}
                            initial={{ opacity: 0, y: 28, filter: "blur(16px)", scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                            exit={{ opacity: 0, y: -16, filter: "blur(12px)", scale: 0.985 }}
                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {activeChapter.id === "motion" ? <MotionSurface /> : null}
                            {activeChapter.id === "trust" ? <TrustSurface /> : null}
                            {activeChapter.id === "illumination" ? <LightSurface /> : null}
                        </motion.div>
                    </AnimatePresence>

                    <div className="grid gap-3 sm:grid-cols-3">
                        {activeChapter.metrics.map((metric, index) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 + index * 0.08, type: "spring", stiffness: 170, damping: 18 }}
                                className="overflow-hidden rounded-[1.4rem] border border-white/[0.06] bg-white/[0.025] px-4 py-4"
                            >
                                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/28">{metric.label}</div>
                                <div className="mt-3 text-lg font-medium tracking-tight text-white/88">{metric.value}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
