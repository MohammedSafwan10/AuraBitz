"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface WebGLLiquidAuroraProps {
    className?: string;
    children?: React.ReactNode;
}

// Minimal Vertex Shader: Just passes the UV coordinates down to the fragment
const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Ultimate Liquid Aurora Fragment Shader 
const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// Simplex 3D Noise function for organic fluidity
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    // Aspect ratio correction
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    // Mouse tracking mathematically influences the fluid currents
    vec2 mouse = uMouse.xy;
    mouse.x *= uResolution.x / uResolution.y;
    
    // Add magnetic pull from the mouse cursor
    float distToMouse = distance(st, mouse);
    float mouseInfluence = smoothstep(0.8, 0.0, distToMouse);

    // Layered simplex noise to create "fluid" ripples
    vec2 flow = vec2(
        snoise(vec3(st * 2.0, uTime * 0.1)),
        snoise(vec3(st * 2.0 + 100.0, uTime * 0.1))
    );
    
    // The "waves" of the liquid pushing against each other
    float n1 = snoise(vec3(st * 3.0 + flow + (mouseInfluence * length(flow)), uTime * 0.2));
    float n2 = snoise(vec3(st * 6.0 - flow, uTime * 0.15 + 10.0));
    float n3 = snoise(vec3(st * 1.5 + flow * 2.0, uTime * 0.05));
    
    // Blend the noise to create smooth, rolling gradients
    float finalNoise = n1 * 0.5 + n2 * 0.25 + n3 * 0.25;
    
    // Remap noise from [-1, 1] to [0, 1]
    finalNoise = finalNoise * 0.5 + 0.5;

    // Premium Midnight + Cyan + Violet Palette
    vec3 color1 = vec3(0.00, 0.00, 0.02);  // Deepest black-blue
    vec3 color2 = vec3(0.05, 0.05, 0.15);  // Midnight blue
    vec3 color3 = vec3(0.20, 0.00, 0.40);  // Deep Violet
    vec3 color4 = vec3(0.00, 0.60, 0.80);  // Cyan/Electric Blue
    
    // Smooth blending
    vec3 color = mix(color1, color2, smoothstep(0.0, 0.3, finalNoise));
    color = mix(color, color3, smoothstep(0.3, 0.6, finalNoise));
    color = mix(color, color4, smoothstep(0.6, 1.0, finalNoise));
    
    // Add a glowing core where the mouse hovers
    color += vec3(0.0, 0.8, 1.0) * (mouseInfluence * 0.3);
    
    // Subtle vignette to focus the center
    float vignette = distance(vUv, vec2(0.5));
    color *= smoothstep(0.8, 0.2, vignette);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

function FluidCanvas() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { size } = useThree();
    const mousePos = useRef({ x: 0.5, y: 0.5 });

    // Crucial Performance/Bug Fix: 
    // Do NOT recreate the uniforms object on resize. Three.js shader materials 
    // lose their variable bindings if the uniforms object reference changes!
    const uniforms = useRef({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(1920, 1080) }
    });

    // Update screen resolution uniforms safely without recreating the object
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
        }
    }, [size]);

    // Attach native window mouse tracking to pierce through any absolutely positioned DOM elements
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current.x = e.clientX / window.innerWidth;
            mousePos.current.y = 1.0 - (e.clientY / window.innerHeight); // Invert Y for WebGL UV space
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (materialRef.current) {
            // Unbreakable time propagation
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

            // Smoothly lerp towards actual mouse coordinates
            materialRef.current.uniforms.uMouse.value.x += (mousePos.current.x - materialRef.current.uniforms.uMouse.value.x) * 0.05;
            materialRef.current.uniforms.uMouse.value.y += (mousePos.current.y - materialRef.current.uniforms.uMouse.value.y) * 0.05;
        }
    });

    return (
        <mesh>
            {/* The canvas geometry is just a massive 2D plane taking up the entire camera view */}
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                // eslint-disable-next-line react-hooks/refs
                uniforms={uniforms.current}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}

export function WebGLLiquidAurora({ className, children }: WebGLLiquidAuroraProps) {
    return (
        <div className={cn("relative w-full h-full bg-[#05000a] overflow-hidden", className)}>
            {/* Native WebGL rendering the fluid layer */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    // Use a completely flat orthographic camera because we are rendering a 2D Shader Screen
                    orthographic
                    camera={{ position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1 }}
                    dpr={[1, 1.5]}
                >
                    <FluidCanvas />
                </Canvas>
            </div>

            {/* DOM Overlay Layer */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
                {children}
            </div>
        </div>
    );
}
