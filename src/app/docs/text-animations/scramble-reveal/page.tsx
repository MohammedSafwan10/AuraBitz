"use client";

import { useState } from "react";
import { ScrambleReveal } from "@/components/ui/scramble-reveal";
import { CodePreview } from "@/components/site/code-preview";

const sourceCode = `"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrambleRevealProps {
    children: string;
    className?: string;
    characters?: string;
    duration?: number;
    delay?: number;
    once?: boolean;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export function ScrambleReveal({
    children,
    className,
    characters = DEFAULT_CHARS,
    duration = 1,
    delay = 0,
    once = true,
}: ScrambleRevealProps) {
    const text = children;
    // Initial state: normal text so SSR doesn't mismatch, scrambled client-side when animating
    const [displayText, setDisplayText] = useState<string>(text);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once });
    
    const [isAnimating, setIsAnimating] = useState(false);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (inView) {
            startTimeRef.current = null;
            // If there's a delay, we might want to scramble the text immediately so it sits scrambled
            if (delay > 0) {
                 const scrambledInit = text.split("").map(c => c === " " ? " " : characters[Math.floor(Math.random() * characters.length)]).join("");
                 setDisplayText(scrambledInit);
            }
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, delay * 1000);
            return () => clearTimeout(timer);
        } else if (!once) {
            setIsAnimating(false);
            setDisplayText(text); // reset
        }
    }, [inView, delay, once, text, characters]);

    useAnimationFrame((time) => {
        if (!isAnimating) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = time;
        }

        const elapsed = time - startTimeRef.current;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        if (progress === 1) {
            setDisplayText(text);
            setIsAnimating(false);
            return;
        }

        const charArray = text.split("");
        const revealCount = Math.floor(progress * charArray.length);

        const scrambled = charArray.map((char, index) => {
            if (char === " ") return " ";
            if (index < revealCount) {
                return char;
            }
            return characters[Math.floor(Math.random() * characters.length)];
        });

        setDisplayText(scrambled.join(""));
    });

    return (
        <span ref={ref} className={cn("inline-block whitespace-pre-wrap", className)}>
            {displayText}
        </span>
    );
}`;

export default function ScrambleRevealPage() {
    const [replayKey1, setReplayKey1] = useState(0);
    const [replayKey2, setReplayKey2] = useState(0);
    const [replayKey3, setReplayKey3] = useState(0);

    return (
        <div className="max-w-4xl space-y-16 pb-20">
            {/* Header */}
            <div className="relative">
                <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            Text Animations
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-5 pb-2 text-white">
                        Scramble Reveal
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        A cybernetic decoding effect. Transforms scrambled cryptography into legible strings using Framer Motion&apos;s native render loop for extreme performance.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview code={sourceCode}>
                <div className="w-full flex flex-col items-center justify-center gap-12 py-10">
                    {/* Primary Hero Demo */}
                    <div className="text-center relative">
                        {/* Interactive Re-Trigger Area */}
                        <div
                            className="group cursor-pointer inline-block"
                            onClick={() => setReplayKey1(prev => prev + 1)}
                        >
                            <ScrambleReveal
                                key={replayKey1}
                                className="text-4xl md:text-6xl font-black font-mono tracking-tighter text-emerald-400 inline-flex flex-wrap justify-center py-4 drop-shadow-2xl"
                                duration={1.5}
                                once={true}
                            >
                                SYSTEM INITIALIZED.
                            </ScrambleReveal>
                            <p className="text-white/30 text-sm mt-0 font-mono uppercase tracking-widest group-hover:text-emerald-400/80 transition-colors">(Click to Re-Animate)</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 w-full max-w-xl border-t border-white/[0.05] pt-12">
                        {/* Binary Demo */}
                        <div className="flex flex-col gap-2">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">Binary Pool Base</span>
                            <div
                                className="group cursor-pointer inline-block"
                                onClick={() => setReplayKey2(prev => prev + 1)}
                            >
                                <ScrambleReveal
                                    key={replayKey2}
                                    className="text-xl md:text-2xl font-medium text-white/80 font-mono"
                                    characters="01"
                                    duration={2}
                                    once={true}
                                >
                                    Decoded payload successfully isolated.
                                </ScrambleReveal>
                                <p className="text-white/30 text-[10px] mt-2 font-mono uppercase tracking-widest group-hover:text-emerald-400/80 transition-colors">(Click to Re-Animate)</p>
                            </div>
                        </div>

                        {/* Kanji/Symbol Demo */}
                        <div className="flex flex-col gap-2 pt-6 border-t border-white/[0.05]">
                            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">Custom Character Set</span>
                            <div
                                className="group cursor-pointer inline-block"
                                onClick={() => setReplayKey3(prev => prev + 1)}
                            >
                                <ScrambleReveal
                                    key={replayKey3}
                                    className="text-xl md:text-2xl font-light text-white/80 tracking-widest"
                                    characters="アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
                                    duration={3}
                                    once={true}
                                >
                                    NEO-TOKYO.
                                </ScrambleReveal>
                                <p className="text-white/30 text-[10px] mt-2 font-mono uppercase tracking-widest group-hover:text-emerald-400/80 transition-colors">(Click to Re-Animate)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CodePreview>

            {/* How It Works */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 text-white">How it works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { step: "01", title: "Frame Loop", desc: "Hooks directly into the browser's requestAnimationFrame via Framer Motion's `useAnimationFrame`." },
                        { step: "02", title: "Linear Progress", desc: "Calculates total elapsed time across the provided duration string mapping a strict 0.0 to 1.0 progress." },
                        { step: "03", title: "Array Mapping", desc: "Strings below the progress threshold show their intended letters, unhit strings draw randomly from the character pool." },
                        { step: "04", title: "DOM Reactivity", desc: "Rather than forcing individual span updates, it triggers a single state update for extreme performance efficiency." },
                    ].map((item) => (
                        <div key={item.step} className="group relative p-6 rounded-[2rem] border border-white/[0.05] bg-[#050505] overflow-hidden hover:border-white/[0.1] transition-colors duration-500">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono text-white/40 bg-white/[0.05] border border-white/[0.05] mb-4">
                                STEP {item.step}
                            </span>
                            <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-[13px] text-white/50 leading-relaxed font-light">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Props */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 text-white">Props</h2>
                <div className="border border-white/[0.05] rounded-[2rem] overflow-hidden bg-[#050505] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Prop</th>
                                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Type</th>
                                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Default</th>
                                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-white/60 font-light divide-y divide-white/[0.02]">
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">children</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">—</td>
                                <td className="px-6 py-4">The text string to be animated. (Must be a direct string).</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">characters</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">DEFAULT_CHARS</td>
                                <td className="px-6 py-4">String of characters to randomly sample from while scrambling.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">duration</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">1</td>
                                <td className="px-6 py-4">Total duration in seconds to complete the reveal.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">delay</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">0</td>
                                <td className="px-6 py-4">Seconds to delay before initiating the decode. Scrambled payload rendered initially.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Installation */}
            <div className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tighter pb-1 text-white">Installation</h2>
                <div className="group relative p-6 rounded-[2rem] border border-white/[0.05] bg-[#050505] overflow-hidden">
                    <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">1. Install Dependencies</p>
                    <pre className="flex items-center justify-between font-mono text-[13px] text-emerald-400/90 bg-[#111] p-3 rounded-xl border border-white/[0.05] shadow-inner mb-6">
                        <code>npm install framer-motion</code>
                    </pre>
                    <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">2. Copy Source</p>
                    <p className="text-[13px] text-white/60 font-light leading-relaxed">Simply drop the source code into your <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">/components/ui</code> folder.</p>
                </div>
            </div>
        </div>
    );
}
