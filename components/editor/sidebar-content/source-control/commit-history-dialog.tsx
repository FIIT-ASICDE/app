"use client";

import { api } from "@/lib/trpc/react";
import { GitCommit } from "@/lib/types/repository";
import {
    ChevronLeft,
    ChevronRight,
    GitGraph,
    History,
} from "lucide-react";
import { useState } from "react";

import { NoData } from "@/components/generic/no-data";
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
import { PushDialog } from "@/components/editor/sidebar-content/source-control/push-dialog";
import { CommitTableRow } from "@/components/editor/sidebar-content/source-control/commit-table-row";
import { CommitsTableSkeleton } from "@/components/skeletons/commits-table-skeleton";

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

    const commitHistoryNotPushed = api.git.commits.useQuery({
        repoId: repositoryId,
        pageSize: 500
    }, {
        staleTime: Infinity
    });

    const commitsNotPushed: Array<GitCommit> = commitHistoryNotPushed.data ?
        commitHistoryNotPushed.data.commits.filter((commit: GitCommit) => !commit.pushed) : [];

    const commitHistory = api.git.commits.useQuery({
        repoId: repositoryId,
        page: currentPage,
        pageSize: pageSize,
    });

    const toggleRow = (commitHash: string) => {
        if (expandedRowHash === commitHash) {
            setExpandedRowHash(undefined);
        } else {
            setExpandedRowHash(commitHash);
        }
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
                                <DialogDescription className="mt-3 mb-5">
                                    Here you can view the detailed history of
                                    your pushed and waiting commits.
                                </DialogDescription>
                                {commitsNotPushed.length > 0 && (
                                    <PushDialog
                                        commits={commitHistory.data ? commitHistory.data.commits : []}
                                        onPushAction={handlePush}
                                    />
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
                                        commitHistory.data.commits.length > 0 ? (
                                            commitHistory.data.commits.map(
                                                (commit: GitCommit, index: number) => (
                                                    <CommitTableRow
                                                        key={index + commit.hash}
                                                        commit={commit}
                                                        expandedRowHash={expandedRowHash}
                                                        toggleRow={toggleRow}
                                                        handlePush={handlePush}
                                                    />
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
