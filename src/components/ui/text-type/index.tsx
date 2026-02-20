"use client";

import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextTypeProps {
    text: string;
    className?: string;
    delay?: number;
    typingSpeed?: number;
    cursorBlinkSpeed?: number;
    showCursor?: boolean;
    cursorChar?: string;
    cursorClassName?: string;
}

export function TextType({
    text,
    className,
    delay = 0,
    typingSpeed = 0.05,
    cursorBlinkSpeed = 0.8,
    showCursor = true,
    cursorChar = "|",
    cursorClassName,
}: TextTypeProps) {
    const letters = text.split("");
    const controls = useAnimation();
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: typingSpeed,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: { display: "none", opacity: 0 },
        visible: { display: "inline", opacity: 1 },
    };

    return (
        <motion.span
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className={cn("inline-block", className)}
        >
            {letters.map((char, i) => (
                <motion.span key={i} variants={charVariants}>
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
            {showCursor && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: cursorBlinkSpeed,
                        ease: "linear",
                    }}
                    className={cn("inline-block -ml-1 text-emerald-400", cursorClassName)}
                >
                    {cursorChar}
                </motion.span>
            )}
        </motion.span>
    );
}
