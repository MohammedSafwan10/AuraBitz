import { CodePreview } from "@/components/site/code-preview";
import { RadialNoise } from "@/components/ui/radial-noise";
import { getComponentSource } from "@/lib/source";

const sourceCode = getComponentSource("radial-noise");

export default function RadialNoisePage() {
  return (
    <div className="max-w-4xl space-y-14 pb-20">
      <header className="space-y-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">Backgrounds / 03</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white/90 md:text-5xl">Radial Noise</h1>
        <p className="max-w-xl text-base leading-7 text-white/45">
          A monochrome interference field. Pointer speed bends nearby wavefronts and leaves a restrained cyan wake.
        </p>
      </header>

      <CodePreview code={sourceCode}>
        <div className="relative h-[440px] w-full overflow-hidden border border-white/[0.08] bg-black">
          <RadialNoise frequency={0.72} noiseOpacity={0.68} spotlightSize={230} />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
            <span>Radial / Field 03</span>
            <span>Density 0.68 / Phase 214°</span>
          </div>
        </div>
      </CodePreview>

      <section className="grid gap-px border border-white/[0.06] bg-white/[0.06] sm:grid-cols-3">
        {[
          ["Field", "Deterministic wave geometry"],
          ["Response", "Velocity-driven distortion"],
          ["Cost", "Draws only when changing"],
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
