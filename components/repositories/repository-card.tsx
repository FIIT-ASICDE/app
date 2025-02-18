import { imgSrc } from "@/lib/client-file-utils";
import { api } from "@/lib/trpc/react";
import { RepositoryVisibility } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { Pin, Star } from "lucide-react";
import Link from "next/link";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { VisibilityBadge } from "@/components/repositories/visibility-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface RepositoryCardProps {
    id: string;
    ownerId: string;
    ownerName: string;
    name: string;
    visibility: RepositoryVisibility;
    description: string | undefined;
    favorite: boolean;
    pinned: boolean;
    ownerImage?: string;
    onStateChange: (
        repoId: string,
        state: { favorite: boolean; pinned?: boolean },
    ) => void;
    isUserOwner?: boolean | null;
}

export default function RepositoryCard({
    id,
    ownerId,
    ownerName,
    name,
    visibility,
    description,
    favorite,
    pinned,
    ownerImage,
    onStateChange,
    isUserOwner,
}: RepositoryCardProps) {
    const repositoryDisplayName: string = ownerName + "/" + name;

    const handleStarClick = async () => {
        const newState = await toggleRepoState.mutateAsync({
            ownerId: ownerId,
            repoId: id,
            favorite: !favorite,
        });

        onStateChange(id, newState);
    };

    const toggleRepoState = api.repo.toggleState.useMutation();

    const handlePinClicked = async () => {
        const newState = await toggleRepoState.mutateAsync({
            ownerId: ownerId,
            repoId: id,
            pinned: !pinned,
        });

        onStateChange(id, newState);
    };

    return (
        <Card className="min-w-fit shadow-lg">
            <CardHeader>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-x-3">
                        <AvatarDisplay
                            displayType={"card"}
                            image={imgSrc(ownerImage)}
                            name={ownerName}
                        />
                        <Link href={"/" + ownerName + "/" + name}>
                            <Button
                                variant="link"
                                className="m-0 p-0 text-xl font-semibold leading-none tracking-tight"
                            >
                                {repositoryDisplayName}
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center gap-x-3">
                        <VisibilityBadge visibility={visibility} />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    disabled={toggleRepoState.isPending}
                                    className={cn(
                                        "flex items-center justify-center rounded p-1.5",
                                        "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
                                    )}
                                    onClick={handleStarClick}
                                >
                                    <Star
                                        fill={
                                            favorite ? "currentColor" : "none"
                                        }
                                        className={cn(
                                            "h-5 w-5 text-foreground",
                                            favorite
                                                ? "text-foreground"
                                                : "text-muted-foreground",
                                            "disabled:text-muted-foreground",
                                        )}
                                    />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {favorite ? "Favorite" : "Not favorite"}
                            </TooltipContent>
                        </Tooltip>
                        {isUserOwner && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        disabled={toggleRepoState.isPending}
                                        className={cn(
                                            "flex items-center justify-center rounded p-1.5",
                                            "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
                                        )}
                                        onClick={handlePinClicked}
                                    >
                                        <Pin
                                            fill={
                                                pinned ? "currentColor" : "none"
                                            }
                                            className={cn(
                                                "h-5 w-5 text-foreground",
                                                pinned
                                                    ? "text-foreground"
                                                    : "text-muted-foreground",
                                                "disabled:text-muted-foreground",
                                            )}
                                        />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {pinned ? "Pinned" : "Not pinned"}
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>
    );
}
