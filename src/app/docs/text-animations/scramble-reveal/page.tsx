import ScrambleRevealPageClient from "./client";

export default function ScrambleRevealPage() {
    const codeEndpoint = "/api/code?type=component&name=scramble-reveal";
    return <ScrambleRevealPageClient codeEndpoint={codeEndpoint} />;
}
