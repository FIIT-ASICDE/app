import { authenticate } from "@/lib/authenticate";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { Session } from "next-auth";

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     tags:
 *       - Organization
 *     description: Creates a new organization, assigns the creator as an admin, and sends invitations to a list of users with specific roles.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the organization.
 *               description:
 *                 type: string
 *                 description: The description of the organization.
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
 *               - name
 *               - description
 *     responses:
 *       201:
 *         description: Organization created successfully, invitations sent.
 *       400:
 *         description: Missing required fields or invalid data.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Failed to create organization or send invitations.
 */
async function createOrganization(
    request: Request,
    session: Session | null
) {
    try {
        const body = await request.json();
        const { name, description, users } = body;

        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized. User ID is missing or session is invalid." },
                { status: 401 }
            );
        }

        if (!name || !description) {
            return NextResponse.json(
                { message: "Missing required fields: name and description." },
                { status: 400 }
            );
        }

        if (!Array.isArray(users) || !users.every(u => typeof u.userId === "string" && typeof u.role === "string")) {
            return NextResponse.json(
                { error: "Invalid users format. Each user must have userId and role as strings." },
                { status: 400 }
            );
        }

        const organization = await prisma.organization.create({
            data: {
                id: crypto.randomUUID(),
                name: name,
                description: description,
                picture: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        await prisma.organizationUser.create({
            data: {
                userId: userId,
                organizationId: organization.id,
                role: "ADMIN",
            },
        });

        if (users.length > 0) {
            const invitations = users.map((user) => ({
                userId: user.userId,
                organizationId: organization.id,
                isPending: true,
                role: user.role,
            }));

            await prisma.organizationUserInvitation.createMany({
                data: invitations,
                skipDuplicates: true, // Avoid duplicates
            });
        }

        return NextResponse.json(
            {
                message: "Organization created successfully, invitations sent.",
                organization,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating organization or sending invitations:", error);
        return NextResponse.json(
            { error: "Failed to create organization or send invitations." },
            { status: 500 }
        );
    }
}

export const POST = authenticate(async ({ request, session }) => {
    return createOrganization(request, session);
});
