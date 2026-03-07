import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://aurabitz.nexdark.com";

    // All pages on the site with their SEO priority
    const routes = [
        { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
        { path: "/blocks", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/docs", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/docs/installation", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/pricing", priority: 0.7, changeFrequency: "monthly" as const },

        // Hero Sections
        { path: "/blocks/hero-sections/01", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/blocks/hero-sections/02", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/blocks/hero-sections/03", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/blocks/hero-sections/04", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/blocks/hero-sections/05", priority: 0.8, changeFrequency: "monthly" as const },

        // Bento Grids
        { path: "/blocks/bento-grids/01", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/blocks/bento-grids/02", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/blocks/bento-grids/03", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/blocks/bento-grids/04", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/blocks/bento-grids/05", priority: 0.8, changeFrequency: "monthly" as const },

        // Other blocks
        { path: "/blocks/feature-showcases/01", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/blocks/feature-showcases/02", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/blocks/feature-showcases/03", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/blocks/footers/01", priority: 0.6, changeFrequency: "monthly" as const },
        { path: "/blocks/pricing-tables/01", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/blocks/testimonials/01", priority: 0.7, changeFrequency: "monthly" as const },

        // Docs - Components
        { path: "/docs/3d-physical/holographic-card", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/3d-physical/kinetic-button", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/backgrounds/grid-system", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/backgrounds/radial-noise", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/illumination/spotlight-card", priority: 0.7, changeFrequency: "monthly" as const },

        // Docs - Text Animations
        { path: "/docs/text-animations/blur-text", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/text-animations/circular-text", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/text-animations/curved-loop", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/text-animations/kinetic-text", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/text-animations/scramble-reveal", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/text-animations/shuffle", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/text-animations/split-text", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/text-animations/text-pressure", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/docs/text-animations/text-type", priority: 0.7, changeFrequency: "monthly" as const },
    ];

    return routes.map((route) => ({
        url: `${base}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
