"use client";

import { motion } from "framer-motion";
import { defaultViewport, fadeUp } from "./animations";
import { workflowSteps } from "./data";

export function WorkflowSection() {
  return (
    <section className="border-b border-white/6 px-6 py-16 sm:px-8 sm:py-18 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mb-10 max-w-xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.38em] text-white/46">Workflow</p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
            See it. Take it. Ship it.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/40 sm:text-[15px] sm:leading-7">
            The entire product loop should be obvious without reading a wall of explanation.
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
              className="rounded-[1.5rem] border border-white/10 bg-[#050505] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.36em] text-white/50">{item.step}</span>
                <item.icon className="h-5 w-5 text-white/48" />
              </div>
              <h3 className="mt-7 text-lg font-medium tracking-[-0.03em] text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/39">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
