import { CodePreview } from "@/components/site/code-preview";

interface TextSpecimenPageProps {
  index: string;
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
  metrics: Array<[string, string]>;
}

export function TextSpecimenPage({
  index,
  title,
  description,
  code,
  children,
  metrics,
}: TextSpecimenPageProps) {
  return (
    <div className="max-w-4xl space-y-14 pb-20">
      <header className="space-y-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">Text Animations / {index}</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white/90 md:text-5xl">{title}</h1>
        <p className="max-w-xl text-base leading-7 text-white/45">{description}</p>
      </header>

      <CodePreview code={code}>
        <div className="relative h-[440px] w-full overflow-hidden border border-white/[0.08] bg-black">
          {children}
        </div>
      </CodePreview>

      <section className="grid gap-px border border-white/[0.06] bg-white/[0.06] sm:grid-cols-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="bg-black p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">{label}</p>
            <p className="mt-2 text-sm text-white/65">{value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
