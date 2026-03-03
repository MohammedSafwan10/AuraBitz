"use client";
import dynamic from "next/dynamic";

import { RadialNoise } from "@/components/ui/radial-noise";
const MeshDistortBG = dynamic(() => import("@/components/ui/mesh-distort-bg").then((mod) => mod.MeshDistortBG), { ssr: false });
import { KineticButton } from "@/components/ui/kinetic-button";
import { SplitText } from "@/components/ui/split-text";
import { ArrowRight, Lock, Fingerprint, Shield, Cpu, Activity, Database } from "lucide-react";

export function Bento04() {
    return (
        <section className="relative w-full min-h-[140vh] bg-[#050000] py-24 px-4 md:px-8 overflow-hidden flex flex-col items-center">

            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-6">

                {/* Header Section */}
                <div className="flex flex-col gap-2 mb-8">
                    <div className="flex items-center gap-2 text-[#ff0033] font-mono text-xs uppercase tracking-widest">
                        <Lock className="w-4 h-4" />
                        Classified Vault
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                        <SplitText animation="fade" duration={0.8} stagger={0.05} splitBy="words">
                            Data Infrastructure.
                        </SplitText>
                    </h2>
                    <p className="text-white/50 text-base max-w-lg mt-2 font-mono">
                        Red-team certified cryptographic storage with real-time biometric access verification algorithms.
                    </p>
                </div>

                {/* The "Deep Web" Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] gap-6 w-full">

                    {/* Card 1: Heavy Mesh Distort (Spans 8 cols, 2 rows) */}
                    <div className="md:col-span-8 md:row-span-2 rounded-[2rem] overflow-hidden relative border border-[#ff0000]/20 group">
                        <MeshDistortBG className="rounded-[2rem]">
                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20">
                                <div className="flex justify-between items-start">
                                    <div className="bg-[#ff0000]/10 border border-[#ff0000]/30 backdrop-blur-md px-4 py-2 rounded-[1rem] flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#ff0033] animate-pulse" />
                                        <span className="text-[#ff0033] font-mono text-xs font-bold tracking-widest uppercase">
                                            Liquid Core Online
                                        </span>
                                    </div>
                                    <Fingerprint className="w-8 h-8 text-[#ff0033]/50" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.85]">
                                        <SplitText animation="slideUp" duration={0.8} splitBy="words">
                                            Quantum Encryption
                                        </SplitText>
                                    </h3>
                                    <p className="text-white/60 font-mono text-sm max-w-md">
                                        Data is fragmented and scattered across a constantly shifting dimensional mesh, rendering traditional interception impossible.
                                    </p>
                                    <KineticButton className="mt-4 bg-[#ff0033] text-white hover:bg-white hover:text-[#ff0033]">
                                        Initiate Access Sequence
                                    </KineticButton>
                                </div>
                            </div>
                        </MeshDistortBG>
                    </div>

                    {/* Card 2: Top Right Stats (Spans 4 cols, 1 row) */}
                    <div className="md:col-span-4 md:row-span-1 rounded-[2rem] overflow-hidden relative border border-white/[0.05] bg-[#0a0505]">
                        <RadialNoise
                            baseColor="#0a0505"
                            glowColor="rgba(255, 0, 0, 0.15)"
                            spotlightSize={300}
                        >
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                                <div className="w-10 h-10 rounded-full bg-[#ff0033]/10 flex items-center justify-center border border-[#ff0033]/20">
                                    <Activity className="w-5 h-5 text-[#ff0033]" />
                                </div>
                                <div>
                                    <div className="text-5xl font-black tracking-tighter text-white mb-2">
                                        99.99<span className="text-[#ff0033]">%</span>
                                    </div>
                                    <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
                                        Threat Neutralization
                                    </p>
                                </div>
                            </div>
                        </RadialNoise>
                    </div>

                    {/* Card 3: Middle Right List (Spans 4 cols, 1 row) */}
                    <div className="md:col-span-4 md:row-span-1 rounded-[2rem] border border-white/[0.05] bg-[#0a0505] p-8 flex flex-col justifies-center relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff0033]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <h4 className="text-white font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                            <Database className="w-4 h-4 text-[#ff0033]" /> Active Protocols
                        </h4>
                        <ul className="space-y-4 flex-1">
                            {["AES-256 Symmetric", "Blockchain Ledger", "Cold Storage Node"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/60 font-mono text-sm group-hover:text-white/90 transition-colors">
                                    <ArrowRight className="w-4 h-4 text-[#ff0033] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 4: Bottom Wide (Spans 12 cols, 1 row) */}
                    <div className="md:col-span-12 md:row-span-1 rounded-[2rem] overflow-hidden relative border border-white/[0.05] bg-[#0a0505]">
                        <RadialNoise
                            baseColor="#0a0505"
                            glowColor="rgba(255, 51, 51, 0.2)"
                            spotlightSize={600}
                        >
                            <div className="absolute inset-0 p-8 md:px-16 flex flex-col md:flex-row items-center justify-between z-20 gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-[#ff0033]/10 flex items-center justify-center border border-[#ff0033]/20 shrink-0">
                                        <Shield className="w-8 h-8 text-[#ff0033]" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            Enterprise Security Matrix
                                        </h3>
                                        <p className="text-white/50 font-mono text-sm max-w-lg">
                                            Deploys automated countermeasures against unauthorized packet inspection and brute-force intrusion attempts natively at the edge.
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full border border-dashed border-[#ff0033]/40 flex items-center justify-center">
                                            <Cpu className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-[10px] font-mono text-white/40 mt-2 uppercase">Nodes</span>
                                    </div>
                                </div>
                            </div>
                        </RadialNoise>
                    </div>

                </div>
            </div>
        </section>
    );
}
