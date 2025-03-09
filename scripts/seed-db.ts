import prisma from "@/prisma";
import { faker } from "@faker-js/faker";
import {
    Organization,
    OrganizationRole,
    OrganizationUser,
    OrganizationUserInvitation,
    Prisma,
    Repo,
    RepoRole,
    RepoUserOrganization,
    User,
    UserMetadata,
    UserRole,
} from "@prisma/client";

const LogConfig = {
    enabled: true,
    levels: {
        info: true,
        success: true,
        warning: true,
        error: true,
        debug: false,
    },
};

const Logger = {
    info: (message: string) => {
        if (LogConfig.enabled && LogConfig.levels.info) {
            console.log(`ℹ️ INFO: ${message}`);
        }
    },
    success: (message: string) => {
        if (LogConfig.enabled && LogConfig.levels.success) {
            console.log(`✅ SUCCESS: ${message}`);
        }
    },
    warning: (message: string) => {
        if (LogConfig.enabled && LogConfig.levels.warning) {
            console.log(`⚠️ WARNING: ${message}`);
        }
    },
    error: (message: string) => {
        if (LogConfig.enabled && LogConfig.levels.error) {
            console.error(`❌ ERROR: ${message}`);
        }
    },
    debug: (message: string) => {
        if (LogConfig.enabled && LogConfig.levels.debug) {
            console.log(`🔍 DEBUG: ${message}`);
        }
    },
};

type UserWithMetadata = User & {
    metadata: UserMetadata | null;
};

async function createWithRetry<T>(
    createFn: () => Promise<T>,
    maxRetries: number = 5,
): Promise<T> {
    let retries = 0;

    while (retries < maxRetries) {
        try {
            return await createFn();
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // P2002 is the error code for unique constraint violations
                if (error.code === "P2002") {
                    retries++;
                    Logger.warning(
                        `Unique constraint violation. Retrying (${retries}/${maxRetries})...`,
                    );
                    continue;
                }
            }
            throw error;
        }
    }

    throw new Error(`Failed to create record after ${maxRetries} retries`);
}

async function seedUsers(count: number) {
    Logger.info(`Creating ${count} random users...`);

    for (let i = 0; i < count; i++) {
        try {
            const user = await createWithRetry(async () => {
                const firstName = faker.person.firstName();
                const surname = faker.person.lastName();
                const email = `${firstName.toLowerCase()}.${surname.toLowerCase()}.${Date.now()}${i}@${faker.internet.domainName()}`;
                const username = faker.internet.username({
                    firstName,
                    lastName: surname,
                });

                return prisma.user.create({
                    data: {
                        name: username,
                        email: email,
                        image: faker.datatype.boolean(0.6)
                            ? faker.image.avatar()
                            : null,
                        createdAt: faker.date.past(),
                        updatedAt: faker.date.recent(),
                        metadata: {
                            create: {
                                firstName,
                                surname,
                                bio: faker.datatype.boolean(0.7)
                                    ? faker.person.bio()
                                    : null,
                                role: faker.datatype.boolean(0.1)
                                    ? UserRole.ADMIN
                                    : UserRole.USER,
                            },
                        },
                    },
                    include: {
                        metadata: true,
                    },
                });
            });

            Logger.success(
                `Created user: ${user.name} (${user.email}) - Role: ${user.metadata?.role}`,
            );

            if (count > 100 && i % 100 === 0) {
                Logger.info(
                    `Progress: ${i}/${count} users created (${Math.round((i / count) * 100)}%)`,
                );
            }
        } catch (error) {
            Logger.error(`Failed to create user at index ${i}: ${error}`);
        }
    }

    Logger.info(`Successfully created ${count} users`);
}

async function seedOrganizations(count: number) {
    Logger.info(`Creating ${count} random organizations...`);

    for (let i = 0; i < count; i++) {
        try {
            const organization = await createWithRetry(async () => {
                const name = `${faker.company.name()}-${Date.now().toString(36)}${i}`;

                return prisma.organization.create({
                    data: {
                        name,
                        image: faker.datatype.boolean(0.7)
                            ? faker.image.url()
                            : null,
                        bio: faker.datatype.boolean(0.8)
                            ? faker.company.catchPhrase()
                            : null,
                        createdAt: faker.date.past(),
                        updatedAt: faker.date.recent(),
                    },
                });
            });

            Logger.success(`Created organization: ${organization.name}`);

            if (count > 100 && i % 100 === 0) {
                Logger.info(
                    `Progress: ${i}/${count} organizations created (${Math.round((i / count) * 100)}%)`,
                );
            }
        } catch (error) {
            Logger.error(
                `Failed to create organization at index ${i}: ${error}`,
            );
        }
    }

    Logger.info(`Successfully created ${count} organizations`);
}

async function createOrganizationUsers(
    users: UserWithMetadata[],
    organizations: Organization[],
): Promise<OrganizationUser[]> {
    Logger.info("Assigning users to organizations...");

    const orgUsers: OrganizationUser[] = [];
    const totalAssignments = organizations.length;
    let completedAssignments = 0;

    for (const organization of organizations) {
        try {
            const userCount = Math.floor(
                users.length *
                    faker.number.float({ min: 0.0000000001, max: 0.0001 }),
            );
            const selectedUsers = faker.helpers.arrayElements(users, userCount);

            for (const user of selectedUsers) {
                if (!user.metadata) continue;

                try {
                    const role = faker.datatype.boolean(0.4)
                        ? OrganizationRole.ADMIN
                        : OrganizationRole.MEMBER;

                    const existingRelation =
                        await prisma.organizationUser.findUnique({
                            where: {
                                userMetadataId_organizationId: {
                                    userMetadataId: user.metadata.id,
                                    organizationId: organization.id,
                                },
                            },
                        });

                    if (existingRelation) {
                        Logger.warning(
                            `User ${user.name} is already a member of ${organization.name}, skipping`,
                        );
                        continue;
                    }

                    const orgUser = await prisma.organizationUser.create({
                        data: {
                            userMetadataId: user.metadata.id,
                            organizationId: organization.id,
                            role,
                        },
                    });

                    orgUsers.push(orgUser);
                    Logger.success(
                        `Added ${user.name} to ${organization.name} as ${role}`,
                    );
                } catch (error) {
                    Logger.error(
                        `Failed to add user ${user.name} to organization ${organization.name}: ${error}`,
                    );
                }
            }

            completedAssignments++;
            if (totalAssignments > 100 && completedAssignments % 100 === 0) {
                Logger.info(
                    `Progress: ${completedAssignments}/${totalAssignments} organizations processed (${Math.round((completedAssignments / totalAssignments) * 100)}%)`,
                );
            }
        } catch (error) {
            Logger.error(
                `Error processing organization ${organization.name}: ${error}`,
            );
        }
    }

    Logger.info(
        `Successfully created ${orgUsers.length} organization-user relationships`,
    );
    return orgUsers;
}

async function createOrganizationInvitations(
    users: UserWithMetadata[],
    organizations: Organization[],
): Promise<OrganizationUserInvitation[]> {
    Logger.info("Creating organization invitations...");

    const invitations: OrganizationUserInvitation[] = [];
    const totalOrgs = organizations.length;
    let processedOrgs = 0;

    for (const organization of organizations) {
        try {
            const orgMembers = await prisma.organizationUser.findMany({
                where: { organizationId: organization.id },
                include: { userMetadata: true },
            });

            const adminMembers = orgMembers.filter(
                (member) => member.role === OrganizationRole.ADMIN,
            );

            if (adminMembers.length === 0) {
                Logger.warning(
                    `Organization ${organization.name} has no admins, skipping invitations`,
                );
                continue;
            }

            const nonMembers = users.filter(
                (user) =>
                    user.metadata &&
                    !orgMembers.some(
                        (member) => member.userMetadataId === user.metadata!.id,
                    ),
            );

            if (nonMembers.length === 0) {
                Logger.warning(
                    `No eligible users to invite to ${organization.name}, skipping`,
                );
                continue;
            }

            const inviteeCount = Math.min(
                nonMembers.length,
                Math.floor(faker.number.int({ min: 1, max: 5 })),
            );

            const invitees = faker.helpers.arrayElements(
                nonMembers,
                inviteeCount,
            );

            for (const invitee of invitees) {
                if (!invitee.metadata) continue;

                try {
                    const sender = faker.helpers.arrayElement(adminMembers);
                    const isPending = faker.datatype.boolean(0.7);

                    const existingInvitation =
                        await prisma.organizationUserInvitation.findUnique({
                            where: {
                                userMetadataId_organizationId: {
                                    userMetadataId: invitee.metadata.id,
                                    organizationId: organization.id,
                                },
                            },
                        });

                    if (existingInvitation) {
                        Logger.warning(
                            `Invitation for ${invitee.name} to ${organization.name} already exists, skipping`,
                        );
                        continue;
                    }

                    const invitation =
                        await prisma.organizationUserInvitation.create({
                            data: {
                                userMetadataId: invitee.metadata.id,
                                senderMetadataId: sender.userMetadataId,
                                organizationId: organization.id,
                                isPending,
                                role: faker.datatype.boolean(0.2)
                                    ? OrganizationRole.ADMIN
                                    : OrganizationRole.MEMBER,
                                createdAt: faker.date.recent(),
                            },
                        });

                    invitations.push(invitation);
                    Logger.success(
                        `Created invitation from ${sender.userMetadata.firstName} to ${invitee.name} for ${organization.name} (${isPending ? "Pending" : "Responded"})`,
                    );
                } catch (error) {
                    Logger.error(
                        `Failed to create invitation for ${invitee.name} to ${organization.name}: ${error}`,
                    );
                }
            }
        } catch (error) {
            Logger.error(
                `Error processing invitations for organization ${organization.name}: ${error}`,
            );
        }

        processedOrgs++;
        if (totalOrgs > 100 && processedOrgs % 100 === 0) {
            Logger.info(
                `Progress: ${processedOrgs}/${totalOrgs} organizations processed for invitations (${Math.round((processedOrgs / totalOrgs) * 100)}%)`,
            );
        }
    }

    Logger.info(
        `Successfully created ${invitations.length} organization invitations`,
    );
    return invitations;
}

async function seedRepositories(count: number): Promise<Repo[]> {
    Logger.info(`Creating ${count} random repositories...`);

    const repositories: Repo[] = [];

    for (let i = 0; i < count; i++) {
        try {
            const repo = await createWithRetry(async () => {
                const nameBase: string = faker.helpers.arrayElement([
                    `${faker.word.adjective()}-${faker.word.noun()}`,
                    faker.company.buzzNoun(),
                    `${faker.hacker.adjective()}-${faker.hacker.noun()}`,
                    faker.system.fileName().split(".")[0],
                ]);

                const name = `${nameBase}-${Date.now().toString(36)}${i}`;
                const isPublic: boolean = faker.datatype.boolean(0.6);

                return prisma.repo.create({
                    data: {
                        name,
                        description: faker.datatype.boolean(0.8)
                            ? faker.lorem.sentence()
                            : null,
                        public: isPublic,
                        createdAt: faker.date.past(),
                        updatedAt: faker.date.recent(),
                    },
                });
            });

            repositories.push(repo);
            Logger.success(
                `Created repository: ${repo.name} (${repo.public ? "Public" : "Private"})`,
            );

            if (count > 100 && i % 100 === 0) {
                Logger.info(
                    `Progress: ${i}/${count} repositories created (${Math.round((i / count) * 100)}%)`,
                );
            }
        } catch (error) {
            Logger.error(`Failed to create repository at index ${i}: ${error}`);
        }
    }

    Logger.info(
        `Successfully created ${repositories.length}/${count} repositories`,
    );
    return repositories;
}

async function createRepoUserOrganizationRelationships(
    users: UserWithMetadata[],
    organizations: Organization[],
    repositories: Repo[],
): Promise<RepoUserOrganization[]> {
    Logger.info("Creating repository relationships...");

    const relationships: RepoUserOrganization[] = [];
    const totalRepos = repositories.length;
    let processedRepos = 0;

    for (const repo of repositories) {
        try {
            const belongsToOrg: boolean = faker.datatype.boolean(0.5);

            if (belongsToOrg) {
                const organization: Organization =
                    faker.helpers.arrayElement(organizations);

                const orgMembers = await prisma.organizationUser.findMany({
                    where: { organizationId: organization.id },
                    include: { userMetadata: true },
                });

                if (orgMembers.length === 0) {
                    Logger.warning(
                        `Organization ${organization.name} has no members, skipping repo relationship`,
                    );
                    continue;
                }

                const orgUsers: UserWithMetadata[] = [];
                for (const orgMember of orgMembers) {
                    const user = users.find(
                        (u) =>
                            u.metadata &&
                            u.metadata.id === orgMember.userMetadataId,
                    );
                    if (user) orgUsers.push(user);
                }

                if (orgUsers.length === 0) {
                    Logger.warning(
                        `No matching users found for organization ${organization.name}, skipping repo relationship`,
                    );
                    continue;
                }

                for (const user of orgUsers) {
                    if (!user.metadata) continue;

                    try {
                        const existingRelationship =
                            await prisma.repoUserOrganization.findUnique({
                                where: {
                                    userMetadataId_repoId: {
                                        userMetadataId: user.metadata.id,
                                        repoId: repo.id,
                                    },
                                },
                            });

                        if (existingRelationship) {
                            Logger.warning(
                                `Relationship between ${user.name} and repo ${repo.name} already exists, skipping`,
                            );
                            continue;
                        }

                        let repoRole: RepoRole;
                        const orgMember = orgMembers.find(
                            (m) => m.userMetadataId === user.metadata!.id,
                        );

                        if (orgMember?.role === OrganizationRole.ADMIN) {
                            repoRole = faker.helpers.arrayElement([
                                RepoRole.OWNER,
                                RepoRole.ADMIN,
                                RepoRole.ADMIN,
                                RepoRole.CONTRIBUTOR,
                            ]);
                        } else {
                            repoRole = faker.helpers.arrayElement([
                                RepoRole.CONTRIBUTOR,
                                RepoRole.CONTRIBUTOR,
                                RepoRole.VIEWER,
                                RepoRole.ADMIN,
                            ]);
                        }

                        const relationship =
                            await prisma.repoUserOrganization.create({
                                data: {
                                    userMetadataId: user.metadata.id,
                                    organizationId: organization.id,
                                    repoId: repo.id,
                                    repoRole,
                                    favorite: false,
                                    lastVisitedAt: faker.date.recent(),
                                },
                            });

                        relationships.push(relationship);
                        Logger.success(
                            `Added ${user.name} to repo ${repo.name} in org ${organization.name} as ${repoRole}`,
                        );
                    } catch (error) {
                        Logger.error(
                            `Failed to create relationship for user ${user.name} with repo ${repo.name}: ${error}`,
                        );
                    }
                }
            } else {
                const userCount: number = faker.number.int({ min: 1, max: 3 });
                const selectedUsers: UserWithMetadata[] =
                    faker.helpers.arrayElements(
                        users.filter((u) => u.metadata !== null),
                        userCount,
                    );

                if (selectedUsers.length > 0 && selectedUsers[0].metadata) {
                    try {
                        const existingOwnerRelationship =
                            await prisma.repoUserOrganization.findUnique({
                                where: {
                                    userMetadataId_repoId: {
                                        userMetadataId:
                                            selectedUsers[0].metadata!.id,
                                        repoId: repo.id,
                                    },
                                },
                            });

                        if (!existingOwnerRelationship) {
                            const ownerRelationship =
                                await prisma.repoUserOrganization.create({
                                    data: {
                                        userMetadataId:
                                            selectedUsers[0].metadata!.id,
                                        organizationId: null,
                                        repoId: repo.id,
                                        repoRole: RepoRole.OWNER,
                                        favorite: true,
                                        pinned: faker.datatype.boolean(0.5)
                                            ? true
                                            : null,
                                        lastVisitedAt: faker.date.recent(),
                                    },
                                });

                            relationships.push(ownerRelationship);
                            Logger.success(
                                `Added ${selectedUsers[0].name} to repo ${repo.name} as OWNER`,
                            );
                        } else {
                            Logger.warning(
                                `User ${selectedUsers[0].name} already has a relationship with repo ${repo.name}, skipping owner assignment`,
                            );
                        }

                        for (let i = 1; i < selectedUsers.length; i++) {
                            const user = selectedUsers[i];
                            if (!user.metadata) continue;

                            const existingRelationship =
                                await prisma.repoUserOrganization.findUnique({
                                    where: {
                                        userMetadataId_repoId: {
                                            userMetadataId: user.metadata.id,
                                            repoId: repo.id,
                                        },
                                    },
                                });

                            if (existingRelationship) {
                                Logger.warning(
                                    `User ${user.name} already has a relationship with repo ${repo.name}, skipping`,
                                );
                                continue;
                            }

                            const repoRole: RepoRole =
                                faker.helpers.arrayElement([
                                    RepoRole.ADMIN,
                                    RepoRole.CONTRIBUTOR,
                                    RepoRole.VIEWER,
                                ]);

                            const favorite: boolean =
                                faker.datatype.boolean(0.3);
                            const pinned: boolean | null =
                                faker.datatype.boolean(0.2) ? true : null;

                            const relationship =
                                await prisma.repoUserOrganization.create({
                                    data: {
                                        userMetadataId: user.metadata.id,
                                        organizationId: null,
                                        repoId: repo.id,
                                        repoRole,
                                        favorite,
                                        pinned,
                                        lastVisitedAt: faker.date.recent(),
                                    },
                                });

                            relationships.push(relationship);
                            Logger.success(
                                `Added ${user.name} to repo ${repo.name} as ${repoRole}`,
                            );
                        }
                    } catch (error) {
                        Logger.error(
                            `Failed to create relationships for repo ${repo.name}: ${error}`,
                        );
                    }
                }
            }
        } catch (error) {
            Logger.error(`Error processing repo ${repo.name}: ${error}`);
        }

        processedRepos++;
        if (totalRepos > 100 && processedRepos % 100 === 0) {
            Logger.info(
                `Progress: ${processedRepos}/${totalRepos} repositories processed (${Math.round((processedRepos / totalRepos) * 100)}%)`,
            );
        }
    }

    Logger.info(
        `Successfully created ${relationships.length} repository relationships`,
    );
    return relationships;
}

async function main(): Promise<void> {
    const userCount: number = 50_000;
    const organizationCount: number = 10_000;
    const repositoryCount: number = 25_000;

    LogConfig.enabled = true;
    LogConfig.levels.success = false;

    const startTime = Date.now();
    Logger.info(`Starting database seeding at ${new Date().toISOString()}`);

    try {
        Logger.info("Step 1/5: Seeding users");
        await seedUsers(userCount);
        const users: UserWithMetadata[] = await prisma.user.findMany({
            include: { metadata: true },
        });

        Logger.info("Step 2/5: Seeding organizations");
        await seedOrganizations(organizationCount);
        const organizations = await prisma.organization.findMany();

        Logger.info("Step 3/5: Creating organization users");
        await createOrganizationUsers(users, organizations);

        Logger.info("Step 4/5: Creating organization invitations");
        await createOrganizationInvitations(users, organizations);

        Logger.info("Step 5/5: Seeding repositories and relationships");
        const repositories: Repo[] = await seedRepositories(repositoryCount);
        await createRepoUserOrganizationRelationships(
            users,
            organizations,
            repositories,
        );

        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        Logger.success(
            `\nDatabase seeding completed successfully in ${duration.toFixed(2)} seconds!`,
        );
    } catch (error) {
        Logger.error(`Error during seeding: ${error}`);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        Logger.error(`Fatal error during seeding: ${e}`);
        await prisma.$disconnect();
        process.exit(1);
    });
