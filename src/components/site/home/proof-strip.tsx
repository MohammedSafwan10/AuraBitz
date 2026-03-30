import { proofItems } from "./data";

export function ProofStrip() {
  return (
    <section className="border-b border-white/6 bg-[#050505]/80">
      <div className="mx-auto grid max-w-7xl gap-px px-6 py-0 sm:px-8 lg:grid-cols-4 lg:px-10">
        {proofItems.map((item) => (
          <div key={item.label} className="border-t border-white/6 px-0 py-6 lg:border-l lg:border-t-0 lg:px-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.34em] text-white/44">{item.label}</p>
            <p className="mt-2 text-[15px] font-medium tracking-[-0.025em] text-white/90">{item.value}</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-white/38">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
