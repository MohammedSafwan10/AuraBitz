"use client";

import { TextSpecimenPage } from "@/components/site/text-specimen-page";
import { TextPressure } from "@/components/ui/text-pressure";

export default function TextPressurePageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <TextSpecimenPage
      index="08"
      title="Text Pressure"
      description="A material stress study where nearby letterforms compress, gain weight, and pull toward the visitor's pressure point."
      code={sourceCode}
      metrics={[["Load", "Pointer-distance field"], ["Type", "Weight + width deformation"], ["Cost", "One scheduled frame"]]}
    >
      <div className="absolute bottom-10 left-5 top-10 w-7 border-l border-cyan-300/70">
        {Array.from({ length: 18 }, (_, index) => <span key={index} className="absolute left-0 h-px bg-cyan-300/65" style={{ top: `${index * 5.8}%`, width: index > 11 ? 15 : 8 }} />)}
        <span className="absolute -bottom-5 left-0 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-300">Load / 18.6 N</span>
      </div>
      <div className="flex h-full items-center justify-center overflow-hidden px-3">
        <TextPressure
          radius={250}
          baseWeight={850}
          maxWeight={950}
          compression={0.42}
          maxScale={1.22}
          showForcePoint
          showStressLines
          className="text-[clamp(4.2rem,12vw,10.5rem)] font-black tracking-[-0.09em] text-white"
        >
          PRESSURE
        </TextPressure>
      </div>
    </TextSpecimenPage>
  );
}
