import { cn } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/card";
import { UsersRound } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface OrganisationCardSkeletonProps {
    titleClassName?: string;
}

export const OrganisationCardDisplaySkeleton = ({
    titleClassName,
}: OrganisationCardSkeletonProps) => {
    return (
        <Card className="max-w-full p-0 pl-1.5 shadow-lg">
            <CardHeader className="p-3 pr-6">
                <div className="flex flex-row justify-between gap-x-3">
                    <div className="flex min-w-0 flex-row items-center gap-x-3">
                        <Skeleton className="rounded-full">
                            <Avatar className="text-muted-foreground"/>
                        </Skeleton>
                        <Skeleton className={cn("h-4 w-32", titleClassName)} />
                    </div>
                    <div className="flex flex-shrink-0 flex-row items-center justify-center gap-x-3">
                        <Skeleton className="bg-transparent">
                            <UsersRound className="h-5 w-5 text-muted-foreground mr-[13px]" />
                        </Skeleton>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};