import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { RepositoryItem, FileDisplayItem } from "@/lib/types/repository";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateSystemVerilogCode } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/CodeGeneration/SystemVerilogGeneration/SystemVerilogCodeGenerator";
import { generateVHDLCode } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/CodeGeneration/VHDLGeneration/VDHLCodeGenerator";
import { dia, shapes } from '@joint/core';
interface GenerateCodeDialogProps {
    repositoryId: string;
    diagramFile: RepositoryItem;
    tree: RepositoryItem[];
    setTree: (items: RepositoryItem[]) => void;
}
interface SerializedDiagram {
    cells: Array<{
        id: string;
        type: string;
        elType?: string;
        language?: string;
        [key: string]: unknown;
    }>;
    [key: string]: unknown;
}


export const GenerateCodeDialog = ({
                                       repositoryId,
                                       diagramFile,
                                       tree,
                                       setTree,
                                   }: GenerateCodeDialogProps) => {
    const [open, setOpen] = useState(false);
    const saveFileMutation = api.repo.saveFileContent.useMutation();



    function loadGraphFromSerializedBD(serialized: SerializedDiagram): dia.Graph {
        const graph = new dia.Graph({}, { cellNamespace: shapes });
        graph.fromJSON(serialized);
        return graph;
    }

    const { data } = api.repo.loadOwnerAndRepoById.useQuery({ repositoryId });

    const ownerName = data?.ownerName;
    const repoName = data?.repoName;


    const { data: fileData, isLoading: isFileLoading } = api.repo.loadRepoItem.useQuery({
        ownerSlug: ownerName as string,
        repositorySlug: repoName as string,
        path: diagramFile.absolutePath,
        loadItemsDisplaysDepth: 0,
    }, {
        enabled: open && !!ownerName && !!repoName,
    });

    const addGeneratedFileToTree = (name: string, absolutePath: string, language: string) => {
        const alreadyExists = tree.some(item => item.absolutePath === absolutePath);
        if (!alreadyExists) {
            const newFile: FileDisplayItem = {
                type: "file-display",
                name,
                lastActivity: new Date(),
                language,
                absolutePath,
            };
            setTree([...tree, newFile]);
        }
    };

    const handleSystemVerilogGenerate = () => {
        if (!fileData || !('content' in fileData)) {
            toast.error("Failed to load diagram content");
            return;
        }

        try {
            const serialized = JSON.parse(fileData.content as string);
            const graph = loadGraphFromSerializedBD(serialized);

            const fileName = diagramFile.name.replace(/\.bd$/, ".sv");
            const moduleName = diagramFile.name.replace(/\.bd$/, "");
            const filePath = diagramFile.absolutePath.replace(/[^/]+$/, fileName);
            const code = generateSystemVerilogCode(graph, moduleName);

            saveFileMutation.mutate({
                repoId: repositoryId,
                path: filePath,
                content: code,
            }, {
                onSuccess: () => {
                    toast.success("SystemVerilog file generated");
                    addGeneratedFileToTree(fileName, filePath, "system verilog");
                    setOpen(false);
                },
                onError: (err) => {
                    toast.error("Failed to save file: " + err.message);
                },
            });
        } catch (err) {
            toast.error("Failed to parse diagram JSON: " + (err as Error).message);
        }
    };
    const handleVHDLGenerate = () => {
        if (!fileData || !('content' in fileData)) {
            toast.error("Failed to load diagram content");
            return;
        }

        try {
            const serialized = JSON.parse(fileData.content as string);
            const graph = loadGraphFromSerializedBD(serialized);

            const fileName = diagramFile.name.replace(/\.bd$/, ".vhd");
            const moduleName = diagramFile.name.replace(/\.bd$/, "");
            const filePath = diagramFile.absolutePath.replace(/[^/]+$/, fileName);
            const code = generateVHDLCode(graph, moduleName);

            saveFileMutation.mutate({
                repoId: repositoryId,
                path: filePath,
                content: code,
            }, {
                onSuccess: () => {
                    toast.success("VHDL file generated");
                    addGeneratedFileToTree(fileName, filePath, "vhdl");
                    setOpen(false);
                },
                onError: (err) => {
                    toast.error("Failed to save file: " + err.message);
                },
            });
        } catch (err) {
            toast.error("Failed to parse diagram JSON: " + (err as Error).message);
        }
    };

    const getLockedLanguage = (serialized: SerializedDiagram): "SystemVerilog" | "VHDL" | null => {
        const languageSet = new Set<string>();

        serialized.cells.forEach((cell) => {
            const elType = cell.elType;
            if (
                elType &&
                ["module", "sram", "register", "input", "output", "splitter", "combiner", "multiplexer"].includes(elType)
            ) {
                const language = cell?.language;
                if (language) {
                    languageSet.add(language);
                }
            }
        });

        if (languageSet.size === 1) {
            return languageSet.has("VHDL") ? "VHDL" : "SystemVerilog";
        }

        return null;
    };

    const lockedLanguage = fileData && 'content' in fileData
        ? getLockedLanguage(JSON.parse(fileData.content as string))
        : null;

    console.log(lockedLanguage);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex w-full cursor-default flex-row items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
                Generate Code
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">Generate Code</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 mt-4">
                    <Button
                        onClick={handleSystemVerilogGenerate}
                        disabled={isFileLoading || !!(lockedLanguage && lockedLanguage !== "SystemVerilog")}
                    >
                        {isFileLoading ? "Loading..." : "Generate SystemVerilog Code"}
                    </Button>

                    <Button
                        onClick={handleVHDLGenerate}
                        disabled={isFileLoading || !!(lockedLanguage && lockedLanguage !== "VHDL")}
                    >
                        {isFileLoading ? "Loading..." : "Generate VHDL Code"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
