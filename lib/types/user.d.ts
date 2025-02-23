import { RepositoryDisplay } from "./repository";
import { $Enums } from ".prisma/client";

import UserRole = $Enums.UserRole;
import { OrganisationDisplay } from "@/lib/types/organisation";
import { InvitationStatus } from "@/lib/types/invitation";

export type User =
    | {
          type: "onboarded";
          id: string;
          name: string;
          surname: string;
          username: string;
          email: string;
          role: UserRole;
          createdAt: Date;
          image?: string;
          bio?: string;
          theme?: string;
      }
    | {
          type: "non-onboarded";
          id: string;
          username: string;
          email: string;
          image?: string;
      };

export type OnboardedUser = Extract<User, { type: "onboarded" }>;

export type UserDisplay = {
    id: string;
    username: string;
    image?: string;
};

export interface UsersOverview {
    isItMe: boolean;
    profile: OnboardedUser;
    organisations: Array<OrganisationDisplay>;
    pinnedRepositories: Array<RepositoryDisplay>;
}

export type UserSettingsTab = "account" | "preferences" | "danger";

export type UserInvitationsTab = InvitationStatus | "all";
