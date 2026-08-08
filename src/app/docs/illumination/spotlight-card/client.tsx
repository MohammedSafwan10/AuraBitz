"use client";

import { CodePreview } from "@/components/site/code-preview";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function SpotlightCardPageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <div className="max-w-4xl space-y-14 pb-20">
      <header className="space-y-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">Illumination / 01</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white/90 md:text-5xl">Spotlight Card</h1>
        <p className="max-w-xl text-base leading-7 text-white/45">
          A directional light surface that reveals structure, texture, and edge detail under the visitor&apos;s pointer.
        </p>
      </header>

      <CodePreview code={sourceCode}>
        <SpotlightCard className="h-[420px] w-full p-8 sm:p-12" spotlightSize={520}>
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
              <span>Light / Aperture 01</span>
              <span className="text-emerald-200/70">Move to illuminate</span>
            </div>
            <div className="max-w-md">
              <h2 className="text-4xl font-medium tracking-[-0.05em] text-white/90 sm:text-6xl">Form,<br />revealed.</h2>
              <div className="mt-6 h-px w-16 bg-emerald-200/70" />
            </div>
          </div>
        </SpotlightCard>
      </CodePreview>

      <section className="grid gap-px border border-white/[0.06] bg-white/[0.06] sm:grid-cols-3">
        {[
          ["Pointer", "Spring-smoothed coordinates"],
          ["Surface", "Masked optical contours"],
          ["Fallback", "Focus + reduced motion"],
        ].map(([label, value]) => (
          <div key={label} className="bg-black p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">{label}</p>
            <p className="mt-2 text-sm text-white/65">{value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
