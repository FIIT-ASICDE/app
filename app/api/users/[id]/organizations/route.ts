import { authenticate } from "@/lib/authenticate";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/users/{id}/organizations:
 *   get:
 *     tags:
 *       - User
 *     description: Returns a paginated list of organizations the user is a member of.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of organizations to fetch per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to fetch.
 *     responses:
 *       200:
 *         description: A list of organizations the user is a member of.
 *       400:
 *         description: Invalid pagination parameters.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to fetch organizations.
 */
async function getOrganizationsByUserId(
    params: Promise<{ id: string; }>,
    limit: number,
    page: number
) {
    try {
        const { id } = await params;

        if ( !id ) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        if (limit <= 0 || page <= 0) {
            return NextResponse.json(
                { error: "Invalid pagination parameters. Limit and page must be positive integers." },
                { status: 400 }
            );
        }

        const offset = (page - 1) * limit;

        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 }
            );
        }

        const organizations = await prisma.organization.findMany({
            where: {
                users: {
                    some: {
                        userId: id,
                    },
                },
            },
            skip: offset,
            take: limit,
            select: {
                id: true,
                name: true,
                description: true,
                picture: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const totalOrganizations = await prisma.organization.count({
            where: {
                users: {
                    some: {
                        userId: id,
                    },
                },
            },
        });

        return NextResponse.json({
            data: organizations,
            meta: {
                total: totalOrganizations,
                page: page,
                limit: limit,
            },
        });
    } catch (error) {
        console.error("Error fetching organizations for user:", error);
        return NextResponse.json(
            { error: "Failed to fetch organizations." },
            { status: 500 }
        );
    }
}

export const GET = authenticate<{ id: string }>(({ params, query}) => {
    const limit = parseInt(query.get("limit") || "10", 10);
    const page = parseInt(query.get("page") || "1", 10);
    return getOrganizationsByUserId(params, limit, page);
});
