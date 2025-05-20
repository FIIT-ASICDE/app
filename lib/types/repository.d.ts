import { PaginationResult } from "@/lib/types/generic";
import { Invitation } from "@/lib/types/invitation";
import { UserDisplay } from "@/lib/types/user";

export type Repository = {
    id: string;
    ownerId: string;
    ownerName: string;
    name: string;
    visibility: RepositoryVisibility;
    favorite?: boolean;
    pinned?: boolean;
    description?: string;
    ownerImage?: string;

    contributors?: Array<UserDisplay>;

    tree?: Array<RepositoryItem>;
    createdAt?: Date;
    userRole?: RepoUserRole;

    isGitRepo?: boolean;

    symbolTable?: {
        globalSymbols: Record<string, SymbolInfo>;
        fileSymbols: {
            isInitialized: boolean;
            totalSymbols: number;
            files: number;
            symbols: Array<{
                scope: string;
                name: string;
                type: string;
                uri: string;
                line: number;
                column: number;
            }>;
        };
    };
};

export type RepositoryOverview = Omit<Repository, "contributors" | "tree"> & {
    readme?: FileItem;
    stats: LanguageStatistics;
};

export type RepoUserRole =
    | "OWNER"
    | "ADMIN"
    | "CONTRIBUTOR"
    | "VIEWER"
    | "GUEST";

export type RepositoryDisplay = {
    id: string;
    ownerName: string;
    ownerImage?: string;
    name: string;
    visibility: RepositoryVisibility;
};

export type RepositoryVisibility = "public" | "private";

interface FileDisplayItem {
    type: "file-display";
    name: string;
    lastActivity: Date;
    language: string;
    absolutePath: string;
}

export type FileItem = Omit<FileDisplayItem, "type"> & {
    type: "file";
    content: string;
    absolutePath: string;
};

interface DirectoryDisplayItem {
    type: "directory-display";
    name: string;
    lastActivity: Date;
    absolutePath: string;
}

type DirectoryItem = Omit<DirectoryDisplayItem, "type"> & {
    type: "directory";
    children: RepositoryItem[];
    absolutePath: string;
};

export type RepositoryItem =
    | DirectoryDisplayItem
    | DirectoryItem
    | FileDisplayItem
    | FileItem;

export type PinnedRepositoriesFilter = "all" | "pinned" | "notPinned";

export type FavoriteRepositoriesFilter = "all" | "favorite" | "notFavorite";

export type PublicRepositoriesFilter = "all" | "public" | "private";

export type RepositorySettingsTab =
    | "general"
    | "contributors"
    | "invitations"
    | "danger";

export type LanguageStatisticsItem = {
    language: string;
    loc: number;
    percentage: number;
};

export type LanguageStatistics = {
    percentages: Array<LanguageStatisticsItem>;
    totalLoc: number;
};

interface GithubRepoDisplay {
    ownerName: string;
    ownerImage: string;
    name: string;
    visibility: RepositoryVisibility;
    githubFullName: string;
    description?: string;
}

export type GithubRepositoryAffiliation =
    | "owner"
    | "collaborator"
    | "organization_member";

export interface RepositorySettings {
    repository: Repository;
    pendingInvitations: Array<Invitation>;
    acceptedInvitations: Array<Invitation>;
    declinedInvitations: Array<Invitation>;
    isUserAdmin: boolean;
}

export type RepositoryItemChange = {
    itemPath: string;
    change:
        | { type: "added" | "modified" | "deleted" }
        | { type: "renamed"; oldName: string }
        | { type: "moved"; oldPath: string };
};

export type CommitHistory = {
    commits: GitCommit[];
    pagination: PaginationResult;
};

export type GitCommit = {
    hash: string;
    authorName: string;
    authorEmail: string;
    authorDate: Date;
    message: string;
    body: string;
    changes: RepositoryItemChange[];
    pushed: boolean;
};
