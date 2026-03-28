import Link from "next/link";
import { ArrowUpRight, Triangle } from "lucide-react";

export function HomeFooter() {
  return (
    <footer className="border-t border-white/6 px-6 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-[10px] font-mono uppercase tracking-[0.28em] text-white/60 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Triangle className="h-2 w-2 rotate-180 fill-white/60 text-white/60" />
          <span>AuraBitz</span>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <Link href="/docs" className="inline-flex items-center gap-2 hover:text-white/65">
            <span>Open docs</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <p>© 2026 Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
}
