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
    label: "Direct source",
    value: "Own every file",
    detail: "Copy the implementation and shape it to your product.",
  },
  {
    label: "Signal first",
    value: "Sharp by default",
    detail: "Motion and materials stay expressive without getting messy.",
  },
  {
    label: "Fast adoption",
    value: "Ship faster",
    detail: "Browse, copy, and move straight into product work.",
  },
  {
    label: "Visual weight",
    value: "Made to stand out",
    detail: "Built for premium interfaces, not generic component galleries.",
  },
];

export const showcaseItems: ShowcaseItem[] = [
  {
    eyebrow: "Materials",
    title: "Surfaces with depth",
    description: "Glass, light, and material response that still feels deployable.",
    href: "/docs/3d-physical/holographic-card",
    icon: Layers3,
  },
  {
    eyebrow: "Motion",
    title: "Interaction with force",
    description: "Buttons and motion that feel tuned instead of templated.",
    href: "/docs/3d-physical/kinetic-button",
    icon: Sparkles,
  },
  {
    eyebrow: "Typography",
    title: "Type that carries weight",
    description: "Display treatments that feel designed into the interface from day one.",
    href: "/docs/text-animations/text-pressure",
    icon: ArrowUpRight,
  },
];

export const workflowSteps: WorkflowStepItem[] = [
  {
    step: "01",
    icon: Sparkles,
    title: "Scan the library",
    desc: "See the idea quickly without digging through noise.",
  },
  {
    step: "02",
    icon: Copy,
    title: "Copy the source",
    desc: "Take the code directly so your team owns the final implementation.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Ship with intent",
    desc: "Move from reference to production without fighting wrapper abstractions.",
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
  "Interfaces that move like cinema",
  "Dark systems with physical weight",
  "Production surfaces with real presence",
] as const;

export const heroPreviewSlides: HeroPreviewSlide[] = [
  {
    eyebrow: "Material / surface",
    title: "Holographic Card",
    description: "A premium surface study with real depth, light, and polish.",
    href: "/docs/3d-physical/holographic-card",
    ctaLabel: "Open holographic card",
    theme: "materials",
  },
  {
    eyebrow: "Motion / interaction",
    title: "Kinetic Button",
    description: "Interaction that feels loaded, directional, and deliberate.",
    href: "/docs/3d-physical/kinetic-button",
    ctaLabel: "Open kinetic button",
    theme: "motion",
  },
  {
    eyebrow: "Typography / dynamics",
    title: "Text Pressure",
    description: "Display typography that feels embedded into the layout system.",
    href: "/docs/text-animations/text-pressure",
    ctaLabel: "Open text pressure",
    theme: "typography",
  },
];

export const heroPrimaryPoints = [
  {
    icon: Copy,
    label: "Source-first ownership",
  },
  {
    icon: Gauge,
    label: "Tuned motion systems",
  },
  {
    icon: Palette,
    label: "Premium dark craft",
  },
];
