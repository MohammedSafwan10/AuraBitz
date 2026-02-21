import { getComponentSource } from "@/lib/source";
import CircularTextPageClient from "./client";

export default function CircularTextPage() {
    const sourceCode = getComponentSource("circular-text");
    return <CircularTextPageClient sourceCode={sourceCode} />;
}
