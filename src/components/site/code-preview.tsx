"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LucideCheck, LucideCopy, TerminalSquare, Eye } from "lucide-react";
import dynamic from "next/dynamic";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = dynamic(
    () => import("react-syntax-highlighter").then((mod) => mod.Prism),
    {
        ssr: false,
        loading: () => (
            <div className="p-8 bg-[#0a0a0a] min-h-[200px] flex items-center justify-center">
                <span className="text-white/20 font-mono text-xs animate-pulse">Loading...</span>
            </div>
        ),
    }
);

interface CodePreviewProps {
    children: React.ReactNode;
    code?: string;
    loadCode?: () => Promise<string> | string;
    codeEndpoint?: string;
}

export function CodePreview({ children, code, loadCode, codeEndpoint }: CodePreviewProps) {
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [copied, setCopied] = useState(false);
    const [resolvedCode, setResolvedCode] = useState(code ?? "");
    const [isCodeLoading, setIsCodeLoading] = useState(false);
    const resetCopyStateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasLoadedCodeRef = useRef(Boolean(code));

    useEffect(() => {
        return () => {
            if (resetCopyStateTimeoutRef.current) {
                clearTimeout(resetCopyStateTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (typeof code === "string") {
            setResolvedCode(code);
            hasLoadedCodeRef.current = true;
        }
    }, [code]);

    useEffect(() => {
        if (activeTab !== "code" || hasLoadedCodeRef.current || (!loadCode && !codeEndpoint)) {
            return;
        }

        let cancelled = false;

        const resolveCode = async () => {
            setIsCodeLoading(true);

            try {
                const loadedCode = loadCode
                    ? await loadCode()
                    : await fetch(codeEndpoint as string).then(async (response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch source code.");
                        }

                        const payload = await response.json() as { code?: string };
                        return payload.code ?? "";
                    });
                if (!cancelled) {
                    setResolvedCode(loadedCode);
                    hasLoadedCodeRef.current = true;
                }
            } finally {
                if (!cancelled) {
                    setIsCodeLoading(false);
                }
            }
        };

        void resolveCode();

        return () => {
            cancelled = true;
        };
    }, [activeTab, codeEndpoint, loadCode]);

    const handleCopy = async () => {
        if (!resolvedCode) {
            return;
        }

        try {
            await navigator.clipboard.writeText(resolvedCode);
            setCopied(true);
        } catch {
            // Clipboard API unavailable (e.g. HTTP context)
        }

        if (resetCopyStateTimeoutRef.current) {
            clearTimeout(resetCopyStateTimeoutRef.current);
        }

        resetCopyStateTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
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
                        disabled={!resolvedCode || isCodeLoading}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium transition-all rounded-md border disabled:cursor-not-allowed disabled:opacity-50",
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
                    <div className="relative flex items-center justify-center min-h-[450px] p-4 md:p-8 overflow-hidden bg-black bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]">
                        {/* Top edge subtle highlight */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" />

                        <div className="relative z-10 w-full flex items-center justify-center">
                            {children}
                        </div>
                    </div>
                ) : (
                    <div data-lenis-prevent className="w-full max-h-[600px] overflow-auto bg-[#0a0a0a]">
                        {isCodeLoading && !resolvedCode ? (
                            <div className="flex min-h-[240px] items-center justify-center p-8">
                                <span className="text-xs font-mono text-white/30 animate-pulse">Loading code...</span>
                            </div>
                        ) : (
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
                                {resolvedCode}
                            </SyntaxHighlighter>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
