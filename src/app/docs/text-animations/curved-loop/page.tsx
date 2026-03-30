import CurvedLoopPageClient from "./client";

export default function CurvedLoopPage() {
    const codeEndpoint = "/api/code?type=component&name=curved-loop";
    return <CurvedLoopPageClient codeEndpoint={codeEndpoint} />;
}
