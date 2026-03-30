import KineticButtonPageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function KineticButtonPage() {
    const sourceCode = getComponentSource("kinetic-button");
    return <KineticButtonPageClient sourceCode={sourceCode} />;
}
