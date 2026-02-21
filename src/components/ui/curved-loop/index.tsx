"use client";

import { useId, useMemo, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CurvedLoopProps {
    children: string;
    className?: string;
    speed?: number;
    amplitude?: number;
    frequency?: number;
}

export function CurvedLoop({
    children,
    className,
    speed = 10,
    amplitude = 40,
    frequency = 300,
}: CurvedLoopProps) {
    const pathRef = useRef<SVGPathElement>(null);
    const [segmentLength, setSegmentLength] = useState(0);

    const pathData = useMemo(() => {
        let d = `M 0 ${amplitude + 10} `;
        for (let i = 0; i < 30; i++) {
            const start = i * frequency;
            const mid = start + frequency / 2;
            const end = start + frequency;
            d += `Q ${start + frequency / 4} 10 ${mid} ${amplitude + 10} `;
            d += `T ${end} ${amplitude + 10} `;
        }
        return d;
    }, [amplitude, frequency]);

    useEffect(() => {
        if (pathRef.current) {
            const totalLen = pathRef.current.getTotalLength();
            setSegmentLength(totalLen / 30);
        }
    }, [pathData]);

    const id = `curve-${useId()}`;

    const repeatedText = useMemo(() => {
        const spacer = " \u00A0\u00A0 ";
        return Array(20)
            .fill(children + spacer)
            .join("");
    }, [children]);

    return (
        <div
            className={cn("w-full overflow-hidden relative", className)}
            style={{ height: amplitude * 2 + 20 }}
        >
            <svg className="absolute inset-0 w-[500vw] h-full">
                <path
                    id={id}
                    ref={pathRef}
                    d={pathData}
                    fill="none"
                    stroke="none"
                />
                {segmentLength > 0 && (
                    <text className="fill-current text-2xl tracking-widest font-black uppercase">
                        <textPath href={`#${id}`}>
                            {repeatedText}
                            <animate
                                attributeName="startOffset"
                                from="0"
                                to={`${-segmentLength}`}
                                dur={`${speed}s`}
                                repeatCount="indefinite"
                            />
                        </textPath>
                    </text>
                )}
            </svg>
        </div>
    );
}
