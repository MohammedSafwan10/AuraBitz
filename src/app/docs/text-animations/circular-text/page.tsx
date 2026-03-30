import CircularTextPageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function CircularTextPage() {
    const sourceCode = getComponentSource("circular-text");
    return <CircularTextPageClient sourceCode={sourceCode} />;
}
