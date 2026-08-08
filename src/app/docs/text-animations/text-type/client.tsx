"use client";

import { TextSpecimenPage } from "@/components/site/text-specimen-page";
import { TextType } from "@/components/ui/text-type";

export default function TextTypePageClient({ sourceCode }: { sourceCode: string }) {
  const ticks = [0, 6, 11, 19, 23, 31, 39, 42, 51, 63, 69, 76, 84, 88, 96];
  return (
    <TextSpecimenPage
      index="06"
      title="Text Type"
      description="A typographic performance with temporal echoes, an insertion metronome, and a visible cadence signature."
      code={sourceCode}
      metrics={[["Cadence", "72 WPM"], ["Trail", "Three temporal echoes"], ["Caret", "Motion metronome"]]}
    >
      <div className="flex h-full flex-col justify-center px-7 sm:px-12">
        <TextType
          text={"MAKE IT\nPHYSICAL."}
          echoes={3}
          typingSpeed={0.075}
          cursorChar="│"
          cursorClassName="text-[1.08em] font-light"
          className="text-[clamp(3.2rem,9vw,7rem)] font-bold leading-[0.88] tracking-[-0.07em] text-white"
        />
        <div className="relative mt-14 h-9 border-t border-white/10">
          <span className="absolute -top-6 left-0 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Cadence / 72 WPM</span>
          {ticks.map((left, index) => <span key={index} className="absolute top-0 h-3 w-px bg-white/55" style={{ left: `${left}%` }} />)}
        </div>
      </div>
    </TextSpecimenPage>
  );
}
