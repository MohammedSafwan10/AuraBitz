"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadialNoiseProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightSize?: number;
  baseColor?: string;
  glowColor?: string;
  noiseOpacity?: number;
  interactive?: boolean;
  frequency?: number;
  rings?: number;
}

export function RadialNoise({
  children,
  className,
  spotlightSize = 300,
  baseColor = "#000000",
  glowColor = "rgba(91, 255, 226, 0.72)",
  noiseOpacity = 0.58,
  interactive = true,
  frequency = 0.8,
  rings = 46,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}: RadialNoiseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 150, damping: 22, mass: 0.8 });
  const y = useSpring(targetY, { stiffness: 150, damping: 22, mass: 0.8 });

  const draw = useCallback(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const rect = root.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = baseColor;
    context.fillRect(0, 0, width, height);

    const cx = width * 0.62;
    const cy = height * 0.46;
    const px = x.get();
    const py = y.get();
    const vx = velocityRef.current.x;
    const vy = velocityRef.current.y;
    const maximum = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy)) * 1.12;
    const ringCount = Math.max(18, Math.min(72, rings));
    const segments = Math.max(80, Math.min(180, Math.round(width / 6)));

    context.lineWidth = 0.72;
    for (let ring = 1; ring <= ringCount; ring += 1) {
      const radius = (ring / ringCount) * maximum;
      const alpha = (0.09 + (1 - ring / ringCount) * 0.24) * Math.max(0.1, noiseOpacity);
      context.beginPath();
      for (let segment = 0; segment <= segments; segment += 1) {
        const angle = (segment / segments) * Math.PI * 2;
        const noise =
          Math.sin(angle * (5 + frequency * 3) + ring * 1.73) * (1.1 + frequency * 1.5) +
          Math.sin(angle * 17 - ring * 0.61) * 0.75;
        let rx = cx + Math.cos(angle) * (radius + noise);
        let ry = cy + Math.sin(angle) * (radius + noise);
        if (interactive) {
          const dx = rx - px;
          const dy = ry - py;
          const distance = Math.hypot(dx, dy);
          if (distance < spotlightSize && distance > 0.01) {
            const force = (1 - distance / spotlightSize) ** 2;
            const sweep = (vx * Math.cos(angle) + vy * Math.sin(angle)) * 0.38;
            rx += (dx / distance) * force * 24 - vx * force * 0.7 + Math.cos(angle) * sweep;
            ry += (dy / distance) * force * 24 - vy * force * 0.7 + Math.sin(angle) * sweep;
          }
        }
        if (segment === 0) context.moveTo(rx, ry);
        else context.lineTo(rx, ry);
      }
      context.strokeStyle = `rgba(255,255,255,${alpha})`;
      context.stroke();
    }

    const core = context.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.18);
    core.addColorStop(0, activeRef.current ? glowColor : "rgba(91,255,226,.52)");
    core.addColorStop(0.14, "rgba(91,255,226,.18)");
    core.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = core;
    context.fillRect(0, 0, width, height);

    if (interactive && activeRef.current) {
      const wake = context.createRadialGradient(px, py, 0, px, py, spotlightSize * 0.48);
      wake.addColorStop(0, "rgba(91,255,226,.13)");
      wake.addColorStop(1, "rgba(91,255,226,0)");
      context.fillStyle = wake;
      context.fillRect(px - spotlightSize, py - spotlightSize, spotlightSize * 2, spotlightSize * 2);
    }
  }, [baseColor, frequency, glowColor, interactive, noiseOpacity, rings, spotlightSize, x, y]);

  const scheduleDraw = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      velocityRef.current.x *= 0.82;
      velocityRef.current.y *= 0.82;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const center = () => {
      const rect = root.getBoundingClientRect();
      targetX.set(rect.width * 0.62);
      targetY.set(rect.height * 0.46);
      scheduleDraw();
    };
    center();
    const resize = new ResizeObserver(center);
    resize.observe(root);
    const stopX = x.on("change", scheduleDraw);
    const stopY = y.on("change", scheduleDraw);
    return () => {
      resize.disconnect();
      stopX();
      stopY();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [scheduleDraw, targetX, targetY, x, y]);

  const setFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect || !interactive) return;
    const nextX = event.clientX - rect.left;
    const nextY = event.clientY - rect.top;
    if (!reduceMotion) {
      velocityRef.current = {
        x: nextX - lastPointerRef.current.x,
        y: nextY - lastPointerRef.current.y,
      };
    }
    lastPointerRef.current = { x: nextX, y: nextY };
    targetX.set(nextX);
    targetY.set(nextY);
  };

  const returnToSource = () => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetX.set(rect.width * 0.62);
    targetY.set(rect.height * 0.46);
  };

  return (
    <div
      ref={rootRef}
      {...props}
      tabIndex={props.tabIndex ?? (interactive ? 0 : undefined)}
      role={interactive ? "img" : props.role}
      aria-label={interactive ? props["aria-label"] ?? "Interactive radial interference field" : props["aria-label"]}
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
        velocityRef.current = { x: 0, y: 0 };
        returnToSource();
        onPointerLeave?.(event);
      }}
      onFocus={(event) => {
        activeRef.current = true;
        returnToSource();
        scheduleDraw();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        activeRef.current = false;
        returnToSource();
        onBlur?.(event);
      }}
      className={cn("relative h-full w-full overflow-hidden bg-black outline-none", className)}
      style={{ ...props.style, backgroundColor: baseColor }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}
