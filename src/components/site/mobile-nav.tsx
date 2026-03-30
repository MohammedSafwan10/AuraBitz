"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarData } from "./sidebar";
import { blocksSidebarData } from "./blocks-sidebar";

type MobileNavProps = {
  surface?: "default" | "home";
};

export function MobileNav({ surface = "default" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHomeSurface = surface === "home";
  const topOffset = "top-[56px]";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    if (!panel) return;

    const focusableElements = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    const firstFocusableElement = focusableElements[0] ?? panel;
    const lastFocusableElement = focusableElements[focusableElements.length - 1] ?? panel;

    firstFocusableElement.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      if (focusableElements.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstFocusableElement || activeElement === panel) {
          event.preventDefault();
          lastFocusableElement.focus();
        }

        return;
      }

      if (activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border transition-all md:hidden",
          isHomeSurface
            ? "border-white/[0.12] bg-white/[0.06] text-white/70 hover:border-white/20 hover:bg-white/[0.1] hover:text-white"
            : "border-white/[0.08] bg-white/[0.03] text-white/45 hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
        )}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {isOpen && mounted &&
        createPortal(
          <div className="fixed inset-0 z-40 md:hidden" onWheel={(event) => event.stopPropagation()} onTouchMove={(event) => event.stopPropagation()}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <nav
              ref={panelRef}
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              tabIndex={-1}
              className={cn(
                "absolute bottom-0 left-0 w-[88vw] max-w-sm overflow-y-auto border-r p-6 outline-none",
                isHomeSurface
                  ? "border-white/[0.08] bg-[#080808]/95 backdrop-blur-xl"
                  : "border-white/10 bg-[#050505]",
                topOffset
              )}
              data-lenis-prevent
            >
              <div className="mb-8 flex flex-col gap-2">
                <Link
                  href="/blocks"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname?.startsWith("/blocks")
                      ? "bg-white/[0.05] text-white"
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  Blocks
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname?.startsWith("/docs")
                      ? "bg-white/[0.05] text-white"
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  Components
                </Link>
                <Link
                  href="/docs/installation"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname === "/docs/installation"
                      ? "bg-white/[0.05] text-white"
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  Documentation
                </Link>
              </div>

              <div className="flex flex-col gap-6">
                {(pathname?.startsWith("/blocks") ? blocksSidebarData : sidebarData).map((category) => (
                  <div key={category.title}>
                    <h3 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/30">
                      {category.title}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {category.links.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                              isActive
                                ? "bg-white/[0.05] text-white"
                                : "text-white/60 hover:bg-white/[0.03] hover:text-white"
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
