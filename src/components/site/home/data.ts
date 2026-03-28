import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Copy,
  Gauge,
  Layers3,
  Palette,
  Sparkles,
  Zap,
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
    label: "Ownership",
    value: "Copy the code",
    detail: "No package lock-in. Drop the source directly into your app.",
  },
  {
    label: "Performance",
    value: "Motion with discipline",
    detail: "Effects are designed to feel premium without turning the page noisy.",
  },
  {
    label: "Adoption",
    value: "Ship in one pass",
    detail: "Browse, copy, and move straight into production work.",
  },
  {
    label: "Craft",
    value: "Made to look rare",
    detail: "AuraBitz components are tuned for presence, not generic template polish.",
  },
];

export const showcaseItems: ShowcaseItem[] = [
  {
    eyebrow: "Materials",
    title: "Holographic surfaces",
    description: "Glassy depth, lighting detail, and interaction that still feels product-ready.",
    href: "/docs/3d-physical/holographic-card",
    icon: Layers3,
  },
  {
    eyebrow: "Motion",
    title: "Kinetic feedback",
    description: "Buttons and interactions that respond with intent instead of default easing.",
    href: "/docs/3d-physical/kinetic-button",
    icon: Sparkles,
  },
  {
    eyebrow: "Typography",
    title: "Text with presence",
    description: "Display treatments that feel engineered, not pasted on after layout is done.",
    href: "/docs/text-animations/text-pressure",
    icon: ArrowUpRight,
  },
];

export const workflowSteps: WorkflowStepItem[] = [
  {
    step: "01",
    icon: Sparkles,
    title: "Browse with context",
    desc: "Evaluate live examples quickly instead of guessing from static screenshots.",
  },
  {
    step: "02",
    icon: Copy,
    title: "Copy the source",
    desc: "Take the implementation directly so your team owns the code from day one.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Ship without cleanup",
    desc: "Drop polished UI into production without fighting wrapper abstractions.",
  },
];

export const valueProps: ValuePropItem[] = [
  {
    icon: Copy,
    title: "Copy & Paste",
    desc: "No npm installs, no version conflicts. Copy the source directly into your project and own it completely.",
  },
  {
    icon: Gauge,
    title: "Zero Bloat",
    desc: "Every component is self-contained. No hidden runtime dependencies, no context providers, and no CSS-in-JS overhead.",
  },
  {
    icon: Palette,
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
  "Production UI",
  "Motion systems",
  "Interface presence",
] as const;

export const heroPreviewSlides: HeroPreviewSlide[] = [
  {
    eyebrow: "Material / surface",
    title: "Holographic Card",
    description: "Glassy depth, lighting detail, and interaction that still feels product-ready.",
    href: "/docs/3d-physical/holographic-card",
    ctaLabel: "Open holographic card",
    theme: "materials",
  },
  {
    eyebrow: "Motion / interaction",
    title: "Kinetic Button",
    description: "Buttons and interactions that respond with intent instead of default easing.",
    href: "/docs/3d-physical/kinetic-button",
    ctaLabel: "Open kinetic button",
    theme: "motion",
  },
  {
    eyebrow: "Typography / dynamics",
    title: "Text Pressure",
    description: "Display treatments that feel engineered, not pasted on after layout is done.",
    href: "/docs/text-animations/text-pressure",
    ctaLabel: "Open text pressure",
    theme: "typography",
  },
];

export const heroPrimaryPoints = [
  {
    icon: Copy,
    label: "Copy-paste ownership",
  },
  {
    icon: Gauge,
    label: "Performance-minded motion",
  },
  {
    icon: Palette,
    label: "Distinctive visual craft",
  },
];
