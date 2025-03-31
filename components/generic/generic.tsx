import { BadgeType, CardType, FilterType } from "@/lib/types/generic";
import { Invitation } from "@/lib/types/invitation";
import { RoleOrganisationFilter } from "@/lib/types/organisation";
import {
    DirectoryItem,
    FavoriteRepositoriesFilter,
    FileDisplayItem,
    PinnedRepositoriesFilter,
    PublicRepositoriesFilter,
    RepositoryItem,
    RepositoryItemChange,
} from "@/lib/types/repository";

import { RepositoryItemChangeIcon } from "@/components/editor/changes/repository-item-change-icon";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dispatch, SetStateAction } from "react";

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
        case "pendingInvitation":
            return "before:bg-secondary dark:before:bg-accent";
        case "acceptedInvitation":
            return "before:bg-green-900";
        case "declinedInvitation":
            return "before:bg-destructive";
        default:
            return "before:bg-transparent";
    }
};

export const getCardStripe = (cardType: CardType) => {
    const color: string = getCardStripeColor(cardType);

    return `relative before:absolute before:inset-y-0 before:left-0 before:w-1.5 ${color} before:rounded-l-2xl`;
};

export const parseBoolean = (value: string | undefined) => {
    return value === "true" ? true : value === "false" ? false : undefined;
};

export const parseFilterValue = (
    filterType: FilterType,
    value: string | undefined,
):
    | PinnedRepositoriesFilter
    | FavoriteRepositoriesFilter
    | PublicRepositoriesFilter
    | RoleOrganisationFilter => {
    const booleanValue: boolean | undefined = parseBoolean(value);

    if (booleanValue === undefined) {
        return "all";
    }

    switch (filterType) {
        case "role":
            return booleanValue ? "admin" : "member";
        case "public":
            return booleanValue ? "public" : "private";
        case "pinned":
            return booleanValue ? "pinned" : "notPinned";
        case "favorite":
            return booleanValue ? "favorite" : "notFavorite";
        default:
            return "all";
    }
};

export const datePretty = (date: Date | undefined) => {
    if (!date) {
        return;
    }

    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();
    const hours: number = date.getHours();
    const minutes: string = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year} at ${hours}:${minutes}`;
};

export const languageColors: Record<string, string> = {
    plaintext: "#9CA3AF",
    abap: "#2563EB",
    apex: "#1E3A8A",
    azcli: "#374151",
    aes: "#4C1D95",
    bat: "#92400E",
    bicep: "#60A5FA",
    cameligo: "#CA8A04",
    clojure: "#15803D",
    coffeescript: "#B45309",
    c: "#3B82F6",
    cpp: "#2563EB",
    csharp: "#9333EA",
    csp: "#991B1B",
    css: "#60A5FA",
    cypher: "#EAB308",
    dart: "#0891B2",
    dockerfile: "#1E40AF",
    ecl: "#166534",
    elixir: "#A855F7",
    flow9: "#EA580C",
    fsharp: "#4F46E5",
    freemarker2: "#F97316",
    g4: "#EF4444",
    go: "#06B6D4",
    graphql: "#DB2777",
    gz: "#C084FC",
    handlebars: "#C2410C",
    hcl: "#7E22CE",
    html: "#F97316",
    ini: "#4B5563",
    interp: "#EAB308",
    java: "#DC2626",
    javascript: "#FACC15",
    json: "#CA8A04",
    julia: "#C084FC",
    kotlin: "#EA580C",
    less: "#818CF8",
    lexon: "#6B7280",
    lua: "#93C5FD",
    liquid: "#22D3EE",
    m3: "#16A34A",
    markdown: "#1E40AF",
    mdx: "#1E3A8A",
    mips: "#EF4444",
    msdax: "#A16207",
    mysql: "#FB923C",
    objectiveC: "#2563EB",
    pascal: "#3B82F6",
    pascaligo: "#60A5FA",
    perl: "#4338CA",
    pgsql: "#1E3A8A",
    php: "#6366F1",
    pla: "#22C55E",
    png: "#B91C1C",
    postiats: "#EAB308",
    powerquery: "#CA8A04",
    powershell: "#1E40AF",
    properties: "#EA580C",
    proto: "#9A3412",
    pug: "#D97706",
    python: "#3B82F6",
    qsharp: "#BE185D",
    r: "#60A5FA",
    razor: "#B91C1C",
    redis: "#EF4444",
    redshift: "#DC2626",
    restructuredtext: "#6B7280",
    rby: "#F87171",
    rust: "#EA580C",
    sb: "#16A34A",
    scala: "#EF4444",
    scheme: "#B91C1C",
    scss: "#EC4899",
    shell: "#374151",
    sol: "#2563EB",
    sparql: "#3B82F6",
    sql: "#F87171",
    st: "#4B5563",
    swift: "#F97316",
    systemverilog: "#15803D",
    tcl: "#93C5FD",
    tokens: "#4F4F4F",
    twig: "#22C55E",
    txt: "#2F2F2F",
    typescript: "#1E40AF",
    typespec: "#2563EB",
    vb: "#1E3A8A",
    verilog: "#16A34A",
    wgsl: "#A855F7",
    xml: "#EA580C",
    yaml: "#FCA5A5",
    yml: "#FCA5A5",
    other: "#F0F0F0",
    default: "#8884d8",
};

export const sortTree = (tree: Array<RepositoryItem>) => {
    return tree.sort((a: RepositoryItem, b: RepositoryItem) => {
        if (
            (a.type === "directory" || a.type === "directory-display") &&
            (b.type === "file" || b.type === "file-display")
        )
            return -1;
        if (
            (a.type === "file" || a.type === "file-display") &&
            (b.type === "directory" || b.type === "directory-display")
        )
            return 1;
        return a.name.localeCompare(b.name);
    });
};

export const getChangeTooltipContent = (itemChange: RepositoryItemChange) => {
    if (["added", "modified", "deleted"].includes(itemChange.change.type)) {
        return (
            <span>
                {itemChange.change.type[0].toUpperCase() +
                    itemChange.change.type.slice(1)}
            </span>
        );
    } else if (itemChange.change.type === "renamed") {
        const oldName: string | undefined = itemChange.change.oldName
            .split("/")
            .pop();
        return (
            <span>
                Renamed from{" "}
                <span className="text-muted-foreground">{oldName}</span> to{" "}
                <span className="text-muted-foreground">
                    {itemChange.itemPath}
                </span>
            </span>
        );
    } else if (itemChange.change.type === "moved") {
        return (
            <span>
                Moved from{" "}
                <span className="text-muted-foreground">
                    {itemChange.change.oldPath}
                </span>{" "}
                to{" "}
                <span className="text-muted-foreground">
                    {itemChange.itemPath}
                </span>
            </span>
        );
    }
};

export const getChangeContent = (itemChange: RepositoryItemChange) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild className="text-muted-foreground">
                <div className="w-4">
                    <RepositoryItemChangeIcon itemChange={itemChange} />
                </div>
            </TooltipTrigger>
            <TooltipContent side="right">
                {getChangeTooltipContent(itemChange)}
            </TooltipContent>
        </Tooltip>
    );
};

export const addItemToTree = (
    tree: Array<RepositoryItem>,
    parentPath: string,
    newItem: FileDisplayItem | DirectoryItem
): Array<RepositoryItem> => {
    if (parentPath === "") {
        return [
            ...tree,
            newItem,
        ];
    }

    return tree.map((item) => {
        if (item.absolutePath === parentPath && item.type === "directory") {
            const updatedChildren = item.children
                ? [...item.children, newItem]
                : [newItem];

            return {
                ...item,
                children: updatedChildren,
            };
        }
        if (item.type === "directory" && item.children?.length) {
            return {
                ...item,
                children: addItemToTree(item.children, parentPath, newItem),
            };
        }
        return item;
    });
};

export const deleteItemFromTree = (
    tree: Array<RepositoryItem>,
    deletePath: string
): Array<RepositoryItem> => {
    return tree
        .filter((item: RepositoryItem) => item.absolutePath !== deletePath)
        .map((item: RepositoryItem) => {
            if (
                (item.type === "directory") &&
                item.children
            ) {
                return { ...item, children: deleteItemFromTree(item.children, deletePath) };
            }
            return item;
        });
};

export const renameItemInTree = (
    tree: Array<RepositoryItem>,
    originalPath: string,
    newName: string
): Array<RepositoryItem> => {
    return tree.map((item: RepositoryItem) => {
        if (item.absolutePath === originalPath) {
            const newAbsolutePath: string = item.absolutePath.split("\\").join("/").split("/").slice(0, -1).join("/") + "/" + newName;

            return {
                ...item,
                name: newName,
                absolutePath: newAbsolutePath,
            };
        }
        if (
            (item.type === "directory") &&
            item.children
        ) {
            return {
                ...item,
                children: renameItemInTree(item.children, originalPath, newName),
            };
        }
        return item;
    });
};

export const moveItemInTree = (
    tree: Array<RepositoryItem>,
    sourceItem: RepositoryItem,
    targetItem: RepositoryItem
): Array<RepositoryItem> => {
    const treeWithoutSource: Array<RepositoryItem> = deleteItemFromTree(tree, sourceItem.absolutePath);

    sourceItem.absolutePath = targetItem.name === "" ?
        sourceItem.name : targetItem.absolutePath + "/" + sourceItem.name;

    console.log(sourceItem);

    return addItemToTree(
        treeWithoutSource,
        targetItem.absolutePath,
        sourceItem as FileDisplayItem | DirectoryItem,
    );
};

export const findItemInTree = (
    tree: Array<RepositoryItem>,
    absolutePath: string
): RepositoryItem | undefined => {
    for (const item of tree) {
        if (item.absolutePath === absolutePath) {
            return item;
        }
        if (item.type === "directory" && item.children?.length) {
            const found: RepositoryItem | undefined = findItemInTree(item.children, absolutePath);
            if (found) return found;
        }
    }
    return undefined;
};

export const handleToggle = (
    item: RepositoryItem,
    expandedItems: Array<RepositoryItem>,
    setExpandedItemsAction: Dispatch<SetStateAction<Array<RepositoryItem>>>,
) => {
    if (item.type === "directory" || item.type === "directory-display") {
        if (
            !expandedItems.find(
                (expandedItem: RepositoryItem) =>
                    expandedItem.absolutePath === item.absolutePath,
            )
        ) {
            setExpandedItemsAction([...expandedItems, item]);
        } else {
            const filteredExpandedItems: Array<RepositoryItem> =
                expandedItems.filter(
                    (expandedItem: RepositoryItem) =>
                        expandedItem.absolutePath !== item.absolutePath,
                );
            setExpandedItemsAction(filteredExpandedItems);
        }
    }
};