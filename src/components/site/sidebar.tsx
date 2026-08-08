"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { docsNavigation } from "@/config/catalog";

export const sidebarData = docsNavigation;

export function Sidebar() {
    const pathname = usePathname();
    const scrollRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || typeof window === "undefined") return;

        const saved = sessionStorage.getItem("sidebar-scroll-pos");
        if (saved) {
            el.scrollTop = parseInt(saved, 10);
        }

        const handleScroll = () => {
            sessionStorage.setItem("sidebar-scroll-pos", el.scrollTop.toString());
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <aside ref={scrollRef} data-lenis-prevent className="w-64 flex-shrink-0 hidden md:block border-r border-white/10 bg-black sticky top-[45px] h-[calc(100vh-45px)] overflow-y-auto pt-8 pb-20">
            <div className="px-6 flex flex-col gap-8">
                {sidebarData.map((category) => (
                    <div key={category.title}>
                        {/* Category title */}
                        <h3 className="grad-text text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3">
                            {category.title}
                        </h3>
                        <nav className={cn(
                            "flex flex-col -ml-3",
                            category.title === "Get Started" ? "gap-0 border-y border-white/[0.07]" : "gap-0.5"
                        )}>
                            {category.links.map((link, linkIndex) => {
                                const isActive = pathname === link.href;
                                const isStartLink = category.title === "Get Started";
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "relative transition-all duration-200 flex items-center",
                                            isStartLink
                                                ? "min-h-11 gap-3 border-b border-white/[0.05] px-3 py-2.5 last:border-b-0"
                                                : "gap-3 rounded-md px-3 py-2 text-[13px] font-medium",
                                            isActive
                                                ? isStartLink
                                                    ? "bg-white/[0.025] text-white"
                                                    : "grad-text bg-white/[0.05] font-semibold"
                                                : "text-white/55 hover:bg-white/[0.025] hover:text-white"
                                        )}
                                    >
                                        {/* Active Indicator Line */}
                                        {isActive && !isStartLink && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r-full bg-gradient-to-b from-white to-white/30" />
                                        )}
                                        {isStartLink && (
                                            <span className={cn(
                                                "font-mono text-[9px] tracking-[0.18em]",
                                                isActive ? "text-cyan-300" : "text-white/20"
                                            )}>
                                                {String(linkIndex).padStart(2, "0")}
                                            </span>
                                        )}
                                        <span className={cn(isStartLink && "text-[12px] font-medium tracking-[-0.01em]")}>{link.name}</span>
                                        {isStartLink && (
                                            <span className={cn(
                                                "ml-auto h-1 w-1 rounded-full transition-all",
                                                isActive ? "bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,.7)]" : "bg-white/10"
                                            )} />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                ))}
            </div>
        </aside>
    );
}
