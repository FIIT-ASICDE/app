"use client";

import { type FileItem, type RepositoryItem } from "@/lib/types/repository";
import { Folders } from "lucide-react";
import { useEffect, useState } from "react";

import { FilePreview } from "@/components/repositories/code/file-preview";
import FileExplorer from "@/components/repositories/code/file-explorer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CodePageProps {
    tree: Array<RepositoryItem>;
    repositoryName: string;
    repositoryOwnerName: string;
    subPath: string;
}

export default function CodePage({
    tree,
    repositoryName,
    repositoryOwnerName,
    subPath,
}: CodePageProps) {
    const [filteredTree, setFilteredTree] =
        useState<Array<RepositoryItem>>(tree);
    const [fileSearchPhrase, setFileSearchPhrase] = useState<string>("");

    useEffect(() => {
        const newFilteredTree: Array<RepositoryItem> = tree.filter(
            (repositoryFile) =>
                repositoryFile.name
                    .toLowerCase()
                    .includes(fileSearchPhrase.toLowerCase()),
        );
        setFilteredTree(newFilteredTree);
    }, [fileSearchPhrase, tree]);

    const [filePreview, setFilePreview] = useState<FileItem | undefined>(
        undefined,
    );

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
                    <FileExplorer
                        repoSlug={repositoryName}
                        ownerSlug={repositoryOwnerName}
                        subPath={subPath}
                        files={filteredTree}
                        setFilePreviewAction={setFilePreview}
                    />
                </CardContent>
            </Card>
            {filePreview && (
                <FilePreview
                    name={filePreview.name}
                    language={filePreview.language}
                    content={filePreview.content}
                    lastActivity={filePreview.lastActivity}
                    onXPressed={() => setFilePreview(undefined)}
                    openInIDEPath={`/${repositoryOwnerName}/${repositoryName}/editor`}
                />
            )}
        </div>
    );
}
