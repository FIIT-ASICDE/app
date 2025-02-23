import { imgSrc } from "@/lib/client-file-utils";
import {
    RepositoryCardDisplayType,
    RepositoryVisibility,
} from "@/lib/types/repository";
import { Calendar, Code, Pin, Star } from "lucide-react";
import Link from "next/link";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { getTimeDeltaString } from "@/components/generic/generic";
import { VisibilityBadge } from "@/components/repositories/visibility-badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

interface RepositoryCardDisplayProps {
    type: RepositoryCardDisplayType;
    id?: string;
    ownerName: string;
    name: string;
    visibility: RepositoryVisibility;
    ownerImage?: string;
}

export const RepositoryCardDisplay = ({
    type,
    ownerName,
    name,
    visibility,
    ownerImage,
}: RepositoryCardDisplayProps) => {
    const repositoryDisplayName: string = ownerName + "/" + name;

    if (type === "recent") {
        return (
            <Card className="p-0">
                <CardHeader className="p-3">
                    <div className="flex flex-col gap-y-3">
                        <div className="flex flex-row gap-x-3">
                            <AvatarDisplay
                                displayType={"card"}
                                image={imgSrc(ownerImage)}
                                name={ownerName}
                            />
                            <Link href={"/" + ownerName + "/" + name}>
                                <Button
                                    variant="link"
                                    className="m-0 max-w-full overflow-hidden truncate whitespace-nowrap p-0 text-base font-semibold leading-none tracking-tight"
                                >
                                    {repositoryDisplayName}
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center gap-x-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {getTimeDeltaString(new Date("2023-07-15"))}
                        </div>
                        <Button variant="outline">
                            <Code />
                            Open in IDE
                        </Button>
                    </div>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="p-0">
            <CardHeader className="p-3">
                <div className="flex justify-between">
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
                        {type === "pinned" ? (
                            <Pin
                                fill="currentColor"
                                className="h-5 w-5 text-foreground"
                            />
                        ) : (
                            <Star
                                fill="currentColor"
                                className="h-5 w-5 text-foreground"
                            />
                        )}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};
