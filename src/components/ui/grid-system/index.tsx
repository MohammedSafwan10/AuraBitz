"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface GridSystemProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "dot" | "line" | "cross";
  size?: number;
  color?: string;
  interactiveColor?: string;
  animated?: boolean;
  interactive?: boolean;
  fadeMask?: "radial" | "linear" | "none";
  influence?: number;
}

const masks = {
  radial: "radial-gradient(ellipse at center, #000 24%, transparent 92%)",
  linear: "linear-gradient(to bottom, #000 15%, transparent 100%)",
  none: "none",
};

export function GridSystem({
  type = "line",
  size = 52,
  color = "rgba(255,255,255,0.19)",
  interactiveColor = "rgba(91,255,226,0.82)",
  animated = false,
  interactive = true,
  fadeMask = "none",
  influence = 150,
  className,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  children,
  ...props
}: GridSystemProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const phaseRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const targetX = useMotionValue(-1000);
  const targetY = useMotionValue(-1000);
  const x = useSpring(targetX, { stiffness: 180, damping: 24, mass: 0.7 });
  const y = useSpring(targetY, { stiffness: 180, damping: 24, mass: 0.7 });

  const draw = useCallback(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const rect = root.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const px = x.get();
    const py = y.get();
    const cell = Math.max(20, size);
    const phase = animated && !reduceMotion ? phaseRef.current : 0;
    const startX = -cell + (phase % cell);
    const startY = -cell + (phase % cell);
    const deform = (gx: number, gy: number) => {
      if (!interactive) return [gx, gy, 0] as const;
      const dx = gx - px;
      const dy = gy - py;
      const distance = Math.hypot(dx, dy);
      if (distance >= influence || distance < 0.01) return [gx, gy, 0] as const;
      const force = (1 - distance / influence) ** 2;
      const displacement = force * Math.min(34, cell * 0.62);
      return [gx + (dx / distance) * displacement, gy + (dy / distance) * displacement, force] as const;
    };

    context.lineWidth = 1;
    if (type === "line") {
      const step = 8;
      for (let gx = startX; gx <= width + cell; gx += cell) {
        context.beginPath();
        for (let gy = -step; gy <= height + step; gy += step) {
          const [dx, dy, force] = deform(gx, gy);
          context.strokeStyle = force > 0.1 ? interactiveColor : color;
          if (gy === -step) context.moveTo(dx, dy);
          else context.lineTo(dx, dy);
        }
        context.stroke();
      }
      for (let gy = startY; gy <= height + cell; gy += cell) {
        context.beginPath();
        for (let gx = -step; gx <= width + step; gx += step) {
          const [dx, dy, force] = deform(gx, gy);
          context.strokeStyle = force > 0.1 ? interactiveColor : color;
          if (gx === -step) context.moveTo(dx, dy);
          else context.lineTo(dx, dy);
        }
        context.stroke();
      }
    } else {
      for (let gx = startX; gx <= width + cell; gx += cell) {
        for (let gy = startY; gy <= height + cell; gy += cell) {
          const [dx, dy, force] = deform(gx, gy);
          context.strokeStyle = force > 0.08 ? interactiveColor : color;
          context.fillStyle = force > 0.08 ? interactiveColor : color;
          if (type === "dot") {
            context.beginPath();
            context.arc(dx, dy, force > 0.08 ? 1.6 : 1, 0, Math.PI * 2);
            context.fill();
          } else {
            const arm = force > 0.08 ? 5 : 3;
            context.beginPath();
            context.moveTo(dx - arm, dy);
            context.lineTo(dx + arm, dy);
            context.moveTo(dx, dy - arm);
            context.lineTo(dx, dy + arm);
            context.stroke();
          }
        }
      }
    }

    if (interactive && activeRef.current) {
      context.beginPath();
      context.arc(px, py, Math.min(influence * 0.55, 78), 0.16, Math.PI * 1.42);
      context.strokeStyle = "rgba(91,255,226,0.28)";
      context.stroke();
      context.beginPath();
      context.arc(px, py, 3, 0, Math.PI * 2);
      context.fillStyle = interactiveColor;
      context.fill();
    }
  }, [animated, color, influence, interactive, interactiveColor, reduceMotion, size, type, x, y]);

  const scheduleDraw = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const resize = new ResizeObserver(scheduleDraw);
    resize.observe(root);
    const stopX = x.on("change", scheduleDraw);
    const stopY = y.on("change", scheduleDraw);
    scheduleDraw();
    return () => {
      resize.disconnect();
      stopX();
      stopY();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [scheduleDraw, x, y]);

  useEffect(() => {
    if (!animated || reduceMotion) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      phaseRef.current += Math.min(32, now - previous) * 0.006;
      previous = now;
      draw();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animated, draw, reduceMotion]);

  const setFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect || !interactive) return;
    targetX.set(event.clientX - rect.left);
    targetY.set(event.clientY - rect.top);
  };

  const center = () => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetX.set(rect.width / 2);
    targetY.set(rect.height / 2);
  };

  return (
    <div
      ref={rootRef}
      {...props}
      tabIndex={props.tabIndex ?? (interactive ? 0 : undefined)}
      role={interactive ? "img" : props.role}
      aria-label={interactive ? props["aria-label"] ?? "Interactive elastic grid" : props["aria-label"]}
      onPointerMove={(event) => {
        setFromPointer(event);
        onPointerMove?.(event);
      }}
      onPointerEnter={(event) => {
        activeRef.current = true;
        setFromPointer(event);
        scheduleDraw();
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        activeRef.current = false;
        center();
        scheduleDraw();
        onPointerLeave?.(event);
      }}
      onFocus={(event) => {
        activeRef.current = true;
        center();
        scheduleDraw();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        activeRef.current = false;
        scheduleDraw();
        onBlur?.(event);
      }}
      className={cn("relative h-full w-full overflow-hidden bg-black outline-none", className)}
      style={{ ...props.style, WebkitMaskImage: masks[fadeMask], maskImage: masks[fadeMask] }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}
