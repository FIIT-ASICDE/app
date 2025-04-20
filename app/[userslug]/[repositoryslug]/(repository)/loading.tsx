import { ReactElement } from "react";

import { DescriptionSkeleton } from "@/components/skeletons/description-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading page for overview page for a repository
 *
 * @returns {ReactElement} Overview page skeleton component
 */
export default function Loading(): ReactElement {
    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="flex w-full flex-col gap-y-3 md:w-1/3">
                <DescriptionSkeleton />

                <Skeleton>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-muted-foreground">
                                Language statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full">
                                <div className="flex h-[170px] w-full flex-col items-center">
                                    <div className="relative h-40 w-40">
                                        <Skeleton className="absolute h-40 w-40 rounded-full" />
                                        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-card" />
                                    </div>
                                </div>
                                <div className="mt-6 flex w-full flex-col gap-y-2">
                                    <div className="w-full">
                                        <Skeleton className="h-4 flex-1" />
                                    </div>
                                    <div className="w-full">
                                        <Skeleton className="h-4 flex-1" />
                                    </div>
                                    <div className="w-full">
                                        <Skeleton className="h-4 flex-1" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Skeleton>
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-2/3">
                <Skeleton>
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle className="text-muted-foreground">
                                README.md
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </Skeleton>
            </main>
        </div>
    );
}
