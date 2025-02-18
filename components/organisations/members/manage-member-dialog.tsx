import { OrganisationMember } from "@/lib/types/organisation";
import { CircleFadingArrowUp, CircleX, Pen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ManageMemberDialogProps {
    organisationId: string;
    organisationMember: OrganisationMember;
}

export const ManageMemberDialog = ({
    organisationId,
    organisationMember,
}: ManageMemberDialogProps) => {
    /* TODO: connect handlePromote with be */
    const handlePromote = (organisationMember: OrganisationMember) => {
        console.log(
            "Promote member with ID: " +
                organisationMember.id +
                " to an admin in organisations with ID: " +
                organisationId,
        );
    };

    /* TODO: connect handleExpel with be */
    const handleExpel = (organisationMember: OrganisationMember) => {
        console.log(
            "Expel member with ID: " +
                organisationMember.id +
                " from organisations with ID: " +
                organisationId,
        );
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <button className="rounded p-1.5 align-middle hover:bg-accent">
                            <Pen className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="text-muted-foreground">
                    Manage{" "}
                    <span className="font-semibold text-foreground">
                        {organisationMember.username}
                    </span>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Manage a member
                    </DialogTitle>
                    <DialogDescription>
                        Here you can either promote a member to an admin or
                        expel a member from your organisation.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="promote">
                    <TabsList className="w-full bg-card pb-10 pt-7">
                        <TabsTrigger
                            value="promote"
                            className="flex w-1/2 flex-row items-center justify-center gap-x-2"
                        >
                            <CircleFadingArrowUp />
                            <span>Promote</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="expel"
                            className="flex w-1/2 flex-row items-center justify-center gap-x-2"
                        >
                            <CircleX />
                            <span>Expel</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="promote" className="mx-5">
                        <div className="mb-7 text-center">
                            You are about to promote
                            <span className="font-bold">
                                {" "}
                                {organisationMember.username}{" "}
                            </span>
                            to an admin.
                        </div>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() =>
                                    handlePromote(organisationMember)
                                }
                                className="w-full hover:bg-primary-button-hover"
                                variant="default"
                            >
                                <CircleFadingArrowUp />
                                Promote
                            </Button>
                        </DialogTrigger>
                    </TabsContent>
                    <TabsContent value="expel" className="mx-5">
                        <div className="mb-7 text-center">
                            You are about to expel
                            <span className="font-bold">
                                {" "}
                                {organisationMember.username}{" "}
                            </span>
                            from your organisation.
                        </div>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleExpel(organisationMember)}
                                className="w-full hover:bg-destructive-hover"
                                variant="destructive"
                            >
                                <CircleX />
                                Expel
                            </Button>
                        </DialogTrigger>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
