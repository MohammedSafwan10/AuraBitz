"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface GridSystemProps extends React.HTMLAttributes<HTMLDivElement> {
    type?: "dot" | "line" | "cross";
    size?: number;
    color?: string; // Base dim grid color
    interactiveColor?: string; // Reveal highlight color
    animated?: boolean;
    interactive?: boolean;
    fadeMask?: "radial" | "linear" | "none";
    className?: string;
}

export function GridSystem({
    type = "dot",
    size = 40,
    color = "rgba(255,255,255,0.05)",
    interactiveColor = "rgba(255,255,255,0.8)",
    animated = false,
    interactive = true,
    fadeMask = "radial",
    className,
    ...props
}: GridSystemProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Dynamic SVG Generation for absolute precision
    const patternUrl = useMemo(() => {
        let svg = "";
        const c = size / 2;

        if (type === "dot") {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${c}" cy="${c}" r="1" fill="${color}"/></svg>`;
        } else if (type === "line") {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path d="M0 0h${size}M0 0v${size}" stroke="${color}" stroke-width="1" fill="none"/></svg>`;
        } else if (type === "cross") {
            const l = 4; // arm length
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path d="M${c} ${c - l}v${l * 2}M${c - l} ${c}h${l * 2}" stroke="${color}" stroke-width="1" fill="none"/></svg>`;
        }
        return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
    }, [type, size, color]);

    const highlightUrl = useMemo(() => {
        let svg = "";
        const c = size / 2;
        if (type === "dot") {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${c}" cy="${c}" r="1.5" fill="${interactiveColor}"/></svg>`;
        } else if (type === "line") {
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path d="M0 0h${size}M0 0v${size}" stroke="${interactiveColor}" stroke-width="1" fill="none"/></svg>`;
        } else if (type === "cross") {
            const l = 4;
            svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path d="M${c} ${c - l}v${l * 2}M${c - l} ${c}h${l * 2}" stroke="${interactiveColor}" stroke-width="1.5" fill="none"/></svg>`;
        }
        return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
    }, [type, size, interactiveColor]);

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

    const spotlightMask = useMotionTemplate`radial-gradient(150px circle at ${smoothX}px ${smoothY}px, black, transparent 80%)`;

    // Static layout masks
    const getLayoutMask = () => {
        if (fadeMask === "radial") {
            return "radial-gradient(ellipse at center, black 20%, transparent 80%)";
        } else if (fadeMask === "linear") {
            return "linear-gradient(to bottom, black 20%, transparent 100%)";
        }
        return "none";
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn("relative w-full h-full overflow-hidden bg-[#0a0a0a]", className)}
            style={{ WebkitMaskImage: getLayoutMask() }}
            {...props}
        >
            {/* Base Background Grid */}
            <div
                className={cn(
                    "absolute inset-0 z-0",
                    animated && "animate-[grid-drift_60s_linear_infinite]"
                )}
                style={{
                    backgroundImage: patternUrl,
                    backgroundSize: `${size}px ${size}px`,
                    // Animate drift using CSS animation instead of Framer for 0 overhead on static views
                    transform: animated ? "translateX(-50%) translateY(-50%)" : "none",
                    width: animated ? "200%" : "100%",
                    height: animated ? "200%" : "100%",
                }}
            />

            {/* Interactive Spotlight Overlay */}
            {interactive && (
                <motion.div
                    className="absolute inset-0 z-10 transition-opacity duration-500 pointer-events-none mix-blend-screen"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        WebkitMaskImage: spotlightMask,
                        maskImage: spotlightMask,
                    }}
                >
                    <div
                        className={cn(
                            "absolute inset-0",
                            animated && "animate-[grid-drift_60s_linear_infinite]"
                        )}
                        style={{
                            backgroundImage: highlightUrl,
                            backgroundSize: `${size}px ${size}px`,
                            transform: animated ? "translateX(-50%) translateY(-50%)" : "none",
                            width: animated ? "200%" : "100%",
                            height: animated ? "200%" : "100%",
                        }}
                    />
                </motion.div>
            )}
        </div>
    );
}
