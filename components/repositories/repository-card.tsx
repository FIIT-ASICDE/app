"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { Repository } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { Pin, Star } from "lucide-react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { VisibilityBadge } from "@/components/repositories/visibility-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DynamicTitleLink } from "@/components/dynamic-title-link/dynamic-title-link";
import { api } from "@/lib/trpc/react";
import { getCardStripe } from "@/components/generic/generic";

interface RepositoryCardProps {
    repository: Repository;
    isUserOwner: boolean;
    className?: string;
}

export default function RepositoryCard({
    repository,
    isUserOwner,
    className,
}: RepositoryCardProps) {
    const repositoryDisplayName: string = repository.ownerName + "/" + repository.name;
    const repositoryLink: string = "/" + repositoryDisplayName;

    const toggleRepoState = api.repo.toggleState.useMutation();

    const handleStarClick = async () => {
        await toggleRepoState.mutateAsync({
            ownerId: repository.ownerId,
            repoId: repository.id,
            favorite: !repository.favorite,
        });
    };

    const handlePinClicked = async () => {
        await toggleRepoState.mutateAsync({
            ownerId: repository.ownerId,
            repoId: repository.id,
            pinned: !repository.pinned,
        });
    };

    return (
        <Card
            className={cn(
                "max-w-full shadow-lg pl-1.5",
                getCardStripe("repository"),
                className
            )}
        >
            <CardHeader>
                <div className="flex flex-row justify-between gap-x-5">
                    <div className="flex flex-row items-center gap-x-3 min-w-0">
                        <AvatarDisplay
                            displayType={"card"}
                            image={imgSrc(repository.ownerImage)}
                            name={repository.ownerName}
                        />
                        <DynamicTitleLink
                            title={repositoryDisplayName}
                            link={repositoryLink}
                            tooltipVisible
                        />
                    </div>
                    <div className="flex items-center justify-center gap-x-3 flex-shrink-0">
                        <VisibilityBadge visibility={repository.visibility} />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    disabled={false}
                                    className={cn(
                                        "flex items-center justify-center rounded p-1.5",
                                        "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
                                    )}
                                    onClick={handleStarClick}
                                >
                                    <Star
                                        fill={repository.favorite ? "currentColor" : "none"}
                                        className={cn(
                                            "h-5 w-5 text-foreground",
                                            repository.favorite ? "text-foreground" : "text-muted-foreground",
                                            "disabled:text-muted-foreground",
                                        )}
                                    />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Toggle favorite</TooltipContent>
                        </Tooltip>
                        {isUserOwner && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        disabled={false}
                                        className={cn(
                                            "flex items-center justify-center rounded p-1.5",
                                            "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
                                        )}
                                        onClick={handlePinClicked}
                                    >
                                        <Pin
                                            fill={repository.pinned ? "currentColor" : "none"}
                                            className={cn(
                                                "h-5 w-5 text-foreground",
                                                repository.pinned ? "text-foreground" : "text-muted-foreground",
                                                "disabled:text-muted-foreground",
                                            )}
                                        />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>Toggle pinned</TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </CardHeader>
            {repository.description && (
                <CardContent>
                    <p>{repository.description}</p>
                </CardContent>
            )}
        </Card>
    );
}
