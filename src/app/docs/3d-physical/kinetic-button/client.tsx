"use client";

import { KineticButton } from "@/components/ui/kinetic-button";
import { CodePreview } from "@/components/site/code-preview";

const props = [
  ["children", "ReactNode", "—", "Button content"],
  ["magneticPull", "number", "0.24", "Pointer attraction"],
  ["showTension", "boolean", "false", "Force visualization"],
  ["variant", '"primary" | "secondary" | "ghost" | "danger"', '"primary"', "Visual treatment"],
  ["className", "string", "—", "Size and styling"],
];

export default function KineticButtonPageClient({ sourceCode }: { sourceCode: string }) {
  return (
    <div className="max-w-5xl pb-24">
      <header className="border-b border-white/[0.08] pb-9">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">3D / Physical</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-white/95 md:text-6xl">Kinetic Button</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/45 md:text-lg">
          A magnetic control with deliberate pull and spring recoil.
        </p>
      </header>

      <CodePreview code={sourceCode}>
        <div className="flex min-h-64 items-center justify-center py-8">
          <KineticButton showTension magneticPull={0.18} className="h-20 min-w-[280px] px-14 text-xl tracking-[0.34em] sm:min-w-[340px]">
            ENTER
          </KineticButton>
        </div>
      </CodePreview>

      <section className="mt-16">
        <h2 className="text-xl font-medium tracking-[-0.025em] text-white/90">API</h2>
        <div className="mt-5 overflow-x-auto border-y border-white/[0.08]">
          <table className="w-full min-w-[700px] text-left text-sm">
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
        <p className="mt-4 text-xs text-white/30">Includes native button attributes and events.</p>
      </section>

      <section className="mt-14 border-t border-white/[0.08] pt-7">
        <h2 className="text-xl font-medium tracking-[-0.025em] text-white/90">Install</h2>
        <code className="mt-4 block border-l border-[#25f5d0]/70 py-2 pl-4 font-mono text-sm text-white/55">npm install framer-motion</code>
      </section>
    </div>
  );
}
