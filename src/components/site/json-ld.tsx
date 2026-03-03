"use client";

export function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "AuraBitz",
        url: "https://aurabitz.nexdark.com",
        description:
            "Production-ready WebGL backgrounds, kinetic typography, and motion-heavy UI blocks for Next.js and Framer Motion.",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        author: {
            "@type": "Person",
            name: "Mohammed Safwan",
            url: "https://github.com/MohammedSafwan10",
        },
        creator: {
            "@type": "Organization",
            name: "AuraBitz",
            url: "https://aurabitz.nexdark.com",
            logo: "https://aurabitz.nexdark.com/logo-512.png",
        },
        image: "https://aurabitz.nexdark.com/og-image.jpg",
        screenshot: "https://aurabitz.nexdark.com/og-image.jpg",
        keywords: [
            "WebGL components",
            "Next.js UI library",
            "Framer Motion blocks",
            "Three.js React",
            "kinetic typography",
            "motion UI",
            "hero sections",
            "bento grid",
            "TailwindCSS blocks",
        ],
        sameAs: ["https://github.com/MohammedSafwan10/AuraBitz"],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
