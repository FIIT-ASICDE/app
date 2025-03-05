"use client";

import { OrganisationDisplay } from "@/lib/types/organisation";
import { UserDisplay } from "@/lib/types/user";
import { Search, UserRoundMinus } from "lucide-react";
import { useState } from "react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { useUser } from "@/components/context/user-context";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeaveOrganisationDialogProps {
    organisation: OrganisationDisplay;
    isUserOnlyAdmin: boolean;
    possibleAdmins?: Array<UserDisplay>;
}

export const LeaveOrganisationDialog = ({
    organisation,
    isUserOnlyAdmin,
    possibleAdmins,
}: LeaveOrganisationDialogProps) => {
    const { user } = useUser();

    const [leaveOrganisationInput, setLeaveOrganisationInput] =
        useState<string>("");

    const leaveOrganisationPhrase: string = organisation.name;

    const [commandOpen, setCommandOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserDisplay>();

    const handleLeaveOrganisation = () => {
        /* TODO: handle leave organisation, also set new selected admin if user was the only admin */
        console.log(
            "User with ID: " +
                user.id +
                " left an organisation called: " +
                organisation.name +
                " with ID: " +
                organisation.id,
        );
        console.log("IsUserOnlyAdmin: " + isUserOnlyAdmin);
        console.log("Newly selected admin: " + selectedUser);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="w-60 hover:bg-destructive-hover"
                >
                    <UserRoundMinus />
                    Leave organisation
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Leave this organisation
                    </DialogTitle>
                    <DialogDescription>
                        You are about to leave your organisation called
                        <span className="font-bold"> {organisation.name}</span>.
                    </DialogDescription>
                </DialogHeader>
                {isUserOnlyAdmin && possibleAdmins !== undefined && (
                    <div className="flex flex-col space-y-3">
                        <span>
                            Since you are the only admin, please choose another
                            member that will get promoted to an admin after you
                            leave this organisation.
                        </span>
                        <Button
                            className="border border-accent bg-transparent py-5 font-normal text-muted-foreground hover:bg-accent"
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

                        <CommandDialog
                            open={commandOpen}
                            onOpenChange={setCommandOpen}
                        >
                            <CommandInput placeholder="Select a user or search..." />
                            <ScrollArea className="h-full max-h-60">
                                <CommandEmpty>No users found.</CommandEmpty>
                                {possibleAdmins.map((member: UserDisplay) => (
                                    <CommandItem
                                        key={member.id}
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
                                                image={member.image}
                                            />
                                            {member.username}
                                        </div>
                                    </CommandItem>
                                ))}
                            </ScrollArea>
                        </CommandDialog>
                    </div>
                )}
                <span>
                    To confirm this action, type{" "}
                    <span className="no-select font-bold text-destructive">
                        {leaveOrganisationPhrase}
                    </span>
                </span>
                <Input
                    type="text"
                    placeholder={leaveOrganisationPhrase}
                    value={leaveOrganisationInput}
                    onChange={(e) => setLeaveOrganisationInput(e.target.value)}
                />
                <DialogFooter className="justify-center">
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => handleLeaveOrganisation()}
                            className="w-full hover:bg-destructive-hover"
                            variant="destructive"
                            disabled={
                                leaveOrganisationInput !==
                                    leaveOrganisationPhrase ||
                                selectedUser === undefined
                            }
                        >
                            <UserRoundMinus />
                            Leave
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
