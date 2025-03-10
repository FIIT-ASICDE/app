"use client";

import type {
    Invitation,
    InvitationStatus,
    InvitationType,
} from "@/lib/types/invitation";
import { InvitationsTab } from "@/lib/types/organisation";
import type {
    Repository,
    RepositorySettings,
    RepositorySettingsTab,
} from "@/lib/types/repository";
import type { UserDisplay } from "@/lib/types/user";
import {
    CircleX,
    Eye,
    Folder,
    Mail,
    MailX,
    SquareArrowRight,
    TriangleAlert,
    UsersRound,
} from "lucide-react";
import { useState } from "react";

import { useUser } from "@/components/context/user-context";
import { NoData } from "@/components/no-data/no-data";
import { InvitationsTabs } from "@/components/organisations/invitations-tabs";
import { InvitationCard } from "@/components/profile/invitation-card";
import { ChangeVisibilityDialog } from "@/components/repositories/change-visibility-dialog";
import { ContributorCard } from "@/components/repositories/contributor-card";
import { DeleteRepositoryDialog } from "@/components/repositories/delete-repository-dialog";
import { InviteContributorDialog } from "@/components/repositories/invite-contributor-dialog";
import { RepositorySettingsTabs } from "@/components/repositories/repository-settings-tabs";
import { TransferOwnershipDialog } from "@/components/repositories/transfer-ownership-dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SettingsPageProps {
    settings: RepositorySettings;
    tab: RepositorySettingsTab;
}

export default function SettingsPage({ settings, tab }: SettingsPageProps) {
    const { user } = useUser();

    const repository: Repository = settings.repository;
    const pendingInvitations: Array<Invitation> = settings.pendingInvitations;
    const acceptedInvitations: Array<Invitation> = settings.acceptedInvitations;
    const declinedInvitations: Array<Invitation> = settings.declinedInvitations;

    const [invitationsTab, setInvitationsTab] =
        useState<InvitationsTab>("pending");

    const getRepositoryVisibilityMessage = () => {
        return (
            <span className="text-sm text-muted-foreground">
                This repository is currently{" "}
                <span className="font-bold">{repository.visibility}</span>.
            </span>
        );
    };

    const getRepositoryOwnershipMessage = () => {
        return (
            <span className="text-sm text-muted-foreground">
                This repository currently belongs to{" "}
                <span className="font-bold">
                    {user.id === repository.ownerId
                        ? "you"
                        : repository.ownerName}
                </span>
                .
            </span>
        );
    };

    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="w-full md:w-1/5">
                <RepositorySettingsTabs tab={tab} />
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-4/5">
                {tab === "general" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center gap-3">
                                <Folder />
                                General
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                                <div className="flex flex-row items-center space-x-3">
                                    <Eye className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>
                                            Change repository visibility
                                        </span>
                                        {getRepositoryVisibilityMessage()}
                                    </div>
                                </div>
                                <ChangeVisibilityDialog
                                    repository={repository}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {tab === "contributors" && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center gap-3">
                                <UsersRound />
                                Contributors
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <ContributorCard
                                contributor={{
                                    id: user.id,
                                    username: user.username,
                                    image: user.image,
                                }}
                                repositoryId={repository.id}
                                isItMe={true}
                            />
                            {repository.contributors &&
                                repository.contributors.map(
                                    (contributor: UserDisplay) => (
                                        <ContributorCard
                                            key={contributor.id}
                                            contributor={contributor}
                                            repositoryId={repository.id}
                                            isItMe={contributor.id === user.id}
                                        />
                                    ),
                                )}

                            <Separator className="w-auto border-accent px-6" />

                            <div className="flex flex-row items-center justify-between gap-x-3">
                                {repository.contributors ? (
                                    <p className="text-sm text-muted-foreground">
                                        You and {repository.contributors.length}{" "}
                                        other user
                                        {repository.contributors.length > 1 &&
                                            "s"}{" "}
                                        can contribute to this repository.
                                    </p>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        You are the only contributor on this
                                        repository.
                                    </p>
                                )}

                                <InviteContributorDialog
                                    repositoryName={repository.name}
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
                                    ? "Invitations to collaborate on your repository that are waiting to be answered."
                                    : invitationsTab === "accepted"
                                      ? "Invitations to collaborate on your repository that have been successfully accepted."
                                      : "Invitations to collaborate on your repository that have been declined."}
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

                            {invitationsTab === "accepted" && (
                                <div>
                                    {pendingInvitations.length === 0 ? (
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
                                    {pendingInvitations.length === 0 ? (
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
                                    <SquareArrowRight className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>
                                            Transfer repository ownership
                                        </span>
                                        {getRepositoryOwnershipMessage()}
                                    </div>
                                </div>
                                <TransferOwnershipDialog
                                    repository={repository}
                                />
                            </div>

                            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                                <div className="flex flex-row items-center space-x-3">
                                    <CircleX className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>Delete repository</span>
                                        <span className="text-sm text-muted-foreground">
                                            This repository is currently active.
                                        </span>
                                    </div>
                                </div>
                                <DeleteRepositoryDialog
                                    repository={repository}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
