import { authenticate } from "@/lib/authenticate";
import prisma from "@/prisma";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

/* TODO - bude to upravene,
    je to len example ako pouzivat authenticate handler */
async function getUserByIdAndUsername(
    req: Request,
    { params }: { params: { id: string; username: string ,}}
) {
    const { id, username } = await params;

    if (!id || !username) {
        return NextResponse.json(
            { message: "Missing id or username parameter" },
            { status: 400 },
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
                username: username
            },
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

export const GET = authenticate<{ params: { id: string, username: string }}>(({request, params}) => {
    return getUserByIdAndUsername(request, params);
})
