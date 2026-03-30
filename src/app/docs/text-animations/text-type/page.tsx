import TextTypePageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function TextTypePage() {
    const sourceCode = getComponentSource("text-type");
    return <TextTypePageClient sourceCode={sourceCode} />;
}
