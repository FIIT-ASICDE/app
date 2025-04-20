import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactElement } from "react";

interface UserCardSkeletonProps {
    titleClassName?: string;
}

/**
 * Skeleton component of a user card
 *
 * @returns {ReactElement} Skeleton component
 */
export const UserCardSkeleton = ({
    titleClassName
}: UserCardSkeletonProps): ReactElement => {
    return (
        <Card className="max-w-full pl-1.5 shadow-lg">
            <CardContent className="flex flex-row items-center justify-between gap-x-3 p-4">
                <div className="flex min-w-0 flex-row items-center gap-x-3">
                    <Skeleton className="rounded-full">
                        <Avatar className="text-muted-foreground" />
                    </Skeleton>
                    <Skeleton className={cn("h-4 w-32", titleClassName)} />
                </div>
                <div className="flex flex-shrink-0 flex-row space-x-3">
                    <Skeleton className="bg-transparent">
                        <button
                            disabled
                            className="cursor-not-allowed rounded p-1.5 align-middle"
                        >
                            <Mail className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </Skeleton>
                </div>
            </CardContent>
        </Card>
    );
};
