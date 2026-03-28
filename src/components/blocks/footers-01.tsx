"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: ["Components", "Blocks", "Documentation"],
  },
  {
    title: "Company",
    links: ["About", "Process", "Contact"],
  },
  {
    title: "Social",
    links: ["Instagram", "Twitter", "LinkedIn"],
  },
];

const socialIcons = [Twitter, Instagram, Linkedin];

export function Footers01() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#020202] px-5 py-16 sm:px-8 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_34%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
              Closing sequence
            </p>
            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] text-white sm:text-6xl">
              End the page with a stronger final frame.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              Footers 01 is built like a premium closing surface: clear navigation,
              a single call to action, and enough atmosphere to finish the page
              without turning the ending into noise.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-[1.75rem] border border-white/[0.08] bg-black/40 p-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/60">
                Final CTA
              </p>
              <p className="mt-4 text-2xl font-medium tracking-tight text-white">
                Build an interface people remember.
              </p>
            </div>

            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-between rounded-full border border-white/10 bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
            >
              <span>Explore components</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
              AuraBitz
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/50">
              Premium blocks and motion systems for product teams that want more
              presence than a default kit can offer.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {footerLinks.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.02] p-5"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/60">
                  {group.title}
                </p>
                <ul className="mt-5 space-y-3 text-sm text-white/70">
                  {group.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">
            © 2026 AuraBitz. Crafted with precision.
          </p>
          <div className="flex items-center gap-3 text-white/70">
            {socialIcons.map((Icon) => (
              <span
                key={Icon.displayName ?? Icon.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
