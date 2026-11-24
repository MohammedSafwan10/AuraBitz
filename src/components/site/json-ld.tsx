export function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "@id": "https://aurabitz.nexdark.com/#app",
                name: "AuraBitz",
                alternateName: ["AuraBitz UI", "AuraBitz by NexDark Labs"],
                url: "https://aurabitz.nexdark.com/",
                description:
                    "Production-ready WebGL backgrounds, kinetic typography, and motion-heavy UI blocks for Next.js, Three.js, and Framer Motion — built by NexDark Labs.",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Web",
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                },
                author: {
                    "@type": "Person",
                    name: "Mohammed Safwan",
                    url: "https://github.com/MohammedSafwan10",
                },
                creator: {
                    "@type": "Organization",
                    "@id": "https://nexdark.com/#organization",
                    name: "NexDark Labs",
                    url: "https://nexdark.com/",
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
                    "NexDark Labs",
                ],
                sameAs: [
                    "https://github.com/MohammedSafwan10/AuraBitz",
                    "https://nexdark.com/",
                    "https://3d.nexdark.com/",
                ],
            },
            {
                "@type": "WebSite",
                "@id": "https://aurabitz.nexdark.com/#website",
                name: "AuraBitz",
                url: "https://aurabitz.nexdark.com/",
                publisher: { "@id": "https://nexdark.com/#organization" },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
        />
    );
}
