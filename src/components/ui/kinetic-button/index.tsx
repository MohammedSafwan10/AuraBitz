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

export interface KineticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  magneticPull?: number;
  showTension?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

const variantClasses: Record<NonNullable<KineticButtonProps["variant"]>, string> = {
  primary: "border-white/35 bg-[#080909] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.28),inset_0_-8px_18px_rgba(0,0,0,.7),0_16px_45px_rgba(0,0,0,.5)]",
  secondary: "border-white bg-white text-black",
  ghost: "border-white/10 bg-transparent text-white/60 hover:border-white/22 hover:text-white",
  danger: "border-red-400/30 bg-red-400/[0.07] text-red-300 hover:border-red-300/50",
};

export function KineticButton({
  children,
  className,
  magneticPull = 0.24,
  showTension = false,
  variant = "primary",
  disabled,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  onBlur,
  ...props
}: KineticButtonProps) {
  const forceRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);
  const hover = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 190, damping: 15, mass: 0.72 });
  const y = useSpring(targetY, { stiffness: 190, damping: 15, mass: 0.72 });
  const hoverSpring = useSpring(hover, { stiffness: 230, damping: 25, mass: 0.42 });
  const labelX = useTransform(x, (value) => value * 0.11);
  const labelY = useTransform(y, (value) => value * 0.11);
  const glowOpacity = useTransform(hoverSpring, [0, 1], [0.06, 0.92]);
  const tetherLength = useTransform([x, y], ([latestX, latestY]) =>
    Math.hypot(122 + Number(latestX), Number(latestY))
  );
  const tetherAngle = useTransform([x, y], ([latestX, latestY]) =>
    (Math.atan2(Number(latestY), 122 + Number(latestX)) * 180) / Math.PI
  );
  const glow = useMotionTemplate`radial-gradient(92px circle at ${lightX}% ${lightY}%, ${variant === "secondary" ? "rgba(0,0,0,.22)" : "rgba(37,245,208,.42)"}, transparent 70%)`;

  const reset = useCallback(() => {
    targetX.set(0);
    targetY.set(0);
    hover.set(0);
    if (forceRef.current) forceRef.current.textContent = "PULL 0.00 N";
  }, [hover, targetX, targetY]);

  const handlePointerEnter = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    onPointerEnter?.(event);
    if (!disabled) hover.set(1);
  }, [disabled, hover, onPointerEnter]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    onPointerMove?.(event);
    if (disabled || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    targetX.set(dx * magneticPull);
    targetY.set(dy * magneticPull);
    lightX.set(((event.clientX - rect.left) / rect.width) * 100);
    lightY.set(((event.clientY - rect.top) / rect.height) * 100);
    hover.set(1);

    if (forceRef.current) {
      const force = Math.min(0.99, (Math.hypot(dx, dy) / (rect.width * 0.36)) * 0.72);
      forceRef.current.textContent = `PULL ${force.toFixed(2)} N`;
    }
  }, [disabled, hover, lightX, lightY, magneticPull, onPointerMove, reduceMotion, targetX, targetY]);

  const handlePointerLeave = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    onPointerLeave?.(event);
    reset();
  }, [onPointerLeave, reset]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    onBlur?.(event);
    reset();
  }, [onBlur, reset]);

  const button = (
    <motion.button
      type="button"
      disabled={disabled}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onBlur={handleBlur}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.38 }}
      className={cn(
        "group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border px-8",
        "text-[13px] font-semibold tracking-[0.18em] outline-none transition-[border-color,background-color,color] duration-200",
        "before:pointer-events-none before:absolute before:inset-[4px] before:rounded-full before:border before:border-white/10",
        "focus-visible:ring-2 focus-visible:ring-[#25f5d0]/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "disabled:pointer-events-none disabled:opacity-35",
        variantClasses[variant],
        className
      )}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: glow, opacity: glowOpacity }}
      />
      <motion.span
        className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap"
        style={{ x: labelX, y: labelY }}
      >
        {children}
      </motion.span>
    </motion.button>
  );

  if (!showTension) return button;

  return (
    <span className="relative inline-flex min-h-[158px] items-center pb-12 pl-[150px]">
      <span className="pointer-events-none absolute left-0 top-[calc(50%_-_24px)] h-12 w-12 -translate-y-1/2">
        <span className="absolute inset-2 rounded-full border border-white/30" />
        <span className="absolute inset-[0.42rem] rounded-full border-2 border-[#25f5d0] [clip-path:polygon(0_0,64%_0,64%_48%,100%_48%,100%_100%,0_100%)]" />
        <span className="absolute left-1/2 top-[-14px] h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t border-white/55" />
        <span className="absolute bottom-[-14px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 -rotate-[135deg] border-l border-t border-white/55" />
      </span>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-[28px] top-[calc(50%_-_24px)] h-px origin-left bg-[#25f5d0] shadow-[0_0_8px_#25f5d0]"
        style={{ width: tetherLength, rotate: tetherAngle }}
      />

      {button}

      <span
        ref={forceRef}
        className="pointer-events-none absolute bottom-2 left-[150px] font-mono text-[11px] tracking-[0.14em] text-[#25f5d0]"
      >
        PULL 0.00 N
      </span>
    </span>
  );
}
