"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
    children: string;
    className?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
    splitBy?: "chars" | "words";
    once?: boolean;
    animateBy?: "letters" | "words"; // Deprecated, keeping splitBy
}

export function BlurText({
    children,
    className,
    delay = 0,
    stagger = 0.05,
    duration = 0.8,
    splitBy = "chars",
    once = false,
}: BlurTextProps) {
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

    const containerVariants: Variants = {
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
            y: 20,
            filter: "blur(15px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: duration,
                ease: "easeOut",
            },
        },
    };

    const words = children.split(" ");
    const elements: React.ReactNode[] = [];

    words.forEach((word, wordIndex) => {
        if (splitBy === "words") {
            elements.push(
                <motion.span
                    key={wordIndex}
                    variants={itemVariants}
                    className="inline-block"
                >
                    {word}
                </motion.span>
            );
            if (wordIndex < words.length - 1) {
                elements.push(<span key={"space-" + wordIndex}>&nbsp;</span>);
            }
        } else {
            // Chars
            const chars = word.split("");
            const charElements = chars.map((char, charIndex) => (
                <motion.span
                    key={"char-" + wordIndex + "-" + charIndex}
                    variants={itemVariants}
                    className="inline-block"
                >
                    {char}
                </motion.span>
            ));

            elements.push(
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {charElements}
                </span>
            );
            if (wordIndex < words.length - 1) {
                elements.push(<span key={"space-" + wordIndex} className="inline-block">&nbsp;</span>);
            }
        }
    });

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className={cn("inline-flex flex-wrap items-center", className)}
        >
            {elements}
        </motion.div>
    );
}
