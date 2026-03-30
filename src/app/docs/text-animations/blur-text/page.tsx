import BlurTextPageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function BlurTextPage() {
    const sourceCode = getComponentSource("blur-text");
    return <BlurTextPageClient sourceCode={sourceCode} />;
}
