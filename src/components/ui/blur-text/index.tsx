"use client";

import { useEffect, useRef, useState } from "react";
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

interface BlurTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  splitBy?: "chars" | "words";
  once?: boolean;
  depthLayers?: number;
  trackPointer?: "self" | "viewport";
}

function DepthLayer({
  children,
  index,
  focusX,
  focusY,
  visible,
  duration,
  delay,
}: {
  children: string;
  index: number;
  focusX: MotionValue<number>;
  focusY: MotionValue<number>;
  visible: boolean;
  duration: number;
  delay: number;
}) {
  const distance = index + 1;
  const rawX = useTransform(focusX, (value) => -distance * 24 + value * distance * 48);
  const rawY = useTransform(focusY, (value) => value * distance * 22 + (index % 2 === 0 ? -1 : 1) * distance * 2);
  const x = useSpring(rawX, { stiffness: 135, damping: 23, mass: 0.8 + index * 0.08 });
  const y = useSpring(rawY, { stiffness: 135, damping: 23, mass: 0.8 + index * 0.08 });

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 whitespace-pre text-inherit"
      initial={{ opacity: 0, scale: 0.82 - index * 0.035, filter: `blur(${16 + index * 5}px)` }}
      animate={visible ? { opacity: Math.max(0.07, 0.28 - index * 0.035), scale: 0.9 - index * 0.028 } : { opacity: 0 }}
      transition={{ duration: duration * 1.4, delay: delay + index * 0.06 }}
      style={{ x, y }}
    >
      {children}
    </motion.span>
  );
}

export function BlurText({
  children,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
  splitBy = "chars",
  once = false,
  depthLayers = 0,
  trackPointer = "self",
}: BlurTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once });
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const focusX = useMotionValue(0);
  const focusY = useMotionValue(0);
  const [engaged, setEngaged] = useState(false);
  const mainRawX = useTransform(focusX, (value) => value * 14);
  const mainRawY = useTransform(focusY, (value) => value * 8);
  const mainRotateX = useTransform(focusY, (value) => value * -7);
  const mainRotateY = useTransform(focusX, (value) => value * 10);
  const mainX = useSpring(mainRawX, { stiffness: 180, damping: 22, mass: 0.7 });
  const mainY = useSpring(mainRawY, { stiffness: 180, damping: 22, mass: 0.7 });
  const rotateX = useSpring(mainRotateX, { stiffness: 180, damping: 22, mass: 0.7 });
  const rotateY = useSpring(mainRotateY, { stiffness: 180, damping: 22, mass: 0.7 });
  const units = splitBy === "words" ? children.split(" ") : children.split("");
  const safeDepth = Math.max(0, Math.min(8, depthLayers));

  useEffect(() => {
    if (inView) controls.start("visible");
    else if (!once) controls.start("hidden");
  }, [controls, inView, once]);

  useEffect(() => {
    if (!safeDepth || trackPointer !== "viewport") return;
    const update = (event: PointerEvent) => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const insideInfluence =
        event.clientX >= rect.left - 240 &&
        event.clientX <= rect.right + 240 &&
        event.clientY >= rect.top - 180 &&
        event.clientY <= rect.bottom + 180;
      setEngaged(insideInfluence);
      if (!insideInfluence) {
      focusX.set(0);
      focusY.set(0);
        return;
      }
      const normalized = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      focusX.set(Math.max(-1, Math.min(1, normalized)));
      focusY.set(Math.max(-1, Math.min(1, normalizedY)));
    };
    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, [focusX, focusY, safeDepth, trackPointer]);

  return (
    <motion.div
      ref={rootRef}
      initial="hidden"
      animate={controls}
      tabIndex={safeDepth > 0 ? 0 : undefined}
      onPointerMove={(event) => {
        if (!safeDepth || reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        focusX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        focusY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={() => {
        setEngaged(false);
        focusX.set(0);
        focusY.set(0);
      }}
      onFocus={() => {
        setEngaged(true);
        focusX.set(0.55);
        focusY.set(-0.3);
      }}
      onBlur={() => {
        setEngaged(false);
        focusX.set(0);
        focusY.set(0);
      }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={cn("relative inline-flex flex-wrap items-center", className)}
    >
      {safeDepth > 0 &&
        Array.from({ length: safeDepth }, (_, index) => {
          return (
            <DepthLayer
              key={`depth-${index}`}
              index={index}
              focusX={focusX}
              focusY={focusY}
              visible={inView && engaged}
              duration={reduceMotion ? 0 : duration}
              delay={delay}
            >{children}</DepthLayer>
          );
        })}

      <motion.span
        className="relative z-10 inline-flex flex-wrap will-change-transform [transform-style:preserve-3d]"
        style={{ x: mainX, y: mainY, rotateX, rotateY, transformPerspective: 900 }}
      >
        {units.map((unit, index) => (
          <motion.span
            key={index}
            className="inline-block whitespace-pre"
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(16px)", scale: 0.94 },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                transition: { duration, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {unit === " " ? "\u00a0" : unit}{splitBy === "words" && index < units.length - 1 ? "\u00a0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </motion.div>
  );
}
