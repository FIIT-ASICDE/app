import { imgSrc } from "@/lib/client-file-utils";
import { api } from "@/lib/trpc/react";
import { Repository } from "@/lib/types/repository";
import { SquareArrowRight } from "lucide-react";
import { useState } from "react";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { useUser } from "@/components/context/user-context";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TransferOwnershipDialogProps {
    repository: Repository;
}

export const TransferOwnershipDialog = ({
    repository,
}: TransferOwnershipDialogProps) => {
    const { user } = useUser();
    const userIsOwner: boolean | null = user && user.id === repository.ownerId;

    const usersOrganisations = api.org.userOrgs.useQuery({
        usersId: user.id,
        role: "ADMIN",
    });

    const [newOwnerId, setNewOwnerId] = useState<string>("");

    const getNewOwnerData = () => {
        if (usersOrganisations) {
            const usersOrganisation = usersOrganisations.data?.find(
                (item) => item.id === newOwnerId,
            );
            if (usersOrganisation) {
                return {
                    name: usersOrganisation.name,
                    image: usersOrganisation.image,
                };
            }
        }
    };

    const handleTransferOwnership = () => {
        const newOwnerData = getNewOwnerData();

        if (newOwnerData !== undefined) {
            /* TODO: handle repository ownership transfer */
            console.log(
                "Transfer ownership of repository " +
                    repository.name +
                    " from " +
                    repository.ownerName +
                    " to " +
                    newOwnerData.name,
            );
        }
    };

    const getTransferOwnershipMessage = () => {
        if (newOwnerId === "" || newOwnerId === repository.ownerId) {
            return <></>;
        }

        const newOwnerData = getNewOwnerData();
        if (newOwnerData) {
            return (
                <p>
                    The ownership of this repository will be transferred from
                    <span className="font-bold"> {repository.ownerName} </span>
                    to
                    <span className="font-bold"> {newOwnerData.name}</span>.
                </p>
            );
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="w-60 hover:bg-destructive-hover"
                >
                    <SquareArrowRight />
                    Transfer ownership
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Transfer ownership
                    </DialogTitle>
                    <DialogDescription>
                        You are about to transfer ownership of your repository{" "}
                        <span className="font-bold">{repository.name}</span>.
                    </DialogDescription>
                </DialogHeader>
                <span>
                    To confirm this action, please select an organisation that
                    you are a part of.
                </span>
                <Select
                    onValueChange={(newOwnerId) => setNewOwnerId(newOwnerId)}
                    defaultValue={repository.ownerId}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {!userIsOwner && user ? (
                            <>
                                <SelectGroup>
                                    <SelectLabel>Current owner</SelectLabel>
                                    <SelectItem
                                        key={repository.ownerId}
                                        value={repository.ownerId}
                                        className="cursor-pointer hover:bg-accent"
                                    >
                                        <div className="flex flex-row items-center space-x-3">
                                            <AvatarDisplay
                                                displayType={"select"}
                                                image={imgSrc(
                                                    repository.ownerImage,
                                                )}
                                                name={repository.ownerName}
                                            />
                                            <span>{repository.ownerName}</span>
                                        </div>
                                    </SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>You</SelectLabel>
                                    <SelectItem
                                        key={user.id}
                                        value={user.id}
                                        className="cursor-pointer hover:bg-accent"
                                    >
                                        <div className="flex flex-row items-center space-x-3">
                                            <AvatarDisplay
                                                displayType={"select"}
                                                image={imgSrc(user.image)}
                                                name={user.username}
                                            />
                                            <span>{user.username}</span>
                                        </div>
                                    </SelectItem>
                                </SelectGroup>
                            </>
                        ) : (
                            <SelectGroup>
                                <SelectLabel>Current owner (you)</SelectLabel>
                                <SelectItem
                                    key={repository.ownerId}
                                    value={repository.ownerId}
                                    className="cursor-pointer hover:bg-accent"
                                >
                                    <div className="flex flex-row items-center space-x-3">
                                        <AvatarDisplay
                                            displayType={"select"}
                                            image={imgSrc(
                                                repository.ownerImage,
                                            )}
                                            name={repository.ownerName}
                                        />
                                        <span>{repository.ownerName}</span>
                                    </div>
                                </SelectItem>
                            </SelectGroup>
                        )}
                        {usersOrganisations && (
                            <SelectGroup>
                                <SelectLabel>Your organisations</SelectLabel>
                                {usersOrganisations.data?.map(
                                    (usersOrganisation) => {
                                        if (
                                            usersOrganisation.id ===
                                            repository.ownerId
                                        ) {
                                            return undefined;
                                        }
                                        return (
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
                                        );
                                    },
                                )}
                            </SelectGroup>
                        )}
                    </SelectContent>
                </Select>
                <DialogFooter className="justify-center">
                    <div className="flex w-full flex-col space-y-3">
                        <div className="h-10 w-full text-center text-sm text-muted-foreground">
                            {getTransferOwnershipMessage()}
                        </div>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleTransferOwnership()}
                                className="w-full hover:bg-destructive-hover"
                                variant="destructive"
                                disabled={
                                    newOwnerId === "" ||
                                    newOwnerId === repository.ownerId
                                }
                            >
                                <SquareArrowRight />
                                Transfer
                            </Button>
                        </DialogTrigger>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
