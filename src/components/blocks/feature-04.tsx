"use client";

import { useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowUpRight, Cpu, Layers3, Radio, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { KineticButton } from "@/components/ui/kinetic-button";

type VaultMetric = {
    label: string;
    value: string;
};

type VaultRecord = {
    id: string;
    index: string;
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    stamp: string;
    signalClass: string;
    fillClass: string;
    icon: ComponentType<{ className?: string }>;
    metrics: VaultMetric[];
};

const records: VaultRecord[] = [
    {
        id: "latency",
        index: "A1",
        eyebrow: "Response receipt",
        title: "Every interaction leaves a measurable timing artifact.",
        description: "The interface exposes response proof directly in the surface, so perceived speed is tied to a logged event instead of marketing language.",
        note: "Latency is archived as a receipt with start, resolve, and confirmation states all visible in sequence.",
        stamp: "RESPONSE VERIFIED",
        signalClass: "text-emerald-200",
        fillClass: "from-emerald-100 via-white to-white/20",
        icon: Activity,
        metrics: [
            { label: "Resolve feel", value: "118ms" },
            { label: "Frame spread", value: "0.8ms" },
            { label: "Receipt", value: "Signed" },
        ],
    },
    {
        id: "integrity",
        index: "B2",
        eyebrow: "State seal",
        title: "The visual layer is locked to state integrity before it performs confidence.",
        description: "Proof cues only appear after the system confirms the underlying state, making trust visible without pretending certainty too early.",
        note: "A verification cue is not decorative here. It is released only after the seal ledger resolves cleanly.",
        stamp: "STATE SEALED",
        signalClass: "text-white",
        fillClass: "from-white via-white/85 to-white/20",
        icon: ShieldCheck,
        metrics: [
            { label: "Seal method", value: "ed25519" },
            { label: "Mismatch", value: "0 detected" },
            { label: "Sync", value: "1:1" },
        ],
    },
    {
        id: "ledger",
        index: "C3",
        eyebrow: "Archive chain",
        title: "Claims become ledger rows, not floating headlines.",
        description: "A proof vault works because each promise has a row, a timestamp, and a visible status condition that can be checked in order.",
        note: "The entire section reads like a retained archive, giving the final chapter a colder, more final tone than the other showcases.",
        stamp: "ARCHIVE LOCKED",
        signalClass: "text-zinc-100",
        fillClass: "from-zinc-100 via-white to-white/20",
        icon: Layers3,
        metrics: [
            { label: "Rows", value: "24 retained" },
            { label: "Window", value: "48h" },
            { label: "Audit", value: "Continuous" },
        ],
    },
    {
        id: "attestation",
        index: "D4",
        eyebrow: "Attestation pulse",
        title: "Final trust is delivered as a confirmation ritual, not a glow effect.",
        description: "Numbers settle, rows stamp in, and the user sees a final attestation event instead of a vague premium flourish.",
        note: "The last motion in the chapter behaves like a recorded confirmation. Restrained, irreversible, and quiet.",
        stamp: "ATTESTED",
        signalClass: "text-emerald-100",
        fillClass: "from-emerald-50 via-white to-white/20",
        icon: Cpu,
        metrics: [
            { label: "Attest", value: "2.4ms" },
            { label: "Proof pulse", value: "1 event" },
            { label: "Vault", value: "Closed" },
        ],
    },
];

export function Feature04() {
    const [activeId, setActiveId] = useState(records[1].id);
    const activeIndex = records.findIndex((record) => record.id === activeId);
    const activeRecord = records[activeIndex] ?? records[1];

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveId((prev) => {
                const index = records.findIndex((record) => record.id === prev);
                return records[(index + 1) % records.length].id;
            });
        }, 5200);

        return () => window.clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden rounded-[2.75rem] border border-emerald-200/10 bg-[#020403]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(74,222,128,0.11),transparent_22%),radial-gradient(circle_at_82%_0%,rgba(255,255,255,0.06),transparent_28%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-100/35 to-transparent" />
            <motion.div
                animate={{ y: ["-100%", "160%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-x-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.045),transparent)] blur-xl"
            />

            <div className="relative z-10 grid gap-10 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-10 lg:py-10">
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <div className="mb-8 max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100/15 bg-emerald-100/[0.04] px-3 py-1.5">
                            <Radio className="h-3.5 w-3.5 text-emerald-100/65" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-emerald-50/66">Feature Showcase 04</span>
                        </div>
                        <h2 className="max-w-xl font-mono text-[2.2rem] uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-[4.6rem]">
                            Proof vault
                            <span className="block font-serif text-[0.52em] italic tracking-tight text-white/72">receipts, not claims</span>
                        </h2>
                        <p className="mt-5 max-w-lg font-mono text-[11px] uppercase leading-6 tracking-[0.14em] text-emerald-50/38 sm:text-[12px]">
                            The final feature chapter behaves like an archive of evidence. Every promise has a row, a seal, and a visible condition of trust.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                        {[
                            ["Vault state", "Closed / attested"],
                            ["Proof rows", "24 retained"],
                            ["Signal policy", "Visible trust only"],
                        ].map(([label, value]) => (
                            <div key={label} className="rounded-[1rem] border border-white/[0.06] bg-white/[0.02] p-4">
                                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/28">{label}</div>
                                <div className="mt-3 font-serif text-sm italic text-white/84">{value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-3">
                        {records.map((record) => {
                            const isActive = record.id === activeRecord.id;
                            const Icon = record.icon;

                            return (
                                <button
                                    key={record.id}
                                    type="button"
                                    onClick={() => setActiveId(record.id)}
                                    className={cn(
                                        "group relative w-full overflow-hidden rounded-[1.1rem] border px-4 py-4 text-left transition-colors sm:px-5",
                                        isActive
                                            ? "border-emerald-100/18 bg-emerald-100/[0.06]"
                                            : "border-white/[0.06] bg-black/35 hover:border-white/10 hover:bg-white/[0.03]"
                                    )}
                                >
                                    <div className="mb-3 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.28em] text-white/30">
                                        <Icon className={cn("h-3.5 w-3.5 text-white/35", isActive && record.signalClass)} />
                                        <span className={cn(isActive ? record.signalClass : "text-white/30")}>{record.index}</span>
                                        <div className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
                                    </div>
                                    <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-white/88">{record.eyebrow}</div>
                                    <p className="mt-2 text-sm leading-relaxed text-white/42">{record.title}</p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                        <KineticButton className="h-12 rounded-full border border-emerald-100/18 bg-emerald-100 px-6 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#09120d] shadow-[0_0_28px_rgba(74,222,128,0.16)]">
                            Open proof vault
                        </KineticButton>
                        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 font-mono text-[12px] uppercase tracking-[0.14em] text-white/72 transition-colors hover:bg-white/[0.05] hover:text-white">
                            Inspect receipts
                            <ArrowUpRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="grid gap-3 sm:grid-cols-3">
                        {activeRecord.metrics.map((metric, index) => (
                            <motion.div
                                key={`${activeRecord.id}-${metric.label}`}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.06, type: "spring", stiffness: 180, damping: 20 }}
                                className="rounded-[1rem] border border-white/[0.06] bg-white/[0.02] p-4"
                            >
                                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">
                                    <span>{metric.label}</span>
                                    <span>0{index + 1}</span>
                                </div>
                                <div className="mt-4 font-mono text-lg uppercase tracking-[0.04em] text-white/90">{metric.value}</div>
                                <div className="mt-4 h-1.5 bg-white/[0.05]">
                                    <motion.div
                                        animate={{ width: `${48 + index * 14 + activeIndex * 5}%` }}
                                        transition={{ type: "spring", stiffness: 160, damping: 22 }}
                                        className={cn("h-full bg-gradient-to-r", activeRecord.fillClass)}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#040605]">
                        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 text-[10px] font-mono uppercase tracking-[0.28em] text-white/30 sm:px-6">
                            <span>Sealed ledger</span>
                            <span>{activeRecord.stamp}</span>
                        </div>

                        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]">
                            <div className="rounded-[1.5rem] border border-white/[0.06] bg-black/40 p-5">
                                <div className="mb-5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">
                                    <span>Receipt stack</span>
                                    <span>4 entries</span>
                                </div>
                                <div className="space-y-3">
                                    {records.map((record, index) => {
                                        const isActive = record.id === activeRecord.id;

                                        return (
                                            <motion.button
                                                key={`${record.id}-slip`}
                                                type="button"
                                                onClick={() => setActiveId(record.id)}
                                                whileHover={{ x: 3, y: -2 }}
                                                className={cn(
                                                    "w-full rounded-[1rem] border px-4 py-4 text-left transition-colors",
                                                    isActive
                                                        ? "border-emerald-100/18 bg-emerald-100/[0.05]"
                                                        : "border-white/[0.06] bg-white/[0.015] hover:border-white/10 hover:bg-white/[0.03]"
                                                )}
                                            >
                                                <div className="mb-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">
                                                    <span>{record.index}</span>
                                                    <span>{index === activeIndex ? "Active" : "Archived"}</span>
                                                </div>
                                                <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/84">{record.eyebrow}</div>
                                                <div className="mt-2 text-sm text-white/44">{record.stamp}</div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-[1.7rem] border border-emerald-100/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-5 sm:p-6">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                                <div className="absolute right-8 top-8 h-36 w-36 rounded-full bg-emerald-100/[0.08] blur-3xl" />

                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/32">Active dossier</div>
                                        <div className="mt-2 font-serif text-xl italic text-white/88">{activeRecord.stamp}</div>
                                    </div>
                                    <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-white/45">
                                        Vault #{activeRecord.index}
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeRecord.id}
                                        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                                        className="relative z-10 mt-8"
                                    >
                                        <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">{activeRecord.eyebrow}</div>
                                        <h3 className="max-w-xl text-2xl font-medium tracking-tight text-white sm:text-[2rem]">
                                            {activeRecord.title}
                                        </h3>
                                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
                                            {activeRecord.description}
                                        </p>
                                        <p className="mt-4 max-w-xl font-serif text-base italic leading-relaxed text-white/68">
                                            {activeRecord.note}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
                                    {activeRecord.metrics.map((metric) => (
                                        <div key={`${activeRecord.id}-${metric.label}-detail`} className="rounded-[1rem] border border-white/[0.08] bg-black/35 p-4">
                                            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/28">{metric.label}</div>
                                            <div className="mt-3 text-sm font-medium text-white/84">{metric.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/[0.07] p-5 sm:p-6">
                            <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
                                <div className="rounded-[1.4rem] border border-white/[0.06] bg-black/35 p-5">
                                    <div className="mb-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">
                                        <span>Attestation chain</span>
                                        <span>Locked</span>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            "Capture event fingerprint",
                                            "Seal interaction state",
                                            "Publish proof cue to surface",
                                        ].map((item, index) => (
                                            <div key={item} className="flex items-center gap-3 rounded-[0.95rem] border border-white/[0.05] bg-white/[0.015] px-4 py-3">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-100/15 bg-emerald-100/[0.05] text-[10px] font-mono text-emerald-100/70">
                                                    0{index + 1}
                                                </div>
                                                <div className="text-sm text-white/70">{item}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[1.4rem] border border-white/[0.06] bg-white/[0.02] p-5">
                                    <div className="mb-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-white/30">
                                        <span>Signed receipt</span>
                                        <span>Immutable window</span>
                                    </div>
                                    <div className="rounded-[1rem] border border-emerald-100/10 bg-black/40 p-4">
                                        <div className="flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.22em] text-white/28">
                                            <span>Receipt hash</span>
                                            <span className="text-emerald-100/65">VALID</span>
                                        </div>
                                        <div className="mt-4 font-mono text-sm uppercase leading-6 tracking-[0.12em] text-white/82">
                                            AURA-VAULT-7C31-{activeRecord.index}-SEALED
                                        </div>
                                        <div className="mt-5 h-1.5 bg-white/[0.05]">
                                            <motion.div
                                                animate={{ width: `${62 + activeIndex * 9}%` }}
                                                transition={{ type: "spring", stiffness: 150, damping: 22 }}
                                                className={cn("h-full bg-gradient-to-r", activeRecord.fillClass)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}