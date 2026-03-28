"use client";

import { motion } from "framer-motion";
import { defaultViewport, fadeUp } from "./animations";
import { techStack } from "./data";

export function TechStackSection() {
  return (
    <section className="relative z-10 border-t border-white/5 py-28 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4"
        >
          Built on
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={1}
          variants={fadeUp}
          className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-12"
        >
          Modern foundations.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              custom={index + 2}
              variants={fadeUp}
              className="bg-[#050505] py-10 px-6 flex flex-col items-center"
            >
              <span className="text-sm font-medium text-white/80 mb-1">{tech.name}</span>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{tech.detail}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
