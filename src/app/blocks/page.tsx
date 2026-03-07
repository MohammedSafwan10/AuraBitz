import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "Blocks - AuraBitz",
    description: "Pre-built, high-converting premium section layouts.",
};

const categories = [
    {
        title: "Landing Page Blocks",
        description: "Pre-built, high-converting premium section layouts.",
        items: [
            { name: "Hero 01", href: "/blocks/hero-sections/01" },
            { name: "Bento 01", href: "/blocks/bento-grids/01" },
            { name: "Feature 01", href: "/blocks/feature-showcases/01" },
            { name: "Feature 02", href: "/blocks/feature-showcases/02" },
            { name: "Feature 03", href: "/blocks/feature-showcases/03" },
            { name: "Feature 04", href: "/blocks/feature-showcases/04" },
            { name: "Pricing 01", href: "/blocks/pricing-tables/01" },
            { name: "Pricing 02", href: "/blocks/pricing-tables/02" },
            { name: "Pricing 03", href: "/blocks/pricing-tables/03" },
            { name: "Testimonial 01", href: "/blocks/testimonials/01" },
            { name: "Footer 01", href: "/blocks/footers/01" }
        ]
    }
];

export default function BlocksIndex() {
    return (
        <div className="max-w-5xl pb-20">
            {/* Header */}
            <div className="relative mb-16">
                <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <h1 className="grad-text text-4xl md:text-5xl font-extrabold tracking-tighter mb-5">
                        Blocks Index
                    </h1>
                    <p className="text-xl text-white/50 font-light max-w-2xl leading-relaxed">
                        Pre-built, high-converting premium section layouts. Built with AuraBitz components for an ultra-premium landing page experience.
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
