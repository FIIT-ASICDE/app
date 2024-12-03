import { authenticate } from "@/lib/authenticate";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     tags:
 *       - Organization
 *     description: Returns organization by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the organization
 *     responses:
 *       200:
 *         description: Organization was found.
 *       404:
 *         description: Organization not found.
 *       400:
 *         description: Missing required field.
 *       500:
 *         description: Failed to fetch organization.
 */
async function getOrganizationById(
    params: Promise<{ id?: string }>
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { message: "Missing id parameter" },
                { status: 400 },
            );
        }

        const organization = await prisma.organization.findUnique({
            where: { id: id },
        });

        if (!organization) {
            return NextResponse.json(
                { error: "Organization not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(organization, { status: 200 });

    } catch (error) {
        console.error("Error fetching organization:", error);
        return NextResponse.json(
            { error: "Failed to fetch organization" },
            { status: 500 },
        );
    }
}

/**
 * @swagger
 * /api/organizations/{id}:
 *   delete:
 *     tags:
 *       - Organization
 *     description: Deletes an organization by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the organization
 *     responses:
 *       200:
 *         description: Organization was deleted successfully.
 *       404:
 *         description: Organization not found.
 *       400:
 *         description: Missing required field.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Failed to delete organization.
 */
async function deleteOrganizationById(
    params: Promise<{ id?: string }>
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { message: "Missing id parameter" },
                { status: 400 },
            );
        }

        const organization = await prisma.organization.findUnique({
            where: { id: id },
        });

        if (!organization) {
            return NextResponse.json(
                { error: "Organization not found" },
                { status: 404 },
            );
        }

        await prisma.organization.delete({
            where: { id: id },
        });

        return NextResponse.json(
            { message: "Organization deleted successfully" },
            { status: 200 },
        );

    } catch (error) {
        console.error("Error deleting organization:", error);
        return NextResponse.json(
            { error: "Failed to delete organization" },
            { status: 500 },
        );
    }
}

/**
 * @swagger
 * /api/organizations/{id}:
 *   put:
 *     tags:
 *       - Organization
 *     description: Updates an organization by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the organization.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the organization.
 *               description:
 *                 type: string
 *                 description: The updated description of the organization.
 *               picture:
 *                 type: string
 *                 description: The updated picture URL of the organization.
 *     responses:
 *       200:
 *         description: Organization updated successfully.
 *       404:
 *         description: Organization not found.
 *       400:
 *         description: Missing required fields or invalid data.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Failed to update organization.
 */
export async function updateOrganizationById(
    request: Request,
    params: Promise<{ id?: string }>
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "Missing id parameter", errorCode: "missing_id" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { name, description, picture } = body;

        if (!name && !description && !picture) {
            return NextResponse.json(
                { error: "No fields to update provided", errorCode: "no_fields" },
                { status: 400 }
            );
        }

        const existingOrganization = await prisma.organization.findUnique({
            where: { id },
        });

        if (!existingOrganization) {
            return NextResponse.json(
                { error: "Organization not found", errorCode: "not_found" },
                { status: 404 }
            );
        }

        const updatedOrganization = await prisma.organization.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                ...(picture && { picture }),
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(updatedOrganization, { status: 200 });
    } catch (error) {
        console.error("Error updating organization:", error);
        return NextResponse.json(
            { error: "Failed to update organization", errorCode: "server_error" },
            { status: 500 }
        );
    }
}

export const GET = authenticate<{ id?: string }>(({ params }) => getOrganizationById(params));
export const DELETE = authenticate<{ id?: string }>(({ params }) => deleteOrganizationById(params));
export const PUT = authenticate<{ id?: string }>(({ request, params }) => {
    return updateOrganizationById(request, params);
});
