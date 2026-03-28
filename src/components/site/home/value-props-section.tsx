"use client";

import { motion } from "framer-motion";
import { defaultViewport, fadeUp } from "./animations";
import { valueProps } from "./data";

export function ValuePropsSection() {
  return (
    <section className="relative z-10 border-t border-white/5 py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">Why AuraBitz</p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-5">Not another UI kit.</h2>
          <p className="text-white/40 max-w-lg mx-auto text-base leading-relaxed">
            Every component is obsessively engineered for extreme visual quality. No runtime bloat, no wrapper packages. Just pure code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              custom={index + 1}
              variants={fadeUp}
              className="group rounded-2xl border border-white/5 bg-[#050505] p-8 hover:border-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-white/40 group-hover:text-white/70 transition-colors">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-medium text-white/90 mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
