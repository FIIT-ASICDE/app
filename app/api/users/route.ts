import { authenticate } from "@/lib/authenticate";
import prisma from "@/prisma";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export async function getUserBySession(session: Session | null) {
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

export const GET = authenticate(({ session }) => getUserBySession(session));
