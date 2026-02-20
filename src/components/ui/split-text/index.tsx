"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationStyle = "slideUp" | "slideDown" | "fade" | "blur";

interface SplitTextProps {
    children: string;
    className?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
    splitBy?: "chars" | "words";
    animation?: AnimationStyle;
    once?: boolean;
    onComplete?: () => void;
}

const getVariants = (animation: AnimationStyle, duration: number): Variants => {
    switch (animation) {
        case "slideUp":
            return {
                hidden: { y: "150%", opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", damping: 18, stiffness: 200, duration },
                },
            };
        case "slideDown":
            return {
                hidden: { y: "-150%", opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", damping: 18, stiffness: 200, duration },
                },
            };
        case "fade":
            return {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { duration, ease: "easeOut" },
                },
            };
        case "blur":
            return {
                hidden: { opacity: 0, filter: "blur(12px)", scale: 0.9 },
                visible: {
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    transition: { duration: duration * 1.5, ease: "backOut" },
                },
            };
        default:
            return {
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            };
    }
};

export function SplitText({
    children,
    className,
    delay = 0,
    stagger = 0.05,
    duration = 0.6,
    splitBy = "chars",
    animation = "slideUp",
    once = false,
    onComplete,
}: SplitTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible").then(() => {
                if (onComplete) onComplete();
            });
        } else if (!once) {
            controls.start("hidden");
        }
    }, [inView, controls, once, onComplete]);

    const words = children.split(" ");

    // Create elements based on split preference
    const elements: React.ReactNode[] = [];

    words.forEach((word, wordIndex) => {
        if (splitBy === "words") {
            elements.push(
                <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden py-2" style={{ marginTop: "-0.5rem", marginBottom: "-0.5rem" }}>
                    <motion.span variants={getVariants(animation, duration)} className="inline-block">
                        {word}
                    </motion.span>
                    {wordIndex < words.length - 1 && <span>&nbsp;</span>}
                </span>
            );
        } else {
            // Chars
            const chars = word.split("");
            const charElements = chars.map((char, charIndex) => (
                <span key={`${wordIndex}-${charIndex}`} className="inline-block overflow-hidden py-2" style={{ marginTop: "-0.5rem", marginBottom: "-0.5rem" }}>
                    <motion.span variants={getVariants(animation, duration)} className="inline-block">
                        {char}
                    </motion.span>
                </span>
            ));

            elements.push(
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {charElements}
                    {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            );
        }
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay,
                    },
                },
            }}
            className={cn("inline-flex flex-wrap items-center", className)}
        >
            {elements}
        </motion.div>
    );
}
