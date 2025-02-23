import { UserDisplay } from "@/lib/types/user";
import { RepositoryDisplay } from "@/lib/types/repository";
import { OrganisationDisplay } from "@/lib/types/organisation";

export type Invitation = {
    id: string;
    type: InvitationType;
    sender: UserDisplay;
    organisation?: OrganisationDisplay;
    repository?: RepositoryDisplay;
    status: InvitationStatus;
    createdAt: Date;
};

export type InvitationType = "repository" | "organisation";

export type InvitationStatus = "pending" | "declined" | "accepted";