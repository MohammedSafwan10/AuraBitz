import { HolographicCard } from "@/components/ui/holographic-card";
import { CodePreview } from "@/components/site/code-preview";
import { getComponentSource } from "@/lib/source";

const sourceCode = getComponentSource("holographic-card");

const props = [
  ["children", "ReactNode", "—", "Card content"],
  ["intensity", "number", "1", "Tilt strength"],
  ["glowColor", "string", '"37, 245, 208"', "RGB light color"],
  ["className", "string", "—", "Surface and layout classes"],
];

export default function HolographicCardPage() {
  return (
    <div className="max-w-5xl pb-24">
      <header className="border-b border-white/[0.08] pb-9">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">3D / Physical</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-white/95 md:text-6xl">Holographic Card</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/45 md:text-lg">
          A cursor-lit surface with spring depth and spectral reflection.
        </p>
      </header>

      <CodePreview code={sourceCode}>
        <HolographicCard intensity={1.15} className="h-[430px] w-full max-w-[340px] p-7">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/38">
              <span>Material / 01</span>
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#25f5d0] shadow-[0_0_10px_#25f5d0]" />Live</span>
            </div>

            <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/20" />
              <div className="absolute inset-7 rounded-full border border-white/30" />
              <div className="absolute inset-[3.4rem] rounded-full border border-white/10" />
              <span className="relative text-4xl font-light tracking-[-0.16em] text-white/65">A<span className="ml-[-0.04em]">B</span></span>
            </div>

            <div className="flex items-end justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.08em] text-white/72">
              <span>Optical matter</span>
              <span>X 0.42&nbsp; Y −0.18</span>
            </div>
          </div>
        </HolographicCard>
      </CodePreview>

      <section className="mt-16">
        <h2 className="text-xl font-medium tracking-[-0.025em] text-white/90">API</h2>
        <div className="mt-5 overflow-x-auto border-y border-white/[0.08]">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/28">
              <tr className="border-b border-white/[0.08]">
                <th className="px-4 py-3 font-normal">Prop</th><th className="px-4 py-3 font-normal">Type</th><th className="px-4 py-3 font-normal">Default</th><th className="px-4 py-3 font-normal">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {props.map(([name, type, defaultValue, purpose]) => (
                <tr key={name} className="border-b border-white/[0.05] last:border-0">
                  <td className="px-4 py-4 font-mono text-xs text-white/85">{name}</td>
                  <td className="px-4 py-4 font-mono text-xs text-[#25f5d0]/70">{type}</td>
                  <td className="px-4 py-4 font-mono text-xs text-white/35">{defaultValue}</td>
                  <td className="px-4 py-4 text-white/45">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 border-t border-white/[0.08] pt-7">
        <h2 className="text-xl font-medium tracking-[-0.025em] text-white/90">Install</h2>
        <code className="mt-4 block border-l border-[#25f5d0]/70 py-2 pl-4 font-mono text-sm text-white/55">npm install framer-motion</code>
      </section>
    </div>
  );
}
