import { Organisation } from "@/lib/types/organisation";
import { DirectoryItem, Repository } from "@/lib/types/repository";
import {
    InitializeUserResult,
    TestingPrismaResult,
    initializeUser,
    testingPrisma,
    testingTRPC,
} from "@/tests/setup";
import { TRPCError } from "@trpc/server";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";

describe("search repository", async () => {
    let prisma: TestingPrismaResult["prisma"];
    let cleanup: TestingPrismaResult["cleanup"];
    let user: InitializeUserResult["user"];
    let session: InitializeUserResult["session"];
    let trpc: Awaited<ReturnType<typeof testingTRPC>>;
    let otherTrpc: Awaited<ReturnType<typeof testingTRPC>>;

    let otherUser: InitializeUserResult;

    let testRepo: Repository;
    let privateRepo: Repository;
    let orgRepo: Repository;
    let organization: Organisation;

    beforeAll(async () => {
        const prismaResult = await testingPrisma();
        prisma = prismaResult.prisma;
        cleanup = prismaResult.cleanup;

        const userResult = await initializeUser(prisma);
        user = userResult.user;
        session = userResult.session;

        otherUser = await initializeUser(prisma, {
            name: "other-user",
            email: "repo-search@example.com",
        });

        otherTrpc = await testingTRPC(prisma, otherUser.session);
        trpc = await testingTRPC(prisma, session);

        testRepo = await trpc.repo.create({
            ownerId: user.id,
            name: "search-test-repo",
            description: "Repository for testing search functionality",
            visibility: "public",
        });

        privateRepo = await trpc.repo.create({
            ownerId: user.id,
            name: "private-search-repo",
            description: "Private repository for testing search functionality",
            visibility: "private",
        });

        organization = await trpc.org.create({
            name: "search-test-org",
        });

        orgRepo = await trpc.repo.create({
            ownerId: organization.id,
            name: "org-search-repo",
            description:
                "Organization repository for testing search functionality",
            visibility: "public",
        });

        await trpc.editor.addItem({
            repoId: testRepo.id,
            name: "test-file.txt",
            type: "file",
        });
    });

    afterAll(async () => cleanup());

    test("search for a public repository by owner and repo slugs", async () => {
        const foundRepo = await trpc.repo.search({
            ownerSlug: user.name!,
            repositorySlug: testRepo.name,
        });

        expect(foundRepo).toBeDefined();
        expect(foundRepo.id).toBe(testRepo.id);
        expect(foundRepo.name).toBe("search-test-repo");
        expect(foundRepo.ownerName).toBe(user.name!);
        expect(foundRepo.visibility).toBe("public");
        expect(foundRepo.description).toBe(
            "Repository for testing search functionality",
        );

        expect(foundRepo.tree).toBeDefined();
        expect(Array.isArray(foundRepo.tree)).toBe(true);

        const testFile = foundRepo.tree!.find(
            (item) => item.name === "test-file.txt",
        );
        expect(testFile).toBeDefined();
        expect(testFile!.type).toBe("file-display");
        expect(foundRepo.isGitRepo).toBe(true);
    });

    test("search for a private repository as the owner", async () => {
        const foundRepo = await trpc.repo.search({
            ownerSlug: user.name!,
            repositorySlug: privateRepo.name,
        });

        expect(foundRepo).toBeDefined();
        expect(foundRepo.id).toBe(privateRepo.id);
        expect(foundRepo.name).toBe("private-search-repo");
        expect(foundRepo.visibility).toBe("private");
        expect(foundRepo.userRole).toBe("OWNER");
    });

    test("search for a private repository as another user should fail", async () => {
        try {
            await otherTrpc.repo.search({
                ownerSlug: user.name!,
                repositorySlug: privateRepo.name,
            });
            throw new Error("Should have failed with NOT_FOUND");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("NOT_FOUND");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'NOT_FOUND' but received: ${JSON.stringify(e)}`,
                );
            }
        }
    });

    test("search for an organization repository", async () => {
        const foundRepo = await trpc.repo.search({
            ownerSlug: organization.name,
            repositorySlug: orgRepo.name,
        });

        expect(foundRepo).toBeDefined();
        expect(foundRepo.id).toBe(orgRepo.id);
        expect(foundRepo.name).toBe("org-search-repo");
        expect(foundRepo.ownerName).toBe("search-test-org");
        expect(foundRepo.visibility).toBe("public");
        expect(foundRepo.userRole).toBe("ADMIN");
    });

    test("search with non-existent owner slug should fail", async () => {
        try {
            await trpc.repo.search({
                ownerSlug: "non-existent-owner",
                repositorySlug: testRepo.name,
            });
            throw new Error("Should have failed with NOT_FOUND");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("NOT_FOUND");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'NOT_FOUND' but received: ${JSON.stringify(e)}`,
                );
            }
        }
    });

    test("search with non-existent repository slug should fail", async () => {
        try {
            await trpc.repo.search({
                ownerSlug: user.name!,
                repositorySlug: "non-existent-repo",
            });
            throw new Error("Should have failed with NOT_FOUND");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("NOT_FOUND");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'NOT_FOUND' but received: ${JSON.stringify(e)}`,
                );
            }
        }
    });

    test("search with specified depth parameter", async () => {
        const nestedRepoName = "nested-search-test-repo";

        await trpc.repo.create({
            ownerId: user.id,
            name: nestedRepoName,
            visibility: "public",
        });

        await trpc.editor.addItem({
            repoId: (
                await prisma.repo.findFirstOrThrow({
                    where: { name: nestedRepoName },
                })
            ).id,
            name: "level1",
            type: "directory",
        });

        await trpc.editor.addItem({
            repoId: (
                await prisma.repo.findFirstOrThrow({
                    where: { name: nestedRepoName },
                })
            ).id,
            name: "level2",
            type: "directory",
            path: "level1",
        });

        await trpc.editor.addItem({
            repoId: (
                await prisma.repo.findFirstOrThrow({
                    where: { name: nestedRepoName },
                })
            ).id,
            name: "file.txt",
            type: "file",
            path: "level1/level2",
        });

        // search with depth=0 (default)
        const resultDefaultDepth = await trpc.repo.search({
            ownerSlug: user.name!,
            repositorySlug: nestedRepoName,
        });

        // Verify level1 is visible but not its contents
        const level1Item = resultDefaultDepth.tree!.find(
            (item) => item.name === "level1",
        );
        expect(level1Item).toBeDefined();
        expect(level1Item!.type).toBe("directory-display");
        expect((level1Item as DirectoryItem).children).toBeUndefined();

        // Search with depth=2
        const resultWithDepth = await trpc.repo.search({
            ownerSlug: user.name!,
            repositorySlug: nestedRepoName,
            loadItemsDisplaysDepth: 2,
        });

        const level1WithDepth = resultWithDepth.tree!.find(
            (item) => item.name === "level1",
        );
        expect(level1WithDepth).toBeDefined();
        expect(level1WithDepth?.type).toBe("directory");
        if (level1WithDepth?.type !== "directory") {
            throw new Error("invalid state of level1WithDepth");
        }

        expect((level1WithDepth as DirectoryItem).children).toBeDefined();

        const level2Item = level1WithDepth!.children!.find(
            (item) => item.name === "level2",
        );
        expect(level2Item).toBeDefined();
        expect(level2Item?.type).toBe("directory");
        if (level2Item?.type !== "directory") {
            throw new Error("invalid state of level2Item");
        }

        const fileItem = level2Item.children?.find(
            (item) => item.name === "file.txt",
        );
        expect(fileItem).toBeDefined();
        expect(fileItem?.type).toBe("file-display");
    });
});
