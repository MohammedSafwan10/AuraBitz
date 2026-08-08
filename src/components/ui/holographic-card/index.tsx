"use client";

import { useCallback, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

export function HolographicCard({
  children,
  className,
  intensity = 1,
  glowColor = "37, 245, 208",
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const hover = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 150, damping: 22, mass: 0.65 });
  const smoothY = useSpring(pointerY, { stiffness: 150, damping: 22, mass: 0.65 });
  const hoverSpring = useSpring(hover, { stiffness: 180, damping: 24, mass: 0.55 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10 * intensity, -10 * intensity]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12 * intensity, 12 * intensity]);
  const lightX = useTransform(smoothX, [-0.5, 0.5], [18, 82]);
  const lightY = useTransform(smoothY, [-0.5, 0.5], [14, 86]);
  const spectralX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const spectralRotate = useTransform(smoothY, [-0.5, 0.5], [-34, -22]);
  const cardScale = useTransform(hoverSpring, [0, 1], [1, 1.018]);
  const surfaceOpacity = useTransform(hoverSpring, [0, 1], [0.18, 0.9]);
  const edgeOpacity = useTransform(hoverSpring, [0, 1], [0.24, 0.85]);
  const rayOpacity = useTransform(hoverSpring, [0, 1], [0.35, 1]);
  const edgeAlpha = useTransform(hoverSpring, [0, 1], [0.08, 0.32]);
  const surfaceLight = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.42) 0%, rgba(${glowColor},0.14) 22%, rgba(255,255,255,0.035) 44%, transparent 68%)`;
  const cardShadow = useMotionTemplate`0 34px 90px rgba(0,0,0,.58), 6px 7px 0 rgba(${glowColor},${edgeAlpha})`;

  const updatePointer = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    hover.set(1);
  }, [hover, pointerX, pointerY, reduceMotion]);

  const reset = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
    hover.set(0);
  }, [hover, pointerX, pointerY]);

  return (
    <div className="[perspective:1100px]">
      <motion.div
        ref={cardRef}
        onPointerEnter={() => hover.set(1)}
        onPointerMove={updatePointer}
        onPointerLeave={reset}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          scale: reduceMotion ? 1 : cardScale,
          boxShadow: cardShadow,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "group relative isolate overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#050606]",
          "outline-none",
          className
        )}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: surfaceLight, opacity: surfaceOpacity }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[11] opacity-40"
          style={{
            backgroundImage: "repeating-radial-gradient(circle at 50% 52%, transparent 0, transparent 8px, rgba(255,255,255,.055) 9px, transparent 10px)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-30%] top-1/2 z-[14] h-[3px] w-[165%] origin-center bg-[linear-gradient(90deg,transparent_4%,rgba(255,58,58,.75)_19%,rgba(255,194,72,.9)_26%,rgba(62,245,209,.95)_38%,rgba(74,149,255,.9)_51%,rgba(170,90,255,.75)_59%,rgba(255,255,255,.95)_70%,transparent_91%)] mix-blend-screen shadow-[0_0_9px_rgba(255,255,255,.65)]"
          style={{ x: spectralX, rotate: spectralRotate, opacity: rayOpacity }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-30%] top-1/2 z-[13] h-8 w-[165%] -translate-y-1/2 origin-center bg-[linear-gradient(90deg,transparent_6%,rgba(255,85,36,.12)_22%,rgba(37,245,208,.15)_40%,rgba(73,130,255,.13)_54%,transparent_86%)] blur-xl"
          style={{ x: spectralX, rotate: spectralRotate, opacity: rayOpacity }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-px z-[12] rounded-[calc(1.4rem-1px)] opacity-55"
          style={{
            backgroundImage: "linear-gradient(120deg,rgba(255,255,255,.13),transparent 22%,transparent 74%,rgba(37,245,208,.09)),url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.24'/%3E%3C/svg%3E\")",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[12%] top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
          style={{ opacity: edgeOpacity }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-[#25f5d0]/20"
          style={{ opacity: edgeOpacity }}
        />

        <div className="relative z-30 h-full" style={{ transform: "translateZ(36px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
