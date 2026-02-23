"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrambleRevealProps {
    children: string;
    className?: string;
    characters?: string;
    duration?: number;
    delay?: number;
    once?: boolean;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export function ScrambleReveal({
    children,
    className,
    characters = DEFAULT_CHARS,
    duration = 1,
    delay = 0,
    once = true,
}: ScrambleRevealProps) {
    const text = children;
    // Initial state: normal text so SSR doesn't mismatch, scrambled client-side when animating
    const [displayText, setDisplayText] = useState<string>(text);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once });

    const [isAnimating, setIsAnimating] = useState(false);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (inView) {
            startTimeRef.current = null;
            if (delay > 0) {
                const scrambledInit = text.split("").map(c => c === " " ? " " : characters[Math.floor(Math.random() * characters.length)]).join("");
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setDisplayText(scrambledInit);
            }
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, delay * 1000);
            return () => clearTimeout(timer);
        } else if (!once) {
            setIsAnimating(false);
            setDisplayText(text);
        }
    }, [inView, delay, once, text, characters]);

    useAnimationFrame((time) => {
        if (!isAnimating) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = time;
        }

        const elapsed = time - startTimeRef.current;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        if (progress === 1) {
            setDisplayText(text);
            setIsAnimating(false);
            return;
        }

        const charArray = text.split("");
        const revealCount = Math.floor(progress * charArray.length);

        const scrambled = charArray.map((char, index) => {
            if (char === " ") return " ";
            if (index < revealCount) {
                return char;
            }
            return characters[Math.floor(Math.random() * characters.length)];
        });

        setDisplayText(scrambled.join(""));
    });

    return (
        <span ref={ref} className={cn("inline-block whitespace-pre-wrap", className)}>
            {displayText}
        </span>
    );
}
