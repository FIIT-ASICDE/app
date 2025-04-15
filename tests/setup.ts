import { createCaller } from "@/lib/server/api/root";
import { PrismaType, prismaClientSingleton } from "@/prisma";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { randomUUIDv7 } from "bun";
import { exec } from "child_process";
import { mkdir, rm } from "fs/promises";
import { Session } from "next-auth";
import os from "os";
import path from "path";
import { Wait } from "testcontainers";
import { promisify } from "util";

const execAsync = promisify(exec);

export type TestingPrismaResult = Awaited<ReturnType<typeof testingPrisma>>;

export type InitializeUserResult = Awaited<ReturnType<typeof initializeUser>>;

export async function testingPrisma() {
    let connectionUri: string;
    let prisma: PrismaType;
    let cleanupFn: () => Promise<void>;

    if (process.env.CI === "true") {
        // running in GitLab CI/CD:
        // use the pre-provisioned PostgreSQL service (see .gitlab-ci.yml)
        // the service alias is "postgres" and it listens on port 5432.
        connectionUri = "postgresql://asicde:asicde@postgres:5432/asicde";
        prisma = prismaClientSingleton(connectionUri);
        cleanupFn = async () => {
            await prisma.$disconnect();
        };
    } else {
        // Not running in GitLab CI/CD, start a new PostgreSQL container.
        process.env.TESTCONTAINERS_RYUK_DISABLED = "true";
        const postgresContainer = await new PostgreSqlContainer(
            "postgres:latest",
        )
            .withDatabase("asicde")
            .withUsername("asicde")
            .withPassword("asicde")
            .withStartupTimeout(20 * 1000)
            .withWaitStrategy(Wait.forHealthCheck())
            .start();
        connectionUri = postgresContainer.getConnectionUri();
        prisma = prismaClientSingleton(connectionUri);
        cleanupFn = async () => {
            await prisma.$disconnect();
            await postgresContainer.stop();
        };
    }
    await prisma.$executeRawUnsafe(
        "drop schema if exists public cascade; create schema public;",
    );

    await execAsync("bunx prisma migrate reset --force", {
        env: { ...process.env, DATABASE_URL: connectionUri },
    });

    return {
        prisma,
        cleanup: cleanupFn,
    };
}

export async function testingTRPC(prisma: PrismaType, session?: Session) {
    await initializeTestEnv();
    return createCaller(async () => {
        return {
            prisma,
            headers: new Headers(),
            session: session ?? null,
        };
    });
}

async function initializeTestEnv() {
    const baseDir = path.join(os.tmpdir(), "asicde-test-storage-root");
    await rm(baseDir, { recursive: true, force: true });
    await mkdir(baseDir, { recursive: true });

    process.env.REPOSITORIES_STORAGE_ROOT = baseDir;
}

export async function initializeUser(
    prisma: PrismaType,
    userData?: {
        id?: string;
        email?: string;
        name?: string;
        image?: string;
        firstName?: string;
        surname?: string;
    },
) {
    if (userData?.email) {
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (existingUser) {
            await prisma.user.delete({
                where: { id: existingUser.id },
            });
        }
    }

    const user = await prisma.user.create({
        data: {
            id: userData?.id ?? randomUUIDv7(),
            email: userData?.email ?? "alice@example.com",
            name: userData?.name ?? "Alice Doe",
            image: userData?.image ?? "https://example.com/alice-avatar.png",
            metadata: {
                create: {
                    firstName: userData?.firstName ?? "firstName",
                    surname: userData?.surname ?? "surname",
                },
            },
        },
        include: { metadata: true },
    });

    const oneDayFromNow = new Date(
        Date.now() + 24 * 60 * 60 * 1000,
    ).toISOString();
    const session: Session = {
        expires: oneDayFromNow,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
        },
    };

    return { user, session };
}
