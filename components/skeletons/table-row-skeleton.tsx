import { cn } from "@/lib/utils";
import { File as FileIcon, Folder } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableRowSkeletonProps {
    type: "directory" | "file";
    fileNameClassName?: string;
    lastActivityClassName?: string;
}

export const TableRowSkeleton = ({
    type,
    fileNameClassName,
    lastActivityClassName,
}: TableRowSkeletonProps) => {
    return (
        <TableRow className="">
            <TableCell className="flex flex-row items-center gap-x-3">
                {type === "directory" ? (
                    <Folder
                        className="h-5 w-5 text-muted-foreground"
                        fill={"currentColor"}
                    />
                ) : (
                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                )}
                <Skeleton className={cn("h-4 w-40", fileNameClassName)} />
            </TableCell>
            <TableCell className="relative text-muted-foreground">
                <Skeleton
                    className={cn(
                        "absolute right-0 top-[1.125rem] h-4 w-20",
                        lastActivityClassName,
                    )}
                />
            </TableCell>
        </TableRow>
    );
};
