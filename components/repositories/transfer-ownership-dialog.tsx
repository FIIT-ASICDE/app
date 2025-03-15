import { imgSrc } from "@/lib/client-file-utils";
import { api } from "@/lib/trpc/react";
import { Repository } from "@/lib/types/repository";
import { SquareArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useUser } from "@/components/context/user-context";
import { AvatarDisplay } from "@/components/generic/avatar-display";
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
import { ScrollArea } from "@/components/ui/scroll-area";
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
    const router = useRouter();

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
                    type: "org" as "user" | "org",
                };
            }
        }
        return {
            name: user.username,
            image: user.image,
            type: "user" as "user" | "org",
        };
    };

    const transferMutation = api.repo.transfer.useMutation({
        onSuccess: () => {
            toast.success("Repository ownership transferred successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleTransferOwnership = () => {
        const newOwnerData:
            | {
                  name: string;
                  image: string | undefined;
                  type: "user" | "org";
              }
            | undefined = getNewOwnerData();

        if (newOwnerData !== undefined) {
            transferMutation.mutate({
                repoId: repository.id,
                newOwnerType: newOwnerData.type,
                newOwnerId: newOwnerId,
            });
            router.push("/" + newOwnerData.name + "/" + repository.name);
        }
    };

    const getTransferOwnershipMessage = () => {
        if (newOwnerId === "" || newOwnerId === repository.ownerId) {
            return <></>;
        }

        const newOwnerData:
            | {
                  name: string;
                  image: string | undefined;
                  type: "user" | "org";
              }
            | undefined = getNewOwnerData();

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
            <DialogContent className="max-h-[90vh] max-w-[425px] overflow-clip p-0">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="space-y-3 p-6">
                        <DialogHeader>
                            <DialogTitle className="mb-5 text-center">
                                Transfer ownership
                            </DialogTitle>
                            <DialogDescription>
                                You are about to transfer ownership of your
                                repository{" "}
                                <span className="font-bold">
                                    {repository.name}
                                </span>
                                .
                            </DialogDescription>
                        </DialogHeader>
                        <span>
                            To confirm this action, please select a new owner.
                        </span>
                        <Select
                            onValueChange={(newOwnerId) =>
                                setNewOwnerId(newOwnerId)
                            }
                            defaultValue={repository.ownerId}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {!userIsOwner ? (
                                    <>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Current owner
                                            </SelectLabel>
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
                                                        name={
                                                            repository.ownerName
                                                        }
                                                    />
                                                    <span>
                                                        {repository.ownerName}
                                                    </span>
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
                                                        image={imgSrc(
                                                            user.image,
                                                        )}
                                                        name={user.username}
                                                    />
                                                    <span>{user.username}</span>
                                                </div>
                                            </SelectItem>
                                        </SelectGroup>
                                    </>
                                ) : (
                                    <SelectGroup>
                                        <SelectLabel>
                                            Current owner (you)
                                        </SelectLabel>
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
                                                <span>
                                                    {repository.ownerName}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    </SelectGroup>
                                )}
                                {usersOrganisations && (
                                    <SelectGroup>
                                        <SelectLabel>
                                            Your organisations
                                        </SelectLabel>
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
                                                        key={
                                                            usersOrganisation.id
                                                        }
                                                        value={
                                                            usersOrganisation.id
                                                        }
                                                        className="cursor-pointer hover:bg-accent"
                                                    >
                                                        <div className="flex flex-row items-center space-x-3">
                                                            <AvatarDisplay
                                                                displayType={
                                                                    "select"
                                                                }
                                                                image={imgSrc(
                                                                    usersOrganisation.image,
                                                                )}
                                                                name={
                                                                    usersOrganisation.name
                                                                }
                                                            />
                                                            <span>
                                                                {
                                                                    usersOrganisation.name
                                                                }
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
                                {newOwnerId !== "" &&
                                    newOwnerId !== repository.ownerId && (
                                        <div className="mb-3 mt-2 w-full text-center text-sm text-muted-foreground">
                                            {getTransferOwnershipMessage()}
                                        </div>
                                    )}
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() =>
                                            handleTransferOwnership()
                                        }
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
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
