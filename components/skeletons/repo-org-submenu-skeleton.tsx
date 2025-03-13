import { SlidersHorizontal, LayoutGrid, Rows3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElementType } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface RepoOrgSubmenuProps {
    searchText: string;
    createText: string;
    icon: ElementType;
}

export const RepoOrgSubmenuSkeleton = ({searchText, createText, icon: Icon}: RepoOrgSubmenuProps) => {
    
    return (
        <div className="flex items-center justify-between">
            <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                <div className="relative w-full">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        disabled
                        placeholder={searchText}
                        className="pl-9"
                    />
                </div>
                <div className="flex items-center space-x-1">
                    <div className="rounded bg-transparent p-2">
                        <LayoutGrid />
                    </div>
                    <div className="rounded bg-transparent p-2">
                        <Rows3 />
                    </div>
                </div>
            </div>
            <div className="m-6 mb-0 flex flex-row space-x-3">
                <div className="mb-0 flex flex-row space-x-3">
                    <div className="hidden h-8 flex-row justify-center gap-x-2 md:flex">
                        <div className="rounded bg-transparent p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <SlidersHorizontal />
                        </div>
                    </div>
                </div>
                <Button
                    variant="default"
                    className="hover:bg-primary-button-hover"
                >
                    <Icon />
                    {createText}
                </Button>
            </div>
        </div>
    );
}