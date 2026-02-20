"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticTextProps {
    children: string;
    className?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
    splitBy?: "chars" | "words"; // Add words option if they want whole words
    once?: boolean;
}

export function KineticText({
    children,
    className,
    delay = 0,
    stagger = 0.05,
    duration = 0.8,
    splitBy = "chars",
    once = false,
}: KineticTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else if (!once) {
            controls.start("hidden");
        }
    }, [inView, controls, once]);

    const elements = splitBy === "chars" ? children.split("") : children.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 40,
            rotateX: -90,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: duration,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className={cn("inline-flex flex-wrap items-center overflow-hidden", className)}
        >
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    variants={itemVariants}
                    style={{ whiteSpace: "pre" }} // preserve spaces if splitting by words
                    className="inline-block relative origin-bottom"
                >
                    {element === " " && splitBy === "chars" ? "\u00A0" : element}
                    {splitBy === "words" && index < elements.length - 1 ? "\u00A0" : null}
                </motion.span>
            ))}
        </motion.div>
    );
}
