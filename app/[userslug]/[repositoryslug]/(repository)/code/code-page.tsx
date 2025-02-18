"use client";

import { RepositoryFile, RepositoryFilePreview } from "@/lib/types/repository";
import { Folders } from "lucide-react";
import { useEffect, useState } from "react";

import { FilePreview } from "@/components/file/file-preview";
import FileExplorer from "@/components/repositories/file-explorer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CodePageProps {
    userSlug: string;
    repositorySlug: string;
}

const data = {
    tree: [
        {
            name: "item_0_0",
            isDirectory: true,
            lastActivity: new Date("2024-10-02T02:41:50.225066"),
            children: [
                {
                    name: "item_1_0",
                    isDirectory: false,
                    lastActivity: new Date("2024-03-02T05:18:53.700529"),
                    language: "verilog",
                } satisfies RepositoryFile,
            ],
        } satisfies RepositoryFile,
        {
            name: "item_0_3",
            isDirectory: true,
            lastActivity: new Date("2024-12-15T22:37:47.561361"),
            children: [
                {
                    name: "item_1_0",
                    isDirectory: false,
                    lastActivity: new Date("2024-02-21T13:58:13.774926"),
                    language: "verilog",
                } satisfies RepositoryFile,
                {
                    name: "item_1_1",
                    isDirectory: false,
                    lastActivity: new Date("2024-04-26T08:01:56.397667"),
                    language: "verilog",
                } satisfies RepositoryFile,
                {
                    name: "item_1_2",
                    isDirectory: false,
                    lastActivity: new Date("2024-07-14T15:02:01.475375"),
                    language: "verilog",
                } satisfies RepositoryFile,
                {
                    name: "item_1_3",
                    isDirectory: false,
                    lastActivity: new Date("2024-04-23T05:29:12.743968"),
                    language: "verilog",
                } satisfies RepositoryFile,
                {
                    name: "item_1_4",
                    isDirectory: true,
                    lastActivity: new Date("2024-03-05T23:28:22.697188"),
                    children: [
                        {
                            name: "item_2_0",
                            isDirectory: false,
                            lastActivity: new Date(
                                "2024-09-04T22:55:14.291073",
                            ),
                            language: "verilog",
                        } satisfies RepositoryFile,
                        {
                            name: "item_2_1",
                            isDirectory: false,
                            lastActivity: new Date(
                                "2024-04-27T17:50:20.043923",
                            ),
                            language: "verilog",
                        } satisfies RepositoryFile,
                        {
                            name: "item_2_2",
                            isDirectory: false,
                            lastActivity: new Date(
                                "2024-09-01T04:43:56.959758",
                            ),
                            language: "verilog",
                        } satisfies RepositoryFile,
                        {
                            name: "item_2_3",
                            isDirectory: false,
                            lastActivity: new Date(
                                "2024-02-08T00:25:07.978191",
                            ),
                            language: "verilog",
                        } satisfies RepositoryFile,
                    ],
                } satisfies RepositoryFile,
            ],
        } satisfies RepositoryFile,
        {
            name: "item_0_1",
            isDirectory: false,
            lastActivity: new Date("2024-02-23T10:02:34.898574"),
        } satisfies RepositoryFile,
        {
            name: "item_0_2",
            isDirectory: false,
            lastActivity: new Date("2024-01-20T11:12:08.289148"),
        } satisfies RepositoryFile,
        {
            name: "README.md",
            isDirectory: false,
            lastActivity: new Date("2023-01-20T11:12:08.289148"),
            language: "markdown",
        },
    ] satisfies Array<RepositoryFile>,
};

export default function CodePage({ userSlug, repositorySlug }: CodePageProps) {
    const [filteredTree, setFilteredTree] = useState<Array<RepositoryFile>>(
        data.tree,
    );
    const [fileSearchPhrase, setFileSearchPhrase] = useState<string>("");

    useEffect(() => {
        const newFilteredTree: Array<RepositoryFile> = data.tree.filter(
            (repositoryFile: RepositoryFile) =>
                repositoryFile.name
                    .toLowerCase()
                    .includes(fileSearchPhrase.toLowerCase()),
        );
        setFilteredTree(newFilteredTree);
    }, [fileSearchPhrase]);

    const [filePreview, setFilePreview] = useState<
        RepositoryFilePreview | undefined
    >(undefined);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="m-6 flex w-1/2 items-center space-x-6">
                    <div className="relative w-full">
                        <Folders className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search files and directories..."
                            className="pl-8"
                            value={fileSearchPhrase}
                            onChange={(event) =>
                                setFileSearchPhrase(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
            <Card className="m-6 mt-0">
                <CardContent className="flex flex-col justify-center gap-y-6 pt-6">
                    {/* TODO: filtered tree does not update when search input changes */}
                    {filteredTree && (
                        <FileExplorer
                            tree={filteredTree}
                            setFilePreviewAction={setFilePreview}
                        />
                    )}
                </CardContent>
            </Card>
            {filePreview && (
                <FilePreview
                    name={filePreview.name}
                    language={filePreview.language}
                    content={filePreview.content}
                    lastActivity={filePreview.lastActivity}
                    setFilePreview={setFilePreview}
                    openInIDEPath={`/${userSlug}/${repositorySlug}/editor`}
                />
            )}
        </div>
    );
}
