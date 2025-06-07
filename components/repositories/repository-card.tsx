"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { api } from "@/lib/trpc/react";
import { Repository } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { Pin, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { getCardStripe } from "@/components/generic/generic";
import { VisibilityBadge } from "@/components/repositories/visibility/visibility-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface RepositoryCardProps {
    repository: Repository;
    isUserOwner: boolean;
    className?: string;
}

/**
 * Card component that displays information about a repository
 *
 * @param {RepositoryCardProps} props - Component props
 * @returns {ReactElement} Card component
 */
export default function RepositoryCard({
    repository,
    isUserOwner,
    className,
}: RepositoryCardProps): ReactElement {
    const router = useRouter();

    const repositoryDisplayName: string =
        repository.ownerName + "/" + repository.name;
    const repositoryLink: string = "/" + repositoryDisplayName;

    const toggleRepoState = api.repo.toggleState.useMutation();

    const handleStarClick = async () => {
        await toggleRepoState.mutateAsync({
            ownerId: repository.ownerId,
            repoId: repository.id,
            favorite: !repository.favorite,
        });
        router.refresh();
    };

    const handlePinClicked = async () => {
        await toggleRepoState.mutateAsync({
            ownerId: repository.ownerId,
            repoId: repository.id,
            pinned: !repository.pinned,
        });
        router.refresh();
    };

    return (
        <Card
            onClick={() => router.push(repositoryLink)}
            className={cn(
                "max-w-full pl-1.5 shadow-lg",
                getCardStripe("repository"),
                className,
            )}
        >
            <CardHeader>
                <div className="flex flex-row justify-between gap-x-5">
                    <div className="flex min-w-0 flex-row items-center gap-x-3">
                        <AvatarDisplay
                            displayType={"card"}
                            image={imgSrc(repository.ownerImage)}
                            name={repository.ownerName}
                        />
                        <DynamicTitle
                            title={repositoryDisplayName}
                            link={repositoryLink}
                            tooltipVisible
                        />
                    </div>
                    <div
                        className="flex flex-shrink-0 items-center justify-center gap-x-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <VisibilityBadge visibility={repository.visibility} />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className={cn(
                                        "flex items-center justify-center rounded p-1.5",
                                        "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStarClick();
                                    }}
                                >
                                    <Star
                                        fill={
                                            repository.favorite
                                                ? "currentColor"
                                                : "none"
                                        }
                                        className={cn(
                                            "h-5 w-5 text-foreground",
                                            repository.favorite
                                                ? "text-foreground"
                                                : "text-muted-foreground",
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
                                        className={cn(
                                            "flex items-center justify-center rounded p-1.5",
                                            "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePinClicked();
                                        }}
                                    >
                                        <Pin
                                            fill={
                                                repository.pinned
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                            className={cn(
                                                "h-5 w-5 text-foreground",
                                                repository.pinned
                                                    ? "text-foreground"
                                                    : "text-muted-foreground",
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
