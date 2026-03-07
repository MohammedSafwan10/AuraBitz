"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers3, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { KineticButton } from "@/components/ui/kinetic-button";

type ProofRow = {
    label: string;
    quiet: string;
    charged: string;
};

const proofRows: ProofRow[] = [
    {
        label: "Surface elevation",
        quiet: "Everything sits flat against the screen plane.",
        charged: "Primary surfaces lift, separate, and read with physical depth.",
    },
    {
        label: "Motion pressure",
        quiet: "Transitions resolve at one uniform speed.",
        charged: "Motion carries drag, bias, and a visible sense of stored energy.",
    },
    {
        label: "Light hierarchy",
        quiet: "Brightness is evenly distributed across the whole UI.",
        charged: "Focus blooms only where the user should feel weight and intent.",
    },
];

const presets = [
    { id: "calm", label: "Calm field", value: 24 },
    { id: "lifted", label: "Lifted", value: 54 },
    { id: "charged", label: "Charged", value: 82 },
];

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function Feature03() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [field, setField] = useState(70);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isDragging) {
            return;
        }

        const updateField = (clientX: number) => {
            const rect = trackRef.current?.getBoundingClientRect();
            if (!rect) {
                return;
            }

            const next = ((clientX - rect.left) / rect.width) * 100;
            setField(clamp(next, 12, 88));
        };

        const handlePointerMove = (event: PointerEvent) => {
            updateField(event.clientX);
        };

        const handlePointerUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging]);

    const intensity = clamp((field - 12) / 76, 0, 1);
    const drift = (field - 50) / 50;
    const backShift = drift * -24;
    const midShift = drift * -10;
    const frontShift = drift * 28;

    return (
        <section className="relative overflow-hidden rounded-[2.75rem] border border-amber-100/10 bg-[#070302]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(251,191,36,0.12),transparent_26%),radial-gradient(circle_at_78%_8%,rgba(251,146,60,0.1),transparent_24%),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_34%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/30 to-transparent" />

            <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                    <div>
                        <div className="mb-8 max-w-3xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-100/15 bg-amber-100/[0.04] px-3 py-1">
                                <Layers3 className="h-3.5 w-3.5 text-amber-100/60" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-amber-50/60">Feature Showcase 03</span>
                            </div>
                            <h2 className="max-w-4xl text-3xl font-medium leading-[0.94] tracking-tight text-white sm:text-5xl">
                                A spatial feature block
                                <span className="block font-serif text-[0.92em] italic tracking-tight text-amber-50/76">for charged depth and visible lift.</span>
                            </h2>
                            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-amber-50/44 sm:text-base">
                                Instead of a static comparison card, this block behaves like a controlled motion field. Push the charge and the interface begins to lift, separate, and illuminate.
                            </p>
                        </div>

                        <div className="mb-6 flex flex-wrap gap-2">
                            {presets.map((preset) => {
                                const isActive = Math.abs(field - preset.value) < 8;

                                return (
                                    <button
                                        key={preset.id}
                                        type="button"
                                        onClick={() => setField(preset.value)}
                                        className={cn(
                                            "rounded-full border px-4 py-2 text-[11px] font-mono uppercase tracking-[0.22em] transition-colors",
                                            isActive
                                                ? "border-amber-100/18 bg-amber-100/[0.08] text-amber-50/88"
                                                : "border-amber-100/[0.08] bg-amber-100/[0.02] text-amber-50/40 hover:border-amber-100/12 hover:text-amber-50/78"
                                        )}
                                    >
                                        {preset.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="overflow-hidden rounded-[2rem] border border-amber-100/[0.08] bg-[#090504]">
                            <div className="flex items-center justify-between border-b border-amber-100/[0.08] px-5 py-4 text-[10px] font-mono uppercase tracking-[0.26em] text-amber-50/34 sm:px-6">
                                <span>Motion field chamber</span>
                                <span>{Math.round(intensity * 100)}% charged</span>
                            </div>

                            <div className="relative min-h-[680px] overflow-hidden p-5 sm:p-6">
                                <motion.div
                                    animate={{
                                        left: `${22 + intensity * 56}%`,
                                        top: `${28 - intensity * 8}%`,
                                        opacity: 0.16 + intensity * 0.18,
                                    }}
                                    transition={{ type: "spring", stiffness: 120, damping: 24 }}
                                    className="absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/[0.12] blur-[120px]"
                                />

                                <motion.div
                                    animate={{ x: backShift, y: 16 - intensity * 10, rotate: -8 + drift * 4, scale: 0.96 + intensity * 0.03 }}
                                    transition={{ type: "spring", stiffness: 130, damping: 20 }}
                                    className="absolute left-[7%] top-[16%] h-[58%] w-[78%] rounded-[2.3rem] border border-amber-100/[0.05] bg-amber-100/[0.03]"
                                />
                                <motion.div
                                    animate={{ x: midShift, y: 8 - intensity * 8, rotate: -4 + drift * 3, scale: 0.98 + intensity * 0.02 }}
                                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                                    className="absolute left-[12%] top-[20%] h-[54%] w-[74%] rounded-[2.1rem] border border-orange-200/[0.07] bg-[#120907]/70 backdrop-blur-[2px]"
                                />

                                <motion.div
                                    animate={{ x: frontShift, y: -intensity * 12, rotate: 1.5 + drift * 2, scale: 1 + intensity * 0.02 }}
                                    transition={{ type: "spring", stiffness: 150, damping: 24 }}
                                    className="absolute left-[16%] top-[25%] w-[69%] overflow-hidden rounded-[1.85rem] border border-amber-100/14 bg-[linear-gradient(180deg,rgba(255,245,230,0.1),rgba(255,255,255,0.02))] p-5 shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
                                >
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/35 to-transparent" />
                                    <div className="absolute left-[18%] top-6 h-32 w-32 rounded-full bg-amber-100/[0.16] blur-3xl" />

                                    <div className="relative z-10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-amber-50/38">
                                        <span>AuraBitz surface</span>
                                        <span>Charged UI</span>
                                    </div>

                                    <div className="relative z-10 mt-6 rounded-[1.4rem] border border-amber-100/12 bg-[#120907]/60 p-4 sm:p-5">
                                        <div className="mb-4 flex items-start justify-between gap-4">
                                            <div>
                                                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-50/35">Primary plane</div>
                                                <div className="mt-2 font-serif text-2xl italic tracking-tight text-white/90">Interface in orbit</div>
                                            </div>
                                            <div className="rounded-full border border-amber-100/12 bg-amber-100/[0.05] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-amber-50/52">
                                                Bias {Math.round(field)}
                                            </div>
                                        </div>

                                        <div className="h-36 rounded-[1.25rem] border border-amber-100/10 bg-[linear-gradient(180deg,rgba(255,245,230,0.12),rgba(255,255,255,0.02))]" />

                                        <div className="mt-5 max-w-[280px]">
                                            <div className="h-3 w-24 rounded-full bg-amber-50/18" />
                                            <motion.div
                                                animate={{ width: `${58 + intensity * 26}%` }}
                                                transition={{ type: "spring", stiffness: 130, damping: 18 }}
                                                className="mt-4 h-9 rounded-full bg-amber-50 shadow-[0_0_40px_rgba(251,191,36,0.16)]"
                                            />
                                            <div className="mt-3 h-2.5 w-5/6 rounded-full bg-amber-50/14" />
                                            <div className="mt-2 h-2.5 w-4/6 rounded-full bg-amber-50/10" />
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <div className="flex h-11 min-w-[144px] items-center justify-center rounded-full bg-amber-50 px-5 text-sm font-medium text-[#140b05]">
                                                Engage depth
                                            </div>
                                            <div className="flex h-11 min-w-[120px] items-center justify-center rounded-full border border-amber-100/10 bg-black/35 px-5 text-sm text-amber-50/72">
                                                Inspect drift
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ x: drift * 18, y: -intensity * 10 }}
                                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                                    className="absolute left-6 top-8 rounded-full border border-amber-100/10 bg-black/55 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-amber-50/48"
                                >
                                    Field note // lift {Math.round(22 + intensity * 64)}%
                                </motion.div>
                                <motion.div
                                    animate={{ x: -drift * 20, y: intensity * 10 }}
                                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                                    className="absolute right-8 top-24 rounded-full border border-amber-100/10 bg-amber-100/[0.03] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-amber-50/42"
                                >
                                    Light pressure {Math.round(36 + intensity * 52)}
                                </motion.div>
                                <motion.div
                                    animate={{ x: drift * 16, y: -intensity * 12 }}
                                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                                    className="absolute bottom-28 right-10 rounded-[1.15rem] border border-amber-100/[0.07] bg-black/55 px-4 py-3"
                                >
                                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-50/30">Orbit cards</div>
                                    <div className="mt-3 flex gap-2">
                                        {[62, 74, 86].map((value, index) => (
                                            <div key={value} className="w-20 rounded-[0.95rem] border border-amber-100/[0.06] bg-amber-100/[0.02] p-3">
                                                <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-50/28">
                                                    {index === 0 ? "Depth" : index === 1 ? "Glow" : "Mass"}
                                                </div>
                                                <div className="h-1.5 bg-amber-50/[0.05]">
                                                    <motion.div
                                                        animate={{ width: `${value - Math.round((1 - intensity) * 18)}%` }}
                                                        transition={{ type: "spring", stiffness: 130, damping: 18 }}
                                                        className="h-full bg-gradient-to-r from-amber-50 via-orange-100 to-white/20"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <div
                                    ref={trackRef}
                                    onPointerDown={(event) => {
                                        const rect = trackRef.current?.getBoundingClientRect();
                                        if (!rect) {
                                            return;
                                        }

                                        const next = ((event.clientX - rect.left) / rect.width) * 100;
                                        setField(clamp(next, 12, 88));
                                        setIsDragging(true);
                                    }}
                                    className="absolute inset-x-5 bottom-5 rounded-[1.45rem] border border-amber-100/[0.08] bg-black/60 px-4 py-4 backdrop-blur-sm sm:inset-x-6"
                                >
                                    <div className="mb-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-amber-50/30">
                                        <span>Drag field bias</span>
                                        <span>{Math.round(intensity * 100)}% charge</span>
                                    </div>
                                    <div className="relative h-10">
                                        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-amber-100/10 via-amber-100/30 to-amber-100/10" />
                                        <motion.div
                                            animate={{ left: `${field}%` }}
                                            transition={{ type: "spring", stiffness: 180, damping: 24 }}
                                            className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                                        >
                                            <button
                                                type="button"
                                                onPointerDown={(event) => {
                                                    event.stopPropagation();
                                                    setIsDragging(true);
                                                }}
                                                className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-100/12 bg-amber-50 text-[#1a0d05] shadow-[0_0_35px_rgba(251,191,36,0.16)]"
                                                aria-label="Drag motion field bias"
                                            >
                                                <Sparkles className="h-4 w-4" />
                                            </button>
                                        </motion.div>
                                    </div>
                                    <div className="mt-3 flex justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-amber-50/26">
                                        <span>Low friction</span>
                                        <span>Balanced</span>
                                        <span>Charged depth</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-[1.7rem] border border-amber-100/[0.08] bg-amber-100/[0.02] p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-amber-50/30">Field readings</div>
                                    <div className="mt-2 font-serif text-xl italic tracking-tight text-white/88">Charged spatial output</div>
                                </div>
                                <div className="rounded-full border border-amber-100/10 bg-amber-100/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-amber-50/45">
                                    Vector {Math.round(field)}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    ["Layer separation", `${Math.round(18 + intensity * 72)}%`],
                                    ["Motion pressure", `${Math.round(24 + intensity * 64)}%`],
                                    ["Light hierarchy", `${Math.round(30 + intensity * 58)}%`],
                                ].map(([label, value]) => (
                                    <div key={label}>
                                        <div className="mb-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-amber-50/30">
                                            <span>{label}</span>
                                            <span>{value}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-amber-50/[0.05]">
                                            <motion.div
                                                animate={{ width: value }}
                                                transition={{ type: "spring", stiffness: 130, damping: 18 }}
                                                className="h-full rounded-full bg-gradient-to-r from-amber-50 via-orange-100 to-white/20"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                {[
                                    ["Drift", `${drift > 0 ? "+" : ""}${drift.toFixed(2)}`],
                                    ["Glow", `${Math.round(14 + intensity * 48)} lux`],
                                    ["Mass", `${Math.round(38 + intensity * 44)} tuned`],
                                ].map(([label, value]) => (
                                    <div key={label} className="rounded-[1.15rem] border border-amber-100/[0.06] bg-black/35 p-4">
                                        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-50/28">{label}</div>
                                        <div className="mt-3 font-serif text-sm italic text-white/82">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[1.7rem] border border-orange-200/[0.07] bg-black/35 p-5">
                            <div className="mb-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-amber-50/30">
                                <Zap className="h-3.5 w-3.5" />
                                State shift notes
                            </div>

                            <div className="space-y-3">
                                {proofRows.map((row, index) => (
                                    <motion.div
                                        key={row.label}
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.08 + index * 0.06, type: "spring", stiffness: 170, damping: 18 }}
                                        className="rounded-[1.2rem] border border-amber-100/[0.05] bg-amber-100/[0.02] p-4"
                                    >
                                        <div className="mb-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-amber-50/28">
                                            <span>{row.label}</span>
                                            <span>{Math.round(28 + intensity * 62)}%</span>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-sm leading-relaxed text-amber-50/38">{row.quiet}</p>
                                            <p className="font-serif text-sm italic leading-relaxed text-white/84">{row.charged}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                            <KineticButton className="h-12 rounded-full bg-amber-50 px-6 text-sm font-semibold text-[#1a0d05] shadow-[0_0_28px_rgba(251,191,36,0.16)]">
                                Copy this block
                            </KineticButton>
                            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-amber-100/10 bg-amber-100/[0.03] px-6 text-sm font-medium text-amber-50/75 transition-colors hover:bg-amber-100/[0.05] hover:text-amber-50">
                                Inspect structure
                                <ArrowUpRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
