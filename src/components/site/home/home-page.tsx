import { Header } from "@/components/site/header";
import { CtaSection } from "./cta-section";
import { CuratedShowcaseSection } from "./curated-showcase-section";
import { HomeFooter } from "./home-footer";
import { HomeHero } from "./home-hero";

export function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 selection:text-white">
      <Header surface="home" />
      <main className="relative overflow-x-hidden">
        <HomeHero />
        <CuratedShowcaseSection />
        <CtaSection />
      </main>
      <HomeFooter />
    </div>
  );
}
