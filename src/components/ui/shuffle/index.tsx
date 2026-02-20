"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShuffleTextProps {
    texts: string[];
    className?: string;
    characterSet?: string;
    interval?: number;
    shuffleDuration?: number;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";

export function ShuffleText({
    texts,
    className,
    characterSet = DEFAULT_CHARS,
    interval = 3000,
    shuffleDuration = 0.8,
}: ShuffleTextProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState(texts[0]);

    const isShuffling = useRef(false);
    const startTimeRef = useRef<number | null>(null);

    // Initial delay for the first switch
    useEffect(() => {
        const switchInterval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
            isShuffling.current = true;
            startTimeRef.current = null; // Reset animation time for new word
        }, interval);

        return () => clearInterval(switchInterval);
    }, [interval, texts.length]);

    useAnimationFrame((time) => {
        if (!isShuffling.current) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = time;
        }

        const elapsed = time - startTimeRef.current;
        const progress = Math.min(elapsed / (shuffleDuration * 1000), 1);

        const targetText = texts[currentIndex];

        if (progress === 1) {
            setDisplayText(targetText);
            isShuffling.current = false;
            return;
        }

        const targetLength = targetText.length;
        const revealCount = Math.floor(progress * targetLength);

        let scrambledStr = "";
        for (let i = 0; i < targetLength; i++) {
            if (targetText[i] === " ") {
                scrambledStr += " ";
            } else if (i < revealCount) {
                scrambledStr += targetText[i];
            } else {
                scrambledStr += characterSet[Math.floor(Math.random() * characterSet.length)];
            }
        }

        setDisplayText(scrambledStr);
    });

    return (
        <span className={cn("inline-block whitespace-pre-wrap", className)}>
            {displayText}
        </span>
    );
}
