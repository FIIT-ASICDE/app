import {
    FileItem,
    LanguageStatistics,
    RepositoryItem,
} from "@/lib/types/repository";
import { TRPCError } from "@trpc/server";
import fs from "fs";
import path from "path";

/**
 * Reads repository items from a filesystem directory
 *
 * @param directoryPath - Path to the repository directory
 * @param maxDepth - Maximum depth to traverse (0 means only top level)
 * @param loadContents - Whether to load file contents
 * @returns Array of RepositoryItem objects
 */
export function loadRepoItems(
    directoryPath: string,
    maxDepth: number = 0,
    loadContents: boolean = false,
): Array<RepositoryItem> {
    if (
        !fs.existsSync(directoryPath) ||
        !fs.statSync(directoryPath).isDirectory()
    ) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Repository directory not found",
        });
    }

    function readDirectory(
        currentPath: string,
        currentDepth: number,
    ): Array<RepositoryItem> {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        return entries.map((entry): RepositoryItem => {
            const entryPath = path.join(currentPath, entry.name);
            const isDirectory = entry.isDirectory();
            const stats = fs.statSync(entryPath);
            const lastActivity = stats.mtime;

            if (isDirectory) {
                if (currentDepth < maxDepth) {
                    return {
                        type: "directory",
                        name: entry.name,
                        lastActivity,
                        children: readDirectory(entryPath, currentDepth + 1),
                    };
                }

                return {
                    type: "directory-display",
                    name: entry.name,
                    lastActivity,
                };
            }

            const isReadme = entry.name.toLowerCase().startsWith("readme");
            const shouldLoadContent = loadContents || isReadme;
            const extension = path.extname(entry.name).slice(1);

            if (shouldLoadContent) {
                try {
                    return loadRepoFile(entryPath);
                } catch (error) {
                    console.error(
                        `Failed to read file content: ${entryPath}`,
                        error,
                    );
                }
            }

            return {
                type: "file-display",
                name: entry.name,
                lastActivity,
                language: extension,
            };
        });
    }

    return readDirectory(directoryPath, 0);
}

export function loadRepoDirOrFile(
    pathString: string,
    maxDepth: number = 0,
    loadContents: boolean = false,
): RepositoryItem {
    if (!fs.existsSync(pathString)) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Path not found",
        });
    }

    const stat = fs.statSync(pathString);

    if (stat.isDirectory()) {
        return {
            type: "directory",
            name: path.basename(pathString),
            lastActivity: stat.mtime,
            children: loadRepoItems(pathString, maxDepth, loadContents),
        };
    } else if (stat.isFile()) {
        return loadRepoFile(pathString);
    } else {
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Path is neither a file nor a directory",
        });
    }
}

export function loadRepoFile(filePath: string): FileItem {
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Repository file not found",
        });
    }

    const stats = fs.statSync(filePath);
    const lastActivity = stats.mtime;
    const fileName = path.basename(filePath);
    const extension = path.extname(fileName).slice(1);

    return {
        type: "file",
        name: fileName,
        lastActivity,
        language: extension,
        content: fs.readFileSync(filePath, "utf-8"),
    };
}

/**
 * Finds and returns the README.md file from a repository root
 *
 * @param repoPath - Path to the repository directory
 * @returns FileItem object containing the README file or null if not found
 */
export function findReadmeFile(repoPath: string): FileItem | undefined {
    if (!fs.existsSync(repoPath) || !fs.statSync(repoPath).isDirectory()) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Repository directory not found",
        });
    }

    const entries = fs.readdirSync(repoPath, { withFileTypes: true });
    const readmeEntry = entries.find(
        (entry) =>
            !entry.isDirectory() &&
            entry.name.toLowerCase().startsWith("readme"),
    );

    if (!readmeEntry) {
        return undefined;
    }

    const readmePath = path.join(repoPath, readmeEntry.name);
    try {
        return loadRepoFile(readmePath);
    } catch (error) {
        console.error(`Failed to read README file: ${readmePath}`, error);
        return undefined;
    }
}

const IGNORED_DIRS = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "out",
    "coverage",
    ".vscode",
    ".idea",
]);

const TRACKED_EXTENSIONS: Record<string, string> = {
    v: "verilog",
    vhd: "vhdl",
    sv: "system verilog",
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    py: "python",
    html: "html",
    htm: "html",
    css: "css",
    scss: "css",
    sass: "css",
    less: "css",
    json: "json",
    md: "markdown",
    markdown: "markdown",
    java: "java",
    c: "c",
    cpp: "c++",
    h: "c",
    hpp: "c++",
    cs: "c#",
    go: "go",
    rb: "ruby",
    php: "php",
    swift: "swift",
    kt: "kotlin",
    rs: "rust",
};

/**
 * Calculates language statistics for a repository
 *
 * @param repoPath - Path to the repository directory
 * @returns Object containing language statistics with percentages and total LOC
 */
export async function calculateLanguageStatistics(
    repoPath: string,
): Promise<LanguageStatistics> {
    if (!fs.existsSync(repoPath) || !fs.statSync(repoPath).isDirectory()) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Repository directory not found",
        });
    }

    const languageStats: Record<string, number> = {};
    let totalLoc = 0;

    async function processDirectory(dirPath: string) {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        // Process files in parallel for better performance
        const promises = entries.map(async (entry) => {
            const entryPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                // Skip ignored directories
                if (!IGNORED_DIRS.has(entry.name)) {
                    await processDirectory(entryPath);
                }
            } else if (entry.isFile()) {
                const extension = path
                    .extname(entry.name)
                    .slice(1)
                    .toLowerCase();
                const language =
                    TRACKED_EXTENSIONS[extension] || extension || "other";
                const loc = await countLines(entryPath);
                languageStats[language] = (languageStats[language] || 0) + loc;
                totalLoc += loc;
            }
        });

        await Promise.all(promises);
    }

    await processDirectory(repoPath);
    const percentages = Object.entries(languageStats)
        .map(([language, loc]) => ({
            language,
            loc,
            percentage:
                totalLoc > 0
                    ? parseFloat(((loc / totalLoc) * 100).toFixed(2))
                    : 0,
        }))
        .sort((a, b) => b.loc - a.loc); // Sort by LOC in descending order

    return { percentages, totalLoc };
}

async function countLines(filePath: string): Promise<number> {
    try {
        const content = fs.readFileSync(filePath, "utf-8");
        return content.split(/\r\n|\r|\n/).length;
    } catch (error) {
        console.error(`Failed to read file: ${filePath}`, error);
        return 0;
    }
}
