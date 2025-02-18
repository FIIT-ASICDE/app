"use client";

import { CircleX, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { useUser } from "@/components/context/user-context";
import { DeleteAccountDialog } from "@/components/profile/delete-account-dialog";
import { ThemeIcon } from "@/components/profile/theme-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface SettingsPageProps {
    userSlug: string;
}

export default function SettingsPage({ userSlug }: SettingsPageProps) {
    const { user } = useUser();
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    if (userSlug !== user.username) {
        router.back();
        return;
    }

    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="flex w-full flex-col gap-y-3 md:w-1/5">
                <Card>
                    <CardContent className="flex w-full flex-row gap-3 pt-6 md:flex-col">
                        <Button variant="outline" className="w-1/2 md:w-auto">
                            Account
                        </Button>
                        <Button variant="outline" className="w-1/2 md:w-auto">
                            Preferences
                        </Button>
                    </CardContent>
                </Card>
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-4/5">
                <Card>
                    <CardContent className="flex flex-col gap-5 pt-6">
                        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                            <div className="flex flex-row items-center space-x-3">
                                <ThemeIcon
                                    theme={theme}
                                    className="text-muted-foreground"
                                />
                                <div className="flex flex-col space-y-1">
                                    <span>Change theme</span>
                                    <span className="text-sm text-muted-foreground">
                                        You are currently using
                                        <span className="font-bold">
                                            {" "}
                                            {theme}{" "}
                                        </span>
                                        theme.
                                    </span>
                                </div>
                            </div>
                            <div className="flex w-60 flex-row items-center justify-center space-x-3">
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
                        </div>

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
                                variant="destructive"
                                className="w-60 hover:bg-destructive-hover"
                                onClick={() => signOut({ redirectTo: "/" })}
                            >
                                <LogOut />
                                Log out
                            </Button>
                        </div>

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
            </main>
        </div>
    );
}
