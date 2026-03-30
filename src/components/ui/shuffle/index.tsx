"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
    const safeTexts = useMemo(() => (texts.length > 0 ? texts : [""]), [texts]);
    const safeCharacterSet = useMemo(
        () => (characterSet.length > 0 ? characterSet : DEFAULT_CHARS),
        [characterSet]
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState(safeTexts[0]);
    const shouldRotate = safeTexts.length > 1;
    const normalizedCurrentIndex = currentIndex >= safeTexts.length ? 0 : currentIndex;

    const isShuffling = useRef(false);
    const startTimeRef = useRef<number | null>(null);

    // Initial delay for the first switch
    useEffect(() => {
        if (!shouldRotate) {
            return;
        }

        const switchInterval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % safeTexts.length);
            isShuffling.current = true;
            startTimeRef.current = null; // Reset animation time for new word
        }, interval);

        return () => clearInterval(switchInterval);
    }, [interval, safeTexts.length, shouldRotate]);

    useAnimationFrame((time) => {
        if (!shouldRotate) {
            if (displayText !== safeTexts[0]) {
                setDisplayText(safeTexts[0]);
            }
            return;
        }

        if (!isShuffling.current) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = time;
        }

        const elapsed = time - startTimeRef.current;
        const progress = Math.min(elapsed / (shuffleDuration * 1000), 1);

        const targetText = safeTexts[normalizedCurrentIndex] ?? "";

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
                scrambledStr += safeCharacterSet[Math.floor(Math.random() * safeCharacterSet.length)];
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
