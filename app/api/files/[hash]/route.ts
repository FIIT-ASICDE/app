import { env } from "@/app/env";
import { authenticate } from "@/lib/authenticate";
import { getFile } from "@/lib/server-file-utils";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = authenticate<{ hash: string }>(async ({ params }) => {
    const hash = (await params).hash;

    if (!hash.match(/^[a-f0-9]{64}$/)) {
        return NextResponse.json(
            { error: "Invalid hash format" },
            { status: 400 },
        );
    }

    try {
        const buffer = await getFile(hash, env.USER_ASSETS_STORAGE_ROOT);

        if (!buffer) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 },
            );
        }

        const acceptHeader = (await headers()).get("accept");
        const contentType = acceptHeader || "application/octet-stream";

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": "inline",
            },
        });
    } catch (error) {
        console.error("File fetch error:", error);
        return NextResponse.json(
            { error: "Error fetching file" },
            { status: 500 },
        );
    }
});
