import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blocksIndexCatalog } from "@/config/catalog";

export const metadata: Metadata = {
    title: "Blocks - AuraBitz",
    description: "Production-ready landing page systems shaped by motion, light, and interaction.",
};

const categories = blocksIndexCatalog;
const blockCount = categories.reduce((total, category) => total + category.items.length, 0);

export default function BlocksIndex() {
    return (
        <div className="mx-auto w-full max-w-7xl pb-24">
            <header className="relative overflow-hidden border-b border-white/10 pb-14 pt-4 md:pb-20 md:pt-8">
                <div className="pointer-events-none absolute -right-24 -top-32 size-[420px] rounded-full bg-cyan-300/[0.035] blur-[110px]" />

                <div className="relative flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-white/35 md:text-[10px]">
                    <span>AuraBitz / Blocks</span>
                    <span>{String(blockCount).padStart(2, "0")} compositions</span>
                </div>

                <div className="relative mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
                    <h1 className="max-w-4xl text-[clamp(3.5rem,8vw,8.5rem)] font-medium leading-[0.82] tracking-[-0.075em] text-white/95">
                        Systems,
                        <br />
                        not sections.
                    </h1>
                    <div className="max-w-sm border-l border-white/15 pl-5 lg:mb-2">
                        <p className="text-sm leading-6 text-white/45">
                            Production-ready compositions shaped by motion, light, and physical interaction.
                        </p>
                        <div className="mt-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                            <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(103,232,249,0.8)]" />
                            Preview live / copy source
                        </div>
                    </div>
                </div>
            </header>

            <div>
                {categories.map((category, categoryIndex) => (
                    <section
                        key={category.title}
                        className="grid border-b border-white/10 py-10 md:py-14 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12"
                    >
                        <div className="mb-8 lg:mb-0">
                            <span className="font-mono text-[9px] tracking-[0.22em] text-cyan-300/65">
                                {String(categoryIndex + 1).padStart(2, "0")}
                            </span>
                            <h2 className="mt-4 text-2xl font-medium tracking-[-0.035em] text-white/90 md:text-3xl">
                                {category.title}
                            </h2>
                            <p className="mt-4 max-w-60 text-xs leading-5 text-white/35">
                                {category.description}
                            </p>
                        </div>

                        <div className="grid border-t border-white/10 sm:grid-cols-2">
                            {category.items.map((item, itemIndex) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group relative flex min-h-24 items-center justify-between gap-5 border-b border-white/10 px-4 transition-colors duration-300 hover:bg-white/[0.025] sm:odd:border-r sm:px-5"
                                >
                                    <div className="flex min-w-0 items-center gap-4">
                                        <span className="font-mono text-[9px] text-white/20 transition-colors duration-300 group-hover:text-cyan-300/70">
                                            {String(itemIndex + 1).padStart(2, "0")}
                                        </span>
                                        <span className="truncate text-sm text-white/55 transition-colors duration-300 group-hover:text-white/90">
                                            {item.name.replace(/^\d+\s*/, "")}
                                        </span>
                                    </div>
                                    <ArrowUpRight className="size-3.5 shrink-0 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-300/70 transition-transform duration-500 group-hover:scale-x-100" />
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <footer className="flex flex-col gap-3 pt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
                <span>{blockCount} live compositions</span>
                <span>React / WebGL / Motion</span>
            </footer>
        </div>
    );
}
