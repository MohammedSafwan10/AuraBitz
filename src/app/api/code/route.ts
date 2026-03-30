import { NextRequest, NextResponse } from "next/server";
import { blockSourceLoaders, componentSourceLoaders } from "@/lib/source";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const name = searchParams.get("name");

    if (!type || !name) {
        return NextResponse.json({ error: "Missing code lookup parameters." }, { status: 400 });
    }

    try {
        const loader =
            type === "block"
                ? blockSourceLoaders[name as keyof typeof blockSourceLoaders]
                : type === "component"
                    ? componentSourceLoaders[name as keyof typeof componentSourceLoaders]
                    : null;

        if (!loader) {
            return NextResponse.json({ error: "Invalid code lookup type." }, { status: 400 });
        }

        const code = await loader();
        return NextResponse.json({ code });
    } catch {
        return NextResponse.json({ error: "Unable to load source code." }, { status: 404 });
    }
}
