# AuraBitz: Hero Architecture Context

## Core Philosophy (The "AuraBitz" Aesthetic)
1. **Never use standard CSS or DOM animations for primary Hero backgrounds.** Every background should run at 60-120 FPS by executing natively in the user's GPU pixel pipeline using `react-three-fiber` and custom GLSL Vertex/Fragment shaders.
2. **Absolute Separation of Concerns.** The background `Canvas` ALWAYS sits at `z-index: 0` using `absolute inset-0`. The DOM layout (React, Tailwind, Framer Motion) ALWAYS sits on top using `z-index: 10`.
3. **Pass-through Interaction.** The HTML DOM layer (`z-10`) MUST use `pointer-events: none` on its root wrapper container, with `pointer-events: auto` explicitly set ONLY on buttons or interactive links. This guarantees the user's mouse interacts with the underlying WebGL simulations without invisible HTML `divs` acting as shields and breaking the physics.
4. **Vibe & Aesthetic:** Awwwards-winning. Hyper-premium. Data-heavy, brutalist, ethereal, SaaS, Fintech, Web3, and Cyberpunk all at the same time. Never use basic red/blue/green. Always calculate deep gradients mathematically (e.g., Midnight + Violet + Electric Cyan).
5. **No AI Slop.** Every single math equation or visual interaction must have a clear physical purpose and a premium feel. Avoid random glowing blobs or generic placeholder content.

---

## The Hero Archive (1 through 5)

### Hero 01: The WebGL Aura
*   **The Component:** `MeshDistortBg`
*   **The Tech:** `@react-three/drei` standard geometries combined with high-frequency mesh distortion.
*   **The UX:** An elegant, softly undulating, noise-based amorphous sphere that changes shape behind minimal, high-contrast typography. An intro to the design system.

### Hero 02: Glass Singularity
*   **The Component:** `WebGLGlassCore`
*   **The Tech:** 3D Icosahedron Geometry using `MeshTransmissionMaterial`.
*   **The UX:** A massive piece of beautiful, refractive "glass" floating in the center of the screen. I optimized it perfectly by enabling `transmissionSampler={true}` rather than rendering multiple pass-through layers, instantly achieving flawless 60fps glass refraction.

### Hero 03: Quantum Matrix
*   **The Component:** `WebGLParticleField`
*   **The Tech:** Custom GLSL Shaders (Vertex & Fragment) targeting an array of 50,000 points.
*   **The UX:** A "galaxy" of 50,000 math-driven particles. The Vertex shader handles orbit velocities, varying depths, and sizes. An excellent demonstration of bypassing the DOM hierarchy for performance.

### Hero 04: Liquid Flow
*   **The Component:** `WebGLLiquidAurora`
*   **The Tech:** A 2D flat plane stretched across the screen powered entirely by an ultra-complex GLSL Fragment Shader implementing Simplex 3D Noise.
*   **The UX:** Looks incredibly expensive (Apple/Stripe aesthetic). Creates an organic, continuous, velvety fluid mixing simulation calculating liquid properties.
*   **Crucial Pattern Resolved here:** Fixed "Freeze Bugs" by removing `useMemo` from `uniforms` regeneration during resizing, and tracking the mouse exclusively via native `window.addEventListener('mousemove')` rather than the `Canvas` `state.mouse.x`.

### Hero 05: Quantum Vortex
*   **The Component:** `WebGLParticleVortex`
*   **The Tech:** 250,000 active particles driven by massive "Curl Noise" physics running simultaneously within a GLSL Vertex shader.
*   **The UX:** Brutalist Cyberpunk. Raw mathematical computing power. The particles respond to interactive 3D repulsion physics when the mouse drags through the cluster (creating a magnetic "Black Hole" disruption) before reconstructing the vortex.

---

## Pending Hero Research Archive (For Next Level Engineering)

If you are asked to engineer Hero 06, you must utilize one of these concepts to keep pushing the bleeding edge of modern web development:

**Pending Concept A: Ethereal Volumetric Field Simulation**
*   **The Stack:** Signed Distance Fields (SDFs) + Raymarching Shaders + Dynamic Lighting.
*   **The Execution:** Implementing Volumetric Subsurface Scattering. Rendering a virtual rippling field object without any polygons. Move the mouse to cast volumetric godrays through the mathematical "dust" inside the simulation.

**Pending Concept B: Holographic Glass Destructible Typographic Engine**
*   **The Stack:** 3D Text Geometry + Physics Engine (`Cannon.js` or `Rapier`) + `MeshTransmissionMaterial`.
*   **The Execution:** The headline text itself is made of individual massive 3D chunks of refractive glass floating in zero gravity. When the user hovers, the glass chunks bump into each other. When clicked, 9.8 Gravity is enabled and the text physically shatters onto an invisible plane.
