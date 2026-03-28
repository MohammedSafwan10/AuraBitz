"use client";

import { motion } from "framer-motion";
import { defaultViewport, fadeUp } from "./animations";
import { workflowSteps } from "./data";

export function WorkflowSection() {
  return (
    <section className="border-b border-white/6 px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mb-14 max-w-2xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/60">Workflow</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Browse. Copy. Ship.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/48 sm:text-lg">
            A tighter explanation of the product: enough context to convert, without drowning the page in marketing copy.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {workflowSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              custom={index + 1}
              variants={fadeUp}
              className="rounded-[1.75rem] border border-white/10 bg-[#050505] p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/60">{item.step}</span>
                <item.icon className="h-5 w-5 text-white/48" />
              </div>
              <h3 className="mt-10 text-xl font-medium tracking-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/45">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
