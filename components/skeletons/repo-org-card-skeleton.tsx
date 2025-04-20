import { cn } from "@/lib/utils";
import { Pin, Star } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactElement } from "react";

/**
 * Skeleton component of a repository card or an organisation card
 *
 * @returns {ReactElement} Skeleton component
 */
export const RepoOrgCardSkeleton = (): ReactElement => {
    return (
        <Card className="max-w-full pl-1.5 shadow-lg">
            <CardHeader>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex min-w-0 flex-row items-center gap-x-3">
                        <Skeleton className="rounded-full">
                            <Avatar className="text-muted-foreground" />
                        </Skeleton>
                    </div>
                    <div className="flex flex-shrink-0 flex-row items-center gap-x-3">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className={cn(
                                        "flex items-center justify-center rounded p-1.5",
                                        "disabled:cursor-not-allowed disabled:opacity-50",
                                    )}
                                >
                                    <Star
                                        fill={"none"}
                                        className={cn(
                                            "h-5 w-5 text-foreground",
                                            "text-muted-foreground",
                                            "disabled:text-muted-foreground",
                                        )}
                                    />
                                </div>
                            </TooltipTrigger>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className={cn(
                                        "flex items-center justify-center rounded p-1.5",
                                        "disabled:cursor-not-allowed disabled:opacity-50",
                                    )}
                                >
                                    <Pin
                                        className={cn(
                                            "h-5 w-5 text-foreground",
                                            "text-muted-foreground",
                                            "disabled:text-muted-foreground",
                                        )}
                                    />
                                </div>
                            </TooltipTrigger>
                        </Tooltip>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};
