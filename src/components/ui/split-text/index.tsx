"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationStyle = "slideUp" | "slideDown" | "fade" | "blur";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  splitBy?: "chars" | "words";
  animation?: AnimationStyle;
  once?: boolean;
  onComplete?: () => void;
  mode?: "reveal" | "slices";
  slices?: number;
  sliceOffset?: number;
  trackPointer?: "self" | "viewport";
}

function Slice({
  children,
  index,
  count,
  pointer,
  offset,
}: {
  children: string;
  index: number;
  count: number;
  pointer: ReturnType<typeof useMotionValue<number>>;
  offset: number;
}) {
  const direction = index % 2 === 0 ? -1 : 1;
  const rawX = useTransform(pointer, (value) => direction * offset * value);
  const x = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.7 + index * 0.06 });
  const start = (index / count) * 100;
  const end = ((index + 1) / count) * 100;

  return (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 text-inherit [text-shadow:0_1px_0_rgba(34,211,238,.65)]"
      style={{ clipPath: `inset(${start}% 0 ${100 - end}% 0)`, x }}
    >
      {children}
    </motion.span>
  );
}

export function SplitText({
  children,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.6,
  splitBy = "chars",
  animation = "slideUp",
  once = false,
  onComplete,
  mode = "reveal",
  slices = 6,
  sliceOffset = 10,
  trackPointer = "self",
}: SplitTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once });
  const controls = useAnimation();
  const pointer = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView) controls.start("visible").then(onComplete);
    else if (!once) controls.start("hidden");
  }, [controls, inView, onComplete, once]);

  useEffect(() => {
    if (mode !== "slices" || trackPointer !== "viewport") return;
    const update = (event: PointerEvent) => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const insideInfluence =
        event.clientX >= rect.left - 220 &&
        event.clientX <= rect.right + 220 &&
        event.clientY >= rect.top - 170 &&
        event.clientY <= rect.bottom + 170;
      if (!insideInfluence) {
        pointer.set(0);
        return;
      }
      const normalized = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.set(Math.max(-1, Math.min(1, normalized)));
    };
    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, [mode, pointer, trackPointer]);

  if (mode === "slices") {
    const safeSlices = Math.max(2, Math.min(12, slices));
    return (
      <div
        ref={rootRef}
        tabIndex={0}
        onPointerMove={(event) => {
          if (reduceMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          pointer.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        }}
        onPointerLeave={() => pointer.set(0)}
        onFocus={() => pointer.set(0.5)}
        onBlur={() => pointer.set(0)}
        className={cn("relative inline-block whitespace-pre leading-none outline-none", className)}
      >
        <span className="invisible" aria-hidden="true">{children}</span>
        <span className="sr-only">{children}</span>
        {Array.from({ length: safeSlices }, (_, index) => (
          <Slice key={index} index={index} count={safeSlices} pointer={pointer} offset={sliceOffset}>
            {children}
          </Slice>
        ))}
      </div>
    );
  }

  const hidden =
    animation === "slideDown"
      ? { y: "-130%", opacity: 0 }
      : animation === "fade"
        ? { opacity: 0 }
        : animation === "blur"
          ? { opacity: 0, filter: "blur(12px)", scale: 0.92 }
          : { y: "130%", opacity: 0 };
  const units = splitBy === "words" ? children.split(" ") : children.split("");

  return (
    <motion.div
      ref={rootRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={cn("inline-flex flex-wrap items-center", className)}
    >
      {units.map((unit, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block whitespace-pre"
            variants={{
              hidden,
              visible: {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                transition: { type: "spring", stiffness: 180, damping: 20, duration },
              },
            }}
          >
            {unit === " " ? "\u00a0" : unit}{splitBy === "words" && index < units.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
