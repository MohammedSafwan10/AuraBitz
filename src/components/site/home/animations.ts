import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.96 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const defaultViewport = { once: false, amount: 0.3 };

export const heroViewport = { once: false, amount: 0.1 };

export const carouselTransition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

export const heroHeadlineTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const heroPreviewTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
};
