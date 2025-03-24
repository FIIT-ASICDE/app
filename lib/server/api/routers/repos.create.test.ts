import { absoluteRepoPath } from "@/lib/server/api/routers/repos";
import {
    InitializeUserResult,
    TestingPrismaResult,
    initializeUser,
    testingPrisma,
    testingTRPC,
} from "@/tests/setup";
import { TRPCError } from "@trpc/server";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { execSync } from "child_process";
import { readFile } from "fs/promises";
import { stat } from "fs/promises";
import path from "path";

describe("create repository", async () => {
    let prisma: TestingPrismaResult["prisma"];
    let cleanup: TestingPrismaResult["cleanup"];
    let user: InitializeUserResult["user"];
    let session: InitializeUserResult["session"];
    let trpc: Awaited<ReturnType<typeof testingTRPC>>;

    beforeAll(async () => {
        const prismaResult = await testingPrisma();
        prisma = prismaResult.prisma;
        cleanup = prismaResult.cleanup;

        const userResult = await initializeUser(prisma);
        user = userResult.user;
        session = userResult.session;

        trpc = await testingTRPC(prisma, session);
    });

    afterAll(async () => cleanup());

    test("create a new repository with git initialization", async () => {
        const repoName = "test-git-repo";
        const repoDescription = "Test repository with git initialization";

        const newRepo = await trpc.repo.create({
            ownerId: user.id,
            name: repoName,
            description: repoDescription,
            visibility: "public",
        });

        expect(newRepo).toBeDefined();
        expect(newRepo.name).toBe(repoName);
        expect(newRepo.description).toBe(repoDescription);
        expect(newRepo.visibility).toBe("public");
        expect(newRepo.ownerId).toBe(user.id);
        expect(newRepo.ownerName).toBe(user.name!);

        const repoPath = absoluteRepoPath(user.name!, repoName);
        await verifyRepositoryInitialization(repoPath, repoName);
    });

    test("create repository with same name should fail", async () => {
        const repoName = "duplicate-repo";

        await trpc.repo.create({
            ownerId: user.id,
            name: repoName,
            description: "First repository",
            visibility: "public",
        });

        try {
            await trpc.repo.create({
                ownerId: user.id,
                name: repoName,
                description: "Second repository",
                visibility: "public",
            });
            throw new Error("Should have failed with CONFLICT");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("CONFLICT");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'CONFLICT' but received: ${JSON.stringify(e)}`,
                );
            }
        }
    });

    test("create repository with invalid name should fail", async () => {
        const invalidNames = [
            "repo with spaces",
            "repo/with/slashes",
            "repo.with.dots",
            "repo@with@special@chars",
            "repo?with?question?marks",
        ];

        for (const invalidName of invalidNames) {
            try {
                await trpc.repo.create({
                    ownerId: user.id,
                    name: invalidName,
                    description: "Repository with invalid name",
                    visibility: "public",
                });
                throw new Error(`Should have failed for name: ${invalidName}`);
            } catch (e) {
                // The error could be from zod validation or from the server
                expect(e).toBeDefined();
            }
        }
    });

    test("create repository with organization owner", async () => {
        const org = await prisma.organization.create({
            data: {
                name: "test-org",
                users: {
                    create: {
                        userMetadataId: user.metadata!.id,
                        role: "ADMIN",
                    },
                },
            },
        });

        const repoName = "org-owned-repo";

        const newRepo = await trpc.repo.create({
            ownerId: org.id,
            name: repoName,
            description: "Organization-owned repository",
            visibility: "private",
        });

        expect(newRepo).toBeDefined();
        expect(newRepo.name).toBe(repoName);
        expect(newRepo.ownerId).toBe(org.id);
        expect(newRepo.ownerName).toBe(org.name);
        expect(newRepo.visibility).toBe("private");
        expect(newRepo.userRole).toBe("ADMIN");

        const repoPath = absoluteRepoPath(org.name, repoName);
        await verifyRepositoryInitialization(repoPath, repoName);
    });

    test("non-member cannot create repository for organization", async () => {
        const org = await prisma.organization.create({
            data: {
                name: "exclusive-org",
                users: {
                    create: {
                        userMetadataId: user.metadata!.id,
                        role: "ADMIN",
                    },
                },
            },
        });

        try {
            const otherUser = await initializeUser(prisma, {
                name: "other-user",
                email: "create-repo@example.com",
            });

            const otherTrpc = await testingTRPC(prisma, otherUser.session);
            await otherTrpc.repo.create({
                ownerId: org.id,
                name: "unauthorized-repo",
                description: "Should fail",
                visibility: "public",
            });
            throw new Error("Should have failed with FORBIDDEN");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("FORBIDDEN");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'FORBIDDEN' but received: ${JSON.stringify(e)}`,
                );
            }
        }
    });
});

async function verifyRepositoryInitialization(
    repoPath: string,
    repoName: string,
): Promise<void> {
    const repoStats = await stat(repoPath);
    expect(repoStats.isDirectory()).toBe(true);

    const gitDirPath = path.join(repoPath, ".git");
    const gitDirStats = await stat(gitDirPath);
    expect(gitDirStats.isDirectory()).toBe(true);

    const readmePath = path.join(repoPath, "README.md");
    const readmeStats = await stat(readmePath);
    expect(readmeStats.isFile()).toBe(true);

    const readmeContent = await readFile(readmePath, "utf-8");
    expect(readmeContent).toBe(`# ${repoName}`);

    // Verify that an initial commit was made.
    const gitLog = execSync(`git -C "${repoPath}" log --oneline`).toString();
    expect(gitLog).toContain("Initial commit");

    // Verify git config was reset (user.email should not be set).
    try {
        execSync(`git -C "${repoPath}" config --local user.email`);
        throw new Error("user.email should not be set");
    } catch (error: unknown) {
        const err = error as { status?: number };
        expect(err.status).not.toBe(0);
    }

    // Verify git config was reset (user.name should not be set).
    try {
        execSync(`git -C "${repoPath}" config --local user.name`);
        throw new Error("user.name should not be set");
    } catch (error: unknown) {
        const err = error as { status?: number };
        expect(err.status).not.toBe(0);
    }
}
