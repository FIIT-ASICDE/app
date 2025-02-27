import { imgSrc } from "@/lib/client-file-utils";
import { RepositoryDisplay } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { DynamicTitleLink } from "@/components/dynamic-title-link/dynamic-title-link";
import { getCardStripe } from "@/components/generic/generic";
import { VisibilityBadge } from "@/components/repositories/visibility-badge";
import { Card, CardHeader } from "@/components/ui/card";

interface PinnedRepositoryCardDisplayProps {
    repository: RepositoryDisplay;
    className?: string;
}

export const PinnedRepositoryCardDisplay = ({
    repository,
    className,
}: PinnedRepositoryCardDisplayProps) => {
    const repositoryDisplayName: string =
        repository.ownerName + "/" + repository.name;
    const repositoryLink: string = "/" + repositoryDisplayName;

    return (
        <Card
            className={cn(
                "max-w-full p-0 pl-1.5 shadow-lg",
                getCardStripe("pinnedRepository"),
                className,
            )}
        >
            <CardHeader className="p-3">
                <div className="flex justify-between">
                    <div className="flex min-w-0 flex-row items-center gap-x-3">
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
                    <div className="flex flex-shrink-0 items-center justify-center gap-x-3">
                        <VisibilityBadge visibility={repository.visibility} />
                        <Pin
                            fill="currentColor"
                            className="h-5 w-5 text-foreground"
                        />
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};
