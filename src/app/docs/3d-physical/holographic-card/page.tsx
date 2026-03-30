import { HolographicCard } from "@/components/ui/holographic-card";
import { CodePreview } from "@/components/site/code-preview";
import { getComponentSource } from "@/lib/source";

const sourceCode = getComponentSource("holographic-card");

export default function HolographicCardPage() {
  return (
    <div className="max-w-4xl space-y-16 pb-20">
      {/* Header */}
      <div className="relative">
        {/* Subtle background glow for the header area */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              3D & Physical
            </div>
          </div>
          <h1 className="grad-text text-4xl md:text-5xl font-extrabold tracking-tighter mb-5">
            Holographic Card
          </h1>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            A physically accurate 3D tiltable container with specular light tracking. The card tilts toward the cursor while a tight elliptical highlight follows the pointer position in real-time.
          </p>
        </div>
      </div>

      {/* Preview + Code */}
      <CodePreview code={sourceCode}>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <HolographicCard className="w-64 h-80 p-6 flex flex-col justify-between">
            <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Component</span>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Hover me</h3>
              <p className="text-white/40 text-xs leading-relaxed">Move your cursor across the surface to see the specular highlight track your position.</p>
            </div>
          </HolographicCard>
          <HolographicCard className="w-48 h-48 flex items-center justify-center">
            <span className="text-white/50 text-sm font-medium">Compact</span>
          </HolographicCard>
        </div>
      </CodePreview>

      {/* How It Works */}
      <div className="space-y-6">
        <h2 className="grad-text text-2xl font-extrabold tracking-tighter">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "01", title: "Cursor Mapping", desc: "Mouse position is normalized to -0.5→0.5 range relative to card bounds." },
            { step: "02", title: "Spring Physics", desc: "Values pass through useSpring for organic, damped motion with zero jitter." },
            { step: "03", title: "Specular Light", desc: "A radial-gradient ellipse repositions in real-time to simulate a physical light source." },
          ].map((item) => (
            <div key={item.step} className="group relative p-6 rounded-2xl border border-white/[0.05] bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-x-0 -top-10 h-20 bg-white/[0.05] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono text-white/40 bg-white/[0.05] border border-white/[0.05] mb-4">
                STEP {item.step}
              </span>
              <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Props */}
      <div className="space-y-6">
        <h2 className="grad-text text-2xl font-extrabold tracking-tighter">Props</h2>
        <div className="border border-white/[0.05] rounded-2xl overflow-hidden bg-black/40 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                <th className="text-left px-6 py-4 text-white/40 font-medium text-xs uppercase tracking-widest">Prop</th>
                <th className="text-left px-6 py-4 text-white/40 font-medium text-xs uppercase tracking-widest">Type</th>
                <th className="text-left px-6 py-4 text-white/40 font-medium text-xs uppercase tracking-widest">Default</th>
                <th className="text-left px-6 py-4 text-white/40 font-medium text-xs uppercase tracking-widest">Description</th>
              </tr>
            </thead>
            <tbody className="text-white/60 font-light divide-y divide-white/[0.02]">
              <tr className="hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">children</span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-emerald-400/80">ReactNode</td>
                <td className="px-6 py-4 text-white/30">—</td>
                <td className="px-6 py-4 text-sm">Content rendered inside the card</td>
              </tr>
              <tr className="hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">className</span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-emerald-400/80">string</td>
                <td className="px-6 py-4 text-white/30">—</td>
                <td className="px-6 py-4 text-sm">Additional Tailwind classes for sizing, padding, etc.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-6">
        <h2 className="grad-text text-2xl font-extrabold tracking-tighter">Installation</h2>
        <div className="space-y-4">
          <div className="group relative p-5 rounded-2xl border border-white/[0.05] bg-[#0a0a0a] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="text-xs text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">1. Install Dependencies</p>
            <pre className="flex items-center justify-between font-mono text-[13px] text-emerald-400/90 bg-black/50 p-3 rounded-xl border border-white/[0.05]">
              <code>npm install framer-motion</code>
            </pre>
          </div>
          <div className="group relative p-5 rounded-2xl border border-white/[0.05] bg-[#0a0a0a] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="text-xs text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">2. Copy Component</p>
            <p className="text-sm text-white/60 font-light">Copy the source from the Code tab above into <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">components/ui/holographic-card.tsx</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
