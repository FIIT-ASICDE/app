import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DescriptionSkeleton } from "@/components/skeletons/description-skeleton";

export default function Loading() {
    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="flex w-full flex-col gap-y-3 md:w-1/3">
                <DescriptionSkeleton />

                <Skeleton>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-muted-foreground">Language statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full">
                                <div className="flex flex-col items-center w-full h-[170px]">
                                    <div className="relative w-40 h-40">
                                        <Skeleton className="rounded-full absolute h-40 w-40" />
                                        <div
                                            className="rounded-full absolute h-28 w-28 bg-card top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-2 mt-6 w-full">
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
};