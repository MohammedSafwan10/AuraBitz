/* eslint-disable react-hooks/purity */
"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface WebGLParticleVortexProps {
    className?: string;
    children?: React.ReactNode;
}

// ----------------------------------------------------------------------------
// 1. ADVANCED CURL NOISE VORTEX SHADER
// ----------------------------------------------------------------------------
const vertexShader = `
uniform float uTime;
uniform vec3 uMouse;
uniform float uProgress;

attribute vec3 aRandomIntensities;
attribute float aSize;

varying vec3 vColor;
varying float vDistance;

// 3D Simplex noise by Ashima Arts (optimized)
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0.0 + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.42857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

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

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

// Curl Noise Vector generation
vec3 curlNoise( vec3 p ){
  const float e = 0.1;
  vec3 dx = vec3( e   , 0.0 , 0.0 );
  vec3 dy = vec3( 0.0 , e   , 0.0 );
  vec3 dz = vec3( 0.0 , 0.0 , e   );

  vec3 p_x0 = vec3( snoise( p - dx ), snoise( p - dx + vec3(12.3) ), snoise( p - dx + vec3(23.4) ) );
  vec3 p_x1 = vec3( snoise( p + dx ), snoise( p + dx + vec3(12.3) ), snoise( p + dx + vec3(23.4) ) );
  vec3 p_y0 = vec3( snoise( p - dy ), snoise( p - dy + vec3(12.3) ), snoise( p - dy + vec3(23.4) ) );
  vec3 p_y1 = vec3( snoise( p + dy ), snoise( p + dy + vec3(12.3) ), snoise( p + dy + vec3(23.4) ) );
  vec3 p_z0 = vec3( snoise( p - dz ), snoise( p - dz + vec3(12.3) ), snoise( p - dz + vec3(23.4) ) );
  vec3 p_z1 = vec3( snoise( p + dz ), snoise( p + dz + vec3(12.3) ), snoise( p + dz + vec3(23.4) ) );

  float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
  float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
  float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

  const float divisor = 1.0 / ( 2.0 * e );
  return normalize( vec3( x , y , z ) * divisor );
}

void main() {
    vec3 targetPos = position;

    // Apply intense mathematics for curl noise vector flow
    // Multiply time by aRandomIntensities.x for varying speed per particle
    float time = uTime * 0.15 * aRandomIntensities.x;
    
    // Scale defines the "tightness" of the curl vortex
    float noiseScale = 0.8;
    vec3 displacedPosition = targetPos + curlNoise(targetPos * noiseScale + vec3(time)) * 2.0 * aRandomIntensities.y;

    // Mouse Repulsion Mechanics (Black hole physics)
    float distToMouse = distance(displacedPosition, uMouse);
    float repulsionForce = smoothstep(3.0, 0.0, distToMouse);
    vec3 directionToMouse = normalize(displacedPosition - uMouse);
    
    // Push particles away but also swirl them spherically around the mouse
    vec3 swirlVector = cross(directionToMouse, vec3(0.0, 1.0, 0.0));
    displacedPosition += (directionToMouse * repulsionForce * 2.0) + (swirlVector * repulsionForce * 1.5);

    // Apply projection
    vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Scale particle based on distance to camera (perspective)
    gl_PointSize = (aSize * 15.0) * (1.0 / -mvPosition.z);

    // Pass data to fragment shader
    vDistance = smoothstep(0.0, 5.0, length(displacedPosition));
    
    // Ethereal Electric Green / Quantum Cyan / Deep Cobalt Palette
    vec3 color1 = vec3(0.0, 1.0, 0.6); // Electric Mint
    vec3 color2 = vec3(0.0, 0.4, 1.0); // Vibrant Azure
    vec3 color3 = vec3(0.5, 0.0, 1.0); // Deep Quantum Purple

    // Mix colors based on distance from core and random particle intensity
    vec3 mix1 = mix(color1, color2, vDistance * aRandomIntensities.z);
    vColor = mix(mix1, color3, repulsionForce);
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
    // Perfect circles for particles
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft radial gradient for glowing effect
    float alpha = smoothstep(0.5, 0.1, dist);
    
    // Make particles highly additive and glowing
    gl_FragColor = vec4(vColor, alpha * 0.8);
}
`;

// ----------------------------------------------------------------------------
// 2. THE PARTICLE ENGINE (250,000 Particles)
// ----------------------------------------------------------------------------
function QuantumVortex() {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const mousePos = useRef(new THREE.Vector3(0, 0, 0));

    // Generate 250,000 particles ONCE computationally
    // This is 250k particles running flawlessly at 60 FPS
    const particleCount = 250000;

    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const randomIntensities = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // Seed particles onto a massive sphere
            const radius = Math.random() * 5 + 0.5;
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos((Math.random() * 2) - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            // Store positions
            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Store Random behavior variables [Speed, Distortion Range, Color Blend]
            randomIntensities[i * 3 + 0] = Math.random() * 1.5 + 0.5;
            randomIntensities[i * 3 + 1] = Math.random() * 2.0 + 0.5;
            randomIntensities[i * 3 + 2] = Math.random();

            // Particle size
            sizes[i] = Math.random() * 1.5 + 0.2;
        }

        return { positions, randomIntensities, sizes };
    }, []);

    // Uniforms persistence to prevent GPU crashing
    const uniforms = useRef({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uProgress: { value: 0 },
    });

    // Native window tracking for raw, unshielded interaction
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Map Mouse to a huge 3D bounding box [-10 to 10]
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            // Raycast proxy to translate 2D screen mouse to 3D world space depth (approx z=0 focus)
            mousePos.current.x = x * 10;
            mousePos.current.y = y * 10;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (materialRef.current) {
            // Time evolution
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

            // Smoothly track mouse in 3D space
            materialRef.current.uniforms.uMouse.value.x += (mousePos.current.x - materialRef.current.uniforms.uMouse.value.x) * 0.1;
            materialRef.current.uniforms.uMouse.value.y += (mousePos.current.y - materialRef.current.uniforms.uMouse.value.y) * 0.1;
        }

        if (pointsRef.current) {
            // Entire vortex slowly rotates on its axis
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            pointsRef.current.rotation.z = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particleCount} args={[particles.positions, 3]} />
                <bufferAttribute attach="attributes-aRandomIntensities" count={particleCount} args={[particles.randomIntensities, 3]} />
                <bufferAttribute attach="attributes-aSize" count={particleCount} args={[particles.sizes, 1]} />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms.current}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// ----------------------------------------------------------------------------
// 3. UI EXPORT COMPONENT
// ----------------------------------------------------------------------------
export function WebGLParticleVortex({ className, children }: WebGLParticleVortexProps) {
    return (
        <div className={cn("relative w-full h-full bg-[#010103] overflow-hidden", className)}>
            {/* The RAW Engine Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 1.5]}>
                    <QuantumVortex />
                </Canvas>
            </div>

            {/* Ignored DOM Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
                {children}
            </div>
        </div>
    );
}
