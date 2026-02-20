"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideGithub, Triangle, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Components", href: "/docs" },
    { name: "Documentation", href: "/docs/installation" },
    { name: "Pricing", href: "/pricing" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/60 backdrop-blur-2xl backdrop-saturate-150">
            <div className="flex h-11 items-center px-6 lg:px-8 w-full justify-between">
                {/* Left: Logo + Nav */}
                <div className="flex gap-8 items-center">
                    <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                        <div className="relative flex items-center justify-center p-1.5 bg-white/10 rounded-lg border border-white/15">
                            <Triangle className="w-3.5 h-3.5 fill-white text-white rotate-180" />
                        </div>
                        <span className="hidden sm:inline grad-text font-extrabold tracking-tighter text-base">AuraBitz</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive =
                                link.href === "/docs"
                                    ? pathname?.startsWith("/docs") && pathname !== "/docs/installation"
                                    : pathname === link.href || pathname?.startsWith(link.href + "/");

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative px-3 py-1.5 rounded-md text-[13px] font-semibold transition-all duration-200",
                                        isActive
                                            ? "grad-text hover:bg-white/[0.04]"
                                            : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                                    )}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-5 h-px bg-white/60" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Search + GitHub */}
                <div className="flex items-center gap-3">
                    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/15 transition-all text-xs">
                        <Search size={13} className="text-white/30" />
                        <span className="text-white/50 font-medium group-hover:text-white/80 transition-colors">Search</span>
                        <kbd className="ml-4 text-[10px] font-mono text-white/20 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
                    </button>
                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/15 transition-all"
                    >
                        <LucideGithub size={15} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
