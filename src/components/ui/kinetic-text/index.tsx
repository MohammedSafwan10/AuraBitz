"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  MotionValue,
  useAnimation,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  splitBy?: "chars" | "words";
  once?: boolean;
  interactive?: boolean;
  showField?: boolean;
  force?: number;
}

function KineticGlyph({
  value,
  index,
  forceX,
  forceY,
  strength,
}: {
  value: string;
  index: number;
  forceX: MotionValue<number>;
  forceY: MotionValue<number>;
  strength: number;
}) {
  const mass = 0.65 + ((index * 37) % 180) / 100;
  const rawX = useTransform(forceX, (valueX) => valueX * strength * (1.8 / mass));
  const rawY = useTransform(forceY, (valueY) => valueY * strength * (1.8 / mass));
  const rawRotate = useTransform(forceX, (valueX) => valueX * (2.5 / mass));
  const x = useSpring(rawX, { stiffness: 150 / mass, damping: 16 + mass * 4, mass });
  const y = useSpring(rawY, { stiffness: 150 / mass, damping: 16 + mass * 4, mass });
  const rotate = useSpring(rawRotate, { stiffness: 130, damping: 18, mass });

  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 38, rotateX: -70, filter: "blur(9px)" },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          transition: { type: "spring", stiffness: 120, damping: 16, mass },
        },
      }}
      className="relative inline-block origin-bottom whitespace-pre will-change-transform"
      style={{ x, y, rotate }}
    >
      {value}
    </motion.span>
  );
}

export function KineticText({
  children,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
  splitBy = "chars",
  once = false,
  interactive = true,
  showField = false,
  force = 22,
}: KineticTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once });
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const forceX = useMotionValue(0);
  const forceY = useMotionValue(0);
  const pointX = useMotionValue(0);
  const pointY = useMotionValue(0);
  const elements = useMemo(
    () => (splitBy === "chars" ? children.split("") : children.split(" ").map((word) => `${word}\u00a0`)),
    [children, splitBy],
  );

  useEffect(() => {
    if (inView) controls.start("visible");
    else if (!once) controls.start("hidden");
  }, [controls, inView, once]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !showField) return;
    const placeOrigin = () => {
      const rect = root.getBoundingClientRect();
      pointX.set(rect.width * 0.86);
      pointY.set(rect.height * 0.82);
    };
    placeOrigin();
    const observer = new ResizeObserver(placeOrigin);
    observer.observe(root);
    return () => observer.disconnect();
  }, [pointX, pointY, showField]);

  const reset = () => {
    forceX.set(0);
    forceY.set(0);
  };

  return (
    <motion.div
      ref={rootRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren: delay, duration },
        },
      }}
      onPointerMove={(event) => {
        if (!interactive || reduceMotion) return;
        const rect = rootRef.current?.getBoundingClientRect();
        if (!rect) return;
        const localX = event.clientX - rect.left;
        const localY = event.clientY - rect.top;
        pointX.set(localX);
        pointY.set(localY);
        forceX.set((localX / rect.width - 0.5) * 2);
        forceY.set((localY / rect.height - 0.5) * 2);
      }}
      onPointerLeave={reset}
      onFocus={() => {
        forceX.set(0.42);
        forceY.set(0.28);
      }}
      onBlur={reset}
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        "relative inline-flex flex-wrap items-center overflow-visible leading-[1.05] outline-none [perspective:1000px]",
        className,
      )}
    >
      {showField && (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {elements.map((_, index) => (
            <motion.line
              key={index}
              x1={`${((index + 0.5) / elements.length) * 100}%`}
              y1="82%"
              x2={pointX}
              y2={pointY}
              stroke="rgba(255,255,255,.22)"
              strokeWidth="0.75"
            />
          ))}
          <motion.circle cx={pointX} cy={pointY} r="4" fill="rgb(34,211,238)" />
        </svg>
      )}
      {elements.map((element, index) => (
        <KineticGlyph
          key={`${element}-${index}`}
          value={element === " " ? "\u00a0" : element}
          index={index}
          forceX={forceX}
          forceY={forceY}
          strength={force}
        />
      ))}
    </motion.div>
  );
}
