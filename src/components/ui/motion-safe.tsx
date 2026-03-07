"use client";

import { useEffect, useRef, useState } from "react";

interface MotionSafeProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    rootMargin?: string;
}

export function MotionSafe({ children, fallback = null, rootMargin = "200px" }: MotionSafeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [rootMargin]);

    return <div ref={containerRef} className="h-full w-full">{isVisible ? children : fallback}</div>;
}
