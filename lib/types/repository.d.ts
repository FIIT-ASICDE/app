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
};

export type RepositoryOverview = Omit<Repository, "contributors" | "tree"> & {
    readme?: FileItem;
    stats: LanguageStatistics;
};

export type RepositoryOverview = Omit<Repository, "contributors" | "tree"> & {
    readme?: FileItem;
};

export type RepoUserRole =
    | "owner"
    | "admin"
    | "contributor"
    | "viewer"
    | "guest";

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
}

export type FileItem = Omit<FileDisplayItem, "type"> & {
    type: "file";
    content: string;
};

interface DirectoryDisplayItem {
    type: "directory-display";
    name: string;
    lastActivity: Date;
}

type DirectoryItem = Omit<DirectoryDisplayItem, "type"> & {
    type: "directory";
    children: RepositoryItem[];
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

export type RepositoryInvitationsTab = "pending" | "accepted" | "declined";

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
    name: string;
    visibility: RepositoryVisibility;
    githubFullName: string;
    description?: string;
}
