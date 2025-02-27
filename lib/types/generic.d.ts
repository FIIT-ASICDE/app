import { ElementType } from "react";

export type AvatarDisplayType = "heading" | "card" | "select" | "profile";

export type AvatarProportions = {
    avatarSize: string;
    fallbackFontSize: string;
};

export type LayoutType = "grid" | "rows";

export type ResponsivenessCheckpoint =
    | "2xs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl";

export type BadgeType =
    | "public"
    | "private"
    | "admin"
    | "member"
    | "repository"
    | "organisation";

export type CommandElement = {
    displayTitle: string;
    icon: ElementType;
    link: string;
    action?: string;
    shortcut?: Array<string>;
};

export type CommandElementGroup = {
    groupDisplayTitle: string;
    elements: Array<CommandElement>;
};

export type ButtonVariant =
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;

export interface PaginationResult {
    total: number;
    pageCount: number;
    page: number;
    pageSize: number;
}

export type CardType =
    | "repository"
    | "favoriteRepository"
    | "pinnedRepository"
    | "recentRepository"
    | "organisation"
    | "member"
    | "invitation";
