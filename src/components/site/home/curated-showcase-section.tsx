"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { defaultViewport, fadeUp } from "./animations";
import { showcaseItems } from "./data";

export function CuratedShowcaseSection() {
  const [featured, secondaryA, secondaryB] = showcaseItems;

  return (
    <section className="border-b border-white/6 px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mb-14 max-w-2xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/60">Curated showcase</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Fewer examples. More signal.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/48 sm:text-lg">
            The homepage should prove range without turning into a wall of equally loud previews.
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
              className="group block rounded-[2rem] border border-white/10 bg-[#050505] p-8 transition-colors hover:border-white/20"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white/60">
                <span>{featured.eyebrow}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-14 rounded-[1.6rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] p-8">
                <featured.icon className="h-5 w-5 text-white/65" />
                <h3 className="mt-8 text-3xl font-medium tracking-tight text-white">{featured.title}</h3>
                <p className="mt-4 max-w-lg text-base leading-7 text-white/45">{featured.description}</p>
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
                  className="group block rounded-[1.75rem] border border-white/10 bg-[#050505] p-7 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white/60">
                    <span>{item.eyebrow}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <item.icon className="mt-10 h-5 w-5 text-white/65" />
                  <h3 className="mt-6 text-2xl font-medium tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/45">{item.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
