import { proofItems } from "./data";

export function ProofStrip() {
  return (
    <section className="border-b border-white/6 bg-[#050505]/80">
      <div className="mx-auto grid max-w-7xl gap-px px-6 py-0 sm:px-8 lg:grid-cols-4 lg:px-10">
        {proofItems.map((item) => (
          <div key={item.label} className="border-t border-white/6 px-0 py-8 lg:border-l lg:border-t-0 lg:px-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">{item.label}</p>
            <p className="mt-3 text-lg font-medium tracking-tight text-white/92">{item.value}</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-white/45">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
