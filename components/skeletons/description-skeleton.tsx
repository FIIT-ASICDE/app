import { Calendar } from "lucide-react";
import { ReactElement } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton component of a user/organisation description
 *
 * @returns {ReactElement} Skeleton component
 */
export const DescriptionSkeleton = (): ReactElement => {
    return (
        <Skeleton>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col items-start">
                        <div className="mb-4 flex w-full flex-col gap-y-2">
                            <div className="w-full">
                                <Skeleton className="h-4 flex-1" />
                            </div>
                            <div className="w-full">
                                <Skeleton className="h-4 flex-1" />
                            </div>
                            <div className="w-1/2">
                                <Skeleton className="h-4 flex-1" />
                            </div>
                        </div>
                        <div className="flex w-full flex-row items-center gap-x-3 text-muted-foreground">
                            <Calendar className="mr-2 h-5 w-5" />
                            <div className="w-1/2">
                                <Skeleton className="h-4 flex-1" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Skeleton>
    );
};
