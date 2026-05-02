"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/components/ui/use-performance-mode";

interface MeshDistortBGProps {
    className?: string;
    children?: React.ReactNode;
}

export function MeshDistortBG({ className, children }: MeshDistortBGProps) {
    const { isLowPerformance, prefersReducedMotion } = usePerformanceMode();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsVisible(document.visibilityState === "visible");
        };

        handleVisibilityChange();
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    const sphereSegments = isLowPerformance ? 32 : 64;
    const shouldAnimate = isVisible && !prefersReducedMotion;

    return (
        <div className={cn("relative w-full h-full bg-[#050000] overflow-hidden", className)}>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    dpr={isLowPerformance ? [1, 1] : [1, 1.5]}
                    frameloop={shouldAnimate ? "always" : "demand"}
                    gl={{ antialias: false, alpha: true }}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={2} color="#ff0000" />
                    <directionalLight position={[-10, -10, -5]} intensity={1} color="#4a0000" />

                    {/* Background massive gentle blob */}
                    <Float speed={shouldAnimate ? 1.5 : 0} rotationIntensity={shouldAnimate ? 0.5 : 0} floatIntensity={shouldAnimate ? 1 : 0} position={[0, 0, -5]}>
                        <Sphere args={[1, sphereSegments, sphereSegments]} scale={4.5}>
                            <MeshDistortMaterial
                                color="#8B0000"
                                emissive="#330000"
                                emissiveIntensity={0.2}
                                roughness={0.4}
                                metalness={0.6}
                                distort={prefersReducedMotion ? 0.15 : 0.6}
                                speed={shouldAnimate ? 1.5 : 0}
                            />
                        </Sphere>
                    </Float>

                    {/* Foreground sharper reactive blob */}
                    <Float speed={shouldAnimate ? 2.5 : 0} rotationIntensity={shouldAnimate ? 1.5 : 0} floatIntensity={shouldAnimate ? 1.5 : 0} position={[1, -1, -2]}>
                        <Sphere args={[1, sphereSegments, sphereSegments]} scale={1.8}>
                            <MeshDistortMaterial
                                color="#ff0033"
                                emissive="#ff0000"
                                emissiveIntensity={0.5}
                                roughness={0.1}
                                metalness={0.9}
                                distort={prefersReducedMotion ? 0.12 : 0.4}
                                speed={shouldAnimate ? 3 : 0}
                            />
                        </Sphere>
                    </Float>

                    {/* Left mid-ground blob */}
                    <Float speed={shouldAnimate ? 1.8 : 0} rotationIntensity={shouldAnimate ? 1 : 0} floatIntensity={shouldAnimate ? 1 : 0} position={[-2, 1, -3]}>
                        <Sphere args={[1, sphereSegments, sphereSegments]} scale={1.2}>
                            <MeshDistortMaterial
                                color="#ff0044"
                                emissive="#ff0000"
                                emissiveIntensity={0.3}
                                roughness={0.2}
                                metalness={0.8}
                                distort={prefersReducedMotion ? 0.12 : 0.5}
                                speed={shouldAnimate ? 2 : 0}
                            />
                        </Sphere>
                    </Float>

                </Canvas>
                {/* Heavy vignette to restrict the bright red to the center/canvas subjects */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5,0,0,1) 80%)' }}
                />
            </div>
            {/* Real DOM content goes on top safely */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
}
