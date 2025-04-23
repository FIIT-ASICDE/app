"use client";

import { api } from "@/lib/trpc/react";
import { FileItem, RepositoryItem } from "@/lib/types/repository";
import { File as FileIcon, Folder } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";

import { getTimeDeltaString } from "@/components/generic/generic";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface FileExplorerProps {
    ownerSlug: string;
    repoSlug: string;
    subPath: string;
    files: RepositoryItem[];
    setFilePreviewAction: Dispatch<SetStateAction<FileItem | undefined>>;
}

/**
 * Component that lets the user browse the contents of a repository
 *
 * @param {FileExplorerProps} props - Component props
 * @returns {ReactElement} File explorer component
 */
export default function FileExplorer({
    files,
    setFilePreviewAction,
    ownerSlug,
    repoSlug,
    subPath,
}: FileExplorerProps): ReactElement {
    const router = useRouter();
    const pathName = usePathname();

    const [fileName, setFileName] = useState<string>("");
    const repoItemQuery = api.repo.loadRepoItem.useQuery(
        {
            ownerSlug,
            repositorySlug: repoSlug,
            path: [subPath, fileName].join("/"),
        },
        { enabled: fileName !== "" },
    );

    const handleMouseOver = (element: RepositoryItem) => {
        if (element.type !== "file-display") {
            return;
        }
        setFileName(element.name);
    };

    const handleRowClick = async (element: RepositoryItem) => {
        if (element.type === "file-display") {
            setFileName(element.name);
            const file = repoItemQuery.data;
            if (!file || file.type !== "file") {
                throw new Error("file data not found or is not a file");
            }
            setFilePreviewAction(file);
        } else if (element.type === "file") {
            setFilePreviewAction(element);
        } else {
            router.push(`${pathName}/${element.name}`);
        }
    };

    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Last activity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subPath !== "" && (
                    <TableRow
                        className="cursor-pointer hover:bg-accent"
                        onClick={router.back}
                    >
                        <TableCell className="flex flex-row items-center gap-x-3 font-semibold">
                            <Folder className="h-5 w-5 text-muted-foreground" />
                            <span>..</span>
                        </TableCell>
                        <TableCell />
                    </TableRow>
                )}
                {files.map((element) => (
                    <TableRow
                        key={element.name}
                        className="cursor-pointer hover:bg-accent"
                        onMouseOver={() => handleMouseOver(element)}
                        onClick={() => handleRowClick(element)}
                    >
                        <TableCell className="flex flex-row items-center gap-x-3">
                            {element.type === "directory" ||
                            element.type === "directory-display" ? (
                                <Folder
                                    className="h-5 w-5 text-muted-foreground"
                                    fill={"currentColor"}
                                />
                            ) : (
                                <FileIcon className="h-5 w-5 text-muted-foreground" />
                            )}
                            <span className="font-semibold">
                                {element.name}
                            </span>
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                            {getTimeDeltaString(element.lastActivity)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
