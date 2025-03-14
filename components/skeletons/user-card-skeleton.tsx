import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserCardSkeletonProps {
    titleClassName?: string;
}

export const UserCardSkeleton = ({
    titleClassName,
}: UserCardSkeletonProps) => {
    return (
        <Card className="max-w-full pl-1.5 shadow-lg">
            <CardContent className="flex flex-row items-center justify-between p-4 gap-x-3">
                <div className="flex min-w-0 flex-row items-center gap-x-3">
                    <Skeleton className="rounded-full">
                        <Avatar className="text-muted-foreground"/>
                    </Skeleton>
                    <Skeleton className={cn("h-4 w-32", titleClassName)} />
                </div>
                <div className="flex flex-shrink-0 flex-row space-x-3">
                    <Skeleton>
                        <button disabled className="rounded p-1.5 align-middle cursor-not-allowed">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </Skeleton>
                </div>
            </CardContent>
        </Card>
    );
};