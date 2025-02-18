"use client";

import { Repository } from "@/lib/types/repository";
import { CircleX, Eye, SquareArrowRight } from "lucide-react";

import { useUser } from "@/components/context/user-context";
import { ChangeVisibilityDialog } from "@/components/repositories/change-visibility-dialog";
import { DeleteRepositoryDialog } from "@/components/repositories/delete-repository-dialog";
import { TransferOwnershipDialog } from "@/components/repositories/transfer-ownership-dialog";
import { Card, CardContent } from "@/components/ui/card";

interface SettingsPageProps {
    userSlug: string;
}

const data = {
    repository: {
        id: "86db4870-15bf-4999-8f03-99eb3d66d6a6",
        ownerId: "021bb1eb-7f88-4159-ba26-440d86f58962",
        ownerName: "kili",
        ownerImage: "/avatars/avatar1.png",
        name: "repository1",
        visibility: "public",
        description:
            "repository1 is an innovative and collaborative project aimed at simplifying data transformation workflows. It provides a collection of modular scripts, utilities, and APIs for processing and analyzing large datasets efficiently.",
        favorite: false,
        pinned: false,
        createdAt: new Date(),
        userRole: "admin",
    } satisfies Repository,
};

export default function SettingsPage({} /* userSlug */ : SettingsPageProps) {
    const { user } = useUser();

    const repository: Repository = data.repository;

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
        <Card className="m-6">
            <CardContent className="flex flex-col gap-5 pt-6">
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <div className="flex flex-row items-center space-x-3">
                        <Eye className="text-muted-foreground" />
                        <div className="flex flex-col space-y-1">
                            <span>Change repository visibility</span>
                            {getRepositoryVisibilityMessage()}
                        </div>
                    </div>
                    <ChangeVisibilityDialog repository={repository} />
                </div>

                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <div className="flex flex-row items-center space-x-3">
                        <SquareArrowRight className="text-muted-foreground" />
                        <div className="flex flex-col space-y-1">
                            <span>Transfer repository ownership</span>
                            {getRepositoryOwnershipMessage()}
                        </div>
                    </div>
                    <TransferOwnershipDialog repository={repository} />
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
                    <DeleteRepositoryDialog repository={repository} />
                </div>
            </CardContent>
        </Card>
    );
}
