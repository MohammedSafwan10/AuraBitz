import { getComponentSource } from "@/lib/source";
import ScrambleRevealPageClient from "./client";

export default function ScrambleRevealPage() {
    const sourceCode = getComponentSource("scramble-reveal");
    return <ScrambleRevealPageClient sourceCode={sourceCode} />;
}
