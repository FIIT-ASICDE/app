import {
    absoluteRepoPath,
    initializeGit,
} from "@/lib/server/api/routers/repos";
import { createRepositoryForUser } from "@/tests/repo-setup";
import {
    InitializeUserResult,
    TestingPrismaResult,
    initializeUser,
    testingPrisma,
    testingTRPC,
} from "@/tests/setup";
import { TRPCError } from "@trpc/server";
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    test,
} from "bun:test";
import { mkdir } from "fs/promises";
import { rm } from "fs/promises";
import { stat } from "fs/promises";
import path from "path";

describe("editor actions", async () => {
    let prisma: TestingPrismaResult["prisma"];
    let cleanup: TestingPrismaResult["cleanup"];
    let user: InitializeUserResult["user"];
    let session: InitializeUserResult["session"];
    let trpc: Awaited<ReturnType<typeof testingTRPC>>;
    let repo: Awaited<ReturnType<typeof createRepositoryForUser>>;

    beforeAll(async () => {
        const prismaResult = await testingPrisma();
        prisma = prismaResult.prisma;
        cleanup = prismaResult.cleanup;

        const userResult = await initializeUser(prisma);
        user = userResult.user;
        session = userResult.session;

        trpc = await testingTRPC(prisma, session);
        repo = await createRepositoryForUser(user, trpc);
    });

    afterAll(async () => cleanup());

    beforeEach(async () => {
        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);
        await rm(repoPath, { recursive: true, force: true });
        await mkdir(repoPath, { recursive: true });
        await initializeGit(repo.name, repoPath, user.name!, user.email);
    });

    test("add file to repository root", async () => {
        const fileName = "my-new-file";
        await trpc.editor.addItem({
            name: fileName,
            type: "file",
            repoId: repo.id,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);
        const filePath = path.join(repoPath, fileName);

        const fileStat = await stat(filePath);
        expect(fileStat.isFile()).toBe(true);
    });

    test("add directory to repository root", async () => {
        const dirName = "my-new-directory";
        await trpc.editor.addItem({
            name: dirName,
            type: "directory",
            repoId: repo.id,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);
        const dirPath = path.join(repoPath, dirName);

        const dirStat = await stat(dirPath);
        expect(dirStat.isDirectory()).toBe(true);
    });

    test("add file inside a subdirectory", async () => {
        const dirName = "subdir";
        const fileName = "file-inside.txt";

        await trpc.editor.addItem({
            name: dirName,
            type: "directory",
            repoId: repo.id,
        });

        await trpc.editor.addItem({
            name: fileName,
            type: "file",
            repoId: repo.id,
            path: dirName,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);
        const filePath = path.join(repoPath, dirName, fileName);

        const fileStat = await stat(filePath);
        expect(fileStat.isFile()).toBe(true);
    });

    test("add duplicate item", async () => {
        const duplicateDir = "duplicate-dir";

        await trpc.editor.addItem({
            name: duplicateDir,
            type: "directory",
            repoId: repo.id,
        });

        try {
            await trpc.editor.addItem({
                name: duplicateDir,
                type: "directory",
                repoId: repo.id,
            });
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

    test("rename file in repository root", async () => {
        const originalName = "file-to-rename.txt";
        const newName = "renamed-file.txt";

        await trpc.editor.addItem({
            name: originalName,
            type: "file",
            repoId: repo.id,
        });

        await trpc.editor.renameItem({
            repoId: repo.id,
            originalPath: originalName,
            newPath: newName,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);
        const newFileStat = await stat(path.join(repoPath, newName));
        expect(newFileStat.isFile()).toBe(true);

        try {
            await stat(path.join(repoPath, originalName));
            throw new Error("Original file should not exist after rename");
        } catch (error) {
            const err = error as NodeJS.ErrnoException;
            expect(err.code).toBe("ENOENT");
        }
    });

    test("rename directory in repository root", async () => {
        const originalName = "dir-to-rename";
        const newName = "renamed-dir";

        await trpc.editor.addItem({
            name: originalName,
            type: "directory",
            repoId: repo.id,
        });

        await trpc.editor.renameItem({
            repoId: repo.id,
            originalPath: originalName,
            newPath: newName,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);

        const newDirStat = await stat(path.join(repoPath, newName));
        expect(newDirStat.isDirectory()).toBe(true);

        try {
            await stat(path.join(repoPath, originalName));
            throw new Error("Original directory should not exist after rename");
        } catch (error) {
            const err = error as NodeJS.ErrnoException;
            expect(err.code).toBe("ENOENT");
        }
    });

    test("move file to subdirectory", async () => {
        const fileName = "file-to-move.txt";
        const dirName = "target-dir";
        const newPath = path.join(dirName, fileName);

        await trpc.editor.addItem({
            name: fileName,
            type: "file",
            repoId: repo.id,
        });

        await trpc.editor.addItem({
            name: dirName,
            type: "directory",
            repoId: repo.id,
        });

        await trpc.editor.renameItem({
            repoId: repo.id,
            originalPath: fileName,
            newPath: newPath,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);

        const movedFileStat = await stat(path.join(repoPath, newPath));
        expect(movedFileStat.isFile()).toBe(true);

        try {
            await stat(path.join(repoPath, fileName));
            throw new Error("Original file should not exist after move");
        } catch (error) {
            const err = error as NodeJS.ErrnoException;
            expect(err.code).toBe("ENOENT");
        }
    });

    test("rename to existing name should fail", async () => {
        const existingFile = "existing-file.txt";
        const fileToRename = "another-file.txt";

        await trpc.editor.addItem({
            name: existingFile,
            type: "file",
            repoId: repo.id,
        });

        await trpc.editor.addItem({
            name: fileToRename,
            type: "file",
            repoId: repo.id,
        });

        try {
            await trpc.editor.renameItem({
                repoId: repo.id,
                originalPath: fileToRename,
                newPath: existingFile,
            });
            throw new Error("Rename should have failed with CONFLICT");
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

    test("rename non-existent file should fail", async () => {
        try {
            await trpc.editor.renameItem({
                repoId: repo.id,
                originalPath: "non-existent-file.txt",
                newPath: "new-name.txt",
            });
            throw new Error("Rename should have failed with NOT_FOUND");
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

    test("rename to invalid path should fail", async () => {
        const fileName = "valid-file.txt";

        await trpc.editor.addItem({
            name: fileName,
            type: "file",
            repoId: repo.id,
        });

        try {
            await trpc.editor.renameItem({
                repoId: repo.id,
                originalPath: fileName,
                newPath: "invalid/path/with/slashes.txt",
            });
            throw new Error("Rename should have failed with BAD_REQUEST");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("BAD_REQUEST");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'BAD_REQUEST' but received: ${JSON.stringify(e)}`,
                );
            }
        }
    });

    test("rename to non-existent directory should fail", async () => {
        const fileName = "another-valid-file.txt";

        await trpc.editor.addItem({
            name: fileName,
            type: "file",
            repoId: repo.id,
        });

        try {
            await trpc.editor.renameItem({
                repoId: repo.id,
                originalPath: fileName,
                newPath: "non-existent-dir/file.txt",
            });
            throw new Error("Rename should have failed with BAD_REQUEST");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("BAD_REQUEST");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'BAD_REQUEST' but received: ${JSON.stringify(e)}`,
                );
            }
        }
    });

    test("delete file from repository root", async () => {
        const fileName = "file-to-delete.txt";

        await trpc.editor.addItem({
            name: fileName,
            type: "file",
            repoId: repo.id,
        });

        await trpc.editor.deleteItem({
            repoId: repo.id,
            path: fileName,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);

        // check that the file doesn't exist anymore
        try {
            await stat(path.join(repoPath, fileName));
            throw new Error("File should not exist after deletion");
        } catch (error) {
            const err = error as NodeJS.ErrnoException;
            expect(err.code).toBe("ENOENT");
        }
    });

    test("delete directory from repository root", async () => {
        const dirName = "dir-to-delete";

        await trpc.editor.addItem({
            name: dirName,
            type: "directory",
            repoId: repo.id,
        });

        await trpc.editor.deleteItem({
            repoId: repo.id,
            path: dirName,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);

        try {
            await stat(path.join(repoPath, dirName));
            throw new Error("Directory should not exist after deletion");
        } catch (error) {
            const err = error as NodeJS.ErrnoException;
            expect(err.code).toBe("ENOENT");
        }
    });

    test("delete file from subdirectory", async () => {
        const dirName = "parent-dir";
        const fileName = "nested-file.txt";
        const filePath = path.join(dirName, fileName);

        await trpc.editor.addItem({
            name: dirName,
            type: "directory",
            repoId: repo.id,
        });

        await trpc.editor.addItem({
            name: fileName,
            type: "file",
            repoId: repo.id,
            path: dirName,
        });

        await trpc.editor.deleteItem({
            repoId: repo.id,
            path: filePath,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);

        try {
            await stat(path.join(repoPath, filePath));
            throw new Error("File should not exist after deletion");
        } catch (error) {
            const err = error as NodeJS.ErrnoException;
            expect(err.code).toBe("ENOENT");
        }

        const dirStat = await stat(path.join(repoPath, dirName));
        expect(dirStat.isDirectory()).toBe(true);
    });

    test("delete directory with contents", async () => {
        const dirName = "dir-with-contents";
        const fileName = "file-inside.txt";

        await trpc.editor.addItem({
            name: dirName,
            type: "directory",
            repoId: repo.id,
        });

        await trpc.editor.addItem({
            name: fileName,
            type: "file",
            repoId: repo.id,
            path: dirName,
        });

        await trpc.editor.deleteItem({
            repoId: repo.id,
            path: dirName,
        });

        const repoPath = absoluteRepoPath(repo.ownerName, repo.name);
        try {
            await stat(path.join(repoPath, dirName));
            throw new Error("Directory should not exist after deletion");
        } catch (error) {
            const err = error as NodeJS.ErrnoException;
            expect(err.code).toBe("ENOENT");
        }
    });

    test("delete non-existent item should fail", async () => {
        try {
            await trpc.editor.deleteItem({
                repoId: repo.id,
                path: "non-existent-item.txt",
            });
            throw new Error("Delete should have failed with NOT_FOUND");
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

    test("delete repository root should fail", async () => {
        try {
            await trpc.editor.deleteItem({
                repoId: repo.id,
                path: "",
            });
            throw new Error("Delete should have failed with BAD_REQUEST");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("BAD_REQUEST");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'BAD_REQUEST' but received: ${JSON.stringify(e)}`,
                );
            }
        }

        try {
            await trpc.editor.deleteItem({
                repoId: repo.id,
                path: ".",
            });
            throw new Error("Delete should have failed with BAD_REQUEST");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("BAD_REQUEST");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'BAD_REQUEST' but received: ${JSON.stringify(e)}`,
                );
            }
        }
    });

    test("delete .git directory should fail", async () => {
        try {
            await trpc.editor.deleteItem({
                repoId: repo.id,
                path: ".git",
            });
            throw new Error("Delete should have failed with BAD_REQUEST");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("BAD_REQUEST");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'BAD_REQUEST' but received: ${JSON.stringify(e)}`,
                );
            }
        }

        // also test deleting a file inside .git
        try {
            await trpc.editor.deleteItem({
                repoId: repo.id,
                path: ".git/config",
            });
            throw new Error("Delete should have failed with BAD_REQUEST");
        } catch (e) {
            if (e instanceof TRPCError) {
                expect(e.code).toBe("BAD_REQUEST");
            } else {
                throw new Error(
                    `Expected a TRPCError with code 'BAD_REQUEST' but received: ${JSON.stringify(e)}`,
                );
            }
        }
    });
});
