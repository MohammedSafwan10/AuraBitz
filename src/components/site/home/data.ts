import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Layers3,
  Sparkles,
} from "lucide-react";

export interface ProofItem {
  label: string;
  value: string;
  detail: string;
}

export interface ShowcaseItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  eyebrow: string;
}

export interface WorkflowStepItem {
  step: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ValuePropItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const proofItems: ProofItem[] = [
  {
    label: "Source",
    value: "Copy the code",
    detail: "No package lock-in.",
  },
  {
    label: "Motion",
    value: "Framer-tuned",
    detail: "Springs over flat transitions.",
  },
  {
    label: "Surface",
    value: "Dark by default",
    detail: "Built for black product pages.",
  },
];

export const showcaseItems: ShowcaseItem[] = [
  {
    eyebrow: "Materials",
    title: "Glass cards",
    description: "Depth, glare, and edge light without another marketing card grid.",
    href: "/docs/3d-physical/holographic-card",
    icon: Layers3,
  },
  {
    eyebrow: "Motion",
    title: "Kinetic buttons",
    description: "Controls with weight, pull, and release built into the source.",
    href: "/docs/3d-physical/kinetic-button",
    icon: Sparkles,
  },
  {
    eyebrow: "Typography",
    title: "Text effects",
    description: "Animated headings that stay readable on desktop and mobile.",
    href: "/docs/text-animations/text-pressure",
    icon: ArrowUpRight,
  },
];

export const workflowSteps: WorkflowStepItem[] = [
  {
    step: "01",
    icon: Sparkles,
    title: "Preview",
    desc: "Open a component and judge it in context.",
  },
  {
    step: "02",
    icon: ArrowUpRight,
    title: "Copy",
    desc: "Take the source and make it yours.",
  },
  {
    step: "03",
    icon: Layers3,
    title: "Compose",
    desc: "Use atoms alone or drop in complete blocks.",
  },
];

export const valueProps: ValuePropItem[] = [
  {
    icon: ArrowUpRight,
    title: "Copy & Paste",
    desc: "No npm installs, no version conflicts. Copy the source directly into your project and own it completely.",
  },
  {
    icon: Layers3,
    title: "Zero Bloat",
    desc: "Every component is self-contained. No hidden runtime dependencies, no context providers, and no CSS-in-JS overhead.",
  },
  {
    icon: Sparkles,
    title: "Design-First",
    desc: "Built with hand-tuned spacing, motion, and surface detail so the result feels deliberate instead of generic.",
  },
];

export const techStack = [
  { name: "Next.js", detail: "App Router" },
  { name: "Tailwind CSS", detail: "v4" },
  { name: "Framer Motion", detail: "Animations" },
  { name: "TypeScript", detail: "Strict mode" },
];

export interface HeroPreviewSlide {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  theme: "materials" | "motion" | "typography";
}

export const heroHeadlinePhrases = [
  "Dark motion components",
  "Source you can copy",
  "Landing blocks with restraint",
] as const;

export const heroPreviewSlides: HeroPreviewSlide[] = [
  {
    eyebrow: "Motion",
    title: "Kinetic Button",
    description: "A button interaction with drag, pull, and release.",
    href: "/docs/3d-physical/kinetic-button",
    ctaLabel: "View component",
    theme: "motion",
  },
  {
    eyebrow: "Typography",
    title: "Text Pressure",
    description: "Responsive type motion for hero headlines.",
    href: "/docs/text-animations/text-pressure",
    ctaLabel: "View component",
    theme: "typography",
  },
  {
    eyebrow: "Blocks",
    title: "Hero Sections",
    description: "Complete landing sections with dark layout systems.",
    href: "/blocks/hero-sections/01",
    ctaLabel: "View block",
    theme: "materials",
  },
];
