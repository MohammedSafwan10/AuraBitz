"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { LucideGithub, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

const SearchModal = dynamic(() => import("./search-modal").then((mod) => mod.SearchModal));

const navLinks = [
  { name: "Components", href: "/docs" },
  { name: "Blocks", href: "/blocks" },
  { name: "Documentation", href: "/docs/installation" },
];

type HeaderProps = {
  surface?: "default" | "home";
};

export function Header({ surface = "default" }: HeaderProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isHomeSurface = surface === "home";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-2xl backdrop-saturate-150",
        isHomeSurface
          ? "border-white/[0.05] bg-black/45"
          : "border-white/[0.06] bg-black/60"
      )}
    >
      <div className="flex h-14 w-full items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl border border-white/12">
              <Image src="/logo-512.png" alt="AuraBitz" width={32} height={32} className="object-cover" />
            </div>
            <span className="hidden text-base font-extrabold tracking-tighter text-white sm:inline">AuraBitz</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
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
                    "rounded-full px-3 py-2 text-[13px] font-semibold transition-all duration-200",
                    isActive
                      ? "bg-white/[0.06] text-white"
                      : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <MobileNav surface={surface} />
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition-all hover:border-white/15 hover:bg-white/[0.07] hover:text-white sm:h-auto sm:w-auto sm:gap-2 sm:px-3.5 sm:py-2"
            aria-label="Search components"
          >
            <Search className="h-4 w-4 sm:h-[13px] sm:w-[13px]" />
            <span className="hidden text-xs font-medium text-white/55 sm:inline">Search</span>
            <kbd className="ml-4 hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-mono text-white/20 sm:inline">⌘K</kbd>
          </button>
          <Link
            href="https://github.com/MohammedSafwan10/AuraBitz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/45 transition-all hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
          >
            <LucideGithub size={15} />
          </Link>
        </div>
      </div>
      {isSearchOpen && <SearchModal isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />}
    </header>
  );
}
