"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/components/ui/use-performance-mode";

interface WebGLLiquidAuroraProps {
    className?: string;
    children?: React.ReactNode;
}

interface FluidSurfaceProps {
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

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    mat2 rotation = mat2(0.80, 0.60, -0.60, 0.80);
    for (int octave = 0; octave < 4; octave++) {
        value += amplitude * noise21(p);
        p = rotation * p * 2.03 + 13.7;
        amplitude *= 0.48;
    }
    return value;
}

float liquidField(vec2 p, vec2 pointer, float time) {
    float slowTime = time * 0.16 * uMotion;
    vec2 flow = vec2(
        fbm(p * 0.82 + vec2(slowTime, -slowTime * 0.45)),
        fbm(p * 0.82 + vec2(8.3, -slowTime * 0.72))
    ) - 0.5;
    vec2 warped = p + flow * 0.18;
    float chamber = length(vec2(warped.x * 0.68, (warped.y - 0.22) * 0.78));
    float lip = 0.735 + (fbm(warped * 2.1 + slowTime) - 0.5) * 0.18;

    vec2 delta = p - pointer;
    float pressure = exp(-dot(delta, delta) * 7.5) * 0.13 * uMotion;
    float ripple = sin(length(delta) * 25.0 - time * 2.0) * exp(-dot(delta, delta) * 4.2) * 0.018 * uMotion;
    return chamber - lip + pressure + ripple;
}

void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    p.x *= aspect;
    vec2 pointer = vec2(uPointer.x * aspect, uPointer.y);

    float field = liquidField(p, pointer, uTime);
    float liquid = smoothstep(-0.025, 0.045, field);
    float edge = exp(-abs(field) * 34.0);

    vec2 gradient = vec2(dFdx(field), dFdy(field));
    vec2 normal = normalize(gradient + vec2(0.0001));
    vec2 flowUv = p * 2.35 + normal * 0.32;
    float detail = fbm(flowUv + vec2(uTime * 0.10 * uMotion, -uTime * 0.07 * uMotion));
    float folds = 0.5 + 0.5 * sin(detail * 19.0 + field * 31.0 - uTime * 0.28 * uMotion);
    folds = pow(folds, 3.2);
    float grazing = pow(1.0 - abs(dot(normal, normalize(vec2(-0.45, 0.9)))), 3.0);
    float specular = clamp(folds * 0.76 + grazing * 0.72 + edge * 1.22, 0.0, 1.0);

    vec3 graphite = vec3(0.006, 0.009, 0.012);
    vec3 gunmetal = vec3(0.055, 0.075, 0.085);
    vec3 chrome = vec3(0.94, 0.97, 0.98);
    vec3 liquidColor = mix(graphite, gunmetal, smoothstep(0.12, 0.78, detail));
    liquidColor = mix(liquidColor, chrome, smoothstep(0.62, 0.96, specular));
    liquidColor += chrome * edge * 0.38;

    float veinSeed = abs(sin(detail * 28.0 - field * 21.0 + uTime * 0.16 * uMotion));
    float cyanVein = pow(1.0 - veinSeed, 24.0) * smoothstep(0.02, 0.28, field);
    vec3 cyan = vec3(0.03, 0.68, 0.82);
    liquidColor += cyan * (cyanVein * 0.72 + edge * 0.10);

    vec3 color = liquidColor * liquid;
    color += vec3(0.12, 0.15, 0.16) * edge * (1.0 - liquid) * 0.22;

    float vignette = 1.0 - smoothstep(0.55, 1.35, length(vec2(p.x / aspect, p.y)));
    color *= mix(0.48, 1.0, vignette);
    gl_FragColor = vec4(color, 1.0);
}
`;

function FluidSurface({ pointer, motionEnabled }: FluidSurfaceProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const smoothPointer = useRef(new THREE.Vector2(4, 4));
    const { size } = useThree();
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2() },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMotion: { value: motionEnabled ? 1 : 0 },
    }), [motionEnabled]);

    useEffect(() => {
        const material = materialRef.current;
        if (!material) return;
        material.uniforms.uResolution.value.set(size.width, size.height);
    }, [size]);

    useFrame((state, delta) => {
        const material = materialRef.current;
        if (!material) return;
        smoothPointer.current.lerp(pointer.current, 1 - Math.exp(-delta * 5.5));
        material.uniforms.uTime.value = state.clock.getElapsedTime();
        material.uniforms.uPointer.value.copy(smoothPointer.current);
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

export function WebGLLiquidAurora({ className, children }: WebGLLiquidAuroraProps) {
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
                    <FluidSurface pointer={pointer} motionEnabled={motionEnabled} />
                </Canvas>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(0,0,0,0.12)_64%,rgba(0,0,0,0.55)_100%)]" />
            </div>
            <div className="relative z-10 flex size-full flex-col transform-gpu [backface-visibility:hidden]">
                {children}
            </div>
        </div>
    );
}
