"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useInView, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrambleRevealProps {
  children: string;
  className?: string;
  characters?: string;
  duration?: number;
  delay?: number;
  once?: boolean;
  showDecodeFront?: boolean;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\[]{}+=*:#";

export function ScrambleReveal({
  children,
  className,
  characters = DEFAULT_CHARS,
  duration = 1,
  delay = 0,
  once = true,
  showDecodeFront = false,
}: ScrambleRevealProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(rootRef, { once });
  const [animating, setAnimating] = useState(false);
  const startRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const progress = useMotionValue(0);
  const decodeLeft = useTransform(progress, [0, 1], ["0%", "100%"]);
  const safeCharacters = characters || DEFAULT_CHARS;

  const begin = useCallback(() => {
    startRef.current = null;
    progress.set(0);
    if (textRef.current) {
      textRef.current.textContent = children
        .split("")
        .map((character, index) => character === " " ? " " : safeCharacters[(index * 31) % safeCharacters.length])
        .join("");
    }
    setAnimating(true);
  }, [children, progress, safeCharacters]);

  useEffect(() => {
    if (!inView) {
      if (!once && textRef.current) textRef.current.textContent = children;
      return;
    }
    const timer = window.setTimeout(begin, delay * 1000);
    return () => window.clearTimeout(timer);
  }, [begin, children, delay, inView, once]);

  useAnimationFrame((time) => {
    if (!animating || time - lastFrameRef.current < 32) return;
    lastFrameRef.current = time;
    if (startRef.current === null) startRef.current = time;
    const value = Math.min((time - startRef.current) / Math.max(1, duration * 1000), 1);
    progress.set(value);
    if (textRef.current) {
      const resolved = Math.floor(value * children.length);
      textRef.current.textContent = children
        .split("")
        .map((character, index) => {
          if (character === " " || index < resolved) return character;
          const seed = (index * 29 + Math.floor(time / 32) * 17) % safeCharacters.length;
          return safeCharacters[seed];
        })
        .join("");
    }
    if (value >= 1) {
      setAnimating(false);
      if (textRef.current) textRef.current.textContent = children;
    }
  });

  return (
    <span
      ref={rootRef}
      tabIndex={0}
      onPointerEnter={begin}
      onFocus={begin}
      className={cn("relative inline-block whitespace-pre-wrap outline-none", className)}
    >
      <span ref={textRef}>{children}</span>
      {showDecodeFront && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-[0.08em] w-px bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,.8)]"
          style={{ left: decodeLeft, opacity: animating ? 1 : 0 }}
        />
      )}
    </span>
  );
}
