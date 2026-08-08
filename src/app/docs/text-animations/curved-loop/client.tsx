"use client";

import { TextSpecimenPage } from "@/components/site/text-specimen-page";
import { CurvedLoop } from "@/components/ui/curved-loop";

export default function CurvedLoopPageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <TextSpecimenPage
      index="09"
      title="Curved Loop"
      description="A continuous typographic ribbon travels through an asymmetric Bézier field, changing scale and apparent depth."
      code={sourceCode}
      metrics={[["Path", "Pointer-bent SVG Bézier"], ["Loop", "Seamless text offset"], ["Input", "Pointer + focus"]]}
    >
      <CurvedLoop
        height={440}
        speed={11}
        amplitude={105}
        frequency={360}
        perspective
        className="text-white"
      >
        MOTION NEVER ENDS — FORM RETURNS
      </CurvedLoop>
    </TextSpecimenPage>
  );
}
