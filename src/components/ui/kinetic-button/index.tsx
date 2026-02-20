"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    magneticPull?: number;
    variant?: "primary" | "secondary" | "ghost" | "danger";
}

export function KineticButton({
    children,
    className,
    magneticPull = 0.2,
    variant = "primary",
    ...props
}: KineticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouse = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Magnetic displacement
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * magneticPull, y: middleY * magneticPull });

        // Internal glow position (percentage-based for the shimmer)
        setGlowPos({ x: ((clientX - left) / width) * 100, y: ((clientY - top) / height) * 100 });
    }, [magneticPull]);

    const reset = useCallback(() => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    }, []);

    const variants = {
        primary: "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
        secondary: "bg-[#111] text-white border border-white/10 hover:border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]",
        ghost: "bg-transparent text-white/70 hover:text-white border border-transparent hover:border-white/[0.05] hover:bg-white/[0.02]",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30",
    };

    const glowColors = {
        primary: "rgba(0,0,0,0.1)",
        secondary: "rgba(255,255,255,0.15)",
        ghost: "rgba(255,255,255,0.08)",
        danger: "rgba(239,68,68,0.2)", // red-500
    };

    const borderTrackingColors = {
        primary: "rgba(0,0,0,0)",
        secondary: "rgba(255,255,255,0.4)",
        ghost: "rgba(255,255,255,0.2)",
        danger: "rgba(239,68,68,0.5)",
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse as (e: React.MouseEvent<Element, MouseEvent>) => void}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
            className={cn(
                "relative inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[13px] tracking-wide overflow-hidden",
                "transition-colors duration-300 focus:outline-none cursor-pointer group",
                variants[variant],
                className
            )}
            {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
        >
            {/* Ambient Border Tracker (Only visible on hover, mask hides the center) */}
            {variant !== "primary" && (
                <div
                    className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle 50px at ${glowPos.x}% ${glowPos.y}%, ${borderTrackingColors[variant]}, transparent 100%)`,
                        padding: "1px", // Acts as a border width
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                    }}
                />
            )}

            {/* Internal Shimmer Layer */}
            <div
                className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle 60px at ${glowPos.x}% ${glowPos.y}%, ${glowColors[variant]}, transparent 70%)`,
                }}
            />

            <span className="relative z-10 transition-transform duration-200 group-active:scale-[0.98]">
                {children}
            </span>
        </motion.button>
    );
}
