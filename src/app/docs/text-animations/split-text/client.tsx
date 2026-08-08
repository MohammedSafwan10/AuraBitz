"use client";

import { TextSpecimenPage } from "@/components/site/text-specimen-page";
import { SplitText } from "@/components/ui/split-text";

export default function SplitTextPageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <TextSpecimenPage
      index="03"
      title="Split Text"
      description="Monumental type separated into precision strata with alternating spring offsets and exposed cyan cut edges."
      code={sourceCode}
      metrics={[["Slices", "Six optical strata"], ["Response", "Pointer displacement"], ["Edge", "Cyan cut trace"]]}
    >
      <div className="flex h-full flex-col items-center justify-center px-6 text-center text-[clamp(5.5rem,16vw,11rem)] font-black leading-[0.68] tracking-[-0.08em] text-white">
        <SplitText mode="slices" slices={5} sliceOffset={9} trackPointer="viewport">SPLIT</SplitText>
        <SplitText mode="slices" slices={5} sliceOffset={9} trackPointer="viewport">FORM</SplitText>
      </div>
      <div className="absolute inset-x-7 bottom-6 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.34em] text-cyan-300/75">
        <span className="h-px flex-1 bg-white/10" /><span>Move / Separate</span><span className="h-px flex-1 bg-white/10" />
      </div>
    </TextSpecimenPage>
  );
}
