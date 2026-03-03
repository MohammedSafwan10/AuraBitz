import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/site/lenis-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aurabitz.nexdark.com"),
  title: {
    default: "AuraBitz | Premium WebGL & Motion UI Component Library",
    template: "%s | AuraBitz",
  },
  description: "Explore production-ready WebGL backgrounds, kinetic typography, and motion-heavy landing blocks engineered for Next.js 16+ and Framer Motion. Build stunning interfaces in minutes.",
  keywords: [
    "Next.js components",
    "TailwindCSS blocks",
    "Framer Motion",
    "WebGL backgrounds",
    "Design System",
    "Three.js React",
    "Frontend architecture"
  ],
  authors: [{ name: "Mohammed Safwan", url: "https://github.com/MohammedSafwan10" }],
  creator: "Mohammed Safwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aurabitz.nexdark.com",
    title: "AuraBitz | Premium WebGL & Motion UI Component Library",
    description: "Explore production-ready WebGL backgrounds, kinetic typography, and motion-heavy landing blocks engineered for Next.js 16+ and Framer Motion. Build stunning interfaces in minutes.",
    siteName: "AuraBitz Component Architecture",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AuraBitz Premium UI Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraBitz | Premium WebGL & Motion UI Component Library",
    description: "Explore production-ready WebGL backgrounds, kinetic typography, and motion-heavy landing blocks engineered for Next.js 16+ and Framer Motion. Build stunning interfaces in minutes.",
    creator: "@AuraBitz",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-white/30`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
