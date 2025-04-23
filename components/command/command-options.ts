import { CommandElement, CommandElementGroup } from "@/lib/types/generic";
import { OnboardedUser } from "@/lib/types/user";
import {
    Building,
    Folders,
    LayoutDashboard,
    Settings,
    SunMoon,
    UserRound,
    UserRoundPen,
} from "lucide-react";

interface CommandOptionsProps {
    user: OnboardedUser;
}

/**
 * Options that the user has when opening the command bar dialog
 *
 * @param {CommandOptionsProps} props - Component props
 * @returns {Array<CommandElementGroup>} Array of command element groups
 */
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
