import { authenticate } from "@/lib/authenticate";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/organizations/{id}/add-users:
 *   post:
 *     tags:
 *       - Organization
 *     description: Adds users to an organization by creating invitations.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the organization.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: The ID of the user to invite.
 *                     role:
 *                       type: string
 *                       description: The role of the user in the organization.
 *                       enum: [MEMBER, ADMIN]
 *                 description: List of users to invite with their roles.
 *             required:
 *               - users
 *     responses:
 *       201:
 *         description: Invitations created successfully.
 *       400:
 *         description: Missing required fields or invalid data.
 *       404:
 *         description: Organization not found.
 *       500:
 *         description: Failed to create invitations.
 */
async function addUsersToOrganization(
    request: Request,
    params: { id: string }
) {
    try {
        const { id } = params;

        const body = await request.json();
        const { users } = body;

        if (!Array.isArray(users) || !users.every(u => typeof u.userId === "string" && typeof u.role === "string")) {
            return NextResponse.json(
                { error: "Invalid users format. Each user must have userId and role as strings." },
                { status: 400 }
            );
        }

        const organization = await prisma.organization.findUnique({
            where: { id: id },
        });

        if (!organization) {
            return NextResponse.json(
                { error: "Organization not found." },
                { status: 404 }
            );
        }

        const invitations = users.map((user) => ({
            userId: user.userId,
            organizationId: id,
            isPending: true,
            role: user.role,
        }));

        await prisma.organizationUserInvitation.createMany({
            data: invitations,
            skipDuplicates: true, 
        });

        return NextResponse.json(
            { message: "Invitations created successfully." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding users to organization:", error);
        return NextResponse.json(
            { error: "Failed to create invitations." },
            { status: 500 }
        );
    }
}

export const POST = authenticate<{ id: string }>(async ({ request, params }) => {
    return addUsersToOrganization(request, await params);
});
