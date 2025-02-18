"use client";

import { CircleX, UserRoundMinus } from "lucide-react";

import { DeleteOrganisationDialog } from "@/components/organisations/delete-organisation-dialog";
import { LeaveOrganisationDialog } from "@/components/organisations/leave-organisation-dialog";
import { Card, CardContent } from "@/components/ui/card";

const data = {
    id: "2daf6c64-2104-4039-a619-b7477d3882bf",
    name: "Google",
    isUserAdmin: true,
};

interface SettingsPageProps {
    userSlug: string;
}

export default function SettingsPage({} /* userSlug */ : SettingsPageProps) {
    const isUserAdmin: boolean = data.isUserAdmin;

    const getLeaveOrganisationMessage = () => {
        return (
            <span className="text-sm text-muted-foreground">
                You are currently
                {isUserAdmin ? (
                    <span>
                        {" "}
                        an <span className="font-bold">admin</span> of{" "}
                    </span>
                ) : (
                    <span>
                        {" "}
                        a <span className="font-bold">member</span> in{" "}
                    </span>
                )}
                this organisation.
            </span>
        );
    };

    return (
        <Card className="m-6">
            <CardContent className="flex flex-col gap-5 pt-6">
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <div className="flex flex-row items-center space-x-3">
                        <UserRoundMinus className="text-muted-foreground" />
                        <div className="flex flex-col space-y-1">
                            <span>Leave organisation</span>
                            {getLeaveOrganisationMessage()}
                        </div>
                    </div>
                    <LeaveOrganisationDialog id={data.id} name={data.name} />
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
                    <DeleteOrganisationDialog id={data.id} name={data.name} />
                </div>
            </CardContent>
        </Card>
    );
}
