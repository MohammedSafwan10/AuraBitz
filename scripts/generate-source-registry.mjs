import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outFile = path.join(root, "src", "generated", "source-registry.ts");

const componentFiles = {
  "holographic-card": "src/components/ui/holographic-card/index.tsx",
  "kinetic-button": "src/components/ui/kinetic-button/index.tsx",
  "grid-system": "src/components/ui/grid-system/index.tsx",
  "radial-noise": "src/components/ui/radial-noise/index.tsx",
  "spotlight-card": "src/components/ui/spotlight-card/index.tsx",
  "blur-text": "src/components/ui/blur-text/index.tsx",
  "circular-text": "src/components/ui/circular-text/index.tsx",
  "curved-loop": "src/components/ui/curved-loop/index.tsx",
  "kinetic-text": "src/components/ui/kinetic-text/index.tsx",
  "scramble-reveal": "src/components/ui/scramble-reveal/index.tsx",
  "shuffle": "src/components/ui/shuffle/index.tsx",
  "split-text": "src/components/ui/split-text/index.tsx",
  "text-pressure": "src/components/ui/text-pressure/index.tsx",
  "text-type": "src/components/ui/text-type/index.tsx",
};

const blockFiles = {
  "bento-01.tsx": "src/components/blocks/bento-01.tsx",
  "bento-02.tsx": "src/components/blocks/bento-02.tsx",
  "bento-03.tsx": "src/components/blocks/bento-03.tsx",
  "bento-04.tsx": "src/components/blocks/bento-04.tsx",
  "bento-05.tsx": "src/components/blocks/bento-05.tsx",
  "feature-01.tsx": "src/components/blocks/feature-01.tsx",
  "feature-02.tsx": "src/components/blocks/feature-02.tsx",
  "feature-03.tsx": "src/components/blocks/feature-03.tsx",
  "feature-04.tsx": "src/components/blocks/feature-04.tsx",
  "footers-01.tsx": "src/components/blocks/footers-01.tsx",
  "hero-01.tsx": "src/components/blocks/hero-01.tsx",
  "hero-02.tsx": "src/components/blocks/hero-02.tsx",
  "hero-03.tsx": "src/components/blocks/hero-03.tsx",
  "hero-04.tsx": "src/components/blocks/hero-04.tsx",
  "hero-05.tsx": "src/components/blocks/hero-05.tsx",
  "pricing-01.tsx": "src/components/blocks/pricing-01.tsx",
  "pricing-02.tsx": "src/components/blocks/pricing-02.tsx",
  "pricing-03.tsx": "src/components/blocks/pricing-03.tsx",
  "testimonials-01.tsx": "src/components/blocks/testimonials-01.tsx",
};

async function readEntries(entries) {
  const pairs = await Promise.all(
    Object.entries(entries).map(async ([key, relativePath]) => {
      const absolutePath = path.join(root, relativePath);
      const content = await fs.readFile(absolutePath, "utf8");
      return [key, content];
    })
  );

  return Object.fromEntries(pairs);
}

const components = await readEntries(componentFiles);
const blocks = await readEntries(blockFiles);

const fileContent = `export const componentSources = ${JSON.stringify(components, null, 2)} as const;

export const blockSources = ${JSON.stringify(blocks, null, 2)} as const;
`;

await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, fileContent, "utf8");
