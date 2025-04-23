"use client";

import { OrganisationSettingsTab } from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { BookUser, Mail, TriangleAlert } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement } from "react";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrganisationSettingsTabsProps {
    tab: OrganisationSettingsTab;
}

/**
 * Tabs component used on the settings part of the organisation page
 *
 * @param {OrganisationSettingsTabsProps} props - Component props
 * @returns {ReactElement} Tabs component
 */
export const OrganisationSettingsTabs = ({
    tab,
}: OrganisationSettingsTabsProps): ReactElement => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const setSettingsTab = (newTab: OrganisationSettingsTab) => {
        const params = new URLSearchParams(searchParams);
        switch (newTab) {
            case "general":
                params.delete("tab");
                break;
            case "invitations":
                params.set("tab", "invitations");
                break;
            case "danger":
                params.set("tab", "danger");
                break;
            default:
                params.delete("tab");
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex w-full flex-row gap-3 md:flex-col">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant={tab === "general" ? "secondary" : "outline"}
                        className="flex w-1/2 flex-row gap-x-3 md:w-full"
                        onClick={() => setSettingsTab("general")}
                    >
                        <BookUser />
                        <span className="hidden sm:inline">General</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="sm:hidden">General</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant={
                            tab === "invitations" ? "secondary" : "outline"
                        }
                        className="flex w-1/2 flex-row gap-x-3 md:w-full"
                        onClick={() => setSettingsTab("invitations")}
                    >
                        <Mail />
                        <span className="hidden sm:inline">Invitations</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="sm:hidden">
                    Invitations
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant={tab === "danger" ? "destructive" : "outline"}
                        className={cn(
                            "flex w-1/2 flex-row gap-x-3 border-destructive hover:bg-destructive-hover hover:text-destructive-foreground md:w-full",
                            tab === "danger"
                                ? "bg-destructive"
                                : "bg-background",
                        )}
                        onClick={() => setSettingsTab("danger")}
                    >
                        <TriangleAlert />
                        <span className="hidden sm:inline">Danger zone</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="sm:hidden">
                    Danger zone
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
