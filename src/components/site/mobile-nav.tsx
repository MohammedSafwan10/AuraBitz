"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarData } from "./sidebar";

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            {isOpen && mounted && createPortal(
                <div
                    className="fixed inset-0 z-40 md:hidden"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <nav
                        className="absolute top-[45px] left-0 bottom-0 w-[85vw] max-w-sm bg-[#0a0a0a] border-r border-white/10 overflow-y-auto p-6"
                        data-lenis-prevent
                    >
                        <div className="flex flex-col gap-2 mb-8">
                            <Link
                                href="/docs"
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    pathname?.startsWith("/docs")
                                        ? "text-white bg-white/[0.05]"
                                        : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                                )}
                            >
                                Components
                            </Link>
                            <Link
                                href="/docs/installation"
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    pathname === "/docs/installation"
                                        ? "text-white bg-white/[0.05]"
                                        : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                                )}
                            >
                                Documentation
                            </Link>
                        </div>

                        <div className="flex flex-col gap-6">
                            {sidebarData.map((category) => (
                                <div key={category.title}>
                                    <h3 className="grad-text text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3">
                                        {category.title}
                                    </h3>
                                    <div className="flex flex-col gap-0.5">
                                        {category.links.map((link) => {
                                            const isActive = pathname === link.href;
                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={cn(
                                                        "px-3 py-2 rounded-md text-[13px] font-medium transition-all",
                                                        isActive
                                                            ? "grad-text font-semibold bg-white/[0.05]"
                                                            : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                                                    )}
                                                >
                                                    {link.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </nav>
                </div>,
                document.body
            )}
        </>
    );
}
