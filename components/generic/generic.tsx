import {
    BadgeType,
    CommandElement,
    CommandElementGroup,
    ResponsivenessCheckpoint,
} from "@/lib/types/generic";
import {
    FolderPlus,
    Folders,
    Home,
    Settings,
    SunMoon,
    UserRoundPen,
    UserRoundPlus,
    UsersRound
} from "lucide-react";
import { Session } from "next-auth";

interface CommandOptionsProps {
    user: Session["user"];
}

export const CommandOptions = (
    {
        user,
    }: CommandOptionsProps
): Array<CommandElementGroup> => {
    return [
        {
            groupDisplayTitle: "Suggestions",
            elements: [
                {
                    displayTitle: "Home",
                    icon: Home,
                    link: "/" + user.username,
                } satisfies CommandElement,
                {
                    displayTitle: "Repositories",
                    icon: Folders,
                    link: "/" + user.username + "/repositories",
                } satisfies CommandElement,
                {
                    displayTitle: "Organisations",
                    icon: UsersRound,
                    link: "/" + user.username + "/organisations",
                } satisfies CommandElement,
                {
                    displayTitle: "Settings",
                    icon: Settings,
                    link: "/" + user.username + "/settings",
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

export const getTimeDeltaString = (lastActivity: Date): string => {
    const now = new Date();
    const deltaMilliseconds = now.getTime() - lastActivity.getTime();

    const seconds = Math.floor(deltaMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} ${years === 1 ? "year" : "years"} ago`;
    } else if (months > 0) {
        return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else if (days > 0) {
        return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
        return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    }
};

export const getDateString = (actionType: string, date: Date) => {
    const monthLong: string = date.toLocaleString("default", { month: "long" });
    const yearFull: string = date.toLocaleString("default", {
        year: "numeric",
    });
    return actionType + " " + monthLong + " " + yearFull;
};

export const getWidthFromResponsivenessCheckpoint = (
    checkpoint: ResponsivenessCheckpoint,
) => {
    switch (checkpoint) {
        case "2xs":
            return 320;
        case "xs":
            return 480;
        case "sm":
            return 640;
        case "md":
            return 768;
        case "lg":
            return 1024;
        case "xl":
            return 1280;
        case "2xl":
            return 1536;
    }
};

export const getBadgeStyle = (badgeType: BadgeType) => {
    switch (badgeType) {
        case "public":
            return "bg-badge-public text-badge-public-foreground hover:bg-badge-public-hover dark:bg-[var(--badge-public)] dark:text-[var(--badge-public-foreground)] dark:hover:bg-[var(--badge-public-hover)]";
        case "private":
            return "bg-badge-private text-badge-private-foreground hover:bg-badge-private-hover dark:bg-[var(--badge-private)] dark:text-[var(--badge-private-foreground)] dark:hover:bg-[var(--badge-private-hover)]";
        case "admin":
            return "bg-badge-admin text-badge-admin-foreground hover:bg-badge-admin-hover dark:bg-[var(--badge-admin)] dark:text-[var(--badge-admin-foreground)] dark:hover:bg-[var(--badge-admin-hover)]";
        case "member":
            return "bg-badge-member text-badge-member-foreground hover:bg-badge-member-hover dark:bg-[var(--badge-member)] dark:text-[var(--badge-member-foreground)] dark:hover:bg-[var(--badge-member-hover)]";
        default:
            return "";
    }
};

export const getCurrentPage = (
    pathname: string,
    sliceIndex: number,
): string => {
    const parts: Array<string> = pathname.split("/").filter(Boolean);
    if (parts.length < sliceIndex) throw new Error("Pathname invalid");
    return parts.length > 1 ? "/" + parts.slice(sliceIndex).join("/") : "/";
};
