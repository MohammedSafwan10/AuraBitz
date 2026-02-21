import { getComponentSource } from "@/lib/source";
import TextTypePageClient from "./client";

export default function TextTypePage() {
    const sourceCode = getComponentSource("text-type");
    return <TextTypePageClient sourceCode={sourceCode} />;
}
