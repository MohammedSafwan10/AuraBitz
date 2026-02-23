"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const blocksSidebarData = [
    {
        title: "Overview",
        links: [
            { name: "Blocks Index", href: "/blocks" },
        ]
    },
    {
        title: "Hero Sections",
        links: [
            { name: "01 WebGL Aura", href: "/blocks/hero-sections/01" },
            { name: "02 Glass Singularity", href: "/blocks/hero-sections/02" },
            { name: "03 Quantum Matrix", href: "/blocks/hero-sections/03" },
            { name: "04 Liquid Flow", href: "/blocks/hero-sections/04" },
            { name: "05 Quantum Vortex", href: "/blocks/hero-sections/05" },
        ]
    },
    {
        title: "Bento Grids",
        links: [
            { name: "01 Holographic Glass", href: "/blocks/bento-grids/01" },
            { name: "02 Fintech Holograph", href: "/blocks/bento-grids/02" },
            { name: "03 Typographic Brutalism", href: "/blocks/bento-grids/03" },
            { name: "04 Cyber Security", href: "/blocks/bento-grids/04" },
            { name: "05 Spatial Canvas", href: "/blocks/bento-grids/05" },
        ]
    },
    {
        title: "Feature Showcases",
        links: [
            { name: "Feature 01", href: "/blocks/feature-showcases/01" },
        ]
    },
    {
        title: "Pricing Tables",
        links: [
            { name: "Pricing 01", href: "/blocks/pricing-tables/01" },
        ]
    },
    {
        title: "Testimonials",
        links: [
            { name: "Testimonial 01", href: "/blocks/testimonials/01" },
        ]
    },
    {
        title: "Footers",
        links: [
            { name: "Footer 01", href: "/blocks/footers/01" },
        ]
    }
];

export function BlocksSidebar() {
    const pathname = usePathname();
    const scrollRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

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
        <aside ref={scrollRef} data-lenis-prevent className="w-64 flex-shrink-0 hidden md:block border-r border-white/10 bg-black sticky top-[45px] h-[calc(100vh-45px)] overflow-y-auto pt-8 pb-20">
            <div className="px-6 flex flex-col gap-8">
                {blocksSidebarData.map((category) => (
                    <div key={category.title}>
                        <h3 className="grad-text text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3">
                            {category.title}
                        </h3>
                        <nav className="flex flex-col gap-0.5 -ml-3">
                            {category.links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "relative px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-200 flex items-center gap-3",
                                            isActive
                                                ? "grad-text font-semibold bg-white/[0.05]"
                                                : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                                        )}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r-full bg-gradient-to-b from-white to-white/30" />
                                        )}
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
