"use client";

import { usePathname } from "next/navigation";
import { BlocksSidebar } from "@/components/site/blocks-sidebar";
import { cn } from "@/lib/utils";

export function BlocksWorkspace({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHeroPreview = /^\/blocks\/hero-sections\/\d+\/?$/.test(pathname);

  return (
    <div className="flex w-full flex-1 items-start">
      <BlocksSidebar />
      <main
        className={cn(
          "min-w-0 flex-1",
          isHeroPreview ? "p-0" : "p-4 md:p-12 lg:px-16",
        )}
      >
        {children}
      </main>
    </div>
  );
}
