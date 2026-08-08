import { Hero02 } from "@/components/blocks/hero-02";
import { CodePreview } from "@/components/site/code-preview";
import { getBlockSource } from "@/lib/source";

const sourceCode = getBlockSource("hero-02.tsx");

export default function Hero02Page() {
  return (
    <CodePreview code={sourceCode} immersive>
      <Hero02 />
    </CodePreview>
  );
}
