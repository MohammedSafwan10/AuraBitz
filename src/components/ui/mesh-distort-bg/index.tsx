"use client";

import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { cn } from "@/lib/utils";

interface MeshDistortBGProps {
    className?: string;
    children?: React.ReactNode;
}

export function MeshDistortBG({ className, children }: MeshDistortBGProps) {
    return (
        <div className={cn("relative w-full h-full bg-[#050000] overflow-hidden", className)}>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: false, alpha: true }}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={2} color="#ff0000" />
                    <directionalLight position={[-10, -10, -5]} intensity={1} color="#4a0000" />

                    {/* Background massive gentle blob */}
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={[0, 0, -5]}>
                        <Sphere args={[1, 64, 64]} scale={4.5}>
                            <MeshDistortMaterial
                                color="#8B0000"
                                emissive="#330000"
                                emissiveIntensity={0.2}
                                roughness={0.4}
                                metalness={0.6}
                                distort={0.6}
                                speed={1.5}
                            />
                        </Sphere>
                    </Float>

                    {/* Foreground sharper reactive blob */}
                    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5} position={[1, -1, -2]}>
                        <Sphere args={[1, 64, 64]} scale={1.8}>
                            <MeshDistortMaterial
                                color="#ff0033"
                                emissive="#ff0000"
                                emissiveIntensity={0.5}
                                roughness={0.1}
                                metalness={0.9}
                                distort={0.4}
                                speed={3}
                            />
                        </Sphere>
                    </Float>

                    {/* Left mid-ground blob */}
                    <Float speed={1.8} rotationIntensity={1} floatIntensity={1} position={[-2, 1, -3]}>
                        <Sphere args={[1, 64, 64]} scale={1.2}>
                            <MeshDistortMaterial
                                color="#ff0044"
                                emissive="#ff0000"
                                emissiveIntensity={0.3}
                                roughness={0.2}
                                metalness={0.8}
                                distort={0.5}
                                speed={2}
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
