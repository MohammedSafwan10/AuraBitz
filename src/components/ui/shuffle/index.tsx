"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShuffleTextProps {
  texts: string[];
  className?: string;
  characterSet?: string;
  interval?: number;
  shuffleDuration?: number;
  showQueue?: boolean;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

export function ShuffleText({
  texts,
  className,
  characterSet = DEFAULT_CHARS,
  interval = 3000,
  shuffleDuration = 0.8,
  showQueue = false,
}: ShuffleTextProps) {
  const safeTexts = useMemo(() => (texts.length ? texts : [""]), [texts]);
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const reduceMotion = useReducedMotion();
  const current = safeTexts[index % safeTexts.length] ?? "";
  const previous = safeTexts[(index - 1 + safeTexts.length) % safeTexts.length] ?? "";
  const next = safeTexts[(index + 1) % safeTexts.length] ?? "";
  const longest = safeTexts.reduce((winner, value) => (value.length > winner.length ? value : winner), "");

  useEffect(() => {
    if (safeTexts.length < 2 || reduceMotion || engaged) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % safeTexts.length), interval);
    return () => window.clearInterval(timer);
  }, [engaged, interval, reduceMotion, safeTexts.length]);

  const engage = () => {
    setEngaged(true);
    if (safeTexts.length > 1) setIndex((value) => (value + 1) % safeTexts.length);
  };

  const selected = (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.span
        key={`${current}-${index}-${characterSet.length}`}
        className="absolute inset-0 flex items-center whitespace-pre"
        initial={reduceMotion ? false : { y: "72%", opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={reduceMotion ? { opacity: 0 } : { y: "-72%", opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: shuffleDuration, type: "spring", stiffness: 150, damping: 20 }}
      >
        {current.split("").map((character, charIndex) => (
          <motion.span
            key={`${character}-${charIndex}`}
            className="inline-block whitespace-pre"
            initial={reduceMotion ? false : { y: charIndex % 2 === 0 ? 18 : -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: charIndex * 0.018, type: "spring", stiffness: 210, damping: 20 }}
          >
            {character === " " ? "\u00a0" : character}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );

  if (!showQueue) {
    return (
      <span
        tabIndex={0}
        onPointerEnter={engage}
        onPointerLeave={() => setEngaged(false)}
        onFocus={engage}
        onBlur={() => setEngaged(false)}
        className={cn("relative inline-grid overflow-hidden align-bottom outline-none", className)}
      >
        <span className="invisible col-start-1 row-start-1 whitespace-pre" aria-hidden="true">{longest}</span>
        <span className="relative col-start-1 row-start-1">{selected}</span>
      </span>
    );
  }

  return (
    <div
      tabIndex={0}
      onPointerEnter={engage}
      onPointerLeave={() => setEngaged(false)}
      onFocus={engage}
      onBlur={() => setEngaged(false)}
      className={cn("relative grid min-h-[3.4em] grid-rows-3 overflow-hidden leading-none outline-none", className)}
    >
      <span aria-hidden="true" className="flex items-center whitespace-pre opacity-15">{previous}</span>
      <span className="relative flex items-center whitespace-pre text-white">{selected}</span>
      <span aria-hidden="true" className="flex items-center whitespace-pre opacity-15">{next}</span>
    </div>
  );
}
