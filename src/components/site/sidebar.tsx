"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const sidebarData = [
    {
        title: "Get Started",
        links: [
            { name: "Index", href: "/docs" },
            { name: "Installation", href: "/docs/installation" },
        ]
    },
    {
        title: "3D & Physical",
        links: [
            { name: "Holographic Card", href: "/docs/3d-physical/holographic-card" },
            { name: "Kinetic Button", href: "/docs/3d-physical/kinetic-button" },
        ]
    },
    {
        title: "Illumination",
        links: [
            { name: "Spotlight Card", href: "/docs/illumination/spotlight-card" },
        ]
    },
    {
        title: "Backgrounds",
        links: [
            { name: "Grid System", href: "/docs/backgrounds/grid-system" },
            { name: "Radial Noise", href: "/docs/backgrounds/radial-noise" },
        ]
    },
    {
        title: "Text Animations",
        links: [
            { name: "Kinetic Text", href: "/docs/text-animations/kinetic-text" },
            { name: "Scramble Reveal", href: "/docs/text-animations/scramble-reveal" },
            { name: "Split Text", href: "/docs/text-animations/split-text" },
            { name: "Blur Text", href: "/docs/text-animations/blur-text" },
            { name: "Circular Text", href: "/docs/text-animations/circular-text" },
            { name: "Text Type", href: "/docs/text-animations/text-type" },
            { name: "Shuffle", href: "/docs/text-animations/shuffle" },

            { name: "Text Pressure", href: "/docs/text-animations/text-pressure" },
            { name: "Curved Loop", href: "/docs/text-animations/curved-loop" },
        ]
    }
];

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
                                        {/* Active Indicator Line */}
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
