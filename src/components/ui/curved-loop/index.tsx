"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CurvedLoopProps {
  children: string;
  className?: string;
  speed?: number;
  amplitude?: number;
  frequency?: number;
  height?: number;
  perspective?: boolean;
}

export function CurvedLoop({
  children,
  className,
  speed = 10,
  amplitude = 40,
  frequency = 300,
  height,
  perspective = false,
}: CurvedLoopProps) {
  const pathId = `curve-${useId().replace(/:/g, "")}`;
  const reduceMotion = useReducedMotion();
  const [engaged, setEngaged] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const bendX = useSpring(targetX, { stiffness: 105, damping: 21, mass: 0.85 });
  const bendY = useSpring(targetY, { stiffness: 105, damping: 21, mass: 0.85 });
  const resolvedHeight = height ?? Math.max(120, amplitude * 2 + 20);
  const repeatedText = useMemo(() => Array(10).fill(`${children} — `).join(""), [children]);
  const lift = Math.max(60, Math.min(190, amplitude * 1.8));
  const reach = Math.max(180, Math.min(480, frequency));
  const path = perspective
    ? `M -100 430 C ${reach * 0.55} ${520 + lift * 0.2}, ${reach} ${330 + lift * 0.15}, 520 286 S ${860 + reach * 0.15} ${70 - lift * 0.12}, 1320 182`
    : `M -100 260 C ${reach * 0.5} ${260 + lift}, ${reach} ${260 - lift}, 560 260 S ${920 + reach * 0.12} ${260 + lift}, 1320 260`;

  useEffect(() => {
    const updatePath = () => {
      const x = bendX.get();
      const y = bendY.get();
      const nextPath = perspective
        ? `M -100 ${430 + y * 28} C ${reach * 0.55 + x * 85} ${520 + lift * 0.2 - y * 70}, ${reach + x * 115} ${330 + lift * 0.15 + y * 92}, ${520 + x * 68} ${286 + y * 105} S ${860 + reach * 0.15 + x * 112} ${70 - lift * 0.12 + y * 90}, 1320 ${182 - y * 30}`
        : `M -100 ${260 + y * 32} C ${reach * 0.5 + x * 80} ${260 + lift - y * 70}, ${reach + x * 105} ${260 - lift + y * 80}, ${560 + x * 60} ${260 + y * 96} S ${920 + reach * 0.12 + x * 105} ${260 + lift + y * 75}, 1320 ${260 - y * 28}`;
      pathRef.current?.setAttribute("d", nextPath);
    };
    const stopX = bendX.on("change", updatePath);
    const stopY = bendY.on("change", updatePath);
    updatePath();
    return () => {
      stopX();
      stopY();
    };
  }, [bendX, bendY, lift, perspective, reach]);

  return (
    <div
      ref={rootRef}
      className={cn("relative w-full overflow-hidden outline-none", className)}
      style={{ height: resolvedHeight }}
      role="img"
      aria-label={children}
      tabIndex={0}
      onPointerEnter={() => setEngaged(true)}
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const rect = rootRef.current?.getBoundingClientRect();
        if (!rect) return;
        targetX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        targetY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
      onPointerLeave={() => {
        setEngaged(false);
        targetX.set(0);
        targetY.set(0);
      }}
      onFocus={() => {
        setEngaged(true);
        targetX.set(0.34);
        targetY.set(-0.28);
      }}
      onBlur={() => {
        setEngaged(false);
        targetX.set(0);
        targetY.set(0);
      }}
    >
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 1200 520"
        preserveAspectRatio="none"
        animate={{ scale: engaged ? 1.035 : 1, y: engaged ? -7 : 0 }}
        transition={{ type: "spring", stiffness: 130, damping: 20 }}
      >
        <defs>
          <path ref={pathRef} id={pathId} d={path} fill="none" />
        </defs>
        <text fill="currentColor" fontSize={perspective ? 38 : 32} fontWeight="700" letterSpacing="2.5">
          <motion.textPath
            href={`#${pathId}`}
            initial={{ startOffset: "0%" }}
            animate={reduceMotion ? { startOffset: "0%" } : { startOffset: "-34%" }}
            transition={{ duration: engaged ? speed * 0.42 : speed, ease: "linear", repeat: reduceMotion ? 0 : Infinity }}
          >
            {repeatedText}
          </motion.textPath>
        </text>
      </motion.svg>
    </div>
  );
}
