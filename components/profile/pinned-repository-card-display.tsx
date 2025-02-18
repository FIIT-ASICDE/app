import { imgSrc } from "@/lib/client-file-utils";
import { RepositoryVisibility } from "@/lib/types/repository";
import { Pin } from "lucide-react";
import Link from "next/link";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { VisibilityBadge } from "@/components/repositories/visibility-badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

interface PinnedRepositoryCardDisplayProps {
    id?: string;
    ownerName: string;
    name: string;
    visibility: RepositoryVisibility;
    ownerImage?: string;
}

export const PinnedRepositoryCardDisplay = ({
    ownerName,
    name,
    visibility,
    ownerImage,
}: PinnedRepositoryCardDisplayProps) => {
    const repositoryDisplayName: string = ownerName + "/" + name;

    return (
        <Card className="p-0 shadow-lg">
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
