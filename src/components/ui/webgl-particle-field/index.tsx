/* eslint-disable react-hooks/purity */
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface WebGLParticleFieldProps {
    className?: string;
    children?: React.ReactNode;
}

const vertexShader = `
uniform float uTime;
attribute float aScale;
attribute vec3 aColor;
varying vec3 vColor;

void main() {
    vColor = aColor;
    vec3 p = position;
    
    // Create a slow, floating mathematical wobble
    float angle = atan(p.x, p.z);
    float radius = length(p.xz);
    
    // Swirl effect
    angle += uTime * 0.05 * (4.0 / (radius + 1.0));
    
    // Apply swirl
    p.x = cos(angle) * radius;
    p.z = sin(angle) * radius;
    
    // Vertical wave distortion (simulating ocean/fields)
    p.y += sin(radius * 1.5 - uTime * 0.8) * 0.5 + sin(angle * 3.0 + uTime) * 0.3;
    
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aScale * (15.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
    // Soft circle rendering (instead of squares)
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    
    // Soft outer glow pulse
    float strength = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(vColor, strength * 0.8);
}
`;

function ParticleGalaxy() {
    // 50,000 particles computed natively on the GPU at 60 FPS
    const count = 50000;
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Generate particle data arrays once mapping position, color, and scale
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const scales = new Float32Array(count);

        // AuraBitz specific colors: Cobalt, Cyan, Violet
        const color1 = new THREE.Color("#4f46e5");
        const color2 = new THREE.Color("#06b6d4");
        const color3 = new THREE.Color("#8b5cf6");

        for (let i = 0; i < count; i++) {
            // Distribute points in a galaxy disc with 5 spiral arms
            const radius = Math.random() * 20 + 0.1;
            const branchAngle = (i % 5) * ((Math.PI * 2) / 5);
            const spinAngle = radius * 0.5;

            // Random scatter around the branch based on distance from center
            const randomX = (Math.random() - 0.5) * 2 * (1.5 / radius);
            const randomY = (Math.random() - 0.5) * 0.5;
            const randomZ = (Math.random() - 0.5) * 2 * (1.5 / radius);

            const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
            const y = randomY;
            const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Mix colors mathematically based on radius
            const mixedColor = color1.clone().lerp(color2, Math.random());
            if (radius < 5) {
                mixedColor.lerp(color3, 1 - radius / 5);
            }
            if (radius < 1) { // Super hot core
                mixedColor.setHex(0xffffff);
            }

            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            scales[i] = Math.random() * 1.5;
        }

        return { positions, colors, scales };
    }, [count]);

    // Update time uniform for our Shader and track mouse
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
        if (pointsRef.current) {
            const targetX = (state.mouse.x * Math.PI) / 8;
            const targetY = (state.mouse.y * Math.PI) / 10;
            // Smoothly lerp towards mouse position using basic math
            pointsRef.current.rotation.y += 0.05 * (targetX - pointsRef.current.rotation.y);
            pointsRef.current.rotation.x += 0.05 * (-targetY - pointsRef.current.rotation.x);
        }
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), []);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} args={[particles.positions, 3]} />
                <bufferAttribute attach="attributes-aColor" count={count} args={[particles.colors, 3]} />
                <bufferAttribute attach="attributes-aScale" count={count} args={[particles.scales, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                transparent={true}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </points>
    );
}

export function WebGLParticleField({ className, children }: WebGLParticleFieldProps) {
    return (
        <div className={cn("relative w-full h-full bg-[#000003] overflow-hidden", className)}>
            {/* 3D WebGL Layer tracking user pointer smoothly */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 6, 15], fov: 50 }} dpr={[1, 1.5]}>
                    <color attach="background" args={['#000003']} />
                    <ParticleGalaxy />
                </Canvas>

                {/* Heavy DOM Vignette to focus attention on typography */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #000003 90%)' }}
                />
            </div>

            {/* Pure React Interactive Top Layer */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
                {children}
            </div>
        </div>
    );
}
