import KineticButtonPageClient from "./client";

export default function KineticButtonPage() {
    const codeEndpoint = "/api/code?type=component&name=kinetic-button";
    return <KineticButtonPageClient codeEndpoint={codeEndpoint} />;
}
