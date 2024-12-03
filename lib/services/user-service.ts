import { PrismaClient, User } from "@prisma/client";

import { authenticate } from "./auth-service";

const prisma = new PrismaClient();

export async function getLoggedInUser(): Promise<User> {
    const loggedInUser = await authenticate();
    const user = await prisma.user.findFirst({
        where: {
            id: loggedInUser.user?.id,
        },
    });

    return user!;
}
