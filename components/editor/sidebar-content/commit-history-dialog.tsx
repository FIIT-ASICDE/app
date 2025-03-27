"use client";

import { PaginationResult } from "@/lib/types/generic";
import { CommitHistory, GitCommit, RepositoryItemChange } from "@/lib/types/repository";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Copy, Ellipsis, History } from "lucide-react";
import { Fragment, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const data = {
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
};

export const CommitHistoryDialog = () => {
    const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

    const commitHistory: CommitHistory = data.commitHistory;

    const toggleRow = (commitHash: string) => {
        setOpenRows((prev) => ({
            ...prev,
            [commitHash]: !prev[commitHash],
        }));
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
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Commit history
                    </DialogTitle>
                    <DialogDescription>
                        Here you can view the detailed history of your pushed
                        and waiting commits.
                    </DialogDescription>
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
                            {commitHistory.commits.map((commit: GitCommit) => (
                                <Fragment key={commit.hash}>
                                    <TableRow>
                                        <TableCell className="p-0 pl-2">
                                            <button
                                                className="h-5 w-5 flex items-center justify-center hover:bg-accent rounded"
                                                onClick={() => toggleRow(commit.hash)}
                                            >
                                                {openRows[commit.hash] ? (
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
                                                <button className="rounded border border-transparent p-0.5 hover:border-accent">
                                                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                                </button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-3">
                                            {commit.message}
                                            <Tooltip>
                                                <TooltipTrigger className="cursor-default h-5 p-0">
                                                    <Ellipsis className="text-muted-foreground w-4 h-4 ml-2" />
                                                </TooltipTrigger>
                                                <TooltipContent className="flex flex-col gap-y-1">
                                                    <span>{commit.message}</span>
                                                    <span className="text-muted-foreground text-sm">{commit.body}</span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell className="p-3">
                                            {commit.authorName}
                                            <Tooltip>
                                                <TooltipTrigger className="cursor-default h-full">
                                                    <Ellipsis className="text-muted-foreground w-4 h-4 ml-2" />
                                                </TooltipTrigger>
                                                <TooltipContent className="flex flex-col gap-y-1">
                                                    <span>{commit.authorName}</span>
                                                    <span className="text-muted-foreground text-sm">{commit.authorEmail}</span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TableCell>
                                        {/*<TableCell className="p-3 flex items-center gap-x-2 w-fit">
                                            {commit.authorName}

                                        </TableCell>*/}
                                        <TableCell className="p-3 text-right pr-8">
                                            <div className="flex justify-end">
                                                {commit.pushed ? (
                                                    <Check className="w-4 h-4 text-muted-foreground" />
                                                ) : "No"}
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        className="bg-muted/50 overflow-hidden transition-all duration-300 ease-in-out"
                                        style={{
                                            height: openRows[commit.hash]
                                                ? "auto"
                                                : "0",
                                            opacity: openRows[commit.hash]
                                                ? 1
                                                : 0,
                                            border: openRows[commit.hash]
                                                ? undefined
                                                : "none",
                                        }}
                                    >
                                        <TableCell
                                            colSpan={5}
                                            className="transition-all duration-300"
                                            style={{
                                                padding: openRows[commit.hash]
                                                    ? "1rem"
                                                    : "0",
                                            }}
                                        >
                                            <div
                                                className="rounded-md bg-background transition-all duration-300"
                                                style={{
                                                    padding: openRows[
                                                        commit.hash
                                                        ]
                                                        ? "1rem"
                                                        : "0",
                                                    transform: openRows[
                                                        commit.hash
                                                        ]
                                                        ? "scale(1)"
                                                        : "scale(0.95)",
                                                    opacity: openRows[
                                                        commit.hash
                                                        ]
                                                        ? 1
                                                        : 0,
                                                    maxHeight: openRows[
                                                        commit.hash
                                                        ]
                                                        ? "1000px"
                                                        : "0",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <h4 className="mb-2 font-medium">
                                                    Changes
                                                </h4>
                                                <ul className="space-y-2">
                                                    {commit.changes.map(
                                                        (change, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <span className="font-medium">
                                                                    {
                                                                        change.itemPath
                                                                    }
                                                                </span>
                                                                <span className="text-sm text-muted-foreground">
                                                                    (
                                                                    {
                                                                        change
                                                                            .change
                                                                            .type
                                                                    }
                                                                    )
                                                                    {change
                                                                            .change
                                                                            .type ===
                                                                        "renamed" &&
                                                                        ` from ${change.change.oldName}`}
                                                                    {change
                                                                            .change
                                                                            .type ===
                                                                        "moved" &&
                                                                        ` from ${change.change.oldPath}`}
                                                                </span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                                {commit.body && (
                                                    <div className="mt-4">
                                                        <h4 className="mb-2 font-medium">
                                                            Commit Message
                                                        </h4>
                                                        <p className="whitespace-pre-wrap text-sm">
                                                            {commit.body}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </Fragment>
                            ))}

                            <TableRow>
                                <TableCell className="p-1">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground space-x-2">
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Previous</span>
                                    </Button>
                                </TableCell>
                                <TableCell colSpan={3} className="w-full text-center p-1 text-muted-foreground">
                                    Page {commitHistory.pagination.page} of {commitHistory.pagination.pageCount}
                                </TableCell>
                                <TableCell className="p-1 text-right">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground space-x-2">
                                        <span>Next</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
};
