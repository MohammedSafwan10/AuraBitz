"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { defaultViewport, fadeUp } from "./animations";
import { showcaseItems } from "./data";

export function CuratedShowcaseSection() {
  return (
    <section className="border-b border-white/6 px-5 py-14 sm:px-8 sm:py-18 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.34em] text-white/42">Library map</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.055em] text-white sm:text-5xl">
              Three clear paths.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/42 sm:text-[15px] sm:leading-7">
            Start with one component, then move into full blocks when the direction is right.
          </p>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-3">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              custom={index + 1}
              variants={fadeUp}
            >
              <Link
                href={item.href}
                className="group flex min-h-[17rem] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-[#050505] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.035]"
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white/42">
                  <span>{item.eyebrow}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <item.icon className="mb-6 h-5 w-5 text-white/58" />
                  <h3 className="text-2xl font-medium tracking-[-0.045em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/40">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
