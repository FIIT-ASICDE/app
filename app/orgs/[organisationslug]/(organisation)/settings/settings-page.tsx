"use client";

import { CircleX, Eye, EyeOff, UserRoundMinus } from "lucide-react";

import { DeleteOrganisationDialog } from "@/components/organisations/delete-organisation-dialog";
import { LeaveOrganisationDialog } from "@/components/organisations/leave-organisation-dialog";
import { ToggleMembersVisibilityDialog } from "@/components/organisations/members/toggle-members-visibility-dialog";
import { Card, CardContent } from "@/components/ui/card";

const data = {
    id: "2daf6c64-2104-4039-a619-b7477d3882bf",
    name: "Google",
    showMembers: true,
    isUserAdmin: true,
};

interface SettingsPageProps {
    orgSlug: string;
}

export default function SettingsPage({} /* orgSlug */ : SettingsPageProps) {
    const id: string = data.id;
    const name: string = data.name;
    const showMembers = data.showMembers;
    const isUserAdmin: boolean = data.isUserAdmin;

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
                        {" "}
                        an <span className="font-bold">admin</span>{" "}
                    </span>
                ) : (
                    <span>
                        {" "}
                        a <span className="font-bold">member</span>{" "}
                    </span>
                )}
                of this organisation.
            </span>
        );
    };

    return (
        <Card className="m-6">
            <CardContent className="flex flex-col gap-5 pt-6">
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

                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <div className="flex flex-row items-center space-x-3">
                        <UserRoundMinus className="text-muted-foreground" />
                        <div className="flex flex-col space-y-1">
                            <span>Leave organisation</span>
                            {getLeaveOrganisationMessage()}
                        </div>
                    </div>
                    <LeaveOrganisationDialog id={id} name={name} />
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
    );
}
