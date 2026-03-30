import SplitTextPageClient from "./client";

export default function SplitTextPage() {
    const codeEndpoint = "/api/code?type=component&name=split-text";
    return <SplitTextPageClient codeEndpoint={codeEndpoint} />;
}
