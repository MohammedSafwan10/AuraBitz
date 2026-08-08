"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/components/ui/use-performance-mode";

interface WebGLParticleVortexProps {
    className?: string;
    children?: React.ReactNode;
}

interface EventHorizonProps {
    pointer: React.RefObject<THREE.Vector2>;
    motionEnabled: boolean;
}

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uResolution;
uniform float uMotion;
varying vec2 vUv;

float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise21(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
        mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x),
        f.y
    );
}

float streamline(float stream, float frequency, float potential, float time, float seed) {
    float coordinate = stream * frequency;
    float lineIndex = floor(coordinate / 3.14159265);
    float line = pow(1.0 - abs(sin(coordinate)), 18.0);
    float phase = hash21(vec2(lineIndex, seed)) * 6.2831853;
    float travellingLight = pow(0.5 + 0.5 * sin(potential * (17.0 + seed * 3.0) - time + phase), 14.0);
    return line * (0.30 + travellingLight * 1.42);
}

void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    p.x *= aspect;

    float desktop = smoothstep(1.15, 1.48, aspect);
    vec2 baseCenter = vec2(mix(0.0, aspect * 0.31, desktop), mix(0.28, -0.03, desktop));
    vec2 pointer = vec2(uPointer.x * aspect, uPointer.y);
    float pointerPresence = 1.0 - step(3.0, length(uPointer));
    vec2 center = baseCenter + pointer * vec2(0.028, 0.022) * pointerPresence * uMotion;
    vec2 q = p - center;

    float time = uTime * 1.15 * uMotion;
    float tilt = -0.13;
    mat2 rotation = mat2(cos(tilt), -sin(tilt), sin(tilt), cos(tilt));
    vec2 flowPoint = rotation * q;
    float radius = length(flowPoint);
    float horizon = 0.41;
    float safeRadiusSquared = max(dot(flowPoint, flowPoint), horizon * horizon * 0.90);

    // Potential flow around a circular obstacle. Its stream-function contours
    // remain straight at distance and bend smoothly around the event horizon.
    float stream = flowPoint.y * (1.0 - horizon * horizon / safeRadiusSquared);
    stream += log(max(radius, horizon)) * 0.032;
    float potential = flowPoint.x * (1.0 + horizon * horizon / safeRadiusSquared);

    float field = 0.0;
    field += streamline(stream, 78.0, potential, time * 2.2, 0.7);
    field += streamline(stream + 0.004, 126.0, potential, time * 1.55, 2.1) * 0.56;
    field += streamline(stream - 0.006, 188.0, potential, time * 1.08, 4.3) * 0.30;

    float orbitEnvelope = smoothstep(horizon * 0.98, horizon * 1.12, radius);
    orbitEnvelope *= 1.0 - smoothstep(1.35, 2.55, radius);
    float horizonDensity = mix(0.46, 1.35, exp(-abs(radius - horizon) * 4.2));
    field *= orbitEnvelope * horizonDensity;

    vec2 dustCell = vec2(potential * 72.0 - time * 0.9, stream * 118.0);
    float dust = pow(noise21(dustCell), 17.0) * orbitEnvelope;
    dust *= 0.35 + exp(-abs(radius - horizon * 1.18) * 5.0);
    field += dust * 1.10;

    vec2 mouseDelta = p - pointer;
    float pressure = exp(-dot(mouseDelta, mouseDelta) * 5.0) * pointerPresence * uMotion;
    float pressureRipple = sin(length(mouseDelta) * 30.0 - time * 2.0) * pressure;
    field += pow(max(0.0, pressureRipple), 8.0) * 0.42;

    float ring = exp(-abs(radius - horizon) * 92.0);
    float outerRing = exp(-abs(radius - horizon * 1.10) * 38.0) * 0.26;
    float hole = 1.0 - smoothstep(horizon - 0.018, horizon + 0.016, radius);

    vec3 graphite = vec3(0.12, 0.16, 0.18);
    vec3 white = vec3(0.88, 0.94, 0.97);
    vec3 cyan = vec3(0.08, 0.72, 0.91);
    vec3 color = mix(graphite, white, clamp(field * 1.5, 0.0, 1.0)) * field;
    color += cyan * dust * 0.38;
    color += mix(white, cyan, 0.68) * ring * 1.35;
    color += cyan * outerRing;

    float lensGlow = exp(-abs(radius - horizon) * 15.0) * 0.055;
    color += cyan * lensGlow;
    color *= 1.0 - hole;

    float vignette = 1.0 - smoothstep(0.54, 1.34, length(vec2(p.x / aspect, p.y)));
    color *= mix(0.32, 1.0, vignette);
    gl_FragColor = vec4(color, 1.0);
}
`;

function EventHorizon({ pointer, motionEnabled }: EventHorizonProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const smoothPointer = useRef(new THREE.Vector2(4, 4));
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(4, 4) },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMotion: { value: motionEnabled ? 1 : 0 },
    }), [motionEnabled]);

    useFrame((state, delta) => {
        const material = materialRef.current;
        if (!material) return;
        smoothPointer.current.lerp(pointer.current, 1 - Math.exp(-delta * 4.8));
        material.uniforms.uTime.value = state.clock.getElapsedTime();
        material.uniforms.uPointer.value.copy(smoothPointer.current);
        material.uniforms.uResolution.value.set(state.size.width, state.size.height);
        material.uniforms.uMotion.value = motionEnabled ? 1 : 0;
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}

export function WebGLParticleVortex({ className, children }: WebGLParticleVortexProps) {
    const { isLowPerformance, prefersReducedMotion } = usePerformanceMode();
    const [isVisible, setIsVisible] = useState(true);
    const pointer = useRef(new THREE.Vector2(4, 4));
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
            onPointerLeave={() => pointer.current.set(4, 4)}
        >
            <div className="absolute inset-0 z-0">
                <Canvas
                    orthographic
                    camera={{ position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1 }}
                    dpr={isLowPerformance ? 1 : [1, 1.25]}
                    frameloop={isVisible && motionEnabled ? "always" : "demand"}
                    gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
                >
                    <EventHorizon pointer={pointer} motionEnabled={motionEnabled} />
                </Canvas>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.18)_42%,transparent_68%)] md:block" />
            </div>
            <div className="relative z-10 flex size-full flex-col transform-gpu [backface-visibility:hidden]">
                {children}
            </div>
        </div>
    );
}
