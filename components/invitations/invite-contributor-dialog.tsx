import { useDebounce } from "@/lib/hooks/useDebounce";
import { api } from "@/lib/trpc/react";
import { UserDisplay } from "@/lib/types/user";
import { MailPlus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/components/context/user-context";
import { imgSrc } from "@/lib/client-file-utils";

interface InviteContributorDialogProps {
    repositoryName: string;
}

export const InviteContributorDialog = ({
    repositoryName,
}: InviteContributorDialogProps) => {
    const { user } = useUser();

    const [query, setQuery] = useState<string>("");
    const [selectedUser, setSelectedUser] = useState<UserDisplay | undefined>(
        undefined,
    );
    const [commandOpen, setCommandOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const decodedRepositoryName = decodeURIComponent(repositoryName.trim());

    const debouncedQuery = useDebounce(query, 500);

    const { data: users = [], isFetching } =
        api.user.fulltextSearchUsers.useQuery(
            { query: debouncedQuery },
            {
                enabled: !!debouncedQuery,
                staleTime: 0,
            },
        );

    const inviteMutation = api.user.inviteUserToRepo.useMutation({
        onSuccess: () => {
            toast.success("Invitation sent successfully", {
                description:
                    selectedUser?.username +
                    " has been invited to collaborate on your repository.",
            });

            setDialogOpen(false);
            setSelectedUser(undefined);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleInviteContributor = () => {
        if (!selectedUser) return;
        inviteMutation.mutate({
            userId: selectedUser.id,
            repositoryName: repositoryName,
        });
    };

    return (
        <Dialog
            open={dialogOpen}
            onOpenChange={(isOpen) => {
                setDialogOpen(isOpen);
                if (!isOpen) {
                    setSelectedUser(undefined);
                }
            }}
        >
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="hover:bg-primary-button-hover"
                >
                    <MailPlus />
                    Invite contributor
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Invite a contributor
                    </DialogTitle>
                    <DialogDescription>
                        Please select a user that will get an invite to
                        collaborate on your repository.
                    </DialogDescription>
                </DialogHeader>

                {/* Tlačidlo na otvorenie search dialogu */}
                <Button
                    className="border border-accent bg-transparent py-5 font-normal text-muted-foreground hover:bg-accent"
                    onClick={() => setCommandOpen(true)}
                >
                    {selectedUser ? (
                        <div className="flex flex-row items-center gap-x-3">
                            <AvatarDisplay
                                displayType="select"
                                name={selectedUser.username}
                                image={imgSrc(selectedUser.image)}
                            />
                            {selectedUser.username}
                        </div>
                    ) : (
                        <div className="flex flex-row items-center gap-x-3">
                            <Search className="text-muted-foreground" />
                            Select a user or search...
                        </div>
                    )}
                </Button>

                {/* Search dialog */}
                <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                    <CommandInput
                        placeholder="Search users..."
                        value={query}
                        onValueChange={(value: string) => setQuery(value)}
                    />
                    <ScrollArea className="h-full max-h-60">
                        {isFetching ? (
                            <p className="text-center">Loading...</p>
                        ) : users.length > 0 ? (
                            users.filter((member) => member.id !== user.id).map((member) => {
                                return (
                                    <CommandItem
                                        key={member.id}
                                        value={member.username}
                                        className="cursor-pointer"
                                        onSelect={() => {
                                            setCommandOpen(false);
                                            setSelectedUser(member);
                                        }}
                                    >
                                        <div className="flex flex-row items-center gap-x-3">
                                            <AvatarDisplay
                                                displayType="select"
                                                name={member.username}
                                                image={imgSrc(member.image)}
                                            />
                                            {member.username}
                                        </div>
                                    </CommandItem>
                            )})
                        ) : (
                            <CommandEmpty>No users found.</CommandEmpty>
                        )}
                    </ScrollArea>
                </CommandDialog>

                {/* Info o vybranom užívateľovi */}
                {selectedUser && (
                    <p className="text-center text-sm">
                        You are about to invite
                        <span className="font-bold">
                            {" " + selectedUser.username + " "}
                        </span>
                        to collaborate on your repository
                        <span className="font-bold">
                            {" " + decodedRepositoryName}
                        </span>
                        .
                    </p>
                )}

                <DialogFooter className="justify-center">
                    <Button
                        onClick={handleInviteContributor}
                        className="w-full hover:bg-primary-button-hover"
                        variant="default"
                        disabled={!selectedUser || inviteMutation.isPending}
                    >
                        {inviteMutation.isPending
                            ? "Sending..."
                            : "Send an invitation"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
