"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface CircularTextProps {
    text: string;
    radius?: number;
    className?: string;
    spinDuration?: number;
    onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
}

export function CircularText({
    text,
    radius = 100,
    spinDuration = 10,
    onHover = "slowDown",
    className,
}: CircularTextProps) {
    const letters = text.split("");
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            rotate: 360,
            transition: {
                ease: "linear",
                duration: spinDuration,
                repeat: Infinity,
            },
        });
    }, [controls, spinDuration]);

    const handleHoverStart = () => {
        if (!onHover) return;
        switch (onHover) {
            case "slowDown":
                controls.start({
                    rotate: 360,
                    transition: { ease: "linear", duration: spinDuration * 3, repeat: Infinity },
                });
                break;
            case "speedUp":
                controls.start({
                    rotate: 360,
                    transition: { ease: "linear", duration: spinDuration / 4, repeat: Infinity },
                });
                break;
            case "pause":
                controls.stop();
                break;
            case "goBonkers":
                controls.start({
                    rotate: 360,
                    transition: { ease: "backInOut", duration: 1, repeat: Infinity },
                });
                break;
        }
    };

    const handleHoverEnd = () => {
        controls.start({
            rotate: 360,
            transition: { ease: "linear", duration: spinDuration, repeat: Infinity },
        });
    };

    return (
        <motion.div
            animate={controls}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            className={cn("relative flex items-center justify-center rounded-full font-mono uppercase tracking-widest", className)}
            style={{ width: radius * 2, height: radius * 2 }}
        >
            {letters.map((letter, i) => {
                const rotation = (360 / letters.length) * i;
                return (
                    <span
                        key={i}
                        className="absolute origin-bottom font-bold"
                        style={{
                            height: radius,
                            transform: `rotate(${rotation}deg)`,
                            transformOrigin: "bottom center",
                            top: 0,
                            left: "50%",
                            marginLeft: "-0.5ch"
                        }}
                    >
                        {letter}
                    </span>
                );
            })}
        </motion.div>
    );
}
