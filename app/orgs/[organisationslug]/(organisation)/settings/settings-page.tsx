"use client";

import type { Invitation } from "@/lib/types/invitation";
import type {
    InvitationsTab,
    OrganisationDisplay,
    OrganisationSettingsTab,
    OrganizationSettings,
} from "@/lib/types/organisation";
import { UserDisplay } from "@/lib/types/user";
import {
    BookUser,
    CircleX,
    Eye,
    EyeOff,
    Mail,
    MailX,
    TriangleAlert,
    UserRoundMinus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

import { NoData } from "@/components/generic/no-data";
import { InvitationCard } from "@/components/invitations/invitation-card";
import { InvitationsTabs } from "@/components/invitations/invitations-tabs";
import { DeleteOrganisationDialog } from "@/components/organisations/delete-organisation-dialog";
import { LeaveOrganisationDialog } from "@/components/organisations/leave-organisation-dialog";
import { ToggleMembersVisibilityDialog } from "@/components/organisations/members/toggle-members-visibility-dialog";
import { OrganisationSettingsTabs } from "@/components/organisations/organisation-settings-tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface SettingsPageProps {
    settings: OrganizationSettings;
    tab: OrganisationSettingsTab;
}

/**
 * Settings page for organisation profile
 *
 * @param {SettingsPageProps} props - Component props
 * @returns {ReactElement} Settings page component
 */
export default function SettingsPage({
    tab,
    settings,
}: SettingsPageProps): ReactElement {
    const router = useRouter();
    const organisation: OrganisationDisplay = settings.org;
    const isUserAdmin: boolean | undefined = settings.isUserAdmin;
    const isUserOnlyAdmin: boolean | undefined = settings.isUserOnlyAdmin;
    const possibleAdmins: Array<UserDisplay> = settings.possibleAdmins;

    const pendingInvitations: Array<Invitation> = settings.pendingInvitations;
    const acceptedInvitations: Array<Invitation> = settings.acceptedInvitations;
    const declinedInvitations: Array<Invitation> = settings.declinedInvitations;

    const [invitationsTab, setInvitationsTab] =
        useState<InvitationsTab>("pending");

    const getChangeMembersVisibilityMessage = () => {
        return (
            <span className="text-sm text-muted-foreground">
                You are currently{" "}
                <span className="font-bold">
                    {organisation.showMembers ? "showing" : "hiding"}
                </span>{" "}
                the members of your organisation{" "}
                {organisation.showMembers ? "to" : "from"} the public.
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
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="w-full md:w-1/5">
                <OrganisationSettingsTabs tab={tab} />
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-4/5">
                {tab === "general" && (
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
                                    {organisation.showMembers ? (
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
                                    organisation={organisation}
                                    afterToggleAction={router.refresh}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {tab === "invitations" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center gap-3">
                                <Mail />
                                Invitations
                            </CardTitle>
                            <CardDescription>
                                {invitationsTab === "pending"
                                    ? "Invitations to join your organisation that are waiting to be answered."
                                    : invitationsTab === "accepted"
                                      ? "Invitations to join your organisation that have been successfully accepted."
                                      : "Invitations to join your organisation that have been declined."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <InvitationsTabs
                                tab={invitationsTab}
                                setTabAction={setInvitationsTab}
                            />
                            {invitationsTab === "pending" && (
                                <div>
                                    {pendingInvitations.length === 0 ? (
                                        <NoData
                                            icon={MailX}
                                            message={
                                                "No pending invitations found."
                                            }
                                            className="m-6"
                                        />
                                    ) : (
                                        <>
                                            <div className="flex flex-col gap-3">
                                                {pendingInvitations.map(
                                                    (
                                                        invitation: Invitation,
                                                    ) => (
                                                        <div
                                                            key={invitation.id}
                                                        >
                                                            <InvitationCard
                                                                invitation={
                                                                    invitation
                                                                }
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {invitationsTab === "accepted" && (
                                <div>
                                    {acceptedInvitations.length === 0 ? (
                                        <NoData
                                            icon={MailX}
                                            message={
                                                "No accepted invitations found."
                                            }
                                            className="m-6"
                                        />
                                    ) : (
                                        <>
                                            <div className="flex flex-col gap-3">
                                                {acceptedInvitations.map(
                                                    (
                                                        invitation: Invitation,
                                                    ) => (
                                                        <InvitationCard
                                                            key={invitation.id}
                                                            invitation={
                                                                invitation
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {invitationsTab === "declined" && (
                                <div>
                                    {declinedInvitations.length === 0 ? (
                                        <NoData
                                            icon={MailX}
                                            message={
                                                "No declined invitations found."
                                            }
                                            className="m-6"
                                        />
                                    ) : (
                                        <>
                                            <div className="flex flex-col gap-3">
                                                {declinedInvitations.map(
                                                    (
                                                        invitation: Invitation,
                                                    ) => (
                                                        <InvitationCard
                                                            key={invitation.id}
                                                            invitation={
                                                                invitation
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
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
                                    <UserRoundMinus className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>Leave organisation</span>
                                        {getLeaveOrganisationMessage()}
                                    </div>
                                </div>
                                <LeaveOrganisationDialog
                                    organisation={organisation}
                                    isUserOnlyAdmin={isUserOnlyAdmin}
                                    possibleAdmins={possibleAdmins}
                                />
                            </div>

                            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                                <div className="flex flex-row items-center space-x-3">
                                    <CircleX className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>Delete organisation</span>
                                        <span className="text-sm text-muted-foreground">
                                            This organisation is currently
                                            active.
                                        </span>
                                    </div>
                                </div>
                                <DeleteOrganisationDialog
                                    organisation={organisation}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
