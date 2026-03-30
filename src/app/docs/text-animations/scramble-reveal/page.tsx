import ScrambleRevealPageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function ScrambleRevealPage() {
    const sourceCode = getComponentSource("scramble-reveal");
    return <ScrambleRevealPageClient sourceCode={sourceCode} />;
}
