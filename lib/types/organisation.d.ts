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

export type OrganisationSettingsTab = "general" | "invitations" | "danger";

export type InvitationsTab = "pending" | "accepted" | "declined";

export type ManageMemberTab = "promote" | "expel";

export type InviteUserTab = "toOrganisation" | "onRepository";
