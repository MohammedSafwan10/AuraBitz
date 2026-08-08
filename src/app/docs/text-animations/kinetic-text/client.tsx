"use client";

import { TextSpecimenPage } from "@/components/site/text-specimen-page";
import { KineticText } from "@/components/ui/kinetic-text";

export default function KineticTextPageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <TextSpecimenPage
      index="01"
      title="Kinetic Text"
      description="Independent letter bodies with distinct mass, spring tension, and a force origin controlled by the visitor."
      code={sourceCode}
      metrics={[["Model", "Per-glyph spring mass"], ["Input", "Pointer + focus"], ["Motion", "Force-weighted inertia"]]}
    >
      <div className="absolute inset-x-0 top-6 flex justify-between px-7 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
        <span>Mass study / 01</span><span className="text-cyan-300/70">Force / 0.74</span>
      </div>
      <div className="flex h-full items-center justify-center px-5 sm:px-10">
        <KineticText showField force={30} once className="text-[clamp(3.6rem,10vw,7.4rem)] font-black tracking-[-0.09em] text-white">
          KINETIC
        </KineticText>
      </div>
    </TextSpecimenPage>
  );
}
