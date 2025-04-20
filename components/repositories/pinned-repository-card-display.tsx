import { imgSrc } from "@/lib/client-file-utils";
import { RepositoryDisplay } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { getCardStripe } from "@/components/generic/generic";
import { VisibilityBadge } from "@/components/repositories/visibility/visibility-badge";
import { Card, CardHeader } from "@/components/ui/card";
import { ReactElement } from "react";

interface PinnedRepositoryCardDisplayProps {
    repository: RepositoryDisplay;
    className?: string;
}

/**
 * Card component that displays shortened amount of information about a pinned repository
 *
 * @param {PinnedRepositoryCardDisplayProps} props - Component props
 * @returns {ReactElement} Card component
 */
export const PinnedRepositoryCardDisplay = ({
    repository,
    className,
}: PinnedRepositoryCardDisplayProps): ReactElement => {
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
            <CardHeader className="p-3 pr-6">
                <div className="flex justify-between gap-x-3">
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
