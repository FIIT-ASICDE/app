import { TableCell, TableRow } from "@/components/ui/table";
import { Check, ChevronDown, ChevronRight, Copy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PushDialog } from "@/components/editor/sidebar-content/source-control/push-dialog";
import { ChangesTable } from "@/components/editor/sidebar-content/source-control/changes-table";
import { Fragment } from "react";
import { GitCommit } from "@/lib/types/repository";
import { toast } from "sonner";

interface CommitTableRowProps {
    commit: GitCommit;
    expandedRowHash: string | undefined;
    toggleRow: (commitHash: string) => void;
    handlePush: (commits: Array<GitCommit>) => void;
}

export const CommitTableRow = ({
    commit,
    expandedRowHash,
    toggleRow,
    handlePush,
}: CommitTableRowProps) => {
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
                                    onClick={() => handleCopyCommitHash(commit.hash)}
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
                            <TooltipContent className="flex flex-col gap-y-1 text-wrap max-w-96">
                                <div className="flex flex-row gap-x-3 items-baseline">
                                    <span className="w-full">{commit.message}</span>
                                    <span className="text-xs text-muted-foreground min-w-16 text-right">
                                        {commit.changes.length}{" "}change{commit.changes.length !== 1 && "s"}
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
                        {commit.pushed ? (
                            <button className="flex cursor-default items-center justify-center rounded p-2">
                                <Check className="h-4 w-4 text-green-600" />
                            </button>
                        ) : (
                            <PushDialog
                                singleCommit
                                commits={[commit]}
                                onPushAction={handlePush}
                            />
                        )}
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