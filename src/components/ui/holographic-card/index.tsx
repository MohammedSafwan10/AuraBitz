"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function HolographicCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    // The specular highlight follows cursor position exactly
    const highlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const highlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
    const highlightOpacity = useTransform(
        mouseXSpring,
        [-0.5, -0.1, 0, 0.1, 0.5],
        [0.15, 0.4, 0.5, 0.4, 0.15]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className={cn(
                "relative rounded-xl bg-[#0a0a0a] border border-white/[0.08]",
                "cursor-default group/card",
                className
            )}
        >
            {/* Specular light — a tight, bright elliptical highlight that moves with the cursor */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 rounded-xl overflow-hidden"
                style={{ transform: "translateZ(5px)" }}
            >
                <motion.div
                    className="absolute w-[200%] h-[200%]"
                    style={{
                        left: highlightX,
                        top: highlightY,
                        x: "-50%",
                        y: "-50%",
                        opacity: highlightOpacity,
                        background:
                            "radial-gradient(ellipse 35% 35% at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
                    }}
                />
            </motion.div>

            {/* Reflection line — a single bright edge that simulates a light source above */}
            <motion.div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px rounded-t-xl"
                style={{
                    opacity: useTransform(mouseYSpring, [-0.5, 0, 0.5], [0.6, 0.2, 0]),
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                }}
            />

            {/* Content — pushed forward in Z-space for real depth */}
            <div
                className="relative z-20 h-full w-full"
                style={{ transform: "translateZ(25px)" }}
            >
                {children}
            </div>
        </motion.div>
    );
}
