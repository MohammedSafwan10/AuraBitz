"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/components/ui/use-performance-mode";

interface WebGLParticleFieldProps {
    className?: string;
    children?: React.ReactNode;
}

interface MatrixFieldProps {
    lowPerformance: boolean;
    motionEnabled: boolean;
    pointer: React.RefObject<THREE.Vector2>;
}

const pointVertexShader = `
uniform float uTime;
uniform vec2 uPointer;
uniform float uMotion;
attribute float aScale;
attribute float aAccent;
varying float vAccent;
varying float vDepth;
varying float vForce;

vec3 deform(vec3 p) {
    // Travel continuously toward the camera, then recycle behind the chamber.
    // The 38-unit loop matches the generated tunnel exactly, so there is no pop.
    p.z = mod(p.z + 34.0 + uTime * 1.45 * uMotion, 38.0) - 34.0;
    float depthFocus = exp(-pow((p.z + 10.0) * 0.075, 2.0));
    float current = sin(p.z * 0.24 - uTime * 0.28) * 0.14 * uMotion;
    vec2 pointerWorld = vec2(uPointer.x * 6.5, uPointer.y * 4.6);
    float localForce = exp(-length(p.xy - pointerWorld) * 0.46) * depthFocus * uMotion;

    p.x += current * sign(p.y) + uPointer.x * depthFocus * 0.72 * uMotion;
    p.y += cos(p.z * 0.20 + uTime * 0.22) * 0.11 * sign(p.x) * uMotion;
    p.xy *= 1.0 + localForce * 0.10;
    vForce = localForce;
    return p;
}

void main() {
    vec3 p = deform(position);
    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    float perspective = clamp(28.0 / -viewPosition.z, 0.55, 2.8);

    vAccent = aAccent;
    vDepth = smoothstep(-34.0, 4.0, p.z);
    gl_PointSize = max(1.0, aScale * perspective);
    gl_Position = projectionMatrix * viewPosition;
}
`;

const pointFragmentShader = `
varying float vAccent;
varying float vDepth;
varying float vForce;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    if (distanceToCenter > 0.5) discard;

    float core = 1.0 - smoothstep(0.08, 0.5, distanceToCenter);
    float halo = 1.0 - smoothstep(0.18, 0.5, distanceToCenter);
    vec3 graphite = vec3(0.34, 0.38, 0.40);
    vec3 white = vec3(0.94, 0.97, 0.98);
    vec3 cyan = vec3(0.07, 0.87, 0.92);
    vec3 color = mix(graphite, white, 0.24 + vDepth * 0.68);
    color = mix(color, cyan, clamp(vAccent * 0.68 + vForce, 0.0, 0.88));
    float alpha = (core * 0.88 + halo * 0.22) * mix(0.34, 0.96, vDepth);
    gl_FragColor = vec4(color, alpha);
}
`;

const lineVertexShader = `
uniform float uTime;
uniform vec2 uPointer;
uniform float uMotion;
varying float vDepth;
varying float vForce;

void main() {
    vec3 p = position;
    p.z = mod(p.z + 34.0 + uTime * 1.45 * uMotion, 38.0) - 34.0;
    float depthFocus = exp(-pow((p.z + 10.0) * 0.075, 2.0));
    float current = sin(p.z * 0.24 - uTime * 0.28) * 0.14 * uMotion;
    vec2 pointerWorld = vec2(uPointer.x * 6.5, uPointer.y * 4.6);
    float localForce = exp(-length(p.xy - pointerWorld) * 0.46) * depthFocus * uMotion;
    p.x += current * sign(p.y) + uPointer.x * depthFocus * 0.72 * uMotion;
    p.y += cos(p.z * 0.20 + uTime * 0.22) * 0.11 * sign(p.x) * uMotion;
    p.xy *= 1.0 + localForce * 0.10;
    vDepth = smoothstep(-34.0, 4.0, p.z);
    vForce = localForce;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const lineFragmentShader = `
varying float vDepth;
varying float vForce;

void main() {
    vec3 color = mix(vec3(0.42, 0.46, 0.48), vec3(0.08, 0.84, 0.88), vForce * 0.8);
    gl_FragColor = vec4(color, mix(0.07, 0.22, vDepth) + vForce * 0.14);
}
`;

function addSegment(target: number[], a: [number, number, number], b: [number, number, number]) {
    target.push(...a, ...b);
}

function buildMatrixGeometry(depthLayers: number, edgePoints: number) {
    const pointCount = depthLayers * edgePoints * 4;
    const positions = new Float32Array(pointCount * 3);
    const scales = new Float32Array(pointCount);
    const accents = new Float32Array(pointCount);
    let cursor = 0;

    for (let depthIndex = 0; depthIndex < depthLayers; depthIndex += 1) {
        const depthRatio = depthIndex / (depthLayers - 1);
        const z = 4 - depthRatio * 38;

        for (let edgeIndex = 0; edgeIndex < edgePoints; edgeIndex += 1) {
            const t = edgeIndex / (edgePoints - 1) * 2 - 1;
            const wave = Math.sin(depthIndex * 1.731 + edgeIndex * 2.193);
            const faces: [number, number, number][] = [
                [t * 8.4, 5.5, z],
                [t * 8.4, -5.5, z],
                [-8.4, t * 5.5, z],
                [8.4, t * 5.5, z],
            ];

            for (let faceIndex = 0; faceIndex < faces.length; faceIndex += 1) {
                const point = faces[faceIndex];
                positions[cursor * 3] = point[0];
                positions[cursor * 3 + 1] = point[1];
                positions[cursor * 3 + 2] = point[2];
                scales[cursor] = 1.0 + (wave * 0.5 + 0.5) * 1.1 + (depthIndex % 31 === 0 ? 1.4 : 0);
                accents[cursor] = (depthIndex + edgeIndex * 3 + faceIndex * 7) % 43 < 2 ? 1 : 0;
                cursor += 1;
            }
        }
    }

    const lines: number[] = [];
    // Independent depth frames recycle cleanly. Longitudinal lines are implied by
    // the dense point rows and would visibly stretch across the wrap boundary.
    const frameStep = Math.max(6, Math.floor(depthLayers / 25));
    for (let depthIndex = 0; depthIndex < depthLayers; depthIndex += frameStep) {
        const z = 4 - depthIndex / (depthLayers - 1) * 38;
        addSegment(lines, [-8.4, 5.5, z], [8.4, 5.5, z]);
        addSegment(lines, [8.4, 5.5, z], [8.4, -5.5, z]);
        addSegment(lines, [8.4, -5.5, z], [-8.4, -5.5, z]);
        addSegment(lines, [-8.4, -5.5, z], [-8.4, 5.5, z]);
    }

    return { positions, scales, accents, linePositions: new Float32Array(lines) };
}

function MatrixField({ lowPerformance, motionEnabled, pointer }: MatrixFieldProps) {
    const pointMaterial = useRef<THREE.ShaderMaterial>(null);
    const lineMaterial = useRef<THREE.ShaderMaterial>(null);
    const smoothPointer = useRef(new THREE.Vector2());
    const geometry = useMemo(
        () => buildMatrixGeometry(lowPerformance ? 128 : 256, lowPerformance ? 32 : 64),
        [lowPerformance],
    );
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2() },
        uMotion: { value: motionEnabled ? 1 : 0 },
    }), [motionEnabled]);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        smoothPointer.current.lerp(pointer.current, 1 - Math.exp(-delta * 5.5));
        for (const material of [pointMaterial.current, lineMaterial.current]) {
            if (!material) continue;
            material.uniforms.uTime.value = time;
            material.uniforms.uMotion.value = motionEnabled ? 1 : 0;
            material.uniforms.uPointer.value.copy(smoothPointer.current);
        }
    });

    return (
        <group rotation={[0, 0, 0]}>
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[geometry.linePositions, 3]} />
                </bufferGeometry>
                <shaderMaterial
                    ref={lineMaterial}
                    uniforms={uniforms}
                    vertexShader={lineVertexShader}
                    fragmentShader={lineFragmentShader}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
                    <bufferAttribute attach="attributes-aScale" args={[geometry.scales, 1]} />
                    <bufferAttribute attach="attributes-aAccent" args={[geometry.accents, 1]} />
                </bufferGeometry>
                <shaderMaterial
                    ref={pointMaterial}
                    uniforms={uniforms}
                    vertexShader={pointVertexShader}
                    fragmentShader={pointFragmentShader}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}

export function WebGLParticleField({ className, children }: WebGLParticleFieldProps) {
    const { isLowPerformance, prefersReducedMotion } = usePerformanceMode();
    const [isVisible, setIsVisible] = useState(true);
    const pointer = useRef(new THREE.Vector2());
    const motionEnabled = !prefersReducedMotion;

    useEffect(() => {
        const updateVisibility = () => setIsVisible(document.visibilityState === "visible");
        updateVisibility();
        document.addEventListener("visibilitychange", updateVisibility);
        return () => document.removeEventListener("visibilitychange", updateVisibility);
    }, []);

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!motionEnabled) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current.set(
            (event.clientX - bounds.left) / bounds.width * 2 - 1,
            -((event.clientY - bounds.top) / bounds.height * 2 - 1),
        );
    };

    return (
        <div
            className={cn("relative size-full overflow-hidden bg-black", className)}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => pointer.current.set(0, 0)}
        >
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 11], fov: 52, near: 0.1, far: 80 }}
                    dpr={isLowPerformance ? 1 : [1, 1.25]}
                    frameloop={isVisible && motionEnabled ? "always" : "demand"}
                    gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
                >
                    <color attach="background" args={["#000000"]} />
                    <MatrixField lowPerformance={isLowPerformance} motionEnabled={motionEnabled} pointer={pointer} />
                </Canvas>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,black_0%,rgba(0,0,0,0.96)_19%,rgba(0,0,0,0.48)_39%,rgba(0,0,0,0.08)_66%,rgba(0,0,0,0.72)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3),transparent_18%,transparent_78%,rgba(0,0,0,0.55))]" />
            </div>
            <div className="relative z-10 flex size-full flex-col transform-gpu [backface-visibility:hidden]">
                {children}
            </div>
        </div>
    );
}
