import { getComponentSource } from "@/lib/source";
import BlurTextPageClient from "./client";

export default function BlurTextPage() {
    const sourceCode = getComponentSource("blur-text");
    return <BlurTextPageClient sourceCode={sourceCode} />;
}
