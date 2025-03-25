import { Search as SearchIcon } from "lucide-react";

import { FileExplorerSkeleton } from "@/components/skeletons/file-explorer-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="m-6 flex w-1/2 items-center space-x-6">
                    <div className="relative w-full">
                        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            disabled
                            placeholder="Search files and directories..."
                            className="pl-9"
                        />
                    </div>
                </div>
            </div>
            <Skeleton className="bg-transparent">
                <Card className="m-6 mt-0">
                    <CardContent className="flex flex-col justify-center gap-y-6 pt-6">
                        <FileExplorerSkeleton />
                    </CardContent>
                </Card>
            </Skeleton>
        </div>
    );
}
