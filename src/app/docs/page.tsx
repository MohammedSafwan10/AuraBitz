import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
    {
        title: "3D & Physical",
        description: "Physical interactions mimicking real-world constraints.",
        items: [
            { name: "Holographic Card", href: "/docs/3d-physical/holographic-card" },
            { name: "Kinetic Button", href: "/docs/3d-physical/kinetic-button" }
        ]
    },
    {
        title: "Illumination",
        description: "Hardware-accelerated ambient glows and laser traces.",
        items: [
            { name: "Spotlight Card", href: "/docs/illumination/spotlight-card" }
        ]
    },
    {
        title: "Backgrounds",
        description: "Architectural grid systems and precision noise.",
        items: [
            { name: "Grid System", href: "/docs/backgrounds/grid-system" },
            { name: "Radial Noise", href: "/docs/backgrounds/radial-noise" }
        ]
    },
    {
        title: "Text Animations",
        description: "Kinetic letters and cryptographic string reveals.",
        items: [
            { name: "Kinetic Text", href: "/docs/text-animations/kinetic-text" },
            { name: "Scramble Reveal", href: "/docs/text-animations/scramble-reveal" },
            { name: "Split Text", href: "/docs/text-animations/split-text" },
            { name: "Blur Text", href: "/docs/text-animations/blur-text" },
            { name: "Circular Text", href: "/docs/text-animations/circular-text" },
            { name: "Text Type", href: "/docs/text-animations/text-type" },
            { name: "Shuffle", href: "/docs/text-animations/shuffle" },

            { name: "Text Pressure", href: "/docs/text-animations/text-pressure" },
            { name: "Curved Loop", href: "/docs/text-animations/curved-loop" }
        ]
    }
];

export default function DocsIndex() {
    return (
        <div className="max-w-5xl pb-20">
            {/* Header */}
            <div className="relative mb-16">
                <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <h1 className="grad-text text-4xl md:text-5xl font-extrabold tracking-tighter mb-5">
                        Index
                    </h1>
                    <p className="text-xl text-white/50 font-light max-w-2xl leading-relaxed">
                        A curated collection of architectural-grade React components. Precision-crafted for extreme performance and absolute minimal aesthetics.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.title}
                        className="group rounded-2xl border border-white/[0.05] bg-[#050505] overflow-hidden flex flex-col transition-all hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                    >
                        {/* Card header */}
                        <div className="relative p-8 pb-6 border-b border-white/[0.05] overflow-hidden">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h2 className="grad-text text-lg font-extrabold tracking-tight mb-2">
                                {category.title}
                            </h2>
                            <p className="text-sm text-white/40 leading-relaxed font-light">{category.description}</p>
                        </div>

                        {/* Links */}
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#020202]">
                            {category.items.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group/link flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-all"
                                >
                                    <span className="text-sm text-white/60 group-hover/link:text-white transition-colors font-light">
                                        {item.name}
                                    </span>
                                    <ArrowRight className="w-3 h-3 text-white/20 group-hover/link:text-white/80 -translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
