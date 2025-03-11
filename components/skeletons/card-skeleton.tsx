import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export const CardSkeleton = () => {
    return (
        <Card className="max-w-full p-0 pl-1.5 shadow-lg">
            <CardHeader className="p-3">
                <div className="flex flex-row justify-between">
                    <div className="flex min-w-0 flex-row items-center gap-x-3">
                        <Skeleton className="rounded-full">
                            <Avatar className="text-muted-foreground"/>
                        </Skeleton>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}