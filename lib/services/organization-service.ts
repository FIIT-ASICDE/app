import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getOrganizationsUserByUserId(userId: string) {
    const organizationsUser = await prisma.organizationUser.findMany({
        where: {
            userId
        },
        include: { organization: true, user: true }
    });

    return organizationsUser;
}