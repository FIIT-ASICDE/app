import { Check, ChevronRight } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { ReactElement } from "react";

/**
 * Skeleton component of a table of commits
 *
 * @returns {ReactElement} Skeleton component
 */
export const CommitsTableSkeleton = (): ReactElement => {
    return (
        <>
            {[1, 2, 3, 4, 5].map((index: number) => (
                <TableRow key={index} className="border-t border-accent">
                    <TableCell className="p-0 pl-2">
                        <button
                            className="ml-2 flex items-center justify-center rounded p-2 hover:bg-accent"
                            disabled
                        >
                            <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                        </button>
                    </TableCell>

                    <TableCell className="p-2">
                        <Skeleton className="h-6 w-20" />
                    </TableCell>

                    <TableCell className="p-3">
                        <Skeleton className="h-4 w-60" />
                    </TableCell>

                    <TableCell className="p-3">
                        <Skeleton className="h-4 w-16" />
                    </TableCell>

                    <TableCell className="p-3 pr-8 text-center">
                        <div className="flex justify-end">
                            <button
                                className="flex cursor-default items-center justify-center rounded p-2"
                                disabled
                            >
                                <Check className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};
