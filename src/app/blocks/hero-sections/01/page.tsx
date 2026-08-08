import { Hero01 } from "@/components/blocks/hero-01";
import { CodePreview } from "@/components/site/code-preview";
import { getBlockSource } from "@/lib/source";

const sourceCode = getBlockSource("hero-01.tsx");

export default function Hero01Page() {
  return (
    <CodePreview code={sourceCode} immersive>
      <Hero01 />
    </CodePreview>
  );
}
