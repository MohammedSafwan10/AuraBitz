"use client";

import { TextSpecimenPage } from "@/components/site/text-specimen-page";
import { CircularText } from "@/components/ui/circular-text";

export default function CircularTextPageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <TextSpecimenPage
      index="05"
      title="Circular Text"
      description="A multi-orbit typographic instrument with alternating directions, optical depth, and a precise phase notch."
      code={sourceCode}
      metrics={[["Geometry", "SVG text paths"], ["Orbits", "Three independent rings"], ["Control", "Hover velocity"]]}
    >
      <div className="absolute inset-y-0 left-[2%] flex w-[72%] items-center justify-center text-white">
        <CircularText
          text="AURABITZ — MOTION FOLLOWS FORM"
          radius={185}
          rings={3}
          spinDuration={18}
          className="scale-[0.72] sm:scale-100"
        />
      </div>
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 text-center font-mono text-[9px] uppercase tracking-[0.26em] text-white/55">
        <span>Orbit</span><span className="mx-auto my-3 block h-24 w-px bg-white/45"><span className="mt-12 block h-1 w-1 -translate-x-[1.5px] bg-cyan-300" /></span><span>128°</span>
      </div>
    </TextSpecimenPage>
  );
}
