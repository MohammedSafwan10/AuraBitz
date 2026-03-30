import fs from "fs";
import path from "path";

export const componentSourceLoaders = {
    "holographic-card": () => import("@/components/ui/holographic-card/index.tsx?raw").then((mod) => mod.default),
    "kinetic-button": () => import("@/components/ui/kinetic-button/index.tsx?raw").then((mod) => mod.default),
    "grid-system": () => import("@/components/ui/grid-system/index.tsx?raw").then((mod) => mod.default),
    "radial-noise": () => import("@/components/ui/radial-noise/index.tsx?raw").then((mod) => mod.default),
    "spotlight-card": () => import("@/components/ui/spotlight-card/index.tsx?raw").then((mod) => mod.default),
    "blur-text": () => import("@/components/ui/blur-text/index.tsx?raw").then((mod) => mod.default),
    "circular-text": () => import("@/components/ui/circular-text/index.tsx?raw").then((mod) => mod.default),
    "curved-loop": () => import("@/components/ui/curved-loop/index.tsx?raw").then((mod) => mod.default),
    "kinetic-text": () => import("@/components/ui/kinetic-text/index.tsx?raw").then((mod) => mod.default),
    "scramble-reveal": () => import("@/components/ui/scramble-reveal/index.tsx?raw").then((mod) => mod.default),
    "shuffle": () => import("@/components/ui/shuffle/index.tsx?raw").then((mod) => mod.default),
    "split-text": () => import("@/components/ui/split-text/index.tsx?raw").then((mod) => mod.default),
    "text-pressure": () => import("@/components/ui/text-pressure/index.tsx?raw").then((mod) => mod.default),
    "text-type": () => import("@/components/ui/text-type/index.tsx?raw").then((mod) => mod.default),
} as const;

export const blockSourceLoaders = {
    "bento-01.tsx": () => import("@/components/blocks/bento-01.tsx?raw").then((mod) => mod.default),
    "bento-02.tsx": () => import("@/components/blocks/bento-02.tsx?raw").then((mod) => mod.default),
    "bento-03.tsx": () => import("@/components/blocks/bento-03.tsx?raw").then((mod) => mod.default),
    "bento-04.tsx": () => import("@/components/blocks/bento-04.tsx?raw").then((mod) => mod.default),
    "bento-05.tsx": () => import("@/components/blocks/bento-05.tsx?raw").then((mod) => mod.default),
    "feature-01.tsx": () => import("@/components/blocks/feature-01.tsx?raw").then((mod) => mod.default),
    "feature-02.tsx": () => import("@/components/blocks/feature-02.tsx?raw").then((mod) => mod.default),
    "feature-03.tsx": () => import("@/components/blocks/feature-03.tsx?raw").then((mod) => mod.default),
    "feature-04.tsx": () => import("@/components/blocks/feature-04.tsx?raw").then((mod) => mod.default),
    "footers-01.tsx": () => import("@/components/blocks/footers-01.tsx?raw").then((mod) => mod.default),
    "hero-01.tsx": () => import("@/components/blocks/hero-01.tsx?raw").then((mod) => mod.default),
    "hero-02.tsx": () => import("@/components/blocks/hero-02.tsx?raw").then((mod) => mod.default),
    "hero-03.tsx": () => import("@/components/blocks/hero-03.tsx?raw").then((mod) => mod.default),
    "hero-04.tsx": () => import("@/components/blocks/hero-04.tsx?raw").then((mod) => mod.default),
    "hero-05.tsx": () => import("@/components/blocks/hero-05.tsx?raw").then((mod) => mod.default),
    "pricing-01.tsx": () => import("@/components/blocks/pricing-01.tsx?raw").then((mod) => mod.default),
    "pricing-02.tsx": () => import("@/components/blocks/pricing-02.tsx?raw").then((mod) => mod.default),
    "pricing-03.tsx": () => import("@/components/blocks/pricing-03.tsx?raw").then((mod) => mod.default),
    "testimonials-01.tsx": () => import("@/components/blocks/testimonials-01.tsx?raw").then((mod) => mod.default),
} as const;

export function getComponentSource(componentName: string): string {
    const safeComponentName = path.basename(componentName);
    const filePath = path.join(process.cwd(), "src", "components", "ui", safeComponentName, "index.tsx");
    return fs.readFileSync(filePath, "utf-8");
}

export function getBlockSource(blockFileName: string): string {
    const safeBlockFileName = path.basename(blockFileName);
    const filePath = path.join(process.cwd(), "src", "components", "blocks", safeBlockFileName);
    return fs.readFileSync(filePath, "utf-8");
}
