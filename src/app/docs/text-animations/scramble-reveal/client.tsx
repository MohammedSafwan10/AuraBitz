"use client";

import { TextSpecimenPage } from "@/components/site/text-specimen-page";
import { ScrambleReveal } from "@/components/ui/scramble-reveal";

export default function ScrambleRevealPageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <TextSpecimenPage
      index="02"
      title="Scramble Reveal"
      description="A cryptographic decode front converts unstable symbols into a precise final signal without render-loop overhead."
      code={sourceCode}
      metrics={[["Cadence", "30 FPS decode"], ["Direction", "Left to right"], ["Render", "Direct text mutation"]]}
    >
      <div className="absolute left-7 top-7 font-mono text-[9px] tracking-[0.24em] text-white/35">7F A2 19</div>
      <div aria-hidden="true" className="absolute left-6 top-1/2 hidden -translate-y-1/2 font-mono text-sm leading-6 tracking-[0.36em] text-white/20 sm:block">
        {"< /* : 5 = \\ ^ _ 9 : [ - + > 3"}<br />{"# ? : > @ [ _ ^ / * 8 ="}<br />{"{ 9 : < @ _ 7 ^ + ] 1 >"}
      </div>
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-right">
        <ScrambleReveal showDecodeFront duration={2.4} className="whitespace-nowrap font-mono text-[clamp(1.7rem,4vw,3.6rem)] font-semibold tracking-[0.08em] text-white">
          SIGNAL ACQUIRED
        </ScrambleReveal>
      </div>
      <div className="absolute bottom-7 right-7 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/75">Decode / 86%</div>
    </TextSpecimenPage>
  );
}
