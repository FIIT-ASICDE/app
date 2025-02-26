"use client";

import {
    BookUser,
    CircleX,
    Eye,
    EyeOff,
    TriangleAlert,
    UserRoundMinus
} from "lucide-react";

import { DeleteOrganisationDialog } from "@/components/organisations/delete-organisation-dialog";
import { LeaveOrganisationDialog } from "@/components/organisations/leave-organisation-dialog";
import { ToggleMembersVisibilityDialog } from "@/components/organisations/members/toggle-members-visibility-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { OrganisationSettingsTab } from "@/lib/types/organisation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserDisplay } from "@/lib/types/user";

const data = {
    id: "2daf6c64-2104-4039-a619-b7477d3882bf",
    name: "Google",
    showMembers: true,
    isUserAdmin: true,
    isUserOnlyAdmin: true,
    possibleAdmins: [
        {
            id: "1",
            username: "jozko"
        } satisfies UserDisplay
    ] satisfies Array<UserDisplay>
};

interface SettingsPageProps {
    orgSlug: string;
}

export default function SettingsPage({/* orgSlug */} : SettingsPageProps) {
    const id: string = data.id;
    const name: string = data.name;
    const showMembers = data.showMembers;
    const isUserAdmin: boolean = data.isUserAdmin;
    const isUserOnlyAdmin: boolean = data.isUserOnlyAdmin;
    const possibleAdmins: Array<UserDisplay> = data.possibleAdmins;

    const [activeSettingsTab, setActiveSettingsTab] = useState<OrganisationSettingsTab>("general");

    const getChangeMembersVisibilityMessage = () => {
        return (
            <span className="text-sm text-muted-foreground">
                You are currently{" "}
                <span className="font-bold">
                    {showMembers ? "showing" : "hiding"}
                </span>{" "}
                the members of your organisation {showMembers ? "to" : "from"}{" "}
                the public.
            </span>
        );
    };

    const getLeaveOrganisationMessage = () => {
        return (
            <span className="text-sm text-muted-foreground">
                You are currently
                {isUserAdmin ? (
                    <span>
                        {" "}an <span className="font-bold">admin</span>{" "}
                    </span>
                ) : (
                    <span>
                        {" "}a <span className="font-bold">member</span>{" "}
                    </span>
                )}
                of this organisation.
            </span>
        );
    };

    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="w-full md:w-1/5">
                <div className="flex w-full flex-row gap-3 md:flex-col">
                    <Button
                        variant={
                            activeSettingsTab === "general"
                                ? "secondary"
                                : "outline"
                        }
                        className="flex w-1/2 flex-row gap-x-3 md:w-full"
                        onClick={() => setActiveSettingsTab("general")}
                    >
                        <BookUser />
                        General
                    </Button>
                    <Button
                        variant={
                            activeSettingsTab === "danger"
                                ? "destructive"
                                : "outline"
                        }
                        className={cn(
                            "flex w-1/2 flex-row gap-x-3 border-destructive hover:bg-destructive-hover md:w-full",
                            activeSettingsTab === "danger"
                                ? "bg-destructive"
                                : "bg-background",
                        )}
                        onClick={() => setActiveSettingsTab("danger")}
                    >
                        <TriangleAlert />
                        Danger zone
                    </Button>
                </div>
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-4/5">
                {activeSettingsTab === "general" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center gap-3">
                                <BookUser />
                                General
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                                <div className="flex flex-row items-center space-x-3">
                                    {showMembers ? (
                                        <Eye className="text-muted-foreground" />
                                    ) : (
                                        <EyeOff className="text-muted-foreground" />
                                    )}
                                    <div className="flex flex-col space-y-1">
                                        <span>Change members visibility</span>
                                        {getChangeMembersVisibilityMessage()}
                                    </div>
                                </div>
                                <ToggleMembersVisibilityDialog
                                    id={id}
                                    name={name}
                                    showMembers={showMembers}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeSettingsTab === "danger" && (
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
                                    <UserRoundMinus className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>Leave organisation</span>
                                        {getLeaveOrganisationMessage()}
                                    </div>
                                </div>
                                <LeaveOrganisationDialog id={id} name={name} isUserOnlyAdmin={isUserOnlyAdmin} possibleAdmins={possibleAdmins} />
                            </div>

                            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                                <div className="flex flex-row items-center space-x-3">
                                    <CircleX className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>Delete organisation</span>
                                        <span className="text-sm text-muted-foreground">
                                            This organisation is currently active.
                                        </span>
                                    </div>
                                </div>
                                <DeleteOrganisationDialog id={id} name={name} />
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
