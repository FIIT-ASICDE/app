"use client";

import { GitCommit } from "@/lib/types/repository";
import {
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Copy,
    History,
    Loader2,
    MoveUpRight
} from "lucide-react";
import { Fragment, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { api } from "@/lib/trpc/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { ChangesTable } from "@/components/editor/sidebar-content/changes-table";

/*const data = {
    commitHistory: {
        commits: [
            {
                hash: "a1b2c3d4e5f67890abcdef1234567890abcdef12",
                authorName: "Kili",
                authorEmail: "xkilian@stuba.sk",
                authorDate: new Date(),
                message: "testing commit message 1",
                body: "fixed everything, everything works 1",
                changes: [
                    {
                        itemPath: "files/added-file.txt",
                        change: { type: "added" },
                    } satisfies RepositoryItemChange,
                ] satisfies Array<RepositoryItemChange>,
                pushed: true,
            } satisfies GitCommit,
            {
                hash: "a1b2c3d4e5f67890abcdef1234567890abcdef13",
                authorName: "Nesquiko",
                authorEmail: "xcastven@stuba.sk",
                authorDate: new Date(),
                message: "testing commit message 2",
                body: "fixed everything, everything works 2",
                changes: [
                    {
                        itemPath: "files/deleted-file.txt",
                        change: { type: "deleted" },
                    } satisfies RepositoryItemChange,
                ] satisfies Array<RepositoryItemChange>,
                pushed: true,
            } satisfies GitCommit,
            {
                hash: "a1b2c3d4e5f67890abcdef1234567890abcdef14",
                authorName: "Maxo",
                authorEmail: "xstrecansky@stuba.sk",
                authorDate: new Date(),
                message: "testing commit message 3",
                body: "fixed everything, everything works 3",
                changes: [
                    {
                        itemPath: "files/modified-file.txt",
                        change: { type: "modified" },
                    } satisfies RepositoryItemChange,
                ] satisfies Array<RepositoryItemChange>,
                pushed: false,
            } satisfies GitCommit,
            {
                hash: "a1b2c3d4e5f67890abcdef1234567890abcdef15",
                authorName: "Fero",
                authorEmail: "xfero@stuba.sk",
                authorDate: new Date(),
                message: "testing commit message 4",
                body: "fixed everything, everything works 4",
                changes: [
                    {
                        itemPath: "files/renamed-file.txt",
                        change: { type: "renamed", oldName: "old-name.txt" },
                    } satisfies RepositoryItemChange,
                ] satisfies Array<RepositoryItemChange>,
                pushed: false,
            } satisfies GitCommit,
            {
                hash: "a1b2c3d4e5f67890abcdef1234567890abcdef16",
                authorName: "Jozo",
                authorEmail: "xjozo@stuba.sk",
                authorDate: new Date(),
                message: "testing commit message 5",
                body: "fixed everything, everything works 5",
                changes: [
                    {
                        itemPath: "files/moved-file.txt",
                        change: {
                            type: "moved",
                            oldPath: "other-place/moved-file.txt",
                        },
                    } satisfies RepositoryItemChange,
                ] satisfies Array<RepositoryItemChange>,
                pushed: false,
            } satisfies GitCommit,
        ] satisfies Array<GitCommit>,
        pagination: {
            total: 5,
            pageCount: 3,
            page: 1,
            pageSize: 2,
        } satisfies PaginationResult,
    },
};*/

interface CommitHistoryDialogProps {
    repositoryId: string;
}

export const CommitHistoryDialog = ({
    repositoryId,
}: CommitHistoryDialogProps) => {
    const [expandedRowHash, setExpandedRowHash] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const pageSize: number = 5;

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

    const handleCopyCommitHash = (commitHash: string) => {
        navigator.clipboard
            .writeText(commitHash)
            .then(() => {
                toast.success("Commit hash copied to clipboard", {
                    description: commitHash
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
                    <div className="p-6 space-y-5">
                        <DialogHeader>
                            <DialogTitle>
                                Commit history
                            </DialogTitle>
                            <div className="flex flex-row gap-x-5 justify-between items-center">
                                <DialogDescription>
                                    Here you can view the detailed history of your pushed
                                    and waiting commits.
                                </DialogDescription>
                                <button
                                    className="px-4 py-2 flex gap-x-2 text-sm flex-row items-center justify-center rounded bg-primary hover:bg-primary-button-hover"
                                    onClick={() => handlePush(commitHistory.data ? commitHistory.data.commits : [])}
                                    disabled={!commitHistory.data || commitHistory.data.commits.length === 0}
                                >
                                    <MoveUpRight className="h-3.5 w-3.5" />
                                    Push all
                                </button>
                            </div>
                        </DialogHeader>
                        <div className="overflow-hidden rounded border border-accent">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="p-0 pl-2"></TableHead>
                                        <TableHead className="p-2">Hash</TableHead>
                                        <TableHead className="p-2">Message</TableHead>
                                        <TableHead className="p-2">Author</TableHead>
                                        <TableHead className="p-2 text-right pr-8">Pushed</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {commitHistory.data ? commitHistory.data.commits.map((commit: GitCommit) => (
                                        <Fragment key={commit.hash}>
                                            <TableRow className="border-t border-accent">
                                                <TableCell className="p-0 pl-2">
                                                    <button
                                                        className="p-2 ml-2 flex items-center justify-center hover:bg-accent rounded "
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
                                                    <div className="flex items-center space-x-1 p-1 w-fit">
                                                        <span className="font-mono text-sm">
                                                            {commit.hash.substring(0, 8)}
                                                        </span>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    className="rounded border border-transparent p-0.5 hover:border-accent"
                                                                    onClick={() => handleCopyCommitHash(commit.hash)}>
                                                                    <Copy
                                                                        className="h-3.5 w-3.5 text-muted-foreground" />
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
                                                        <div className="truncate max-w-[100px] sm:max-w-[170px] md:max-w-[300px]">
                                                            {commit.message}
                                                        </div>
                                                        <Tooltip>
                                                            <TooltipTrigger className="cursor-default h-5 p-0">
                                                                <span className="text-muted-foreground w-4 h-4 ml-2">...</span>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="flex flex-col gap-y-1">
                                                                <span>{commit.message}</span>
                                                                <span className="text-muted-foreground text-sm">{commit.body}</span>
                                                                <span className="text-muted-foreground text-xs">{commit.changes.length} change{commit.changes.length !== 1 && "s"}</span>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="p-3">
                                                    {commit.authorName}
                                                    <Tooltip>
                                                        <TooltipTrigger className="cursor-default h-full">
                                                            <span className="text-muted-foreground w-4 h-4 ml-1">...</span>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="flex flex-col gap-y-1">
                                                            <span>{commit.authorName}</span>
                                                            <span className="text-muted-foreground text-sm">{commit.authorEmail}</span>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TableCell>

                                                <TableCell className="p-3 text-center pr-8">
                                                    <div className="flex justify-end">
                                                        {commit.pushed ? (
                                                            <button
                                                                className="p-2 flex items-center justify-center rounded cursor-default"
                                                            >
                                                                <Check className="w-4 h-4 text-green-600" />
                                                            </button>
                                                        ) : (
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <button
                                                                        className="p-2 flex items-center justify-center rounded border border-primary hover:bg-primary-button-hover"
                                                                        onClick={() => handlePush([commit])}
                                                                    >
                                                                        <MoveUpRight className="h-3.5 w-3.5" />
                                                                    </button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    Push <span className="font-mono text-sm text-muted-foreground">{commit.hash.substring(0, 8)}</span>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>

                                            <ChangesTable
                                                expanded={expandedRowHash === commit.hash}
                                                commitChanges={commit.changes}
                                            />
                                        </Fragment>
                                    )) : (
                                        <TableRow className="w-full">
                                            <TableCell colSpan={5} className="text-muted-foreground">
                                                <div
                                                    className="flex flex-row gap-x-2 items-center justify-center w-full">
                                                <Loader2 className="animate-spin" />
                                                    Loading commits...
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    <TableRow>
                                        <TableCell className="p-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground space-x-2"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                disabled={currentPage === 0}
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Previous</span>
                                            </Button>
                                        </TableCell>
                                        <TableCell colSpan={3} className="w-full text-center p-1 text-muted-foreground">
                                            {commitHistory.data && (
                                                <>
                                                    {commitHistory.data?.pagination.page + 1}
                                                    {" "}of{" "}
                                                    {commitHistory.data?.pagination.pageCount}
                                                </>
                                            )}
                                        </TableCell>
                                        <TableCell className="p-1 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground space-x-2"
                                                disabled={currentPage + 1 === commitHistory.data?.pagination.pageCount}
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                            >
                                                <span>Next</span>
                                                <ChevronRight className="w-4 h-4" />
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