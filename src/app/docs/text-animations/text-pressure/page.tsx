import TextPressurePageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function TextPressurePage() {
    const sourceCode = getComponentSource("text-pressure");
    return <TextPressurePageClient sourceCode={sourceCode} />;
}
