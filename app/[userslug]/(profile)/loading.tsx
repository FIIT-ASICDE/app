import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { CardSkeleton } from "@/components/skeletons/card-skeleton"

export default function Loading() {
    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="flex w-full flex-col gap-y-3 md:w-1/3">
                <Skeleton>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center text-muted-foreground">
                                    <Calendar className="mr-2 h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Skeleton>
            </aside>

            <Skeleton className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-2/3 h-8">
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
                            <CardSkeleton/>
                            <CardSkeleton/>
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
                            <CardSkeleton/>
                            <CardSkeleton/>
                        </div>
                    </CardContent>
                </Card>
            </Skeleton>
        </div>
    );
}