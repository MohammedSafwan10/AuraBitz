import { getComponentSource } from "@/lib/source";
import KineticButtonPageClient from "./client";

export default function KineticButtonPage() {
    const sourceCode = getComponentSource("kinetic-button");
    return <KineticButtonPageClient sourceCode={sourceCode} />;
}
