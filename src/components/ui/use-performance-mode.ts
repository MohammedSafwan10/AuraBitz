"use client";

import { useEffect, useState } from "react";

interface PerformanceModeState {
    isLowPerformance: boolean;
    prefersReducedMotion: boolean;
}

const LOW_PERFORMANCE_QUERY = "(max-width: 768px), (prefers-reduced-motion: reduce)";

export function usePerformanceMode(): PerformanceModeState {
    const [state, setState] = useState<PerformanceModeState>({
        isLowPerformance: false,
        prefersReducedMotion: false,
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia(LOW_PERFORMANCE_QUERY);

        const update = () => {
            const memory = typeof navigator !== "undefined" && "deviceMemory" in navigator
                ? Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8)
                : 8;
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const lowConcurrency = typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4;

            setState({
                prefersReducedMotion,
                isLowPerformance:
                    prefersReducedMotion || mediaQuery.matches || memory <= 4 || lowConcurrency,
            });
        };

        update();
        mediaQuery.addEventListener("change", update);

        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    return state;
}
