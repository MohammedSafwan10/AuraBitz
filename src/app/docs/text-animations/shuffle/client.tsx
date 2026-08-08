"use client";

import { TextSpecimenPage } from "@/components/site/text-specimen-page";
import { ShuffleText } from "@/components/ui/shuffle";

export default function ShufflePageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <TextSpecimenPage
      index="07"
      title="Shuffle"
      description="A controlled permutation machine where letter columns settle into one registered word before advancing."
      code={sourceCode}
      metrics={[["Sequence", "Five editorial states"], ["Transition", "Column springs"], ["Register", "Single cyan baseline"]]}
    >
      <div className="absolute left-7 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.5em] text-white/45">Sequence <span className="text-cyan-300">/</span> 03</div>
      <div className="absolute inset-y-10 left-[42%] right-5 flex items-center overflow-hidden">
        <ShuffleText
          texts={["ORDER", "MOTION", "SYSTEM", "CHAOS", "FORM"]}
          interval={2200}
          shuffleDuration={0.72}
          showQueue
          className="w-full text-[clamp(3.2rem,7vw,6.5rem)] font-light tracking-[0.08em] text-white"
        />
      </div>
      <div className="pointer-events-none absolute left-[34%] right-0 top-1/2 h-px bg-cyan-300/90" />
    </TextSpecimenPage>
  );
}
