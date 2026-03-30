import SpotlightCardPageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function SpotlightCardPage() {
    const sourceCode = getComponentSource("spotlight-card");
    return <SpotlightCardPageClient sourceCode={sourceCode} />;
}
