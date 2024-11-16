import { authenticate } from "@/lib/authenticate";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

/* TODO - bude to upravene,
    je to len example ako pouzivat authenticate handler */
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - User
 *     description: Returns user by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *     responses:
 *       200:
 *         description: User was found.
 *       404:
 *         description: User not found.
 *       400:
 *         description: Missing required field.
 *       500:
 *         description: Failed to fetch user.
 */
export async function getUserById(
    req: Request,
    { params }: { params: { id: string } },
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

export const GET = authenticate<{ params: { id: string } }>(
    ({ request, params }) => {
        return getUserById(request, params);
    },
);
