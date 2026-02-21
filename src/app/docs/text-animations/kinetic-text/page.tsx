import { getComponentSource } from "@/lib/source";
import KineticTextPageClient from "./client";

export default function KineticTextPage() {
    const sourceCode = getComponentSource("kinetic-text");
    return <KineticTextPageClient sourceCode={sourceCode} />;
}
