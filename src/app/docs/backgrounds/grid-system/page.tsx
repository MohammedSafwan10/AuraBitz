import { GridSystem } from "@/components/ui/grid-system";
import { CodePreview } from "@/components/site/code-preview";
import { getComponentSource } from "@/lib/source";

const sourceCode = getComponentSource("grid-system");

export default function GridSystemPage() {
  return (
    <div className="max-w-4xl space-y-14 pb-20">
      <header className="space-y-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">Backgrounds / 02</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white/90 md:text-5xl">Grid System</h1>
        <p className="max-w-xl text-base leading-7 text-white/45">
          A precise orthogonal field that bends around the visitor&apos;s real pointer, then settles with spring weight.
        </p>
      </header>

      <CodePreview code={sourceCode}>
        <div className="relative h-[440px] w-full overflow-hidden border border-white/[0.08] bg-black">
          <GridSystem type="line" size={58} influence={180} interactiveColor="rgba(91,255,226,.9)" />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
            <span>Grid / Elastic 12×08</span>
            <span>Snap 16 / Force 0.42</span>
          </div>
        </div>
      </CodePreview>

      <section className="grid gap-px border border-white/[0.06] bg-white/[0.06] sm:grid-cols-3">
        {[
          ["Modes", "Line, dot, cross"],
          ["Physics", "Localized elastic displacement"],
          ["Cost", "One DPR-capped canvas"],
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
