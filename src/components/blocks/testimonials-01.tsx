"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "AuraBitz gave our launch page an identity instantly. The components felt like product surfaces, not filler sections.",
    name: "Mina Park",
    role: "Product Designer, Sable Systems",
  },
  {
    quote:
      "We replaced three generic sections with one stronger composition. The result looked more expensive and shipped faster.",
    name: "Owen Hale",
    role: "Founder, Northline Studio",
  },
  {
    quote:
      "The motion feels deliberate. It supports hierarchy instead of fighting it, which is rare in most UI kits.",
    name: "Rhea Sol",
    role: "Creative Director, Vector House",
  },
];

export function Testimonials01() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.08] bg-[#020202] px-5 py-16 sm:px-8 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_38%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div className="max-w-xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
              Social proof
            </p>
            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] text-white sm:text-6xl">
              Testimonials with cleaner signal.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            Testimonials 01 uses fewer cards, stronger quotes, and enough spacing
            to make social proof feel editorial instead of stacked into a noisy grid.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col justify-between rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Quote className="h-5 w-5 text-white/65" />
                  <div className="flex items-center gap-1 text-white/75">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mt-8 text-base leading-8 text-white/82">“{item.quote}”</p>
              </div>

              <div className="mt-10 border-t border-white/[0.08] pt-5">
                <p className="text-sm font-medium text-white">{item.name}</p>
                <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
                  {item.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
