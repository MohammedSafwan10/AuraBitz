"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LucideGithub, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { SearchModal } from "./search-modal";

const navLinks = [
    { name: "Components", href: "/docs" },
    { name: "Blocks", href: "/blocks" },
    { name: "Documentation", href: "/docs/installation" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/60 backdrop-blur-2xl backdrop-saturate-150">
            <div className="flex h-11 items-center px-6 lg:px-8 w-full justify-between">
                {/* Left: Logo + Nav */}
                <div className="flex gap-8 items-center">
                    <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg overflow-hidden border border-white/15">
                            <Image src="/logo-512.png" alt="AuraBitz" width={28} height={28} className="object-cover" />
                        </div>
                        <span className="hidden sm:inline grad-text font-extrabold tracking-tighter text-base">AuraBitz</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive =
                                link.href === "/docs"
                                    ? pathname?.startsWith("/docs") && pathname !== "/docs/installation"
                                    : link.href === "/blocks"
                                        ? pathname?.startsWith("/blocks")
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
                    <MobileNav />
                    <button
                        onClick={() => document.dispatchEvent(new CustomEvent("open-search"))}
                        className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:gap-2 sm:px-3 sm:py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] sm:hover:bg-white/[0.03] hover:border-white/15 transition-all text-xs cursor-pointer text-white/40 hover:text-white sm:text-current sm:hover:text-current"
                        aria-label="Search components"
                    >
                        <Search className="w-4 h-4 sm:w-[13px] sm:h-[13px] sm:text-white/30 transition-colors" />
                        <span className="hidden sm:inline text-white/50 font-medium">Search</span>
                        <kbd className="hidden sm:inline ml-4 text-[10px] font-mono text-white/20 border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
                    </button>
                    <Link
                        href="https://github.com/MohammedSafwan10/AuraBitz"
                        target="_blank"
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/15 transition-all"
                    >
                        <LucideGithub size={15} />
                    </Link>
                </div>
            </div>
            <SearchModal />
        </header>
    );
}
