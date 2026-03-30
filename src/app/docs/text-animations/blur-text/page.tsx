import BlurTextPageClient from "./client";

export default function BlurTextPage() {
    const codeEndpoint = "/api/code?type=component&name=blur-text";
    return <BlurTextPageClient codeEndpoint={codeEndpoint} />;
}
