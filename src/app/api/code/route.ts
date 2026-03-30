import { NextRequest, NextResponse } from "next/server";
import { getBlockSource, getComponentSource } from "@/lib/source";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const name = searchParams.get("name");

    if (!type || !name) {
        return NextResponse.json({ error: "Missing code lookup parameters." }, { status: 400 });
    }

    try {
        const code = type === "block" ? getBlockSource(name) : type === "component" ? getComponentSource(name) : null;

        if (!code) {
            return NextResponse.json({ error: "Invalid code lookup type." }, { status: 400 });
        }

        return NextResponse.json({ code });
    } catch {
        return NextResponse.json({ error: "Unable to load source code." }, { status: 404 });
    }
}
