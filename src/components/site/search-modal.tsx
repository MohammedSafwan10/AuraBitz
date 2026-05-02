"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarData } from "./sidebar";
import { blocksSidebarData } from "./blocks-sidebar";

interface SearchItem {
    name: string;
    href: string;
    category: string;
}

interface SearchModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const searchItems: SearchItem[] = [...sidebarData, ...blocksSidebarData].flatMap(
    (category) =>
        category.links.map((link) => ({
            name: link.name,
            href: link.href,
            category: category.title,
        }))
);

export function SearchModal({ isOpen, onOpenChange }: SearchModalProps) {
    const [mounted, setMounted] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const filtered = query
        ? searchItems.filter(
            (item) =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
        )
        : searchItems;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onOpenChange(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onOpenChange]);

    useEffect(() => {
        let focusTimeout: ReturnType<typeof setTimeout> | null = null;

        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setQuery("");
            setSelectedIndex(0);
            focusTimeout = setTimeout(() => inputRef.current?.focus(), 0);
        }

        return () => {
            if (focusTimeout) {
                clearTimeout(focusTimeout);
            }
        };
    }, [isOpen]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedIndex(0);
    }, [query]);

    const navigate = useCallback(
        (href: string) => {
            router.push(href);
            onOpenChange(false);
        },
        [onOpenChange, router]
    );

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && filtered[selectedIndex]) {
            navigate(filtered[selectedIndex].href);
        }
    };

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
        >
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Search components"
                className="relative w-full max-w-lg mx-4 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 border-b border-white/[0.06]">
                    <Search size={16} className="text-white/30 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Search components..."
                        className="w-full py-4 bg-transparent text-white text-sm font-light placeholder:text-white/30 outline-none"
                    />
                    <kbd className="text-[10px] font-mono text-white/20 border border-white/10 rounded px-1.5 py-0.5 flex-shrink-0">
                        ESC
                    </kbd>
                </div>

                {/* Results */}
                <div
                    className="max-h-[300px] overflow-y-auto p-2"
                    data-lenis-prevent
                >
                    {filtered.length === 0 ? (
                        <div className="px-4 py-8 text-center text-white/30 text-sm">
                            No results found.
                        </div>
                    ) : (
                        filtered.map((item, i) => (
                            <button
                                key={item.href}
                                onClick={() => navigate(item.href)}
                                onMouseEnter={() => setSelectedIndex(i)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-colors",
                                    i === selectedIndex
                                        ? "bg-white/[0.06]"
                                        : "hover:bg-white/[0.03]"
                                )}
                            >
                                <div>
                                    <span className="text-sm font-medium text-white/80">
                                        {item.name}
                                    </span>
                                    <span className="ml-2 text-[10px] font-mono text-white/30 uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                </div>
                                {i === selectedIndex && (
                                    <ArrowRight size={12} className="text-white/30" />
                                )}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
