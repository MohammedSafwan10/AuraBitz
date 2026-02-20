"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadialNoiseProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    spotlightSize?: number;
    baseColor?: string;
    glowColor?: string;
    noiseOpacity?: number;
    interactive?: boolean;
    frequency?: number;
}

export function RadialNoise({
    children,
    className,
    spotlightSize = 400,
    baseColor = "#050505",
    glowColor = "rgba(168, 85, 247, 0.4)", // Purple default
    noiseOpacity = 0.5,
    interactive = true,
    frequency = 0.8,
    ...props
}: RadialNoiseProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
    const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || !interactive) return;
        const rect = divRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }, [mouseX, mouseY, interactive]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        if (!divRef.current || !interactive) return;
        const rect = divRef.current.getBoundingClientRect();
        // Return to center gracefully
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 2);
    }, [mouseX, mouseY, interactive]);

    // Set initial position to center on mount
    useEffect(() => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            mouseX.set(rect.width / 2);
            mouseY.set(rect.height / 2);
        }
    }, [mouseX, mouseY]);

    const spotlight = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${smoothX}px ${smoothY}px, ${glowColor}, transparent 80%)`;

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={cn("relative w-full h-full overflow-hidden", className)}
            style={{ backgroundColor: baseColor }}
            {...props}
        >
            {/* SVG Fractal Noise Layer */}
            <div
                className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                style={{
                    opacity: noiseOpacity,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${frequency}' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Color Dodge Interaction Light (ignites the noise texture) */}
            {interactive && (
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-color-dodge transition-opacity duration-1000"
                    style={{
                        background: spotlight,
                        opacity: isHovered ? 1 : 0.4, // Keep a soft glow in center when idle
                    }}
                />
            )}

            {/* Ambient Base Light (fills space so the background isn't pure black) */}
            {interactive && (
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
                    style={{
                        background: spotlight,
                        opacity: isHovered ? 0.3 : 0.1,
                    }}
                />
            )}

            <div className="relative z-20 h-full w-full">{children}</div>
        </div>
    );
}
