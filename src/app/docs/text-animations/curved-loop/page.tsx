import { getComponentSource } from "@/lib/source";
import CurvedLoopPageClient from "./client";

export default function CurvedLoopPage() {
    const sourceCode = getComponentSource("curved-loop");
    return <CurvedLoopPageClient sourceCode={sourceCode} />;
}
