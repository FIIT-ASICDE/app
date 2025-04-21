import { GitCommit } from "@/lib/types/repository";
import { Check, ChevronDown, ChevronRight, Copy, X } from "lucide-react";
import { Fragment, ReactElement } from "react";
import { toast } from "sonner";

import { ChangesTable } from "@/components/editor/sidebar-content/source-control/changes-table";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommitTableRowProps {
    commit: GitCommit;
    expandedRowHash: string | undefined;
    toggleRow: (commitHash: string) => void;
}

/**
 * Table row component of a commit table displaying information about one specific commit
 *
 * @param {CommitTableRowProps} props - Component props
 * @returns {ReactElement} Table row component
 */
export const CommitTableRow = ({
    commit,
    expandedRowHash,
    toggleRow,
}: CommitTableRowProps): ReactElement => {
    const handleCopyCommitHash = (commitHash: string) => {
        navigator.clipboard
            .writeText(commitHash)
            .then(() => {
                toast.success("Commit hash copied to clipboard", {
                    description: commitHash,
                });
            })
            .catch(() => {
                toast.error("Unable to copy commit hash to clipboard");
            });
    };

    return (
        <Fragment>
            <TableRow className="border-t border-accent">
                <TableCell className="p-0 pl-2">
                    <button
                        className="ml-2 flex items-center justify-center rounded p-2 hover:bg-accent"
                        onClick={() => toggleRow(commit.hash)}
                    >
                        {expandedRowHash === commit.hash ? (
                            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        ) : (
                            <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                        )}
                    </button>
                </TableCell>

                <TableCell className="p-2">
                    <div className="flex w-fit items-center space-x-1">
                        <span className="rounded bg-muted p-1 px-2 font-mono text-sm text-muted-foreground">
                            {commit.hash.substring(0, 8)}
                        </span>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="rounded border border-transparent p-1.5 hover:border-accent"
                                    onClick={() =>
                                        handleCopyCommitHash(commit.hash)
                                    }
                                >
                                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Copy</TooltipContent>
                        </Tooltip>
                    </div>
                </TableCell>

                <TableCell className="p-3">
                    <div className="flex items-center">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="max-w-[100px] truncate sm:max-w-[170px] md:max-w-[300px]">
                                    {commit.message}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="flex max-w-96 flex-col gap-y-1 text-wrap">
                                <div className="flex flex-row items-baseline gap-x-3">
                                    <span className="w-full">
                                        {commit.message}
                                    </span>
                                    <span className="min-w-16 text-right text-xs text-muted-foreground">
                                        {commit.changes.length} change
                                        {commit.changes.length !== 1 && "s"}
                                    </span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {commit.body}
                                </span>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TableCell>

                <TableCell className="p-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>{commit.authorName}</span>
                        </TooltipTrigger>
                        <TooltipContent className="flex flex-col gap-y-1">
                            <span>{commit.authorName}</span>
                            <span className="text-sm text-muted-foreground">
                                {commit.authorEmail}
                            </span>
                        </TooltipContent>
                    </Tooltip>
                </TableCell>

                <TableCell className="p-3 pr-8 text-center">
                    <div className="flex justify-end">
                        <button className="flex cursor-default items-center justify-center rounded p-2">
                            {commit.pushed ? (
                                <Check className="h-4 w-4 text-green-600" />
                            ) : (
                                <X className="h-4 w-4 text-red-600" />
                            )}
                        </button>
                    </div>
                </TableCell>
            </TableRow>

            <ChangesTable
                expanded={expandedRowHash === commit.hash}
                commitChanges={commit.changes}
            />
        </Fragment>
    );
};
