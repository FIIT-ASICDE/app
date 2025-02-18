import { createHash } from "crypto";
import { mkdir, readFile, stat, writeFile } from "fs/promises";
import { join } from "path";

export async function calculateFileHash(buffer: Buffer): Promise<string> {
    return createHash("sha256").update(buffer).digest("hex");
}

export async function ensureDirectory(path: string): Promise<void> {
    try {
        await stat(path);
    } catch {
        await mkdir(path, { recursive: true });
    }
}

export async function saveFile(
    buffer: Buffer,
    hash: string,
    storageRoot: string,
): Promise<string> {
    await ensureDirectory(storageRoot);
    const filePath = join(storageRoot, hash);

    try {
        await stat(filePath);
        return hash;
    } catch {
        await writeFile(filePath, buffer);
        return hash;
    }
}

export async function getFile(
    hash: string,
    storageRoot: string,
): Promise<Buffer | null> {
    try {
        const filePath = join(storageRoot, hash);
        const buffer = await readFile(filePath);
        return buffer;
    } catch {
        return null;
    }
}
