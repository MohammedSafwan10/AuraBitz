"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/components/ui/use-performance-mode";

interface MeshDistortBGProps {
  className?: string;
  children?: React.ReactNode;
}

interface ApertureSurfaceProps {
  pointer: React.RefObject<THREE.Vector2>;
  shouldAnimate: boolean;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAspect;
  uniform float uMotion;
  uniform vec2 uPointer;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec2(17.1, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= uAspect;

    vec2 pointer = uPointer * 2.0 - 1.0;
    pointer.x *= uAspect;

    float time = uTime * 0.22;
    float side = abs(p.x);
    float direction = sign(p.x);
    float flow = fbm(vec2(p.y * 1.35 + time, side * 0.72 - time * 0.65));
    float localPressure = exp(-length((p - pointer) * vec2(1.25, 1.8)) * 3.25) * uMotion;

    float responsiveWidth = min(uAspect * 0.58, 0.82);
    float breathing = sin(p.y * 2.4 - time * 1.7 + direction * 0.8) * 0.055;
    float folds = (flow - 0.5) * 0.19;
    float pressure = localPressure * (0.17 + sin(p.y * 9.0 - time * 2.0) * 0.035);
    float innerEdge = responsiveWidth + breathing + folds + pressure;
    float distanceToEdge = side - innerEdge;

    float membrane = smoothstep(-0.025, 0.18, distanceToEdge);
    float rim = exp(-abs(distanceToEdge) * 29.0);
    float halo = exp(-abs(distanceToEdge) * 8.0);

    float phase = side * 38.0 + p.y * 8.0 + flow * 12.0 - time * 3.5;
    float finePhase = side * 76.0 - p.y * 15.0 + flow * 19.0 + time * 2.0;
    float causticA = pow(0.5 + 0.5 * sin(phase), 10.0);
    float causticB = pow(0.5 + 0.5 * sin(finePhase), 18.0);
    float contour = (causticA * 0.72 + causticB * 0.46) * membrane;

    float verticalFade = smoothstep(1.18, 0.58, abs(p.y));
    float edgeFade = smoothstep(0.0, 0.34, distanceToEdge);
    float grain = (hash(gl_FragCoord.xy + floor(uTime * 8.0)) - 0.5) * 0.018;

    vec3 color = vec3(0.0015, 0.003, 0.0045);
    color += vec3(0.008, 0.027, 0.034) * membrane * (0.55 + flow * 0.7);
    color += vec3(0.08, 0.34, 0.40) * contour * (0.45 + edgeFade);
    color += vec3(0.48, 0.92, 1.0) * rim * (0.75 + contour * 0.8);
    color += vec3(0.10, 0.50, 0.58) * halo * 0.22;
    color += vec3(0.88, 0.94, 1.0) * rim * causticB * 0.85;
    color += vec3(0.03, 0.30, 0.36) * localPressure * rim * 1.6;
    color *= 0.82 + verticalFade * 0.22;
    color += grain * membrane;

    float vignette = smoothstep(1.55, 0.35, length(vec2(p.x / max(uAspect, 0.01), p.y)));
    color *= 0.68 + vignette * 0.32;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ApertureSurface({ pointer, shouldAnimate }: ApertureSurfaceProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothedPointer = useRef(new THREE.Vector2(0.5, 0.5));
  const { size, viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uMotion: { value: 1 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    smoothedPointer.current.lerp(pointer.current, 1 - Math.exp(-delta * 7));
    material.uniforms.uPointer.value.copy(smoothedPointer.current);
    material.uniforms.uAspect.value = size.width / Math.max(size.height, 1);
    material.uniforms.uMotion.value = shouldAnimate ? 1 : 0;

    if (shouldAnimate) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export function MeshDistortBG({ className, children }: MeshDistortBGProps) {
  const { isLowPerformance, prefersReducedMotion } = usePerformanceMode();
  const pointer = useRef(new THREE.Vector2(0.5, 0.5));
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(document.visibilityState === "visible");
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <div
      className={cn("relative isolate h-full w-full overflow-hidden bg-black", className)}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current.set(
          (event.clientX - bounds.left) / Math.max(bounds.width, 1),
          1 - (event.clientY - bounds.top) / Math.max(bounds.height, 1),
        );
      }}
      onPointerLeave={() => pointer.current.set(0.5, 0.5)}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Canvas
          orthographic
          camera={{ position: [0, 0, 1], zoom: 1 }}
          dpr={isLowPerformance ? 1 : [1, 1.5]}
          frameloop={shouldAnimate ? "always" : "demand"}
          gl={{
            alpha: false,
            antialias: false,
            depth: false,
            powerPreference: "high-performance",
          }}
        >
          <ApertureSurface pointer={pointer} shouldAnimate={shouldAnimate} />
        </Canvas>
      </div>

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
