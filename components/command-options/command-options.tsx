import { CommandElement, CommandElementGroup } from "@/lib/types/generic";
import { OnboardedUser } from "@/lib/types/user";
import {
    Building,
    FolderPlus,
    Folders,
    LayoutDashboard,
    Settings,
    SunMoon,
    UserRound,
    UserRoundPen,
    UserRoundPlus,
} from "lucide-react";

interface CommandOptionsProps {
    user: OnboardedUser;
}

export const CommandOptions = ({
    user,
}: CommandOptionsProps): Array<CommandElementGroup> => {
    return [
        {
            groupDisplayTitle: "Suggestions",
            elements: [
                {
                    displayTitle: "Dashboard",
                    icon: LayoutDashboard,
                    link: "/" + user.username + "/dashboard",
                } satisfies CommandElement,
                {
                    displayTitle: "My profile",
                    icon: UserRound,
                    link: "/" + user.username,
                } satisfies CommandElement,
                {
                    displayTitle: "My repositories",
                    icon: Folders,
                    link: "/" + user.username + "/repositories",
                } satisfies CommandElement,
                {
                    displayTitle: "My organisations",
                    icon: Building,
                    link: "/" + user.username + "/organisations",
                } satisfies CommandElement,
                {
                    displayTitle: "Settings",
                    icon: Settings,
                    link: "/" + user.username + "/settings",
                } satisfies CommandElement,
                {
                    displayTitle: "All organisations",
                    icon: Building,
                    link: "/orgs",
                } satisfies CommandElement,
            ] satisfies Array<CommandElement>,
        } satisfies CommandElementGroup,
        {
            groupDisplayTitle: "Actions",
            elements: [
                {
                    displayTitle: "Create repository",
                    icon: FolderPlus,
                    link: "/" + user.username + "/repositories",
                    action: "openCreateRepositoryDialog",
                } satisfies CommandElement,
                {
                    displayTitle: "Create organisation",
                    icon: UserRoundPlus,
                    link: "/" + user.username + "/organisations",
                    action: "openCreateOrganisationDialog",
                } satisfies CommandElement,
            ] satisfies Array<CommandElement>,
        } satisfies CommandElementGroup,
        {
            groupDisplayTitle: "Settings",
            elements: [
                {
                    displayTitle: "Edit profile",
                    icon: UserRoundPen,
                    link: "/" + user.username,
                    action: "openEditProfileDialog",
                    shortcut: ["Ctrl", "E"],
                } satisfies CommandElement,
                {
                    displayTitle: "Change theme",
                    icon: SunMoon,
                    link: "/" + user.username + "/settings",
                    action: "openSettingsTab",
                    shortcut: ["Ctrl", "T"],
                } satisfies CommandElement,
            ] satisfies Array<CommandElement>,
        } satisfies CommandElementGroup,
    ] satisfies Array<CommandElementGroup>;
};
