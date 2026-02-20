"use client";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { CodePreview } from "@/components/site/code-preview";

const sourceCode = `"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    spotlightSize?: number;
    withNoise?: boolean;
}

export function SpotlightCard({
    children, className,
    spotlightColor = "rgba(255, 255, 255, 0.03)",
    spotlightSize = 400,
    withNoise = true,
    ...props
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
    const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }, [mouseX, mouseY]);

    const borderBackground = useMotionTemplate\`radial-gradient(\${spotlightSize * 0.8}px circle at \${smoothX}px \${smoothY}px, rgba(255,255,255,0.4), transparent 50%)\`;
    const interiorBackground = useMotionTemplate\`radial-gradient(\${spotlightSize}px circle at \${smoothX}px \${smoothY}px, \${spotlightColor}, transparent 60%)\`;
    const noiseMask = useMotionTemplate\`radial-gradient(\${spotlightSize}px circle at \${smoothX}px \${smoothY}px, black, transparent 80%)\`;

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={cn(
                "relative overflow-hidden rounded-[2rem] bg-[#050505] border border-white/[0.04]",
                "hover:border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-colors duration-500", className
            )}
            {...props}
        >
            {withNoise && (
                <div 
                    className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0"
                    style={{ backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\` }}
                />
            )}

            <motion.div
                className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-500 rounded-[2rem]"
                style={{
                    opacity: opacity, background: borderBackground,
                    WebkitMaskImage: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                    WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px",
                }}
            />

            <motion.div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
                style={{ opacity: opacity, background: interiorBackground }}
            />

            {withNoise && (
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-color-dodge transition-opacity duration-500"
                    style={{
                        opacity: opacity * 0.8, WebkitMaskImage: noiseMask,
                        backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\`
                    }}
                />
            )}
            <div className="relative z-20 h-full w-full">{children}</div>
        </div>
    );
}`;

export default function SpotlightCardPage() {
  return (
    <div className="max-w-4xl space-y-16 pb-20">
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              Illumination
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-5 pb-2 grad-text">
            Spotlight Card
          </h1>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            A hyper-realistic illumination system. Features buttery-smooth spring physics tracking, a CSS masked 1px glowing edge trace, and an illuminated SVG noise grain overlay that reveals only where the light shines.
          </p>
        </div>
      </div>

      {/* Preview + Code */}
      <CodePreview code={sourceCode}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl z-10">
          <SpotlightCard className="h-64 p-8 flex flex-col justify-end group">
            <h3 className="text-lg font-bold text-white mb-2 transition-transform duration-300 group-hover:translate-x-1">Physical Grain</h3>
            <p className="text-white/40 text-[13px] font-light leading-relaxed">Hover over this card to watch the spotlight organically illuminate the SVG fractal noise texture.</p>
          </SpotlightCard>
          <SpotlightCard className="h-64 p-8 flex flex-col justify-end group" spotlightColor="rgba(56, 189, 248, 0.05)" spotlightSize={500}>
            <h3 className="text-lg font-bold text-white mb-2 transition-transform duration-300 group-hover:translate-x-1">Cyan Ambient</h3>
            <p className="text-white/40 text-[13px] font-light leading-relaxed">A larger 500px radius spotlight with a cool blue hue tint mixed into the grain overlay.</p>
          </SpotlightCard>
        </div>
      </CodePreview>

      {/* How It Works */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tighter pb-1 grad-text">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { step: "01", title: "Buttery Spring Physics", desc: "Raw mouse coordinates are passed through Framer Motion useSpring hooks to eliminate 60hz jitter and add weight." },
            { step: "02", title: "Motion Templates", desc: "useMotionTemplate generates CSS radial-gradients at 120fps directly on the GPU without triggering React re-renders." },
            { step: "03", title: "Edge CSS Masking", desc: "A maskComposite: exclude setup is used to paint the brilliant border tracking highlight exclusively on the 1px edge." },
            { step: "04", title: "Dynamic Grain Overlay", desc: "An SVG fractal noise layer uses mix-blend-color-dodge and another CSS radial mask so noise ONLY appears under the physical light beam." },
          ].map((item) => (
            <div key={item.step} className="group relative p-6 rounded-[2rem] border border-white/[0.05] bg-[#050505] overflow-hidden hover:border-white/[0.1] transition-colors duration-500">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono text-white/40 bg-white/[0.05] border border-white/[0.05] mb-4">
                STEP {item.step}
              </span>
              <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-[13px] text-white/50 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Props */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tighter pb-1 grad-text">Props</h2>
        <div className="border border-white/[0.05] rounded-[2rem] overflow-hidden bg-[#050505] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Prop</th>
                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Type</th>
                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Default</th>
                <th className="text-left px-6 py-4 text-white/40 font-medium text-[11px] uppercase tracking-widest">Description</th>
              </tr>
            </thead>
            <tbody className="text-white/60 font-light divide-y divide-white/[0.02]">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">children</span>
                </td>
                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">ReactNode</td>
                <td className="px-6 py-4 text-white/30">—</td>
                <td className="px-6 py-4">Content rendered inside the card</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">spotlightColor</span>
                </td>
                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">string</td>
                <td className="px-6 py-4 font-mono text-[11px] text-white/40">{`"rgba(255,255,255,0.03)"`}</td>
                <td className="px-6 py-4">Interior ambient glow tint</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">spotlightSize</span>
                </td>
                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">number</td>
                <td className="px-6 py-4 font-mono text-[11px] text-white/40">400</td>
                <td className="px-6 py-4">Radius in px of the spotlight</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/80">withNoise</span>
                </td>
                <td className="px-6 py-4 font-mono text-[11px] text-emerald-400/80">boolean</td>
                <td className="px-6 py-4 font-mono text-[11px] text-white/40">true</td>
                <td className="px-6 py-4">Enables dynamic fractal grain overlay</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tighter pb-1 grad-text">Installation</h2>
        <div className="group relative p-6 rounded-[2rem] border border-white/[0.05] bg-[#050505] overflow-hidden">
          <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">1. Install Dependencies</p>
          <pre className="flex items-center justify-between font-mono text-[13px] text-emerald-400/90 bg-[#111] p-3 rounded-xl border border-white/[0.05] shadow-inner mb-6">
            <code>npm install framer-motion</code>
          </pre>
          <p className="text-[11px] text-white/40 mb-3 font-mono uppercase tracking-[0.1em]">2. Copy Component</p>
          <p className="text-[13px] text-white/60 font-light leading-relaxed">Copy the source code directly into your <code className="text-white/80 bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md font-mono text-[11px] tracking-tight">ui</code> folder. It uses raw inline SVG fractal noise, requiring zero external assets.</p>
        </div>
      </div>
    </div>
  );
}
