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
}

export function TextPressure({
    children,
    className,
    baseWeight = 400,
    maxWeight = 900,
    baseScale = 1,
    maxScale = 1.3,
    radius = 150,
}: TextPressureProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const charMetricsRef = useRef<{ x: number; y: number }[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const rafRef = useRef<number>(0);
    const isHoveringRef = useRef(false);
    const { isLowPerformance, prefersReducedMotion } = usePerformanceMode();

    const chars = useMemo(
        () => children.split("").map((char) => ({ char, isSpace: char === " " })),
        [children]
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateMetrics = () => {
            charMetricsRef.current = charsRef.current.map((el) => {
                if (!el) return { x: -1000, y: -1000 };

                const rect = el.getBoundingClientRect();
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                };
            });
        };

        const animate = () => {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            charsRef.current.forEach((el, index) => {
                if (!el) return;
                const metric = charMetricsRef.current[index] ?? { x: -1000, y: -1000 };
                const dist = Math.hypot(mx - metric.x, my - metric.y);

                let weight = baseWeight;
                let scale = baseScale;

                if (dist < radius) {
                    const t = 1 - dist / radius;
                    weight = baseWeight + (maxWeight - baseWeight) * t;
                    scale = baseScale + (maxScale - baseScale) * t;
                }

                el.style.fontWeight = String(Math.round(weight));
                el.style.transform = `scale(${scale.toFixed(3)})`;
            });

            if (isHoveringRef.current) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const onMouseEnter = () => {
            if (isLowPerformance || prefersReducedMotion) return;

            updateMetrics();
            isHoveringRef.current = true;
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(animate);
        };

        const onMouseLeave = () => {
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
            isHoveringRef.current = false;
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(animate);
        };

        updateMetrics();

        container.addEventListener("mousemove", onMouseMove, { passive: true });
        container.addEventListener("mouseenter", onMouseEnter);
        container.addEventListener("mouseleave", onMouseLeave);
        window.addEventListener("resize", updateMetrics, { passive: true });
        window.addEventListener("scroll", updateMetrics, { passive: true });

        return () => {
            container.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("mouseenter", onMouseEnter);
            container.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("resize", updateMetrics);
            window.removeEventListener("scroll", updateMetrics);
            cancelAnimationFrame(rafRef.current);
        };
    }, [baseWeight, maxWeight, baseScale, maxScale, radius, isLowPerformance, prefersReducedMotion]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "inline-flex flex-wrap items-baseline justify-center cursor-default select-none",
                className
            )}
        >
            {chars.map((c, i) =>
                c.isSpace ? (
                    <span key={i} className="inline-block w-[0.3em]" />
                ) : (
                    <span
                        key={i}
                        ref={(el) => { charsRef.current[i] = el; }}
                        className="inline-block transition-[font-weight,transform] duration-150 ease-out"
                        style={{
                            fontWeight: baseWeight,
                            transformOrigin: "center bottom",
                        }}
                    >
                        {c.char}
                    </span>
                )
            )}
        </div>
    );
}
