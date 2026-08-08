"use client";

import { TextSpecimenPage } from "@/components/site/text-specimen-page";
import { BlurText } from "@/components/ui/blur-text";

export default function BlurTextPageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <TextSpecimenPage
      index="04"
      title="Blur Text"
      description="Typography resolves through multiple optical depth planes instead of merely fading from blur to sharpness."
      code={sourceCode}
      metrics={[["Depth", "Six focal layers"], ["Filter", "16–40px blur"], ["Reveal", "Optical convergence"]]}
    >
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <BlurText depthLayers={4} trackPointer="viewport" splitBy="words" stagger={0.12} className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-[-0.06em] text-white">
          INTO FOCUS
        </BlurText>
      </div>
      <div className="absolute left-7 top-7 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Move / Shift focus</div>
      <div className="absolute right-7 top-1/2 flex -translate-y-1/2 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300/75">
        <span className="h-4 w-4 border-l border-t border-cyan-300" />Focal plane / 04
      </div>
    </TextSpecimenPage>
  );
}
