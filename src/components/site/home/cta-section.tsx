"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { KineticButton } from "@/components/ui/kinetic-button";
import { defaultViewport, fadeUp } from "./animations";

export function CtaSection() {
  const router = useRouter();
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-18 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_40%,rgba(255,255,255,0.01))] px-6 py-10 sm:px-10 sm:py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.38em] text-white/46">Start here</p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
            Open the library and move fast.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40 sm:text-[15px] sm:leading-7">
            Browse the catalog, copy the source, and shape it into your own product surface.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={1}
          variants={fadeUp}
          className="mt-8 flex justify-center"
        >
          <KineticButton
            type="button"
            onClick={() => router.push("/docs")}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-neutral-200"
            magneticPull={0.16}
          >
            Explore components
            <ArrowUpRight className="h-4 w-4" />
          </KineticButton>
        </motion.div>
      </div>
    </section>
  );
}
