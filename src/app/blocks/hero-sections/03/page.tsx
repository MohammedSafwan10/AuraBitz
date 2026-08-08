import { Hero03 } from "@/components/blocks/hero-03";
import { CodePreview } from "@/components/site/code-preview";
import { getBlockSource } from "@/lib/source";

const sourceCode = getBlockSource("hero-03.tsx");

export default function Hero03Page() {
  return (
    <CodePreview code={sourceCode} immersive>
      <Hero03 />
    </CodePreview>
  );
}
