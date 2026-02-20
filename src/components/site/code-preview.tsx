"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LucideCheck, LucideCopy, TerminalSquare, Eye } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodePreviewProps {
    children: React.ReactNode;
    code: string;
}

export function CodePreview({ children, code }: CodePreviewProps) {
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full rounded-2xl border border-white/[0.06] bg-[#050505] overflow-hidden mt-10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
            {/* Tabs & Toolbar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-2 bg-[#0a0a0a]">
                <div className="flex gap-1 p-1">
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-all rounded-lg",
                            activeTab === "preview"
                                ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                                : "text-white/40 hover:text-white/80 hover:bg-white/[0.03]"
                        )}
                    >
                        <Eye size={14} className={cn(activeTab === "preview" ? "opacity-100" : "opacity-50")} />
                        Preview
                    </button>
                    <button
                        onClick={() => setActiveTab("code")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-all rounded-lg",
                            activeTab === "code"
                                ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                                : "text-white/40 hover:text-white/80 hover:bg-white/[0.03]"
                        )}
                    >
                        <TerminalSquare size={14} className={cn(activeTab === "code" ? "opacity-100" : "opacity-50")} />
                        Code
                    </button>
                </div>

                <div className="flex items-center gap-2 pr-2">
                    <button
                        onClick={handleCopy}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium transition-all rounded-md border",
                            copied
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : "bg-[#0f0f0f] border-white/5 text-white/40 hover:text-white hover:bg-white/5 hover:border-white/10"
                        )}
                    >
                        {copied ? (
                            <>
                                <LucideCheck size={13} />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <LucideCopy size={13} />
                                <span>Copy Code</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative w-full">
                {activeTab === "preview" ? (
                    <div className="relative flex items-center justify-center min-h-[450px] p-8 overflow-hidden bg-black bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]">
                        {/* Top edge subtle highlight */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" />

                        <div className="relative z-10 w-full flex items-center justify-center">
                            {children}
                        </div>
                    </div>
                ) : (
                    <div data-lenis-prevent className="w-full max-h-[600px] overflow-auto bg-[#0a0a0a]">
                        <SyntaxHighlighter
                            language="tsx"
                            style={vscDarkPlus}
                            customStyle={{
                                margin: 0,
                                padding: "2rem",
                                background: "transparent",
                                fontSize: "0.875rem",
                                lineHeight: "1.6",
                            }}
                            codeTagProps={{
                                style: { fontFamily: "var(--font-mono)" }
                            }}
                        >
                            {code}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        </div>
    );
}
