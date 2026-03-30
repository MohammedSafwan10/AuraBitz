import CircularTextPageClient from "./client";

export default function CircularTextPage() {
    const codeEndpoint = "/api/code?type=component&name=circular-text";
    return <CircularTextPageClient codeEndpoint={codeEndpoint} />;
}
