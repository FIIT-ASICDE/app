import { ElementType } from "react";

export type AvatarDisplayType = "heading" | "card" | "select" | "profile";

export type LayoutType = "grid" | "rows";

export type ResponsivenessCheckpoint =
    | "2xs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl";

export type BadgeType = "public" | "private" | "admin" | "member";

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

export type ButtonSize = "default" | "icon" | "sm" | "lg" | null | undefined;
