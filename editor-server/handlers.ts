import type { JWT } from "@auth/core/jwt";
import type { ServerWebSocket } from "bun";
import { createDecoder, readVarUint, readVarUint8Array } from "lib0/decoding";
import {
    createEncoder,
    length as encodingLength,
    toUint8Array,
    writeVarUint,
    writeVarUint8Array,
} from "lib0/encoding";
import { readFileSync } from "node:fs";
import {
    Awareness,
    applyAwarenessUpdate,
    encodeAwarenessUpdate,
    removeAwarenessStates,
} from "y-protocols/awareness";
import { readSyncMessage, writeSyncStep1, writeUpdate } from "y-protocols/sync";
import * as Y from "yjs";

import { logger } from "./logging";

const GC_ENABLED = process.env.GC !== "false" && process.env.GC !== "0";
const MESSAGE_SYNC = 0;
const MESSAGE_AWARENESS = 1;
const FLUSH_UPDATES_THRESHOLD = 10;
const FLUSH_INTERVAL = 1_000;
const COUNT_LOG_INTERVAL = 5000;
const CLEANUP_DELAY = 5000;

export const files = new Map<string, WSSharedFile>();
const pendingCleanups = new Map<string, Timer>();

setInterval(() => {
    logger.info({ event: "file_tracking", openFiles: files.size });
}, COUNT_LOG_INTERVAL);

export interface EditorSocketData {
    jwt: JWT;
    filePath: string;
}

interface ClientsDiff {
    added: Array<number>;
    updated: Array<number>;
    removed: Array<number>;
}

export class WSSharedFile extends Y.Doc {
    public path: string;
    public awareness: Awareness;

    private conns: Map<ServerWebSocket<EditorSocketData>, Set<number>>;
    private updates: number;
    private flushInterval: Timer;

    constructor(path: string) {
        super({ gc: GC_ENABLED });
        this.path = path;
        this.conns = new Map();
        this.awareness = new Awareness(this);
        this.awareness.setLocalState(null);
        this.updates = 0;
        this.flushInterval = setInterval(() => this.flush(), FLUSH_INTERVAL);

        const initialContent = getFileContents(this.path);
        if (initialContent !== "") {
            const ytext = this.getText("monaco");
            ytext.delete(0, ytext.length);
            ytext.insert(0, initialContent);
        }

        const awarenessChangeHandler = (
            { added, updated, removed }: ClientsDiff,
            ws: ServerWebSocket<EditorSocketData> | null,
        ) => {
            const changedClients = added.concat(updated, removed);

            if (ws !== null && this.conns.has(ws)) {
                const connControlledIDs = this.conns.get(ws)!;

                added.forEach((clientID) => connControlledIDs.add(clientID));
                removed.forEach((clientID) =>
                    connControlledIDs.delete(clientID),
                );
            } else if (ws !== null) {
                this.conns.set(ws, new Set());
            }

            // broadcast awareness update
            const encoder = createEncoder();
            writeVarUint(encoder, MESSAGE_AWARENESS);
            writeVarUint8Array(
                encoder,
                encodeAwarenessUpdate(this.awareness, changedClients),
            );
            const buff = toUint8Array(encoder);
            this.conns.forEach((_, ws) => ws.send?.(buff));
        };

        this.awareness.on("update", awarenessChangeHandler);
        // @ts-ignore Yjs is in JS so there are any, any, any..., but the signature of `updateHandler` is correct
        this.on("update", updateHandler);
    }

    getIds(ws: ServerWebSocket<EditorSocketData>) {
        return this.conns.get(ws) ?? new Set();
    }

    removeWs(ws: ServerWebSocket<EditorSocketData>) {
        this.conns.delete(ws);
    }

    sendAll(message: Uint8Array) {
        this.conns.forEach((_, ws) => ws.send(message));
    }

    async flush() {
        this.updates++;
        if (this.updates < FLUSH_UPDATES_THRESHOLD) {
            return;
        }
        this.updates = 0;

        const text = this.getText("monaco").toString();
        const f = Bun.file(this.path);
        try {
            await f.write(text);
        } catch (e) {
            logger.error(
                { event: "flush_error", error: e },
                "Error writing file",
            );
        }
    }

    async destroy(): Promise<void> {
        clearInterval(this.flushInterval);
        await this.flush();
        super.destroy();
    }
}

export function onOpen(ws: ServerWebSocket<EditorSocketData>) {
    ws.binaryType = "arraybuffer";

    const pendingCleanup = pendingCleanups.get(ws.data.filePath);
    if (pendingCleanup) {
        logger.debug(
            {
                event: "cleanup_cancelled",
                filePath: ws.data.filePath,
            },
            "Cancelled pending file cleanup due to new connection",
        );

        clearTimeout(pendingCleanup);
        pendingCleanups.delete(ws.data.filePath);
    }

    const file = getFile(ws.data.filePath);

    const encoder = createEncoder();
    writeVarUint(encoder, MESSAGE_SYNC);
    writeSyncStep1(encoder, file);
    ws.send(toUint8Array(encoder));

    const awarenessStates = file.awareness.getStates();
    if (awarenessStates.size > 0) {
        const encoder = createEncoder();
        writeVarUint(encoder, MESSAGE_AWARENESS);
        writeVarUint8Array(
            encoder,
            encodeAwarenessUpdate(
                file.awareness,
                Array.from(awarenessStates.keys()),
            ),
        );
        ws.send(toUint8Array(encoder));
    }
}

export function onMessage(
    ws: ServerWebSocket<EditorSocketData>,
    message: string | Buffer,
) {
    const file = files.get(ws.data.filePath);
    if (!file) {
        logger.error(
            { event: "message_error", filePath: ws.data.filePath },
            `File '${ws.data.filePath}' doesn't exist`,
        );
        return;
    }

    if (typeof message === "string") {
        message = Buffer.from(message);
    }

    try {
        const decoder = createDecoder(new Uint8Array(message));
        const messageType = readVarUint(decoder);

        const encoder = createEncoder();
        switch (messageType) {
            case MESSAGE_SYNC:
                writeVarUint(encoder, MESSAGE_SYNC);
                readSyncMessage(decoder, encoder, file, ws);

                // If the `encoder` only contains the type of reply message and no
                // message, there is no need to send the message. When `encoder` only
                // contains the type of reply, its length is 1.
                if (encodingLength(encoder) > 1) {
                    ws.send(toUint8Array(encoder));
                }
                break;
            case MESSAGE_AWARENESS:
                applyAwarenessUpdate(
                    file.awareness,
                    readVarUint8Array(decoder),
                    ws,
                );
                break;
            default:
                logger.warn(
                    { event: "message_unknown", messageType },
                    `Unknown message type: ${messageType}`,
                );
        }
    } catch (err) {
        logger.error(
            { event: "message_error", error: err },
            "Error processing message",
        );
    }
}

export function onClose(
    ws: ServerWebSocket<EditorSocketData>,
    _code: number,
    _reason: string,
) {
    const file = files.get(ws.data.filePath);
    if (!file) return;

    const controlledIds = file.getIds(ws);
    file.removeWs(ws);
    removeAwarenessStates(file.awareness, Array.from(controlledIds), null);

    // cancel existing cleanup
    const existingCleanup = pendingCleanups.get(ws.data.filePath);
    if (existingCleanup) {
        clearTimeout(existingCleanup);
    }

    // and schedule new cleanup
    const cleanup = setTimeout(() => {
        // Check if there are any active connections for this file
        const file = files.get(ws.data.filePath);
        if (!file) return;

        // If there are no connections, cleanup the file
        if (file.getIds(ws).size === 0) {
            logger.debug(
                {
                    event: "file_cleanup",
                    filePath: ws.data.filePath,
                },
                "Cleaning up file after delay",
            );

            files.delete(ws.data.filePath);
            file.destroy();
            pendingCleanups.delete(ws.data.filePath);
        } else {
            logger.debug(
                {
                    event: "file_cleanup_cancelled",
                    filePath: ws.data.filePath,
                    activeConnections: file.getIds(ws).size,
                },
                "File cleanup cancelled - active connections exist",
            );
        }
    }, CLEANUP_DELAY);

    pendingCleanups.set(ws.data.filePath, cleanup);
}

function updateHandler(
    update: Uint8Array,
    _ws: ServerWebSocket<EditorSocketData>,
    file: WSSharedFile,
    _tr: Y.Transaction,
) {
    file.flush();
    const encoder = createEncoder();
    writeVarUint(encoder, MESSAGE_SYNC);
    writeUpdate(encoder, update);
    const message = toUint8Array(encoder);
    file.sendAll(message);
}

/**
 * @param {string} filePath - the file path of the Y.Doc to find or create
 * @param {boolean} gc - whether to allow gc on the doc (applies only when created)
 */
function getFile(filePath: string, gc: boolean = true): WSSharedFile {
    if (files.has(filePath)) {
        return files.get(filePath)!;
    }
    const newFile = new WSSharedFile(filePath);
    newFile.gc = gc;
    newFile.flush();
    files.set(filePath, newFile);
    return newFile;
}

function getFileContents(filePath: string): string {
    try {
        return readFileSync(filePath, "utf-8");
    } catch (error) {
        logger.error(
            { event: "file_read_error", filePath, error },
            "Failed to read initial file contents",
        );
        return "";
    }
}
