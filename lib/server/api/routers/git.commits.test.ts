import { absoluteRepoPath } from "@/lib/server/api/routers/repos";
import {
    InitializeUserResult,
    TestingPrismaResult,
    initializeUser,
    testingPrisma,
    testingTRPC,
} from "@/tests/setup";
import { TRPCError } from "@trpc/server";
import { randomUUIDv7 } from "bun";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { execSync } from "child_process";
import { writeFile } from "fs/promises";
import path from "path";

describe("git commit history", async () => {
    let prisma: TestingPrismaResult["prisma"];
    let cleanup: TestingPrismaResult["cleanup"];
    let user: InitializeUserResult["user"];
    let session: InitializeUserResult["session"];
    let trpc: Awaited<ReturnType<typeof testingTRPC>>;

    let singleCommitRepo: { id: string; name: string; path: string };
    let noCommitsRepo: { id: string; name: string; path: string };
    let multiCommitRepo: { id: string; name: string; path: string };

    beforeAll(async () => {
        const prismaResult = await testingPrisma();
        prisma = prismaResult.prisma;
        cleanup = prismaResult.cleanup;

        const userResult = await initializeUser(prisma);
        user = userResult.user;
        session = userResult.session;

        trpc = await testingTRPC(prisma, session);

        const singleCommitRepoResponse = await trpc.repo.create({
            ownerId: user.id,
            name: "commit-test-repo",
            description: "Repository for testing commit history",
            visibility: "public",
        });

        singleCommitRepo = {
            id: singleCommitRepoResponse.id,
            name: singleCommitRepoResponse.name,
            path: absoluteRepoPath(user.name!, singleCommitRepoResponse.name),
        };

        const noCommitRepoResponse = await trpc.repo.create({
            ownerId: user.id,
            name: "empty-commit-test-repo",
            description: "Empty repository for testing commit history",
            visibility: "public",
        });

        // remove the initial commit from the empty repo
        execSync(
            `git -C "${absoluteRepoPath(user.name!, noCommitRepoResponse.name)}" update-ref -d HEAD`,
        );

        noCommitsRepo = {
            id: noCommitRepoResponse.id,
            name: noCommitRepoResponse.name,
            path: absoluteRepoPath(user.name!, noCommitRepoResponse.name),
        };

        // create a repository with multiple commits
        const multiCommitRepoResponse = await trpc.repo.create({
            ownerId: user.id,
            name: "multi-commit-test-repo",
            description: "Repository with multiple commits for testing",
            visibility: "public",
        });

        multiCommitRepo = {
            id: multiCommitRepoResponse.id,
            name: multiCommitRepoResponse.name,
            path: absoluteRepoPath(user.name!, multiCommitRepoResponse.name),
        };

        // add multiple commits to the multi-commit repository
        for (let i = 1; i <= 25; i++) {
            const filePath = path.join(multiCommitRepo.path, `file${i}.txt`);
            await writeFile(filePath, `Content for file ${i}`);

            execSync(`git -C "${multiCommitRepo.path}" add .`);
            execSync(
                `git -C "${multiCommitRepo.path}" config user.email "test@example.com"`,
            );
            execSync(
                `git -C "${multiCommitRepo.path}" config user.name "Test User"`,
            );
            execSync(
                `git -C "${multiCommitRepo.path}" commit -m "Add file ${i}"`,
            );
        }

        execSync(`git -C "${multiCommitRepo.path}" config --unset user.email`);
        execSync(`git -C "${multiCommitRepo.path}" config --unset user.name`);
    });

    afterAll(async () => cleanup());

    test("get commits from a repository with a single commit", async () => {
        const result = await trpc.git.commits({
            repoId: singleCommitRepo.id,
            page: 0,
            pageSize: 10,
        });

        expect(result).toBeDefined();
        expect(result.commits).toBeDefined();
        expect(result.pagination).toBeDefined();

        expect(result.pagination.total).toBe(1);
        expect(result.pagination.pageCount).toBe(1);
        expect(result.pagination.page).toBe(0);
        expect(result.pagination.pageSize).toBe(10);

        expect(result.commits.length).toBe(1);
        const commit = result.commits[0];

        expect(commit.hash).toBeDefined();
        expect(commit.hash.length).toBe(40); // SHA-1 hash is 40 characters
        expect(commit.authorName).toBe(user.name!);
        expect(commit.authorEmail).toBe(user.email);
        expect(commit.authorDate).toBeDefined();
        expect(commit.message).toBe("Initial commit");
        expect(commit.changes).toBeArrayOfSize(1);

        // verify README.md is in the changes
        const readmeFile = commit.changes.find(
            (change) => change.itemPath === "README.md",
        );
        expect(readmeFile).toBeDefined();
        expect(readmeFile?.change?.type).toBe("added");
        expect(commit.pushed).toBe(false);
    });

    test("get commits from an empty repository", async () => {
        const result = await trpc.git.commits({
            repoId: noCommitsRepo.id,
        });

        expect(result.commits).toEqual([]);
        expect(result.pagination.total).toBe(0);
        expect(result.pagination.pageCount).toBe(0);
    });

    test("get commits with pagination", async () => {
        const firstPage = await trpc.git.commits({
            repoId: multiCommitRepo.id,
            page: 0,
            pageSize: 10,
        });

        expect(firstPage.pagination.total).toBe(26); // 25 added commits + initial commit
        expect(firstPage.pagination.pageCount).toBe(3); // 26 commits with 10 per page = 3 pages
        expect(firstPage.pagination.page).toBe(0);
        expect(firstPage.pagination.pageSize).toBe(10);

        expect(firstPage.commits).toBeArrayOfSize(10);
        expect(firstPage.commits[0].message).toBe("Add file 25");

        const secondPage = await trpc.git.commits({
            repoId: multiCommitRepo.id,
            page: 1,
            pageSize: 10,
        });

        expect(secondPage.pagination.page).toBe(1);
        expect(secondPage.commits).toBeArrayOfSize(10);

        // verify different commits on different pages
        const firstPageHashes = new Set(firstPage.commits.map((c) => c.hash));
        const secondPageHashes = new Set(secondPage.commits.map((c) => c.hash));

        // no commits should appear on both pages
        const intersection = [...firstPageHashes].filter((hash) =>
            secondPageHashes.has(hash),
        );
        expect(intersection).toBeArrayOfSize(0);

        const lastPage = await trpc.git.commits({
            repoId: multiCommitRepo.id,
            page: 2,
            pageSize: 10,
        });

        expect(lastPage.pagination.page).toBe(2);
        expect(lastPage.commits).toBeArrayOfSize(6); // 26 commits total, 20 on first two pages, 6 on last page

        // the oldest commit (initial commit) should be on the last page
        const initialCommit = lastPage.commits.find(
            (c) => c.message === "Initial commit",
        );
        expect(initialCommit).toBeDefined();
    });

    test("get commits with invalid page number", async () => {
        const beyondLastPage = await trpc.git.commits({
            repoId: multiCommitRepo.id,
            page: 100,
            pageSize: 10,
        });

        expect(beyondLastPage.commits).toEqual([]);
        expect(beyondLastPage.pagination.total).toBe(26);
        expect(beyondLastPage.pagination.pageCount).toBe(3);
        expect(beyondLastPage.pagination.page).toBe(100);
    });

    test("get commits with different page sizes", async () => {
        const smallPage = await trpc.git.commits({
            repoId: multiCommitRepo.id,
            pageSize: 5,
        });

        expect(smallPage.commits).toBeArrayOfSize(5);
        expect(smallPage.pagination.pageCount).toBe(6); // 26 commits with 5 per page = 6 pages (ceil(26/5))

        // Test with large page size
        const largePage = await trpc.git.commits({
            repoId: multiCommitRepo.id,
            pageSize: 50,
        });

        expect(largePage.commits).toBeArrayOfSize(26); // All 26 commits
        expect(largePage.pagination.pageCount).toBe(1); // All fits on one page
    });

    test("get commits from non-existent repository should fail", async () => {
        try {
            await trpc.git.commits({
                repoId: randomUUIDv7(),
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

    test("get commits with pushed status", async () => {
        const remoteDir = absoluteRepoPath("test-remote", "remote-test");
        execSync(`mkdir -p "${remoteDir}"`);
        execSync(`git init --bare "${remoteDir}"`);

        // add the remote to our test repo
        execSync(
            `git -C "${singleCommitRepo.path}" remote add origin "${remoteDir}"`,
        );

        // push to the remote
        execSync(`git -C "${singleCommitRepo.path}" push origin main`);

        // get commits after pushing
        const result = await trpc.git.commits({
            repoId: singleCommitRepo.id,
        });

        // Verify pushed status is true
        expect(result.commits[0].pushed).toBe(true);

        const filePath = path.join(singleCommitRepo.path, "unpushed-file.txt");
        await writeFile(filePath, "This file won't be pushed");

        execSync(`git -C "${singleCommitRepo.path}" add .`);
        execSync(
            `git -C "${singleCommitRepo.path}" config user.email "test@example.com"`,
        );
        execSync(`git -C "${singleCommitRepo.path}" config user.name "Test User"`);
        execSync(`git -C "${singleCommitRepo.path}" commit -m "Add unpushed file"`);

        execSync(`git -C "${singleCommitRepo.path}" config --unset user.email`);
        execSync(`git -C "${singleCommitRepo.path}" config --unset user.name`);

        const updatedResult = await trpc.git.commits({
            repoId: singleCommitRepo.id,
        });

        expect(updatedResult.commits).toBeArrayOfSize(2);

        expect(updatedResult.commits[0].message).toBe("Add unpushed file");
        expect(updatedResult.commits[0].pushed).toBe(false);

        expect(updatedResult.commits[1].message).toBe("Initial commit");
        expect(updatedResult.commits[1].pushed).toBe(true);
        execSync(`rm -rf "${remoteDir}"`);
    });
});
