"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
  withNoise?: boolean;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(99, 255, 226, 0.16)",
  spotlightSize = 460,
  withNoise = true,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}: SpotlightCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 240, damping: 30, mass: 0.55 });
  const y = useSpring(pointerY, { stiffness: 240, damping: 30, mass: 0.55 });

  const placeAtCenter = useCallback(() => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(rect.width * 0.68);
    pointerY.set(rect.height * 0.32);
  }, [pointerX, pointerY]);

  useEffect(() => {
    placeAtCenter();
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(placeAtCenter);
    observer.observe(root);
    return () => observer.disconnect();
  }, [placeAtCenter]);

  const updatePointer = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      pointerX.set(event.clientX - rect.left);
      pointerY.set(event.clientY - rect.top);
    },
    [pointerX, pointerY],
  );

  const reveal = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, #000 0%, rgba(0,0,0,.92) 24%, transparent 68%)`;
  const light = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor} 0%, rgba(255,255,255,.035) 28%, transparent 67%)`;
  const edge = useMotionTemplate`radial-gradient(${spotlightSize * 0.72}px circle at ${x}px ${y}px, rgba(255,255,255,.8), rgba(99,255,226,.35) 32%, transparent 72%)`;

  return (
    <div
      ref={rootRef}
      tabIndex={props.tabIndex ?? 0}
      onPointerMove={(event) => {
        updatePointer(event);
        onPointerMove?.(event);
      }}
      onPointerEnter={(event) => {
        setActive(true);
        updatePointer(event);
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        setActive(false);
        placeAtCenter();
        onPointerLeave?.(event);
      }}
      onFocus={(event) => {
        setActive(true);
        placeAtCenter();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setActive(false);
        onBlur?.(event);
      }}
      className={cn(
        "group/spotlight relative isolate overflow-hidden border border-white/[0.08] bg-black outline-none",
        "focus-visible:border-emerald-200/40 focus-visible:ring-1 focus-visible:ring-emerald-200/20",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,transparent_14%,rgba(255,255,255,.025)_46%,transparent_72%)]" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: active ? 1 : 0.42 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.45 }}
        style={{ background: light }}
      />

      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 900 480"
        preserveAspectRatio="none"
        style={{ WebkitMaskImage: reveal, maskImage: reveal }}
      >
        <g fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1">
          {Array.from({ length: 15 }, (_, index) => (
            <path
              key={index}
              d={`M ${-80 + index * 10} ${450 - index * 14} C ${170 + index * 7} ${300 - index * 13}, ${430 + index * 9} ${560 - index * 28}, ${980 + index * 4} ${170 - index * 5}`}
            />
          ))}
        </g>
      </motion.svg>

      {withNoise && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-soft-light"
          style={{
            WebkitMaskImage: reveal,
            maskImage: reveal,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
          }}
        />
      )}

      <motion.div
        className="pointer-events-none absolute -inset-px border border-transparent"
        style={{
          background: edge,
          padding: 1,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: active ? 1 : 0.2,
        }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
