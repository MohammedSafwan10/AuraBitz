import TextPressurePageClient from "./client";

export default function TextPressurePage() {
    const codeEndpoint = "/api/code?type=component&name=text-pressure";
    return <TextPressurePageClient codeEndpoint={codeEndpoint} />;
}
