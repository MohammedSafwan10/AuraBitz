"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { KineticButton } from "@/components/ui/kinetic-button";
import { defaultViewport, fadeUp } from "./animations";

export function CtaSection() {
  const router = useRouter();
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_40%,rgba(255,255,255,0.01))] px-6 py-14 sm:px-10 sm:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={0}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/60">Start here</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Build something people remember.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/48 sm:text-lg">
            Explore the catalog, copy the source, and ship UI that feels intentional from the first frame.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={1}
          variants={fadeUp}
          className="mt-10 flex justify-center"
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
