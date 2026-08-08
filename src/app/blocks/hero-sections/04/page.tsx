import { Hero04 } from "@/components/blocks/hero-04";
import { CodePreview } from "@/components/site/code-preview";
import { getBlockSource } from "@/lib/source";

const sourceCode = getBlockSource("hero-04.tsx");

export default function Hero04Page() {
  return (
    <CodePreview code={sourceCode} immersive>
      <Hero04 />
    </CodePreview>
  );
}
