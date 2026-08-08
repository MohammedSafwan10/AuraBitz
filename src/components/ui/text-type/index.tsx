"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextTypeProps {
  text: string;
  className?: string;
  delay?: number;
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
  showCursor?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  echoes?: number;
}

export function TextType({
  text,
  className,
  delay = 0,
  typingSpeed = 0.05,
  cursorBlinkSpeed = 0.8,
  showCursor = true,
  cursorChar = "|",
  cursorClassName,
  echoes = 0,
}: TextTypeProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();
  const inView = useInView(rootRef, { once: true });
  const reduceMotion = useReducedMotion();
  const safeEchoes = Math.max(0, Math.min(4, echoes));

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const replay = () => {
    controls.set("hidden");
    requestAnimationFrame(() => controls.start("visible"));
  };

  return (
    <motion.span
      ref={rootRef}
      initial="hidden"
      animate={controls}
      tabIndex={0}
      onPointerEnter={replay}
      onFocus={replay}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : typingSpeed, delayChildren: delay } },
      }}
      className={cn("inline whitespace-pre-wrap outline-none", className)}
    >
      {text.split("").map((character, index) => character === "\n" ? (
        <br key={index} />
      ) : (
        <motion.span
          key={index}
          className="relative inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, x: -8 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.16, ease: "easeOut" } },
          }}
        >
          {safeEchoes > 0 && character !== " " &&
            Array.from({ length: safeEchoes }, (_, echo) => (
              <motion.span
                key={echo}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 text-white"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: [0.24 / (echo + 1), 0],
                    x: [-(echo + 1) * 9, -(echo + 1) * 17],
                    transition: { duration: 0.5 + echo * 0.12, ease: "easeOut" },
                  },
                }}
              >
                {character}
              </motion.span>
            ))}
          {character === " " ? "\u00a0" : character}
        </motion.span>
      ))}
      {showCursor && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ repeat: Infinity, duration: cursorBlinkSpeed, times: [0, 0.46, 0.5, 1], ease: "linear" }}
          className={cn("ml-[0.04em] inline-block text-cyan-300", cursorClassName)}
        >
          {cursorChar}
        </motion.span>
      )}
    </motion.span>
  );
}
