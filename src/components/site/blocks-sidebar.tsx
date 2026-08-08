"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { blocksNavigation } from "@/config/catalog";

export const blocksSidebarData = blocksNavigation;
const blockCount = blocksNavigation.slice(1).reduce((total, category) => total + category.links.length, 0);

export function BlocksSidebar() {
    const pathname = usePathname();
    const scrollRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || typeof window === "undefined") return;

        const saved = sessionStorage.getItem("blocks-sidebar-scroll-pos");
        if (saved) {
            el.scrollTop = parseInt(saved, 10);
        }

        const handleScroll = () => {
            sessionStorage.setItem("blocks-sidebar-scroll-pos", el.scrollTop.toString());
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <aside ref={scrollRef} data-lenis-prevent className="sticky top-[45px] hidden h-[calc(100vh-45px)] w-60 flex-shrink-0 overflow-y-auto border-r border-white/[0.08] bg-black pb-20 pt-7 md:block">
            <div className="mb-9 flex items-center justify-between border-b border-white/[0.08] px-5 pb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                <span>Block library</span>
                <span>{String(blockCount).padStart(2, "0")}</span>
            </div>
            <div className="flex flex-col gap-8 px-5">
                {blocksSidebarData.map((category) => (
                    <div key={category.title}>
                        <h3 className="mb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">
                            {category.title}
                        </h3>
                        <nav className="-ml-2 flex flex-col">
                            {category.links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "relative flex items-center gap-3 border-l px-3 py-2 text-[12px] transition-colors duration-200",
                                            isActive
                                                ? "border-cyan-300 text-white/90"
                                                : "border-transparent text-white/42 hover:border-white/20 hover:text-white/75"
                                        )}
                                    >
                                        {link.name}
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
