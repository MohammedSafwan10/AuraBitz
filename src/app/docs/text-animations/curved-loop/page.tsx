import CurvedLoopPageClient from "./client";
import { getComponentSource } from "@/lib/source";

export default function CurvedLoopPage() {
    const sourceCode = getComponentSource("curved-loop");
    return <CurvedLoopPageClient sourceCode={sourceCode} />;
}
