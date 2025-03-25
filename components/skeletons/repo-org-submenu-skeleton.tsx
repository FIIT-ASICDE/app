import { LayoutGrid, Rows3, SlidersHorizontal } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import { ElementType } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface RepoOrgSubmenuProps {
    searchText: string;
    createButton?: {
        icon: ElementType;
        title: string;
    };
    importButton?: {
        icon: ElementType;
        title: string;
    };
    hideFilter?: boolean;
}

export const RepoOrgSubmenuSkeleton = ({
    searchText,
    createButton,
    importButton,
    hideFilter,
}: RepoOrgSubmenuProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                <div className="relative w-full">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input disabled placeholder={searchText} className="pl-9" />
                </div>
                <div className="hidden lg:flex">
                    <Skeleton className="flex items-center space-x-1 bg-transparent">
                        <div className="rounded bg-transparent p-2">
                            <LayoutGrid className="text-muted-foreground" />
                        </div>
                        <div className="cursor-not-allowed rounded bg-transparent p-2">
                            <Rows3 className="text-muted-foreground" />
                        </div>
                    </Skeleton>
                </div>
            </div>
            <div className="m-6 mb-0 flex flex-row space-x-3">
                {!hideFilter && (
                    <Skeleton className="mb-0 flex flex-row space-x-3 bg-transparent">
                        <div className="hidden h-8 flex-row justify-center gap-x-2 md:flex">
                            <div className="cursor-not-allowed rounded bg-transparent p-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <SlidersHorizontal className="text-muted-foreground" />
                            </div>
                        </div>
                    </Skeleton>
                )}
                <div className="flex flex-row gap-x-3">
                    {importButton && (
                        <Button
                            disabled
                            variant="outline"
                            className="cursor-not-allowed hover:bg-transparent"
                        >
                            <importButton.icon className="mr-0 h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">
                                {importButton.title}
                            </span>
                        </Button>
                    )}
                    {createButton && (
                        <Button
                            disabled
                            variant="default"
                            className="cursor-not-allowed hover:bg-transparent"
                        >
                            <createButton.icon className="mr-0 h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">
                                {createButton.title}
                            </span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
