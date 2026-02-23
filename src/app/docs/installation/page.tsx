"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

function CodeBlock({ code, language = "bash", title }: { code: string; language?: string; title?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error("Failed to copy", e);
        }
    };

    return (
        <div className="w-full rounded-xl border border-white/[0.08] bg-[#050505] overflow-hidden mt-4 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                    {language === "bash" ? (
                        <Terminal size={14} className="text-white/40" />
                    ) : (
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                    )}
                    <span className="text-[11px] font-mono text-white/50">{title || language}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-white/40 hover:text-white transition-colors rounded-md hover:bg-white/5"
                >
                    {copied ? (
                        <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={12} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            {/* Code Content */}
            <div className="p-4 overflow-x-auto">
                <pre className="text-[13px] font-mono leading-relaxed max-w-full">
                    <code className="text-white/80">{code}</code>
                </pre>
            </div>
        </div>
    );
}

export default function InstallationPage() {
    return (
        <div className="max-w-3xl pb-20">
            <div className="relative mb-12">
                <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 border border-white/10 rounded-full bg-white/[0.02]">
                            Setup Guide
                        </div>
                    </div>
                    <h1 className="grad-text text-4xl md:text-5xl font-extrabold tracking-tighter mb-5">Installation</h1>
                    <p className="text-white/50 text-lg leading-relaxed font-light max-w-xl">
                        AuraBitz is not an npm package. It is a curated collection of source code that you copy directly into your project.
                        This gives you complete control over the markup, styles, and logic.
                    </p>
                </div>
            </div>

            {/* Step 1 */}
            <section className="mb-12 relative">
                <div className="absolute top-1 left-[-2rem] w-6 h-6 rounded-full border border-white/10 bg-black flex items-center justify-center text-xs font-mono text-white/50 hidden md:flex">
                    1
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-white mb-3">Install Dependencies</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                    All components rely on Framer Motion for premium physics-based animations, and Tailwind CSS configuration utilities for styling.
                </p>
                <CodeBlock
                    title="terminal"
                    language="bash"
                    code="npm install framer-motion clsx tailwind-merge lucide-react"
                />
            </section>

            {/* Step 2 */}
            <section className="mb-12 relative">
                <div className="absolute top-1 left-[-2rem] w-6 h-6 rounded-full border border-white/10 bg-black flex items-center justify-center text-xs font-mono text-white/50 hidden md:flex">
                    2
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-white mb-3">Add the Utility Script</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                    Create a utility file to seamlessly merge Tailwind classes without encountering priority conflicts. This function is fundamental to every component.
                </p>
                <CodeBlock
                    title="lib/utils.ts"
                    language="typescript"
                    code={'import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}'}
                />
            </section>

            {/* Step 3 */}
            <section className="mb-12 relative">
                <div className="absolute top-1 left-[-2rem] w-6 h-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-xs font-mono text-emerald-400 hidden md:flex">
                    <Check size={12} />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-white mb-3">You are ready</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                    Your project is now fully configured. You can browse the index to find the components you need, copy the source code, and use them instantly.
                </p>
                <div className="mt-6 p-6 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Terminal size={18} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-medium mb-1 tracking-tight">Pro-tip for Layouts</h3>
                        <p className="text-sm text-white/50">
                            Many physical components (like tracking ribbons or dynamic grid boundaries) scale aggressively outside their container parameters. We recommend ensuring your root document body or application wrap utilizes <code className="px-1.5 py-0.5 rounded-sm bg-black border border-white/10 text-emerald-400 font-mono text-xs">overflow-x-hidden</code> to prevent unexpected horizontal scrolling anomalies.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}
