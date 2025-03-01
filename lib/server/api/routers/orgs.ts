import {
    createOrgProcedureSchema,
    orgSearchSchema,
} from "@/lib/schemas/org-schemas";
import {
    Organisation,
    OrganisationDisplay,
    OrganisationMember,
    OrganisationOverview,
    OrganisationRole,
} from "@/lib/types/organisation";
import { PrismaType } from "@/prisma";
import { $Enums, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Session } from "next-auth";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pinnedRepos } from "./repos";

export const orgRouter = createTRPCRouter({
    create: createOrg(),
    overview: orgOverview(),
    search: search(),
    byName: byName(),
    userOrgs: usersOrgs(),
    getMembers: getMembers()
});

function getMembers() {
    return protectedProcedure
        .input(
            z.object({
                organisationName: z.string()
            })
        )
        .query(async ({ ctx, input }): Promise<OrganisationMember[]> => {
            const { organisationName } = input;
            const decodedOrganisationName = decodeURIComponent(organisationName.trim());
            const prisma: PrismaType = ctx.prisma;

            const organisation = await prisma.organization.findUnique({
                where: {name: decodedOrganisationName},
                select: {id: true}
            })

            if(!organisation) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Organisation not found",
                })
            }

            const members = await prisma.organizationUser.findMany({
                where: { organizationId: organisation.id },
                include: {
                    userMetadata: {
                        include: {
                            user: true,
                        },
                    },
                },
                orderBy: {
                    userMetadata: {
                        firstName: "asc",
                    },
                },
            });

            return members.map((member) => ({
                id: member.userMetadata.user.id,
                username: member.userMetadata.user.name ?? "",
                image: member.userMetadata.user.image ?? "/avatars/default.png",
                name: member.userMetadata.firstName,
                surname: member.userMetadata.surname,
                role: member.role === "ADMIN" ? "admin" : "member",
            }));
        });
}

function createOrg() {
    return protectedProcedure
        .input(createOrgProcedureSchema)
        .mutation(async ({ ctx, input }): Promise<Organisation> => {
            const { name, image, bio, initialMembers = [] } = input;

            const existingOrg = await ctx.prisma.organization.findFirst({
                where: { name },
            });

            if (existingOrg) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "An organization with this name already exists",
                });
            }

            return await ctx.prisma.$transaction(async (tx) => {
                const creatorUserMetadata =
                    await tx.userMetadata.findFirstOrThrow({
                        where: { userId: ctx.session.user.id },
                    });

                const initialMembersMetadata = await tx.userMetadata.findMany({
                    where: { userId: { in: initialMembers } },
                });

                const organization = await tx.organization.create({
                    data: {
                        name,
                        bio,
                        image,
                        users: {
                            create: [
                                {
                                    userMetadataId: creatorUserMetadata.id,
                                    role: $Enums.OrganizationRole.ADMIN,
                                },
                                ...initialMembersMetadata.map((metadata) => ({
                                    userMetadataId: metadata.id,
                                    role: $Enums.OrganizationRole.MEMBER,
                                })),
                            ],
                        },
                    },
                });

                const orgUsers = await tx.organization.findUnique({
                    where: { id: organization.id },
                    include: {
                        users: {
                            include: {
                                userMetadata: {
                                    select: {
                                        firstName: true,
                                        surname: true,
                                        user: true,
                                    },
                                },
                            },
                        },
                    },
                });

                if (!orgUsers) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to create organization",
                    });
                }

                return {
                    id: orgUsers.id,
                    name: orgUsers.name,
                    image: orgUsers.image ?? undefined,
                    bio: orgUsers.bio ?? undefined,
                    createdAt: orgUsers.createdAt,
                    repositories: [],
                    members: orgUsers.users.map(({ userMetadata, role }) => ({
                        id: userMetadata.user.id,
                        // AuthJS requires name to be nullable, but it will be always there
                        //  if not there is a bug
                        username: userMetadata.user.name!,
                        name: userMetadata.firstName,
                        surname: userMetadata.surname,
                        image: userMetadata.user.image || undefined,
                        role: role === "ADMIN" ? "admin" : "member",
                    })),
                } satisfies Organisation;
            });
        });
}

function search() {
    return protectedProcedure
        .input(orgSearchSchema)
        .query(async ({ ctx, input }) => {
            const { nameSearchTerm, page, pageSize } = input;
            const offset = page * pageSize;
            const userId = ctx.session.user.id;

            const countResult: Array<{ total: number }> = await ctx.prisma
                .$queryRaw`
        select count(*)::int as total
        from "Organization" org
        ${
            nameSearchTerm
                ? Prisma.sql`where org.name ilike ${nameSearchTerm + "%"}`
                : Prisma.empty
        }
      `;
            const total = countResult[0]?.total ?? 0;
            const pageCount = Math.ceil(total / pageSize);

            const orgsRaw: Array<{
                id: string;
                name: string;
                image: string | null;
                bio: string | null;
                membercount: number;
                role: "admin" | "user" | null;
            }> = await ctx.prisma.$queryRaw`
        select org.id, org.name, org.image, org.bio,
          (
            select count(*) 
            from "OrganizationUser" ou_all 
            where ou_all."organizationId" = org.id
          ) as membercount,
          ou."role"
        from "Organization" org
        left join "OrganizationUser" ou 
          on ou."organizationId" = org.id and ou."userMetadataId" = ${userId}
        ${
            nameSearchTerm
                ? Prisma.sql`where org.name ilike ${nameSearchTerm + "%"}`
                : Prisma.empty
        }
        order by
          case 
            when ou."role" = 'ADMIN' then 1
            when ou."role" = 'MEMBER' then 2
            else 3
          end,
          org.name
        offset ${offset} limit ${pageSize}
      `;

            const organizations: OrganisationDisplay[] = orgsRaw.map((org) => {
                const userOrg: OrganisationDisplay = {
                    id: org.id,
                    name: org.name,
                    image: org.image ?? undefined,
                    bio: org.bio ?? undefined,
                    memberCount: org.membercount,
                };
                if (!org.role) {
                    return userOrg;
                }

                if (org.role === "user") {
                    userOrg.userRole = "member";
                } else if (org.role === "admin") {
                    userOrg.userRole = "admin";
                }

                return userOrg;
            });

            return {
                organizations,
                pagination: {
                    total,
                    pageCount,
                    page,
                    pageSize,
                },
            };
        });
}

function byName() {
    return publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }): Promise<OrganisationDisplay> => {
            const decodedInput = decodeURIComponent(input);
            const { org } = await orgByName(
                ctx.prisma,
                decodedInput,
                ctx.session?.user,
            );

            const userRole = org.members.find(
                (m) => m.id === ctx.session?.user.id,
            )?.role;

            return {
                id: org.id,
                name: org.name,
                image: org.image ?? undefined,
                bio: org.bio ?? undefined,
                memberCount: org.members.length,
                userRole,
            };
        });
}

function orgOverview() {
    return publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }): Promise<OrganisationOverview> => {
            const decodedInput = decodeURIComponent(input);
            const { isUserAdmin, org } = await orgByName(
                ctx.prisma,
                decodedInput,
                ctx.session?.user,
            );
            const pinnedOrgRepos = await pinnedRepos(
                ctx.prisma,
                org.id,
                isUserAdmin,
            );

            return {
                isUserAdmin,
                organisation: {
                    id: org.id,
                    name: org.name,
                    image: org.image ?? undefined,
                    bio: org.bio ?? undefined,
                    createdAt: org.createdAt,
                    members: org.members,
                    repositories: pinnedOrgRepos,
                },
            };
        });
}

async function orgByName(
    prisma: PrismaType,
    name: string,
    currentUser?: Session["user"],
): Promise<{
    isUserAdmin: boolean;
    org: Omit<Organisation, "repositories">;
}> {
    const organization = await prisma.organization.findFirst({
        where: { name },
        include: {
            users: {
                include: { userMetadata: { include: { user: true } } },
            },
        },
    });

    if (!organization) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Organization not found",
        });
    }

    const members: Array<OrganisationMember> = organization.users
        .map(({ userMetadata, role }) => ({
            id: userMetadata.user.id,
            username: userMetadata.user.name!,
            name: userMetadata.firstName,
            surname: userMetadata.surname,
            image: userMetadata.user.image || undefined,
            role: (role === "ADMIN" ? "admin" : "member") as OrganisationRole,
        }))
        .sort((a, b) => {
            if (a.role === "admin" && b.role === "member") return -1;
            if (a.role === "member" && b.role === "admin") return 1;
            return a.name.localeCompare(b.name);
        });
    const isUserAdmin = members.some(
        (m) => m.id === currentUser?.id && m.role === "admin",
    );

    return {
        isUserAdmin,
        org: {
            id: organization.id,
            name: organization.name,
            image: organization.image ?? undefined,
            bio: organization.bio ?? undefined,
            createdAt: organization.createdAt,
            members,
        },
    };
}

function usersOrgs() {
    return publicProcedure
        .input(
            z.object({
                usersId: z.string().uuid().optional(),
                role: z.nativeEnum($Enums.OrganizationRole).optional(),
            }),
        )
        .query(
            async ({
                ctx,
                input,
            }): Promise<
                Array<Omit<OrganisationDisplay, "memberCount">> | undefined
            > => {
                if (!input.usersId || !ctx.session || !ctx.session.user.id) {
                    return undefined;
                }

                const orgs = await ctx.prisma.organizationUser.findMany({
                    where: {
                        AND: [
                            { userMetadata: { userId: input.usersId } },
                            input.role ? { role: input.role } : {},
                        ],
                    },
                    include: { organization: true },
                });

                return orgs.map(({ role, organization: org }) => {
                    const userOrg: Omit<OrganisationDisplay, "memberCount"> = {
                        id: org.id,
                        name: org.name,
                        image: org.image ?? undefined,
                        bio: org.bio ?? undefined,
                        userRole: role === "ADMIN" ? "admin" : "member",
                    };
                    return userOrg;
                });
            },
        );
}
