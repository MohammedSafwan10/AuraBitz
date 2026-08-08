"use client";

import { useId, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CircularTextProps {
  text: string;
  radius?: number;
  className?: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  rings?: number;
}

export function CircularText({
  text,
  radius = 100,
  spinDuration = 10,
  onHover = "slowDown",
  className,
  rings = 1,
}: CircularTextProps) {
  const rawId = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const targetTiltX = useMotionValue(0);
  const targetTiltY = useMotionValue(0);
  const tiltX = useSpring(targetTiltX, { stiffness: 145, damping: 20, mass: 0.75 });
  const tiltY = useSpring(targetTiltY, { stiffness: 145, damping: 20, mass: 0.75 });
  const size = radius * 2;
  const ringCount = Math.max(1, Math.min(5, rings));
  const repeatedText = `${text} — ${text} — ${text} — `;
  const duration =
    hovered && onHover === "slowDown"
      ? spinDuration * 3
      : hovered && onHover === "speedUp"
        ? spinDuration / 3
        : hovered && onHover === "goBonkers"
          ? 1.2
          : spinDuration;
  const paused = reduceMotion || (hovered && onHover === "pause");

  return (
    <motion.div
      className={cn("relative inline-flex items-center justify-center outline-none", className)}
      style={{ width: size, height: size, rotateX: tiltX, rotateY: tiltY, transformPerspective: 850 }}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        targetTiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 18);
        targetTiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 18);
      }}
      onPointerLeave={() => {
        setHovered(false);
        targetTiltX.set(0);
        targetTiltY.set(0);
      }}
      onFocus={() => {
        setHovered(true);
        targetTiltX.set(-5);
        targetTiltY.set(7);
      }}
      onBlur={() => {
        setHovered(false);
        targetTiltX.set(0);
        targetTiltY.set(0);
      }}
      tabIndex={0}
      role="img"
      aria-label={text}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          {Array.from({ length: ringCount }, (_, index) => {
            const inset = 12 + index * (radius * 0.18);
            const ringRadius = Math.max(radius * 0.28, radius - inset);
            return (
              <path
                key={index}
                id={`${rawId}-${index}`}
                d={`M ${radius} ${radius - ringRadius} A ${ringRadius} ${ringRadius} 0 1 1 ${radius - 0.01} ${radius - ringRadius}`}
                fill="none"
              />
            );
          })}
        </defs>
        {Array.from({ length: ringCount }, (_, index) => (
          <motion.g
            key={index}
            initial={{ rotate: index * 22 }}
            animate={paused ? { rotate: index * 22 } : { rotate: index % 2 === 0 ? 360 : -360 }}
            transition={{ duration: duration * (1 + index * 0.18), ease: "linear", repeat: paused ? 0 : Infinity }}
            style={{ transformOrigin: `${radius}px ${radius}px` }}
            opacity={index === 0 ? 1 : hovered ? 0.72 - index * 0.14 : 0.08}
          >
            <text fill="currentColor" fontSize={Math.max(7, radius * 0.085)} letterSpacing={radius * 0.012}>
              <textPath href={`#${rawId}-${index}`} startOffset={`${index * 11}%`}>
                {repeatedText}
              </textPath>
            </text>
          </motion.g>
        ))}
        {ringCount > 1 && (
          <g>
            <line x1={radius} y1={radius} x2={radius * 1.66} y2={radius * 0.63} stroke="rgba(34,211,238,.42)" strokeWidth="0.7" />
            <rect x={radius * 1.63} y={radius * 0.59} width="8" height="5" fill="rgb(34,211,238)" transform={`rotate(-28 ${radius * 1.63} ${radius * 0.59})`} />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
