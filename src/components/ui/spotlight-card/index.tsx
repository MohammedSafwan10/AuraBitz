"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    spotlightSize?: number;
    withNoise?: boolean;
}

export function SpotlightCard({
    children,
    className,
    spotlightColor = "rgba(255, 255, 255, 0.03)",
    spotlightSize = 400,
    withNoise = true,
    ...props
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Apply spring physics for buttery smooth light tracking rather than raw mouse jumps
    const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
    const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }, [mouseX, mouseY]);

    // Motion templates for highly performant CSS updates
    const borderBackground = useMotionTemplate`radial-gradient(${spotlightSize * 0.8}px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.4), transparent 50%)`;
    const interiorBackground = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${smoothX}px ${smoothY}px, ${spotlightColor}, transparent 60%)`;
    const noiseMask = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${smoothX}px ${smoothY}px, black, transparent 80%)`;

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={cn(
                "relative overflow-hidden rounded-[2rem] bg-[#050505] border border-white/[0.04] transition-colors duration-500",
                "hover:border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.5)]",
                className
            )}
            {...props}
        >
            {/* Base ambient noise (very subtle background grain) */}
            {withNoise && (
                <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            )}

            {/* Glowing border trace - CSS Masking over Framer Motion Template */}
            <motion.div
                className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-500 rounded-[2rem]"
                style={{
                    opacity: opacity,
                    background: borderBackground,
                    WebkitMaskImage: `linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)`,
                    WebkitMaskComposite: "xor",
                    maskImage: `linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)`,
                    maskComposite: "exclude",
                    padding: "1px",
                }}
            />

            {/* Interior radiant glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
                style={{
                    opacity: opacity,
                    background: interiorBackground,
                }}
            />

            {/* Illuminated Noise Overlay - only visible exactly where the light shines */}
            {withNoise && (
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-color-dodge transition-opacity duration-500"
                    style={{
                        opacity: opacity * 0.8,
                        WebkitMaskImage: noiseMask,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            )}

            <div className="relative z-20 h-full w-full">{children}</div>
        </div>
    );
}
