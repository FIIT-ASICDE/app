"use client";

import { api } from "@/lib/trpc/react";
import { GitCommit } from "@/lib/types/repository";
import {
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Copy,
    GitGraph,
    History,
    MoveUpRight,
} from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";

import { ChangesTable } from "@/components/editor/sidebar-content/changes-table";
import { NoData } from "@/components/generic/no-data";
import { CommitsTableSkeleton } from "@/components/skeletons/commits-table-skeleton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommitHistoryDialogProps {
    repositoryId: string;
}

export const CommitHistoryDialog = ({
    repositoryId,
}: CommitHistoryDialogProps) => {
    const [expandedRowHash, setExpandedRowHash] = useState<string | undefined>(
        undefined,
    );
    const [currentPage, setCurrentPage] = useState<number>(0);

    const pageSize: number = 5;

    const commitHistory = api.git.commits.useQuery({
        repoId: repositoryId,
        page: currentPage,
        pageSize: pageSize,
    });

    const commitsNotPushed: Array<GitCommit> = commitHistory.data
        ? commitHistory.data.commits.filter(
              (commit: GitCommit) => !commit.pushed,
          )
        : [];

    const toggleRow = (commitHash: string) => {
        if (expandedRowHash === commitHash) {
            setExpandedRowHash(undefined);
        } else {
            setExpandedRowHash(commitHash);
        }
    };

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

    const handlePush = (commits: Array<GitCommit>) => {
        // TODO: handle push commit
        if (commits.length === 0) return;

        console.log("Push " + commits.length + " commits");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    className="w-full text-xs text-muted-foreground"
                    size="sm"
                >
                    <History />
                    View commit history
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0">
                <ScrollArea className="h-full max-h-[90vh] max-w-4xl">
                    <div className="space-y-5 p-6">
                        <DialogHeader>
                            <DialogTitle>Commit history</DialogTitle>
                            <div className="flex flex-row items-center justify-between gap-x-5">
                                <DialogDescription>
                                    Here you can view the detailed history of
                                    your pushed and waiting commits.
                                </DialogDescription>
                                {commitsNotPushed.length > 0 && (
                                    <button
                                        className="flex flex-row items-center justify-center gap-x-2 rounded bg-primary px-4 py-2 text-sm hover:bg-primary-button-hover"
                                        onClick={() =>
                                            handlePush(
                                                commitHistory.data
                                                    ? commitHistory.data.commits
                                                    : [],
                                            )
                                        }
                                    >
                                        <MoveUpRight className="h-3.5 w-3.5" />
                                        Push all
                                    </button>
                                )}
                            </div>
                        </DialogHeader>
                        <div className="overflow-hidden rounded border border-accent">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="p-0 pl-2"></TableHead>
                                        <TableHead className="p-2">
                                            Hash
                                        </TableHead>
                                        <TableHead className="p-2">
                                            Message
                                        </TableHead>
                                        <TableHead className="p-2">
                                            Author
                                        </TableHead>
                                        <TableHead className="p-2 pr-8 text-right">
                                            Pushed
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {commitHistory.data ? (
                                        commitHistory.data.commits.length >
                                        0 ? (
                                            commitHistory.data.commits.map(
                                                (commit: GitCommit) => (
                                                    <Fragment key={commit.hash}>
                                                        <TableRow className="border-t border-accent">
                                                            <TableCell className="p-0 pl-2">
                                                                <button
                                                                    className="ml-2 flex items-center justify-center rounded p-2 hover:bg-accent"
                                                                    onClick={() =>
                                                                        toggleRow(
                                                                            commit.hash,
                                                                        )
                                                                    }
                                                                >
                                                                    {expandedRowHash ===
                                                                    commit.hash ? (
                                                                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                                                                    ) : (
                                                                        <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                                                                    )}
                                                                </button>
                                                            </TableCell>

                                                            <TableCell className="p-2">
                                                                <div className="flex w-fit items-center space-x-1">
                                                                    <span className="rounded bg-muted p-1 px-2 font-mono text-sm text-muted-foreground">
                                                                        {commit.hash.substring(
                                                                            0,
                                                                            8,
                                                                        )}
                                                                    </span>
                                                                    <Tooltip>
                                                                        <TooltipTrigger
                                                                            asChild
                                                                        >
                                                                            <button
                                                                                className="rounded border border-transparent p-1.5 hover:border-accent"
                                                                                onClick={() =>
                                                                                    handleCopyCommitHash(
                                                                                        commit.hash,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                                                            </button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            Copy
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </div>
                                                            </TableCell>

                                                            <TableCell className="p-3">
                                                                <div className="flex items-center">
                                                                    <div className="max-w-[100px] truncate sm:max-w-[170px] md:max-w-[300px]">
                                                                        {
                                                                            commit.message
                                                                        }
                                                                    </div>
                                                                    <Tooltip>
                                                                        <TooltipTrigger className="h-5 cursor-default p-0">
                                                                            <span className="ml-2 h-4 w-4 text-muted-foreground">
                                                                                ...
                                                                            </span>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="flex flex-col gap-y-1">
                                                                            <span>
                                                                                {
                                                                                    commit.message
                                                                                }
                                                                            </span>
                                                                            <span className="text-sm text-muted-foreground">
                                                                                {
                                                                                    commit.body
                                                                                }
                                                                            </span>
                                                                            <span className="text-xs text-muted-foreground">
                                                                                {
                                                                                    commit
                                                                                        .changes
                                                                                        .length
                                                                                }{" "}
                                                                                change
                                                                                {commit
                                                                                    .changes
                                                                                    .length !==
                                                                                    1 &&
                                                                                    "s"}
                                                                            </span>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </div>
                                                            </TableCell>

                                                            <TableCell className="p-3">
                                                                {
                                                                    commit.authorName
                                                                }
                                                                <Tooltip>
                                                                    <TooltipTrigger className="h-full cursor-default">
                                                                        <span className="ml-1 h-4 w-4 text-muted-foreground">
                                                                            ...
                                                                        </span>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="flex flex-col gap-y-1">
                                                                        <span>
                                                                            {
                                                                                commit.authorName
                                                                            }
                                                                        </span>
                                                                        <span className="text-sm text-muted-foreground">
                                                                            {
                                                                                commit.authorEmail
                                                                            }
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
                                                                        <Tooltip>
                                                                            <TooltipTrigger
                                                                                asChild
                                                                            >
                                                                                <button
                                                                                    className="flex items-center justify-center rounded border border-primary p-2 hover:bg-primary-button-hover"
                                                                                    onClick={() =>
                                                                                        handlePush(
                                                                                            [
                                                                                                commit,
                                                                                            ],
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <MoveUpRight className="h-3.5 w-3.5" />
                                                                                </button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                Push{" "}
                                                                                <span className="font-mono text-sm text-muted-foreground">
                                                                                    {commit.hash.substring(
                                                                                        0,
                                                                                        8,
                                                                                    )}
                                                                                </span>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    )}
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>

                                                        <ChangesTable
                                                            expanded={
                                                                expandedRowHash ===
                                                                commit.hash
                                                            }
                                                            commitChanges={
                                                                commit.changes
                                                            }
                                                        />
                                                    </Fragment>
                                                ),
                                            )
                                        ) : (
                                            <TableRow className="w-full">
                                                <TableCell
                                                    colSpan={5}
                                                    className="text-muted-foreground"
                                                >
                                                    <NoData
                                                        icon={GitGraph}
                                                        message="No commits yet"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ) : (
                                        <CommitsTableSkeleton />
                                    )}

                                    <TableRow>
                                        <TableCell className="p-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="space-x-2 text-muted-foreground"
                                                onClick={() =>
                                                    setCurrentPage(
                                                        currentPage - 1,
                                                    )
                                                }
                                                disabled={currentPage === 0}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                <span>Previous</span>
                                            </Button>
                                        </TableCell>
                                        <TableCell
                                            colSpan={3}
                                            className="w-full p-1 text-center text-muted-foreground"
                                        >
                                            {commitHistory.data && (
                                                <>
                                                    {commitHistory.data
                                                        ?.pagination.page +
                                                        1}{" "}
                                                    of{" "}
                                                    {
                                                        commitHistory.data
                                                            ?.pagination
                                                            .pageCount
                                                    }
                                                </>
                                            )}
                                        </TableCell>
                                        <TableCell className="p-1 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="space-x-2 text-muted-foreground"
                                                disabled={
                                                    currentPage + 1 ===
                                                    commitHistory.data
                                                        ?.pagination.pageCount
                                                }
                                                onClick={() =>
                                                    setCurrentPage(
                                                        currentPage + 1,
                                                    )
                                                }
                                            >
                                                <span>Next</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
