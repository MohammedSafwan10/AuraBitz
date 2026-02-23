"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const rafRef = useRef<number>(0);
    const isHoveringRef = useRef(false);

    // Flatten characters with word boundaries
    const chars: { char: string; isSpace: boolean }[] = [];
    children.split("").forEach((c) => {
        chars.push({ char: c, isSpace: c === " " });
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const animate = () => {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            charsRef.current.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);

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
            isHoveringRef.current = true;
            rafRef.current = requestAnimationFrame(animate);
        };

        const onMouseLeave = () => {
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
            isHoveringRef.current = false;
            rafRef.current = requestAnimationFrame(animate);
        };

        container.addEventListener("mousemove", onMouseMove);
        container.addEventListener("mouseenter", onMouseEnter);
        container.addEventListener("mouseleave", onMouseLeave);

        return () => {
            container.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("mouseenter", onMouseEnter);
            container.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(rafRef.current);
        };
    }, [baseWeight, maxWeight, baseScale, maxScale, radius]);

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
