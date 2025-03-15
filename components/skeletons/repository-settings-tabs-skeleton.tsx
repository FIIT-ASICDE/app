import { Folder, Mail, TriangleAlert, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const RepositorySettingsTabsSkeleton = () => {
    return (
        <Skeleton className="bg-transparent">
            <div className="flex w-full flex-row gap-3 md:flex-col">
                <Button
                    disabled
                    variant="secondary"
                    className="flex w-1/2 flex-row gap-x-3 hover:bg-transparent md:w-full"
                >
                    <Folder />
                    <span className="hidden sm:inline">General</span>
                </Button>

                <Button
                    disabled
                    variant="outline"
                    className="flex w-1/2 flex-row gap-x-3 hover:bg-transparent md:w-full"
                >
                    <UsersRound />
                    <span className="hidden sm:inline">Contributors</span>
                </Button>

                <Button
                    variant="outline"
                    className="flex w-1/2 flex-row gap-x-3 hover:bg-transparent md:w-full"
                >
                    <Mail />
                    <span className="hidden sm:inline">Invitations</span>
                </Button>

                <Button
                    variant="outline"
                    className="flex w-1/2 flex-row gap-x-3 border-destructive bg-background hover:bg-transparent md:w-full"
                >
                    <TriangleAlert />
                    <span className="hidden sm:inline">Danger zone</span>
                </Button>
            </div>
        </Skeleton>
    );
};
