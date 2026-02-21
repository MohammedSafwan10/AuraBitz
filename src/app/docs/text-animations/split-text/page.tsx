import { getComponentSource } from "@/lib/source";
import SplitTextPageClient from "./client";

export default function SplitTextPage() {
    const sourceCode = getComponentSource("split-text");
    return <SplitTextPageClient sourceCode={sourceCode} />;
}
