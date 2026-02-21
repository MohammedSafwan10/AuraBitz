import { getComponentSource } from "@/lib/source";
import TextPressurePageClient from "./client";

export default function TextPressurePage() {
    const sourceCode = getComponentSource("text-pressure");
    return <TextPressurePageClient sourceCode={sourceCode} />;
}
