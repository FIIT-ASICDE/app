"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { api } from "@/lib/trpc/react";
import { InviteUserTab, OrganisationDisplay } from "@/lib/types/organisation";
import { RepositoryDisplay } from "@/lib/types/repository";
import { UserDisplay } from "@/lib/types/user";
import { Building, Folder, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { InviteUserDialogTabs } from "@/components/users/invite-user-dialog-tabs";

interface InviteUserDialogProps {
    selectedUser: UserDisplay;
    usersOrganisations: Array<OrganisationDisplay>;
    usersRepositories: Array<RepositoryDisplay>;
}

export const InviteUserDialog = ({
    selectedUser,
    usersOrganisations,
    usersRepositories,
}: InviteUserDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const userIsAdminInAnyOrg: boolean = usersOrganisations.length > 0;
    const userHasRepos: boolean = usersRepositories.length > 0;

    const [activeInviteUserTab, setActiveInviteUserTab] =
        useState<InviteUserTab>(
            userIsAdminInAnyOrg
                ? "toOrganisation"
                : userHasRepos
                  ? "onRepository"
                  : "toOrganisation",
        );

    const [selectedOrganisation, setSelectedOrganisation] = useState<
        OrganisationDisplay | undefined
    >(undefined);
    const [selectedRepository, setSelectedRepository] = useState<
        RepositoryDisplay | undefined
    >(undefined);

    const inviteOrgMutation = api.user.inviteUserToOrganization.useMutation({
        onSuccess: () => {
            setOpen(false);
            toast.success("Invitation sent successfully.", {
                description:
                    selectedUser.username +
                    " has been invited to join your organisation.",
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const inviteRepoMutation = api.user.inviteUserToRepo.useMutation({
        onSuccess: () => {
            setOpen(false);
            toast.success("Invitation sent successfully.", {
                description:
                    selectedUser.username +
                    " has been invited to collaborate on your repository.",
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleInviteToOrganisation = () => {
        if (!selectedUser || !selectedOrganisation) return;
        inviteOrgMutation.mutate({
            userId: selectedUser.id,
            organisationName: selectedOrganisation.name,
        });
    };

    const handleInviteToRepository = () => {
        if (!selectedUser || !selectedRepository) return;
        inviteRepoMutation.mutate({
            userId: selectedUser.id,
            repositoryName: selectedRepository.name,
        });
    };

    if (!userIsAdminInAnyOrg && !userHasRepos) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="cursor-not-allowed">
                        <button className="rounded p-1.5 align-middle" disabled>
                            <Mail className="h-5 w-5 text-muted-foreground opacity-50" />
                        </button>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="text-muted-foreground">
                    You cannot send an invite, because you do not have any
                    organisations or repositories.
                </TooltipContent>
            </Tooltip>
        );
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(open: boolean) => {
                setOpen(open);
                if (!open) {
                    setSelectedOrganisation(undefined);
                    setSelectedRepository(undefined);
                }
            }}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <button className="rounded p-1.5 align-middle hover:bg-accent">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="text-muted-foreground">
                    Invite{" "}
                    <span className="font-semibold text-foreground">
                        {selectedUser.username}
                    </span>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Invite a user
                    </DialogTitle>
                    <DialogDescription>
                        Here you can either invite{" "}
                        <span className="font-bold">
                            {selectedUser.username}
                        </span>{" "}
                        to join your organisation or to collaborate on your
                        repository.
                    </DialogDescription>
                </DialogHeader>

                <InviteUserDialogTabs
                    activeInviteUserTab={activeInviteUserTab}
                    setActiveInviteUserTab={setActiveInviteUserTab}
                    usersOrganisations={usersOrganisations}
                    usersRepositories={usersRepositories}
                    setSelectedOrganisation={setSelectedOrganisation}
                    setSelectedRepository={setSelectedRepository}
                />

                {activeInviteUserTab === "toOrganisation" && (
                    <>
                        <Select
                            onValueChange={(organisationId: string) =>
                                setSelectedOrganisation(
                                    usersOrganisations.find(
                                        (organisation: OrganisationDisplay) =>
                                            organisation.id === organisationId,
                                    ),
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select an organisation" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="text-muted-foreground">
                                        Your organisations
                                    </SelectLabel>
                                    {usersOrganisations.map(
                                        (
                                            usersOrganisation: OrganisationDisplay,
                                        ) => (
                                            <SelectItem
                                                key={usersOrganisation.id}
                                                value={usersOrganisation.id}
                                                className="cursor-pointer hover:bg-accent"
                                            >
                                                <div className="flex flex-row items-center space-x-3">
                                                    <AvatarDisplay
                                                        displayType={"select"}
                                                        image={imgSrc(
                                                            usersOrganisation.image,
                                                        )}
                                                        name={
                                                            usersOrganisation.name
                                                        }
                                                    />
                                                    <span>
                                                        {usersOrganisation.name}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {selectedOrganisation && (
                            <div className="mx-5 mb-1 text-center">
                                You are about to send
                                <span className="font-bold">
                                    {" " + selectedUser.username + " "}
                                </span>
                                an invitation to join your organisation called
                                <span className="font-bold">
                                    {" " + selectedOrganisation.name}
                                </span>
                                .
                            </div>
                        )}
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleInviteToOrganisation}
                                className="w-full hover:bg-primary-button-hover"
                                variant="default"
                                disabled={
                                    inviteOrgMutation.isPending ||
                                    selectedOrganisation === undefined
                                }
                            >
                                {inviteOrgMutation.isPending ? (
                                    <Loader2 />
                                ) : (
                                    <>
                                        <Building />
                                        Invite
                                    </>
                                )}
                            </Button>
                        </DialogTrigger>
                    </>
                )}
                {activeInviteUserTab === "onRepository" && (
                    <>
                        <Select
                            onValueChange={(repositoryId: string) =>
                                setSelectedRepository(
                                    usersRepositories.find(
                                        (repository: RepositoryDisplay) =>
                                            repository.id === repositoryId,
                                    ),
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a repository" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="text-muted-foreground">
                                        Your repositories
                                    </SelectLabel>
                                    {usersRepositories.map(
                                        (
                                            usersRepository: RepositoryDisplay,
                                        ) => (
                                            <SelectItem
                                                key={usersRepository.id}
                                                value={usersRepository.id}
                                                className="cursor-pointer hover:bg-accent"
                                            >
                                                <div className="flex flex-row items-center space-x-3">
                                                    <AvatarDisplay
                                                        displayType={"select"}
                                                        image={imgSrc(
                                                            usersRepository.ownerImage,
                                                        )}
                                                        name={
                                                            usersRepository.ownerName
                                                        }
                                                    />
                                                    <span>
                                                        {usersRepository.ownerName +
                                                            "/" +
                                                            usersRepository.name}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {selectedRepository && (
                            <div className="mx-5 mb-1 text-center">
                                You are about to send
                                <span className="font-bold">
                                    {" " + selectedUser.username + " "}
                                </span>
                                an invitation to collaborate on your repository
                                called
                                <span className="font-bold">
                                    {" " +
                                        selectedRepository.ownerName +
                                        "/" +
                                        selectedRepository.name}
                                </span>
                                .
                            </div>
                        )}
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleInviteToRepository}
                                className="w-full hover:bg-primary-button-hover"
                                variant="default"
                                disabled={
                                    inviteRepoMutation.isPending ||
                                    selectedRepository === undefined
                                }
                            >
                                {inviteRepoMutation.isPending ? (
                                    <Loader2 />
                                ) : (
                                    <>
                                        <Folder />
                                        Invite
                                    </>
                                )}
                            </Button>
                        </DialogTrigger>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
