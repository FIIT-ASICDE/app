import { ReactElement } from "react";

import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { DescriptionSkeleton } from "@/components/skeletons/description-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading page for overview page at user profile
 *
 * @returns {ReactElement} Overview page skeleton component
 */
export default function Loading(): ReactElement {
    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="flex w-full flex-col gap-y-3 md:w-1/3">
                <DescriptionSkeleton />
            </aside>

            <Skeleton className="mt-3 flex h-8 w-full flex-col gap-y-3 md:mt-0 md:w-2/3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-between">
                            <span className="text-muted-foreground">
                                Pinned repositories
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-y-3">
                            <CardSkeleton />
                            <CardSkeleton />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-between">
                            <span className="text-muted-foreground">
                                Organisations
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-y-3">
                            <CardSkeleton />
                            <CardSkeleton />
                        </div>
                    </CardContent>
                </Card>
            </Skeleton>
        </div>
    );
}
