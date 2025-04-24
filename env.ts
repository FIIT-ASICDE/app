import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        AUTH_GITHUB_ID: z
            .string()
            .min(1, "AUTH_GITHUB_ID is required")
            .describe("ID of the Github OAuth app"),
        AUTH_GITHUB_SECRET: z
            .string()
            .min(1, "AUTH_GITHUB_SECRET is required")
            .describe("Secret used for Github OAuth app"),

        NODE_ENV: z
            .enum(["production", "development", "test"])
            .describe("Forwared NODE_ENV from runtime"),
        PORT: z.string().default("3000").describe("Port of the application"),
        AUTH_SECRET: z
            .string()
            .min(1)
            .describe(
                "Secret used to derive Auth stuff, genereted by `npx auth secret`",
            ),
        DATABASE_URL: z
            .string()
            .url("DATABASE_URL must be a valid URL")
            .startsWith(
                "postgresql://",
                "DATABASE_URL must be a PostgreSQL URL",
            )
            .default("postgresql://asicde:asicde@localhost:5432/asicde"),
        AUTH_TRUST_HOST: z
            .string()
            .url("AUTH_TRUST_HOST must be a valid URL")
            .optional()
            .describe(
                "The app deployment host to be trusted by AuthJS, used when deployed behind proxy",
            ),
        REPOSITORIES_STORAGE_ROOT: z
            .string()
            .min(1, "REPOSITORIES_STORAGE_ROOT is required")
            .describe(
                "Absolute path on the system where to store repositories",
            ),
        USER_ASSETS_STORAGE_ROOT: z
            .string()
            .min(1, "USER_ASSETS_STORAGE_ROOT is required")
            .describe(
                "Absolute path on the system where to user assets (e.g. profile pics)",
            ),
        CI: z
            .enum(["true"])
            .optional()
            .describe(
                "Flag set by Gitlab indicating if running inside a pipeline",
            ),
    },
    client: {
        NEXT_PUBLIC_EDITOR_SERVER_URL: z
            .string()
            .url("NEXT_PUBLIC_EDITOR_SERVER_URL must be a valid URL")
            .default("http://localhost:42069"),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        AUTH_SECRET: process.env.AUTH_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
        AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
        REPOSITORIES_STORAGE_ROOT: process.env.REPOSITORIES_STORAGE_ROOT,
        USER_ASSETS_STORAGE_ROOT: process.env.USER_ASSETS_STORAGE_ROOT,
        AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
        AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
        CI: process.env.CI,
        PORT: process.env.PORT,

        NEXT_PUBLIC_EDITOR_SERVER_URL: process.env.EDITOR_SERVER_URL,
    },
});
