import { type JWT, decode } from "@auth/core/jwt";
import { existsSync } from "node:fs";
import path from "node:path";

import {
    type EditorSocketData,
    absoluteFilePath,
    files,
    onClose,
    onMessage,
    onOpen,
} from "./handlers";
import { logger } from "./logging";

declare module "bun" {
    interface Env {
        AUTH_SECRET: string;
        REPOSITORIES_STORAGE_ROOT: string;
        WEBSOCKET_SERVER_HOST: string;
        WEBSOCKET_SERVER_PORT: string;
        ENVIRONMENT: string; // must be passed through this, process.env.NODE_ENV doesn't work
    }
}

const REQUIRED_ENV_VARS: Array<keyof typeof process.env> = [
    "AUTH_SECRET",
    "REPOSITORIES_STORAGE_ROOT",
    "WEBSOCKET_SERVER_HOST",
    "WEBSOCKET_SERVER_PORT",
    "ENVIRONMENT",
];

validateEnvVars(REQUIRED_ENV_VARS);

const server = Bun.serve<EditorSocketData>({
    port: process.env.WEBSOCKET_SERVER_PORT,
    hostname: process.env.WEBSOCKET_SERVER_HOST,
    async fetch(req, server) {
        const jwt = await isRequestAuthenticated(req);
        if (!jwt) {
            logger.warn(
                { event: "auth", reason: "unauthorized request", url: req.url },
                "Unauthorized request",
            );
            return Response.json({ message: "unauthorized" }, { status: 401 });
        }

        // url looks like http://localhost:3001/connect?filePath=placeholder
        let filePath = req.url.split("?").at(1)?.split("=").at(1);
        if (filePath) {
            filePath = absoluteFilePath(
                decodeURIComponent(filePath).replaceAll("\\", "/"),
            );
            filePath = filePath.replaceAll("\\", "/");
        } else {
            logger.warn(
                { event: "request", reason: "missing file path", url: req.url },
                "Missing relative file path in URL",
            );
            return Response.json(
                { message: "missing.filepath" },
                { status: 400 },
            );
        }

        if (!repoExists(filePath)) {
            logger.warn(
                { event: "request", reason: "nonexistent file path", filePath },
                "Provided non-existent file path",
            );
            return Response.json(
                { message: "non.existent.filepath" },
                { status: 400 },
            );
        }

        const data: EditorSocketData = { jwt, filePath };
        if (server.upgrade(req, { data })) {
            logger.debug(
                { event: "ws_upgrade", filePath },
                "WebSocket upgrade successful",
            );

            return;
        }

        logger.error(
            { event: "ws_upgrade", reason: "upgrade failed", url: req.url },
            "WebSocket upgrade failed",
        );
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        message: onMessage,
        open: onOpen,
        close: onClose,
    },
});

const AUTHJS_SESSION_COOKIE =
    process.env.ENVIRONMENT === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token";

async function isRequestAuthenticated(req: Request): Promise<JWT | undefined> {
    const cookies = req.headers.get("cookie");

    if (!cookies) {
        logger.warn(
            { event: "auth", reason: "No cookies found" },
            "Authentication failed",
        );
        return undefined;
    }

    const token = cookies
        .split("; ")
        .find((cookie) => cookie.startsWith(AUTHJS_SESSION_COOKIE))
        ?.replace(AUTHJS_SESSION_COOKIE + "=", "");

    if (!token) {
        logger.warn(
            {
                event: "auth",
                reason: "Auth token not found in cookies",
                headers: req.headers,
                cookieName: AUTHJS_SESSION_COOKIE,
            },
            "Authentication failed",
        );
        return undefined;
    }

    // problems with salt https://github.com/nextauthjs/next-auth/discussions/9133
    let jwt: JWT | null;
    try {
        jwt = await decode({
            token,
            secret: process.env.AUTH_SECRET,
            salt: AUTHJS_SESSION_COOKIE,
        });
    } catch (error) {
        if (error instanceof Error) {
            logger.error(
                { event: "auth", error: error.message },
                "JWT decoding error",
            );
        } else {
            logger.error(
                { event: "auth", error: String(error) },
                "JWT decoding error",
            );
        }

        return undefined;
    }

    if (!jwt || !jwt.exp) {
        logger.warn(
            { event: "auth", reason: "Invalid or missing JWT expiration" },
            "Authentication failed",
        );
        return undefined;
    }

    const jwtExpires = jwt.exp * 1000;
    if (Date.now() >= jwtExpires) {
        logger.warn(
            { event: "auth", reason: "JWT expired", exp: jwt.exp },
            "Authentication failed",
        );
        return undefined;
    }

    return jwt;
}

function repoExists(filePath: string) {
    return existsSync(path.dirname(filePath));
}

function validateEnvVars(requiredVars: Array<keyof typeof process.env>) {
    const missingEnvVars = requiredVars.filter(
        (varName) => !process.env[varName],
    );

    if (missingEnvVars.length > 0) {
        logger.error(
            {
                event: "startup",
                missingEnvVars,
            },
            `Missing required environment variables: ${missingEnvVars.join(", ")}`,
        );

        process.exit(1);
    }
}

let isShuttingDown = false;

async function gracefulShutdown(signal: string) {
    if (isShuttingDown) {
        logger.warn(
            { event: "shutdown", signal, status: "already_in_progress" },
            "Shutdown already in progress",
        );
        return;
    }

    isShuttingDown = true;
    logger.info(
        { event: "shutdown_start", signal },
        "Graceful shutdown initiated",
    );

    const shutdownTimeout = setTimeout(() => {
        logger.error(
            { event: "shutdown_timeout", signal },
            "Shutdown timed out, forcing exit",
        );
        process.exit(1);
    }, 10_000); // 10 seconds timeout

    server.stop();
    try {
        const fileClosePromises = Array.from(files.values()).map((file) =>
            file.destroy(),
        );
        await Promise.all(fileClosePromises);

        logger.info(
            { event: "shutdown_complete", signal },
            "Graceful shutdown completed",
        );
        clearTimeout(shutdownTimeout);
        process.exit(0);
    } catch (error) {
        clearTimeout(shutdownTimeout);
        logger.error(
            { event: "shutdown_error", error },
            "Error during graceful shutdown",
        );
        process.exit(1);
    }
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

logger.info(
    { event: "server_start", host: server.hostname, port: server.port },
    "WebSocket server started",
);
