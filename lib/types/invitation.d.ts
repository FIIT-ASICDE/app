import { OrganisationDisplay } from "@/lib/types/organisation";
import { RepositoryDisplay } from "@/lib/types/repository";
import { UserDisplay } from "@/lib/types/user";

export type Invitation = {
    id: string;
    type: InvitationType;
    sender: UserDisplay;
    organisation?: OrganisationDisplay;
    repository?: RepositoryDisplay;
    receiver?: UserDisplay;
    status: InvitationStatus;
    createdAt: Date;
    resolvedAt?: Date;
};

export type InvitationType = "repository" | "organisation";

export type InvitationStatus = "pending" | "declined" | "accepted";
