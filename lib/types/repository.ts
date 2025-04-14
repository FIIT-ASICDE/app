import { $Enums } from "@prisma/client";
import { SymbolInfo } from "@/app/antlr/SystemVerilog/symbolTable";

export type RepoRole = $Enums.RepoRole;

export type RepositoryItem = {
    type: "file" | "directory" | "file-display" | "directory-display";
    name: string;
    absolutePath: string;
    language?: string;
    lastActivity?: Date;
};

export type Repository = {
    id: string;
    ownerId: string;
    ownerName: string;
    name: string;
    visibility: "public" | "private";
    favorite: boolean;
    pinned: boolean;
    description?: string;
    ownerImage?: string;
    createdAt: Date;
    userRole: RepoRole;
    tree?: Array<RepositoryItem>;
    isGitRepo: boolean;
    symbolTable?: {
        globalSymbols: Record<string, SymbolInfo>;
        fileSymbols: {
            isInitialized: boolean;
            totalSymbols: number;
            files: number;
            symbols: Array<{
                name: string;
                type: string;
                uri: string;
                line: number;
                column: number;
            }>;
        };
    };
}; 