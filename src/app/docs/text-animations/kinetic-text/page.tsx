import KineticTextPageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function KineticTextPage() {
    const sourceCode = getComponentSource("kinetic-text");
    return <KineticTextPageClient sourceCode={sourceCode} />;
}
