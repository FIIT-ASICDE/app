import { authenticate } from "@/lib/authenticate";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

/* TODO - bude to upravene,
    je to len example ako pouzivat authenticate handler */
export async function getUserById(
    req: Request,
    { params }: { params: { id: string }}
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Missing id parameter" },
            { status: 400 },
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user" },
            { status: 500 },
        );
    }
}

export const GET = authenticate<{ params: { id: string }}>(({request, params}) => {
    return getUserById(request, params);
})

