import { calculateFileHash, saveFile } from "@/lib/server-file-utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 },
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const hash = await calculateFileHash(buffer);
        await saveFile(buffer, hash, process.env.USER_ASSETS_STORAGE_ROOT!);

        return NextResponse.json({
            filename: file.name,
            size: file.size,
            type: file.type,
            hash,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Error uploading file" },
            { status: 500 },
        );
    }
}
