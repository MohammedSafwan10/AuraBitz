"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxFloatingCardProps {
    children: ReactNode;
    className?: string;
    depth?: number; // How much it reacts to mouse (1-5)
    containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function ParallaxFloatingCard({ children, className, depth = 2, containerRef }: ParallaxFloatingCardProps) {
    const backupRef = useRef<HTMLDivElement>(null);
    const activeRef = containerRef || backupRef;

    const xPos = useMotionValue(0);
    const yPos = useMotionValue(0);

    const smoothX = useSpring(xPos, { stiffness: 400, damping: 30, mass: 0.8 });
    const smoothY = useSpring(yPos, { stiffness: 400, damping: 30, mass: 0.8 });

    // Rotate up to a few degrees
    const rotateX = useTransform(smoothY, [-0.5, 0.5], [`${depth * 3}deg`, `-${depth * 3}deg`]);
    const rotateY = useTransform(smoothX, [-0.5, 0.5], [`-${depth * 3}deg`, `${depth * 3}deg`]);

    // Slight translation based on depth
    const translateX = useTransform(smoothX, [-0.5, 0.5], [`-${depth * 8}px`, `${depth * 8}px`]);
    const translateY = useTransform(smoothY, [-0.5, 0.5], [`-${depth * 8}px`, `${depth * 8}px`]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = activeRef.current?.getBoundingClientRect();
        if (!rect) return;

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize to -0.5 to 0.5
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        xPos.set(xPct);
        yPos.set(yPct);
    };

    const handleMouseLeave = () => {
        xPos.set(0);
        yPos.set(0);
    };

    // Calculate light position % (0 to 100)
    const lightX = useTransform(smoothX, [-0.5, 0.5], [0, 100]);
    const lightY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);
    const backgroundImage = useMotionTemplate`radial-gradient(800px circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.06), transparent 50%)`;

    return (
        <motion.div
            ref={backupRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "relative rounded-3xl backdrop-blur-2xl bg-white/[0.02] border border-white/[0.1] shadow-2xl overflow-hidden",
                className
            )}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-100 z-10 mix-blend-screen transition-opacity duration-300"
                style={{ backgroundImage }}
            />
            <div style={{ transform: `translateZ(${depth * 15}px)`, transformStyle: "preserve-3d" }} className="w-full h-full relative z-20">
                {children}
            </div>
        </motion.div>
    );
}
