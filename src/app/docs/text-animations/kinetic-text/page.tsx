import KineticTextPageClient from "./client";

export default function KineticTextPage() {
    const codeEndpoint = "/api/code?type=component&name=kinetic-text";
    return <KineticTextPageClient codeEndpoint={codeEndpoint} />;
}
