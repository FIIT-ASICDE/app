import {
    BadgeType,
    CardType,
    CommandElement,
    CommandElementGroup,
} from "@/lib/types/generic";
import { Invitation } from "@/lib/types/invitation";
import {
    Building,
    FolderPlus,
    Folders,
    Home,
    Settings,
    SunMoon,
    UserRoundPen,
    UserRoundPlus,
} from "lucide-react";
import { Session } from "next-auth";

interface CommandOptionsProps {
    user: Session["user"];
}

export const CommandOptions = ({
    user,
}: CommandOptionsProps): Array<CommandElementGroup> => {
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
                    icon: Building,
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
        case "repository":
            return "bg-badge-repository text-badge-repository-foreground hover:bg-badge-repository-hover dark:bg-[var(--badge-repository)] dark:text-[var(--badge-repository-foreground)] dark:hover:bg-[var(--badge-repository-hover)]";
        case "organisation":
            return "bg-badge-organisation text-badge-organisation-foreground hover:bg-badge-organisation-hover dark:bg-[var(--badge-organisation)] dark:text-[var(--badge-organisation-foreground)] dark:hover:bg-[var(--badge-organisation-hover)]";
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

export const getInvitationDisplayData = (invitation: Invitation) => {
    const displayName: string =
        invitation.type === "repository"
            ? invitation.repository?.ownerName +
              "/" +
              invitation.repository?.name
            : invitation.organisation?.name || "";
    const image: string | undefined =
        invitation.type === "repository"
            ? invitation.repository?.ownerImage
            : invitation.organisation?.image;
    const link: string =
        invitation.type === "repository"
            ? "/" + displayName
            : "/orgs/" + displayName;
    return {
        displayName,
        image,
        link,
    };
};

const getCardStripeColor = (cardType: CardType) => {
    switch (cardType) {
        case "repository":
            return "before:bg-badge-repository";
        case "favoriteRepository":
            return "before:bg-primary";
        case "pinnedRepository":
            return "before:bg-badge-admin-hover";
        case "recentRepository":
            return "before:bg-card-hover";
        case "organisation":
            return "before:bg-badge-organisation";
        case "member":
            return "before:bg-badge-member";
        case "invitation":
            return "before:bg-chart-1 before:bg-dark:chart-3";
        default:
            return "before:bg-transparent";
    }
};

export const getCardStripe = (cardType: CardType) => {
    const color: string = getCardStripeColor(cardType);

    return `relative before:absolute before:inset-y-0 before:left-0 before:w-1.5 ${color} before:rounded-l-2xl`;
};
