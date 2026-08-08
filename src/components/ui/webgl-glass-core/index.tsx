"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/components/ui/use-performance-mode";

interface WebGLGlassCoreProps {
  className?: string;
  children?: React.ReactNode;
}

interface OpticalLensProps {
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

  float starLayer(vec2 p, float scale, float threshold) {
    vec2 cell = floor(p * scale);
    vec2 local = fract(p * scale) - 0.5;
    float seed = hash(cell);
    float radius = mix(0.025, 0.075, hash(cell + 19.7));
    return smoothstep(radius, 0.0, length(local)) * step(threshold, seed);
  }

  float ring(float radius, float target, float sharpness) {
    return exp(-abs(radius - target) * sharpness);
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= uAspect;

    vec2 pointer = uPointer;
    pointer.x *= uAspect;
    float lensScale = min(uAspect * 0.94, 1.08);
    vec2 centerShift = pointer * vec2(0.035, 0.026) * uMotion;
    vec2 q = (p - centerShift) / max(lensScale, 0.01);
    q.x *= 1.0 + pointer.x * 0.018 * uMotion;

    float radius = length(q);
    float angle = atan(q.y, q.x);
    float time = uTime * 0.16;
    float annulus = smoothstep(0.48, 0.57, radius) * (1.0 - smoothstep(1.16, 1.24, radius));
    float voidMask = 1.0 - smoothstep(0.48, 0.57, radius);

    float bend = 1.0 + 0.13 / (abs(radius - 0.55) + 0.17);
    vec2 refracted = q * bend;
    refracted += vec2(sin(angle * 3.0 + time), cos(angle * 2.0 - time)) * annulus * 0.035;

    float distantStars = starLayer(q + vec2(time * 0.018, 0.0), 31.0, 0.976);
    distantStars += starLayer(q * 1.73 - vec2(0.0, time * 0.012), 22.0, 0.982) * 0.55;
    float lensedStars = starLayer(refracted + vec2(time * 0.02, 0.0), 35.0, 0.965);
    lensedStars += starLayer(refracted * 1.54, 24.0, 0.978) * 0.5;

    float innerRim = ring(radius, 0.555, 72.0);
    float middleRim = ring(radius, 0.735, 54.0);
    float outerRim = ring(radius, 0.955, 68.0);
    float casingRim = ring(radius, 1.13, 80.0);

    float ripple = noise(vec2(angle * 2.8 + time, radius * 8.0 - time));
    float caustic = pow(0.5 + 0.5 * sin(angle * 3.0 + radius * 22.0 + ripple * 4.0 - time * 1.8), 20.0) * annulus;
    float fineCaustic = pow(0.5 + 0.5 * sin(angle * 7.0 - radius * 39.0 + ripple * 6.0 + time * 1.4), 28.0) * annulus;
    float opticalGrooves = pow(0.5 + 0.5 * cos(radius * 41.0), 32.0) * annulus;
    float mechanicalArcs = pow(0.5 + 0.5 * cos(angle * 4.0 + time * 0.5), 22.0) * (middleRim + outerRim);

    float focusDistance = length((q - pointer / max(lensScale, 0.01)) * vec2(0.9, 1.2));
    float focus = exp(-focusDistance * 3.8) * uMotion;

    vec3 color = vec3(0.0015, 0.002, 0.0028);
    color += vec3(0.38, 0.44, 0.48) * distantStars * (1.0 - annulus * 0.62);
    color += vec3(0.58, 0.70, 0.76) * lensedStars * annulus;
    color += vec3(0.015, 0.024, 0.030) * annulus * (0.7 + ripple * 0.7);
    color += vec3(0.43, 0.52, 0.56) * (middleRim * 0.36 + outerRim * 0.48 + casingRim * 0.7);
    color += vec3(0.86, 0.94, 1.0) * innerRim * (0.68 + caustic * 0.7);
    color += vec3(0.12, 0.42, 0.52) * ring(radius, 0.566, 88.0) * 0.52;
    color += vec3(0.54, 0.22, 0.06) * ring(radius, 0.544, 96.0) * 0.28;
    color += vec3(0.16, 0.29, 0.34) * caustic * 0.24;
    color += vec3(0.78, 0.88, 0.92) * fineCaustic * 0.14;
    color += vec3(0.52, 0.60, 0.64) * opticalGrooves * 0.28;
    color += vec3(0.72, 0.82, 0.86) * mechanicalArcs * 0.8;
    color += vec3(0.08, 0.42, 0.52) * focus * (innerRim + middleRim) * 0.65;

    color *= 1.0 - voidMask * 0.985;
    float vignette = smoothstep(1.55, 0.24, length(vec2(p.x / max(uAspect, 0.01), p.y)));
    color *= 0.64 + vignette * 0.36;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function OpticalLens({ pointer, shouldAnimate }: OpticalLensProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothedPointer = useRef(new THREE.Vector2(0, 0));
  const { size, viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uMotion: { value: 1 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    smoothedPointer.current.lerp(pointer.current, 1 - Math.exp(-delta * 6.5));
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

export function WebGLGlassCore({ className, children }: WebGLGlassCoreProps) {
  const { isLowPerformance, prefersReducedMotion } = usePerformanceMode();
  const pointer = useRef(new THREE.Vector2(0, 0));
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
          ((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1,
          -(((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 - 1),
        );
      }}
      onPointerLeave={() => pointer.current.set(0, 0)}
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
          <OpticalLens pointer={pointer} shouldAnimate={shouldAnimate} />
        </Canvas>
      </div>

      <div className="relative z-10 h-full w-full transform-gpu [backface-visibility:hidden]">
        {children}
      </div>
    </div>
  );
}
