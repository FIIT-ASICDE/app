import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Folder, Lock } from "lucide-react";
import { RepositorySettingsTabsSkeleton } from "@/components/skeletons/repository-settings-tabs-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Loading() {
    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="w-full md:w-1/5">
                <RepositorySettingsTabsSkeleton />
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-4/5">
                <Skeleton>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center gap-3 text-muted-foreground">
                                <Folder />
                                General
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                                <div className="flex flex-row items-center space-x-3">
                                    <Eye className="text-muted-foreground" />
                                    <div className="flex flex-col space-y-1">
                                        <span>
                                            Change repository visibility
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            This repository is currently <span className="font-bold">public</span>.
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    disabled
                                    variant="default"
                                    className="w-60 hover:bg-primary-button-hover"
                                >
                                    <Lock />
                                    Change visibility to private
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Skeleton>
            </main>
        </div>
    );
};