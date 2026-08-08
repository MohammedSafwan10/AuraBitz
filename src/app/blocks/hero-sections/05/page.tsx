import { Hero05 } from "@/components/blocks/hero-05";
import { CodePreview } from "@/components/site/code-preview";
import { getBlockSource } from "@/lib/source";

const sourceCode = getBlockSource("hero-05.tsx");

export default function Hero05Page() {
  return (
    <CodePreview code={sourceCode} immersive>
      <Hero05 />
    </CodePreview>
  );
}
