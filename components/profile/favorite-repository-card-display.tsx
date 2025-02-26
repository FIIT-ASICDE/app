import { imgSrc } from "@/lib/client-file-utils";
import { RepositoryDisplay } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { VisibilityBadge } from "@/components/repositories/visibility-badge";
import { Card, CardHeader } from "@/components/ui/card";
import { DynamicTitleLink } from "@/components/dynamic-title-link/dynamic-title-link";

interface FavoriteRepositoryCardDisplayProps {
    repository: RepositoryDisplay;
    className?: string;
}

export const FavoriteRepositoryCardDisplay = (
    {
        repository,
        className,
    }: FavoriteRepositoryCardDisplayProps
) => {
    const repositoryDisplayName: string = repository.ownerName + "/" + repository.name;
    const repositoryLink: string = "/" + repositoryDisplayName;

    return (
        <Card className={cn("p-0", className)}>
            <CardHeader className="p-3">
                <div className="flex justify-between">
                    <div className="flex flex-row gap-x-3 items-center min-w-0">
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
                        <Star
                            fill="currentColor"
                            className="h-5 w-5 text-foreground"
                        />
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};