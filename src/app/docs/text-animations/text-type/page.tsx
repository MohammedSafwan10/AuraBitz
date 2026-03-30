import TextTypePageClient from "./client";

export default function TextTypePage() {
    const codeEndpoint = "/api/code?type=component&name=text-type";
    return <TextTypePageClient codeEndpoint={codeEndpoint} />;
}
