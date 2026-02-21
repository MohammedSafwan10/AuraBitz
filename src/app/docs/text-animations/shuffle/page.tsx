import { getComponentSource } from "@/lib/source";
import ShufflePageClient from "./client";

export default function ShuffleTextPage() {
    const sourceCode = getComponentSource("shuffle");
    return <ShufflePageClient sourceCode={sourceCode} />;
}
