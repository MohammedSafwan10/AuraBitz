"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/components/ui/use-performance-mode";

interface TextPressureProps {
  children: string;
  className?: string;
  baseWeight?: number;
  maxWeight?: number;
  baseScale?: number;
  maxScale?: number;
  radius?: number;
  compression?: number;
  showForcePoint?: boolean;
  showStressLines?: boolean;
}

export function TextPressure({
  children,
  className,
  baseWeight = 400,
  maxWeight = 900,
  baseScale = 1,
  maxScale = 1.3,
  radius = 150,
  compression = 0.56,
  showForcePoint = false,
  showStressLines = false,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const metricsRef = useRef<{ x: number; y: number }[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const { isLowPerformance, prefersReducedMotion } = usePerformanceMode();
  const chars = useMemo(() => children.split(""), [children]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const measure = () => {
      metricsRef.current = charsRef.current.map((element) => {
        if (!element) return { x: -1000, y: -1000 };
        const rect = element.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
    };

    const render = () => {
      frameRef.current = null;
      const { x: pointerX, y: pointerY } = pointerRef.current;
      charsRef.current.forEach((element, index) => {
        if (!element) return;
        const metric = metricsRef.current[index] ?? { x: -1000, y: -1000 };
        const distance = Math.hypot(pointerX - metric.x, pointerY - metric.y);
        const force = distance < radius ? (1 - distance / radius) ** 1.7 : 0;
        const scaleX = baseScale * (1 - (1 - compression) * force);
        const scaleY = baseScale + (maxScale - baseScale) * force * 0.62;
        const pullX = (pointerX - metric.x) * force * 0.13;
        const pullY = Math.max(0, pointerY - metric.y) * force * 0.035;
        element.style.fontWeight = String(Math.round(baseWeight + (maxWeight - baseWeight) * force));
        element.style.transform = `translate3d(${pullX.toFixed(2)}px, ${pullY.toFixed(2)}px, 0) scaleX(${scaleX.toFixed(3)}) scaleY(${scaleY.toFixed(3)})`;
      });
    };

    const schedule = () => {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(render);
    };

    const updatePointer = (event: PointerEvent) => {
      if (isLowPerformance || prefersReducedMotion) return;
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (pointRef.current) {
        const rect = root.getBoundingClientRect();
        pointRef.current.style.transform = `translate3d(${event.clientX - rect.left}px, ${event.clientY - rect.top}px, 0)`;
        pointRef.current.style.opacity = "1";
      }
      schedule();
    };

    const enter = () => {
      activeRef.current = true;
      measure();
    };
    const focus = () => {
      const rect = root.getBoundingClientRect();
      pointerRef.current = { x: rect.left + rect.width * 0.52, y: rect.top + rect.height * 0.92 };
      if (pointRef.current) {
        pointRef.current.style.transform = `translate3d(${rect.width * 0.52}px, ${rect.height * 0.92}px, 0)`;
        pointRef.current.style.opacity = "1";
      }
      measure();
      schedule();
    };
    const leave = () => {
      activeRef.current = false;
      pointerRef.current = { x: -1000, y: -1000 };
      if (pointRef.current) pointRef.current.style.opacity = "0";
      schedule();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    root.addEventListener("pointermove", updatePointer, { passive: true });
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("focus", focus);
    root.addEventListener("blur", leave);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      root.removeEventListener("pointermove", updatePointer);
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focus", focus);
      root.removeEventListener("blur", leave);
      window.removeEventListener("scroll", measure);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [baseScale, baseWeight, compression, isLowPerformance, maxScale, maxWeight, prefersReducedMotion, radius]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={cn("relative inline-flex flex-wrap items-baseline justify-center select-none outline-none", className)}
    >
      {chars.map((character, index) =>
        character === " " ? (
          <span key={index} className="inline-block w-[0.3em]" />
        ) : (
          <span
            key={index}
            ref={(element) => { charsRef.current[index] = element; }}
            className={cn(
              "inline-block origin-bottom transition-[font-weight,transform] duration-150 ease-out will-change-transform",
              showStressLines && "bg-[repeating-linear-gradient(to_bottom,#fff_0,#fff_0.105em,rgba(255,255,255,.58)_0.105em,rgba(255,255,255,.58)_0.118em)] bg-clip-text text-transparent",
            )}
            style={{ fontWeight: baseWeight }}
          >
            {character}
          </span>
        ),
      )}
      {showForcePoint && (
        <span
          ref={pointRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 opacity-0 shadow-[0_0_18px_rgba(34,211,238,.85)] transition-opacity"
        />
      )}
    </div>
  );
}
