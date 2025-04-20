"use client";

import { UserSettingsTab } from "@/lib/types/user";
import { cn } from "@/lib/utils";
import { CircleUserRound, Settings2, TriangleAlert } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement } from "react";

import { Button } from "@/components/ui/button";

interface UserSettingsTabsProps {
    tab: UserSettingsTab;
}

/**
 * Tabs component used on the settings part of the user profile page
 *
 * @param {UserSettingsTabsProps} props - Component props
 * @returns {ReactElement} Tabs component
 */
export const UserSettingsTabs = ({
    tab,
}: UserSettingsTabsProps): ReactElement => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const setSettingsTab = (newTab: UserSettingsTab) => {
        const params = new URLSearchParams(searchParams);
        switch (newTab) {
            case "account":
                params.delete("tab");
                break;
            case "preferences":
                params.set("tab", "preferences");
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
            <Button
                variant={tab === "account" ? "secondary" : "outline"}
                className="flex w-1/2 flex-row gap-x-3 md:w-full"
                onClick={() => setSettingsTab("account")}
            >
                <CircleUserRound />
                Account
            </Button>
            <Button
                variant={tab === "preferences" ? "secondary" : "outline"}
                className="flex w-1/2 flex-row gap-x-3 md:w-full"
                onClick={() => setSettingsTab("preferences")}
            >
                <Settings2 />
                Preferences
            </Button>
            <Button
                variant={tab === "danger" ? "destructive" : "outline"}
                className={cn(
                    "flex w-1/2 flex-row gap-x-3 border-destructive hover:bg-destructive-hover md:w-full",
                    tab === "danger" ? "bg-destructive" : "bg-background",
                )}
                onClick={() => setSettingsTab("danger")}
            >
                <TriangleAlert />
                Danger zone
            </Button>
        </div>
    );
};
