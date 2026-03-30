"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { defaultViewport, fadeUp } from "./animations";
import { showcaseItems } from "./data";

export function CuratedShowcaseSection() {
  const [featured, secondaryA, secondaryB] = showcaseItems;

  return (
    <section className="border-b border-white/6 px-6 py-16 sm:px-8 sm:py-18 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mb-10 max-w-xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.38em] text-white/46">Selected surfaces</p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
            Three directions. One visual standard.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/40 sm:text-[15px] sm:leading-7">
            Enough range to prove the library, compact enough to scan in seconds.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            custom={1}
            variants={fadeUp}
          >
            <Link
              href={featured.href}
              className="group block rounded-[1.8rem] border border-white/10 bg-[#050505] p-6 transition-colors hover:border-white/20"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.36em] text-white/50">
                <span>{featured.eyebrow}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-8 rounded-[1.45rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] p-6">
                <featured.icon className="h-5 w-5 text-white/65" />
                <h3 className="mt-6 text-2xl font-medium tracking-[-0.035em] text-white">{featured.title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/40 sm:text-[15px] sm:leading-7">{featured.description}</p>
              </div>
            </Link>
          </motion.div>

          <div className="grid gap-5">
            {[secondaryA, secondaryB].map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                custom={index + 2}
                variants={fadeUp}
              >
                <Link
                  href={item.href}
                  className="group block rounded-[1.55rem] border border-white/10 bg-[#050505] p-5 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.36em] text-white/50">
                    <span>{item.eyebrow}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <item.icon className="mt-8 h-5 w-5 text-white/65" />
                  <h3 className="mt-5 text-xl font-medium tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/40">{item.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
