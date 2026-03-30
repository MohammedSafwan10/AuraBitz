import ShufflePageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function ShuffleTextPage() {
    const sourceCode = getComponentSource("shuffle");
    return <ShufflePageClient sourceCode={sourceCode} />;
}
