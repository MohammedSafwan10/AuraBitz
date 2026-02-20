"use client";

import { useState } from "react";
import { TextType } from "@/components/ui/text-type";
import { CodePreview } from "@/components/site/code-preview";
import { RefreshCw } from "lucide-react";

const sourceCode = `use client";

import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextTypeProps {
    text: string;
    className?: string;
    delay?: number;
    typingSpeed?: number;
    cursorBlinkSpeed?: number;
    showCursor?: boolean;
    cursorChar?: string;
    cursorClassName?: string;
}

export function TextType({
    text,
    className,
    delay = 0,
    typingSpeed = 0.05,
    cursorBlinkSpeed = 0.8,
    showCursor = true,
    cursorChar = "|",
    cursorClassName,
}: TextTypeProps) {
    const letters = text.split("");
    const controls = useAnimation();
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: typingSpeed,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: { display: "none", opacity: 0 },
        visible: { display: "inline", opacity: 1 },
    };

    return (
        <motion.span
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className={cn("inline-block", className)}
        >
            {letters.map((char, i) => (
                <motion.span key={i} variants={charVariants}>
                    {char === " " ? "\\u00A0" : char}
                </motion.span>
            ))}
            {showCursor && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: cursorBlinkSpeed,
                        ease: "linear",
                    }}
                    className={cn("inline-block -ml-1 text-emerald-400", cursorClassName)}
                >
                    {cursorChar}
                </motion.span>
            )}
        </motion.span>
    );
}`;

export default function TextTypePage() {
    const [replayKey, setReplayKey] = useState(0);

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
                        Text Type
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                        A polished, natively staggered typewriter effect utilizing robust Framer Motion stagger children rather than hacky &apos;setTimeout&apos; loops. Complete with a stylized blinking cursor.
                    </p>
                </div>
            </div>

            {/* Preview + Code */}
            <CodePreview code={sourceCode}>
                <div className="relative w-full flex flex-col items-center justify-center p-8 gap-8">
                    <button
                        onClick={() => setReplayKey(curr => curr + 1)}
                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all outline-none"
                    >
                        <RefreshCw size={14} />
                    </button>

                    <div className="w-full max-w-2xl bg-[#090909] border border-white/10 p-6 rounded-xl font-mono text-sm leading-loose text-white/70 shadow-2xl">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                        </div>
                        <span className="text-emerald-400">~/guest/ssh $</span>{" "}
                        <TextType
                            key={`tt-1-${replayKey}`}
                            text="connecting to root mainframe..."
                            showCursor={false}
                            delay={0.2}
                            typingSpeed={0.03}
                        />
                        <br />
                        <span className="text-emerald-400">~/guest/ssh $</span>{" "}
                        <TextType
                            key={`tt-2-${replayKey}`}
                            text="bypassing security protocols..."
                            showCursor={false}
                            delay={1.5}
                            typingSpeed={0.02}
                        />
                        <br />
                        <span className="text-emerald-400">~/guest/ssh $</span>{" "}
                        <TextType
                            key={`tt-3-${replayKey}`}
                            text="ACCESS GRANTED. Welcome to the Next Level."
                            delay={2.6}
                            typingSpeed={0.03}
                            cursorChar="█"
                            cursorClassName="text-white/80"
                            className="text-white font-bold"
                        />
                    </div>
                </div>
            </CodePreview>

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
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">text</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">—</td>
                                <td className="px-6 py-4">The exact string to map into the typewriter flow.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">delay</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">0</td>
                                <td className="px-6 py-4">Delay before the typing begins in seconds. Great for sequencing.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">typingSpeed</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">0.05</td>
                                <td className="px-6 py-4">Seconds delay interval between each character typed out.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">cursorChar</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">&quot;|&quot;</td>
                                <td className="px-6 py-4">Configurable flashing cursor element string block.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">cursorBlinkSpeed</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">0.8</td>
                                <td className="px-6 py-4">Duration interval of the blinking loop for the cursor element.</td>
                            </tr>
                            <tr className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">showCursor</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">boolean</td>
                                <td className="px-6 py-4 font-mono text-[11px] text-white/40">true</td>
                                <td className="px-6 py-4">Whether the cursor actually renders or not.</td>
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
