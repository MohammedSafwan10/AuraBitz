import SpotlightCardPageClient from "./client";

export default function SpotlightCardPage() {
    const codeEndpoint = "/api/code?type=component&name=spotlight-card";
    return <SpotlightCardPageClient codeEndpoint={codeEndpoint} />;
}
