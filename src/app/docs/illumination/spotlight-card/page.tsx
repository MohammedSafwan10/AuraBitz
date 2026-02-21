import { getComponentSource } from "@/lib/source";
import SpotlightCardPageClient from "./client";

export default function SpotlightCardPage() {
    const sourceCode = getComponentSource("spotlight-card");
    return <SpotlightCardPageClient sourceCode={sourceCode} />;
}
