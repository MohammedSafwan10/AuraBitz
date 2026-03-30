import ShufflePageClient from "./client";

export default function ShuffleTextPage() {
    const codeEndpoint = "/api/code?type=component&name=shuffle";
    return <ShufflePageClient codeEndpoint={codeEndpoint} />;
}
