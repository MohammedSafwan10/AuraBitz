import SplitTextPageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function SplitTextPage() {
    const sourceCode = getComponentSource("split-text");
    return <SplitTextPageClient sourceCode={sourceCode} />;
}
