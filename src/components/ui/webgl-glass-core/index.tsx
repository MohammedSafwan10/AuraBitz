/* eslint-disable react-hooks/purity */
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    MeshTransmissionMaterial,
    Environment,
    Float,
    Instances,
    Instance,
} from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface WebGLGlassCoreProps {
    className?: string;
    children?: React.ReactNode;
}

function Swarm({ count = 150 }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instances = useRef<any>(null);

    // Create random positions and colors for the swarm of tiny orbs
    const particles = useMemo(() => {
        return new Array(count).fill(0).map(() => {
            const radius = 5 + Math.random() * 5;
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos((Math.random() * 2) - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            // Subtle premium colors (whites, pale emerald, dim grays)
            const colorOption = Math.random();
            let color = "#ffffff";
            if (colorOption > 0.8) color = "#00ffcc"; // Emerald glow
            else if (colorOption > 0.5) color = "#444444"; // Dimly lit

            return {
                position: new THREE.Vector3(x, y, z),
                color: new THREE.Color(color),
                scale: 0.2 + Math.random() * 0.8,
                speed: 0.1 + Math.random() * 0.5,
                angle: Math.random() * Math.PI * 2,
            };
        });
    }, [count]);

    // Animate the swarm circulating the center over time
    useFrame((state) => {
        if (!instances.current) return;
        const time = state.clock.getElapsedTime();

        let i = 0;
        for (const p of particles) {
            // Very slow, majestic rotation around the Y axis
            const currentObj = instances.current.children[i];
            if (currentObj) {
                const radius = Math.sqrt(p.position.x * p.position.x + p.position.z * p.position.z);
                const currentAngle = p.angle + time * p.speed * 0.1;

                currentObj.position.x = Math.cos(currentAngle) * radius;
                currentObj.position.z = Math.sin(currentAngle) * radius;
                currentObj.position.y = p.position.y + Math.sin(time * p.speed) * 0.5;
            }
            i++;
        }
    });

    return (
        <Instances ref={instances} limit={count} range={count}>
            <icosahedronGeometry args={[0.08, 1]} />
            <meshBasicMaterial toneMapped={false} />
            {particles.map((p, i) => (
                <Instance
                    key={i}
                    position={p.position}
                    scale={p.scale}
                    color={p.color}
                />
            ))}
        </Instances>
    );
}

function GlassNucleus() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Base majestic rotation
            // meshRef.current.rotation.x += delta * 0.1;
            // meshRef.current.rotation.y += delta * 0.15;

            // Interactive mouse tracking (The object mathematically tilts to look at the cursor)
            const targetX = (state.mouse.x * Math.PI) / 4;
            const targetY = (state.mouse.y * Math.PI) / 4;

            meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y);
            meshRef.current.rotation.x += 0.05 * (-targetY - meshRef.current.rotation.x);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef}>
                {/* A complex, beautiful geometric shape to trap and refract light */}
                <torusKnotGeometry args={[1.5, 0.4, 256, 32]} />
                <MeshTransmissionMaterial
                    transmission={1}
                    thickness={0.8}
                    roughness={0.05}
                    chromaticAberration={0.06}
                    anisotropicBlur={0.1}
                    color="#ffffff"
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    // MASSIVE PERFORMANCE BOOST: 
                    // Uses internal threejs sampler instead of multi-render resolution passes. 
                    // This creates 60 FPS glass refraction!
                    transmissionSampler={true}
                />
            </mesh>
        </Float>
    );
}

export function WebGLGlassCore({ className, children }: WebGLGlassCoreProps) {
    return (
        <div className={cn("relative w-full h-full bg-[#020202] overflow-hidden", className)}>
            {/* The absolute canvas container now receives pointer events to track the mouse natively */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 40 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: false, alpha: true }}
                >
                    <color attach="background" args={['#020202']} />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} intensity={2} color="#ffffff" />

                    {/* The Swarming Particles */}
                    <Swarm count={200} />

                    {/* The Refractive Glass Core */}
                    <GlassNucleus />

                    {/* HDRI Environment for realistic glass reflections */}
                    <Environment preset="city" />
                </Canvas>

                {/* Vignette mask to softly blend the WebGL canvas into the DOM edges */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #020202 90%)' }}
                />
            </div>

            {/* REAL DOM CONTENT GOES ON TOP 
                We use pointer-events-none on this wrapper so mouse events pass through to the Canvas underneath.
                Interactive children (like Buttons) must have pointer-events-auto applied explicitly. */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
                {children}
            </div>
        </div>
    );
}
