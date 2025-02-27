import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { imgSrc } from "@/lib/client-file-utils";
import { Button } from "@/components/ui/button";
import { Calendar, Code } from "lucide-react";
import { getCardStripe, getTimeDeltaString } from "@/components/generic/generic";
import { RepositoryDisplay } from "@/lib/types/repository";
import { DynamicTitleLink } from "@/components/dynamic-title-link/dynamic-title-link";
import Link from "next/link";

interface RecentRepositoryCardDisplayProps {
    repository: RepositoryDisplay;
    className?: string;
}

export const RecentRepositoryCardDisplay = (
    {
        repository,
        className,
    } : RecentRepositoryCardDisplayProps
) => {
    const repositoryDisplayName: string = repository.ownerName + "/" + repository.name;
    const repositoryLink: string = "/" + repositoryDisplayName;
    const editorLink: string = repositoryLink + "/editor";

    return (
        <Card
            className={cn(
                "max-w-full shadow-lg p-0 pl-1.5",
                getCardStripe("recentRepository"),
                className
            )}
        >
            <CardHeader className="p-3">
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-row gap-x-3 items-center">
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
                    <div className="flex flex-row items-center justify-between">
                        <span className="flex flex-row items-center gap-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-5 w-5" />
                            Opened{" "}
                            {getTimeDeltaString(new Date("2023-07-15"))}
                        </span>
                        <Link href={editorLink}>
                            <Button
                                variant="default"
                                className="hover:bg-primary-button-hover"
                            >
                                <Code />
                                Open in IDE
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};