import { Search, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserDisplay } from "@/lib/types/user";
import { useState } from "react";
import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

const data = {
    organisationId: "1",
    organisationName: "Google",
    possibleMembers: [
        {
            id: "1",
            username: "johndoe1",
            image: "/avatars/avatar1.png"
        } satisfies UserDisplay,
        {
            id: "2",
            username: "johndoe2",
            image: "/avatars/avatar2.png"
        } satisfies UserDisplay,
        {
            id: "3",
            username: "johndoe3",
            image: "/avatars/avatar3.png"
        } satisfies UserDisplay,
        {
            id: "4",
            username: "johndoe4",
            image: "/avatars/avatar4.png"
        } satisfies UserDisplay,
        {
            id: "5",
            username: "johndoe5",
            image: "/avatars/avatar5.png"
        } satisfies UserDisplay,
        {
            id: "6",
            username: "johndoe6",
            image: "/avatars/avatar6.png"
        } satisfies UserDisplay,
        {
            id: "7",
            username: "johndoe7",
            image: "/avatars/avatar5.png"
        } satisfies UserDisplay,
        {
            id: "8",
            username: "johndoe8",
            image: "/avatars/avatar4.png"
        } satisfies UserDisplay,
        {
            id: "9",
            username: "johndoe9",
            image: "/avatars/avatar3.png"
        } satisfies UserDisplay,
        {
            id: "10",
            username: "johndoe10",
            image: "/avatars/avatar2.png"
        } satisfies UserDisplay,
    ] satisfies Array<UserDisplay>
};

export const InviteMemberDialog = () => {
    const [selectedUser, setSelectedUser] = useState<UserDisplay>();
    const [commandOpen, setCommandOpen] = useState<boolean>(false);

    const handleInviteMember = () => {
        console.log(
            "User " + selectedUser?.username +
            " with ID: " + selectedUser?.id +
            " has been invited to organisation " + data.organisationName +
            " with ID: "+ data.organisationId
        );

        setSelectedUser(undefined);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="hover:bg-primary-button-hover"
                >
                    <UserRoundPlus />
                    Invite member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Invite a member
                    </DialogTitle>
                    <DialogDescription>
                        Please select a member that will get an invite to your organisation.
                    </DialogDescription>
                </DialogHeader>

                <Button
                    className="hover:bg-accent border-accent border bg-transparent font-normal text-muted-foreground py-5"
                    onClick={() => setCommandOpen(true)}
                >
                    {selectedUser ? (
                        <div className="flex flex-row items-center gap-x-3">
                            <AvatarDisplay
                                displayType="select"
                                name={selectedUser.username}
                                image={selectedUser.image}
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

                <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                    <CommandInput placeholder="Select a user or search..." />
                    <ScrollArea className="h-full max-h-60">
                        <CommandEmpty>No users found.</CommandEmpty>
                        {data.possibleMembers.map((member: UserDisplay) => (
                            <CommandItem
                                key={member.id}
                                className="cursor-pointer"
                                onSelect={() => {
                                    setCommandOpen(false);
                                    setSelectedUser(member);
                                }}
                            >
                                <div className="flex flex-row gap-x-3 items-center">
                                    <AvatarDisplay
                                        displayType="select"
                                        name={member.username}
                                        image={member.image}
                                    />
                                    {member.username}
                                </div>
                            </CommandItem>
                        ))}
                    </ScrollArea>
                </CommandDialog>

                {selectedUser && (
                    <p className="text-sm text-center">
                        You are about to invite
                        <span className="font-bold">{" " + selectedUser.username + " "}</span>
                        to {data.organisationName}.
                    </p>
                )}

                <DialogFooter className="justify-center">
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => handleInviteMember()}
                            className="w-full hover:bg-primary-button-hover"
                            variant="default"
                            disabled={!selectedUser}
                        >
                            <UserRoundPlus />
                            Send an invitation
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
