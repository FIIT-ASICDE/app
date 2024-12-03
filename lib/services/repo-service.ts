import { HttpError } from "lib/errors/HttpError";
import { getLoggedInUser } from "./user-service";
import { RepoCreation } from "@/types/RepoCreation.type";
import { getOrganizationsUserByUserId as getOrganizationsUserByUserId } from "lib/services/organization-service";
import { PrismaClient, Repo, User, RepoRole } from "@prisma/client";

const prisma = new PrismaClient();


export async function getRepo(repoId: string): Promise<Repo> {
    const user = await getLoggedInUser();

    const repo = await prisma.repo.findFirstOrThrow({
        where: {
            id: repoId
        }
    });

    if (repo.public) {
        return repo;
    }

    await checkRepoAccess(repoId, user!.id)

    return repo;
}

export async function addRepo(repoCreation: RepoCreation) {
    const loggedInUser: User = await getLoggedInUser();

    const existingRepo = await prisma.repoUserOrganization.findFirst({
        where: {
            userId: loggedInUser.id,
            repo: {
                name: repoCreation.name
            }
        },
        include: { repo: true }
    })

    if (existingRepo) {
        throw new HttpError("Repo with this name already exists!", 400);
    }

    const repo = await prisma.repo.create({
        data: {
            name: repoCreation.name,
            description: repoCreation.description,
            public: repoCreation.public,
            userOrganizationRepo: {
                create: {
                    userId: loggedInUser!.id!,
                    organizationId: "",
                    favorite: repoCreation.favorite,
                }
            }
        },
    });

    return repo
}

export async function updateRepo(repoId: string, repoCreation: RepoCreation): Promise<Repo> {
    const loggedInUser: User = await getLoggedInUser();

    await checkRepoRoleAdminOwner(repoId, loggedInUser.id);

    const repoUserOrganization = await prisma.repoUserOrganization.update({
        where: {
            userId_organizationId_repoId: {
                repoId: repoId!,
                userId: loggedInUser.id!,
                organizationId: ""
            }
        },
        data: {
            favorite: repoCreation.favorite,
            repo: {
                update: {
                    name: repoCreation.name,
                    description: repoCreation.description,
                    public: repoCreation.public,
                }
            }
        },
        include: { repo: true }
    });

    return repoUserOrganization.repo
}

export async function deleteRepo(repoId: string) {
    const loggedInUser: User = await getLoggedInUser();

    await checkRepoRoleAdminOwner(repoId, loggedInUser.id);
    await prisma.repo.delete({
        where: {
            id: repoId
        }
    });
}


export async function checkRepoAccess(repoId: string, userId: string) {
    const organizationsUser = await getOrganizationsUserByUserId(userId);
    const organizationIds = organizationsUser.map(_ => _.organization.id);

    const reposUsersOrganization = await prisma.repoUserOrganization.findFirst({
        where: {
            repoId,
            OR: [
                { organizationId: { in: organizationIds } },
                { userId: userId }
            ]
        },
    });
    if (!reposUsersOrganization) {
        throw new HttpError("Unauthorized", 403);
    }

    return reposUsersOrganization;
}

export async function checkRepoRoleAdminOwner(repoId: string, userId: string) {
    const reposUsersOrganization = await checkRepoAccess(repoId, userId);

    if (reposUsersOrganization.repoRole == RepoRole.VIEWER || reposUsersOrganization.repoRole == RepoRole.CONTRIBUTOR) {
        throw new HttpError("Unauthorized", 403);
    }
}