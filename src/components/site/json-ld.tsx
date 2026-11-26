export function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["WebApplication", "SoftwareSourceCode"],
                "@id": "https://aurabitz.nexdark.com/#app",
                name: "AuraBitz UI",
                alternateName: ["AuraBitz", "AuraBitz NexDark", "AuraBitz by NexDark Labs", "AuraBitz React Components"],
                url: "https://aurabitz.nexdark.com/",
                codeRepository: "https://github.com/MohammedSafwan10/AuraBitz",
                programmingLanguage: ["TypeScript", "React", "GLSL"],
                description:
                    "Open-source React, Next.js, Three.js, and Framer Motion UI component library featuring production-ready WebGL backgrounds, kinetic typography, and interactive motion blocks — built by NexDark Labs.",
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
                    "@id": "https://iamsafwan.me/#person",
                    name: "Mohammed Safwan",
                    url: "https://iamsafwan.me/",
                },
                creator: {
                    "@type": "Organization",
                    "@id": "https://nexdark.com/#organization",
                    name: "NexDark Labs",
                    url: "https://nexdark.com/",
                    logo: "https://aurabitz.nexdark.com/logo-512.png",
                    founder: { "@id": "https://iamsafwan.me/#person" },
                },
                image: "https://aurabitz.nexdark.com/og-image.jpg",
                screenshot: "https://aurabitz.nexdark.com/og-image.jpg",
                keywords: [
                    "AuraBitz",
                    "AuraBitz UI",
                    "WebGL components",
                    "Next.js UI library",
                    "Framer Motion blocks",
                    "Three.js React",
                    "kinetic typography",
                    "motion UI",
                    "TailwindCSS blocks",
                    "NexDark Labs",
                ],
                sameAs: [
                    "https://github.com/MohammedSafwan10/AuraBitz",
                    "https://nexdark.com/",
                    "https://3d.nexdark.com/",
                    "https://ottero.nexdark.com/",
                    "https://iamsafwan.me/",
                ],
            },
            {
                "@type": "WebSite",
                "@id": "https://aurabitz.nexdark.com/#website",
                name: "AuraBitz UI",
                alternateName: ["AuraBitz", "AuraBitz by NexDark Labs"],
                url: "https://aurabitz.nexdark.com/",
                publisher: { "@id": "https://nexdark.com/#organization" },
            },
            {
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "What is AuraBitz UI?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "AuraBitz UI (aurabitz.nexdark.com) is an open-source React, Next.js, Three.js, and Framer Motion component library created by Mohammed Safwan at NexDark Labs, providing copy-paste WebGL backgrounds, kinetic typography, and motion UI blocks.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Is AuraBitz UI free for commercial Next.js and React projects?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Yes. AuraBitz UI is free and open-source with full TypeScript and Tailwind CSS source code included for personal and commercial web applications.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Which frameworks and libraries work with AuraBitz components?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "AuraBitz components are built for React, Next.js App Router, Tailwind CSS, Framer Motion, and Three.js / React Three Fiber.",
                        },
                    },
                ],
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
