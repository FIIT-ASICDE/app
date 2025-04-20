"use client";

import { UserSettingsTab } from "@/lib/types/user";
import { CircleUserRound, CircleX, LogOut, Settings2, TriangleAlert } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";



import { useUser } from "@/components/context/user-context";
import { DeleteAccountDialog } from "@/components/profile/delete-account-dialog";
import { ThemeIcon } from "@/components/profile/theme-icon";
import { UserSettingsTabs } from "@/components/profile/user-settings-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactElement } from "react";


interface SettingsPageProps {
    userSlug: string;
    tab: UserSettingsTab;
}

/**
 * Settings page for user profile
 *
 * @param {SettingsPageProps} props - Component props
 * @returns {ReactElement} Settings page component
 */
export default function SettingsPage({
    userSlug, 
    tab 
}: SettingsPageProps): ReactElement {
    const { user } = useUser();
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    if (userSlug !== user.username) {
        router.back();
        return <></>;
    }

    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="w-full md:w-1/5">
                <UserSettingsTabs tab={tab} />
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-4/5">
                {tab === "account" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center gap-3">
                                <CircleUserRound />
                                Account
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                                <div className="flex flex-row items-center space-x-3">
                                    <LogOut className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>Log out</span>
                                        {user && (
                                            <span className="text-sm text-muted-foreground">
                                                You are currently logged in as
                                                <span className="font-bold">
                                                    {" "}
                                                    {user.username}
                                                </span>
                                                .
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    variant="default"
                                    className="w-60 hover:bg-primary-button-hover"
                                    onClick={() => signOut({ redirectTo: "/" })}
                                >
                                    <LogOut />
                                    Log out
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {tab === "preferences" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center gap-3">
                                <Settings2 />
                                Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                                <div className="flex flex-row items-center space-x-3">
                                    <ThemeIcon
                                        theme={theme}
                                        className="text-muted-foreground"
                                    />
                                    <div className="flex flex-col space-y-1">
                                        <span>Theme</span>
                                        <span className="text-sm text-muted-foreground">
                                            You are currently using
                                            <span className="font-bold">
                                                {" " + theme + " "}
                                            </span>
                                            theme.
                                        </span>
                                    </div>
                                </div>
                                <Tooltip>
                                    <TooltipTrigger
                                        asChild
                                        className="px-4 py-2"
                                    >
                                        <div className="flex flex-row items-center justify-center space-x-3">
                                            <ThemeIcon
                                                theme={"light"}
                                                className="text-muted-foreground"
                                                filled={theme === "light"}
                                            />

                                            <Switch
                                                checked={theme === "dark"}
                                                onCheckedChange={() =>
                                                    theme === "light"
                                                        ? setTheme("dark")
                                                        : setTheme("light")
                                                }
                                            />
                                            <ThemeIcon
                                                theme={"dark"}
                                                className="text-muted-foreground"
                                                filled={theme === "dark"}
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Toggle theme
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {tab === "danger" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center gap-3">
                                <TriangleAlert />
                                Danger zone
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                                <div className="flex flex-row items-center space-x-3">
                                    <CircleX className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>Delete account</span>
                                        <span className="text-sm text-muted-foreground">
                                            Your account is currently active.
                                        </span>
                                    </div>
                                </div>
                                <DeleteAccountDialog />
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
