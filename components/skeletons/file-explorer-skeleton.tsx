import { TableRowSkeleton } from "@/components/skeletons/table-row-skeleton";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ReactElement } from "react";

/**
 * Skeleton component of the file explorer
 *
 * @returns {ReactElement} Skeleton component
 */
export const FileExplorerSkeleton = (): ReactElement => {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow className="text-muted-foreground">
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Last activity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRowSkeleton
                    type="directory"
                    fileNameClassName="w-32"
                    lastActivityClassName="w-16"
                />
                <TableRowSkeleton
                    type="directory"
                    fileNameClassName="w-44"
                    lastActivityClassName="w-20"
                />
                <TableRowSkeleton
                    type="file"
                    fileNameClassName="w-48"
                    lastActivityClassName="w-12"
                />
                <TableRowSkeleton
                    type="file"
                    fileNameClassName="w-24"
                    lastActivityClassName="w-24"
                />
                <TableRowSkeleton
                    type="file"
                    fileNameClassName="w-36"
                    lastActivityClassName="w-20"
                />
            </TableBody>
        </Table>
    );
};
