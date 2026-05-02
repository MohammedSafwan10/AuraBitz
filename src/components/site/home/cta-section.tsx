"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { KineticButton } from "@/components/ui/kinetic-button";
import { defaultViewport, fadeUp } from "./animations";

export function CtaSection() {
  const router = useRouter();
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-18 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-[1.6rem] border border-white/10 bg-[#050505] px-5 py-8 sm:px-10 sm:py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.34em] text-white/42">Start small</p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.055em] text-white sm:text-5xl">
            Pick one surface. Copy it.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/42 sm:text-[15px] sm:leading-7">
            No wall of claims. Open the docs, inspect the component, and take the source if it fits.
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
