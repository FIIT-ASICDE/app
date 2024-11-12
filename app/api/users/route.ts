import { authenticate } from "@/lib/authenticate";
import { Session } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/prisma";

/* TODO - bude to upravene,
    je to len example ako pouzivat authenticate handler */
export async function getUserBySession(
    req: Request,
    session: Session | null
) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: session?.user?.id },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user" },
            { status: 500 },
        );
    }
}

export const GET = authenticate(({request, session}) => {
    return getUserBySession(request, session);
})

