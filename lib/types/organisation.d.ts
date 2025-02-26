import { RepositoryDisplay } from "@/lib/types/repository";

export type Organisation = {
    id: string;
    name: string;
    image?: string;
    bio?: string;
    showMembers?: boolean;

    createdAt: Date;
    members: Array<OrganisationMember>;
    repositories: Array<RepositoryDisplay>;
};

export type OrganisationMember = {
    id: string;
    username: string;
    name: string;
    surname: string;
    image?: string;
    role: OrganisationRole;
};

export type OrganisationRole = "admin" | "member";

export interface OrganisationOverview {
    isUserAdmin: boolean;
    organisation: Organisation;
}

export type OrganisationDisplay = Omit<
    Organisation,
    "members" | "repositories" | "createdAt"
> & {
    memberCount: number;
    userRole?: OrganisationRole;
};

export type RoleOrganisationFilter = "all" | "admin" | "member";

export type MemberCountSort = "none" | "asc" | "desc";

export type OrganisationSettingsTab = "general" | "danger";

export type ManageMemberTab = "promote" | "expel";