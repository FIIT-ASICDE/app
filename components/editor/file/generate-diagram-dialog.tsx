import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { RepositoryItem, FileDisplayItem } from "@/lib/types/repository";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { parseSystemVerilogTopModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/SystemVerilog/parseSystemVerilogTopModule";
import { createDiagramFromParsedModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/createDiagramFromParsedModule";
import {
    parseSystemVerilogModules
} from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/SystemVerilog/parseSystemVerilogModules";
import { ParsedModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/interfaces";
import { parseVHDLTopEntity } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/VHDL/parseVHDLTopEntity";
import { parseVhdlEntities } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/VHDL/parseVHDLEntities";

interface GenerateDiagramDialogProps {
    repositoryId: string;
    diagramFile: RepositoryItem;
    tree: RepositoryItem[];
    setTree: (items: RepositoryItem[]) => void;
}

export const GenerateDiagramDialog = ({
                                          repositoryId,
                                          diagramFile,
                                          tree,
                                          setTree,
                                      }: GenerateDiagramDialogProps) => {
    const [open, setOpen] = useState(false);
    const saveFileMutation = api.repo.saveFileContent.useMutation();

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

    const { data: allFiles } = api.repo.loadAllFilesInRepo.useQuery({
        ownerSlug: ownerName!,
        repositorySlug: repoName!,
    }, {
        enabled: open && !!ownerName && !!repoName,
    });

    const addGeneratedFileToTree = (name: string, absolutePath: string) => {
        const alreadyExists = tree.some(item => item.absolutePath === absolutePath);
        if (!alreadyExists) {
            const newFile: FileDisplayItem = {
                type: "file-display",
                name,
                lastActivity: new Date(),
                language: "diagram",
                absolutePath,
            };
            setTree([...tree, newFile]);
        }
    };

    const handleGenerateDiagram = () => {
        if (!fileData || !('content' in fileData)) {
            toast.error("Failed to load module content");
            return;
        }

        const isSystemVerilog = diagramFile.name.toLowerCase().endsWith(".sv");
        const isVHDL = diagramFile.name.toLowerCase().endsWith(".vhd") || diagramFile.name.toLowerCase().endsWith(".vhdl");

        try {
            if (isSystemVerilog) {
                const parsedTopModule = parseSystemVerilogTopModule(fileData.content as string);

                const svFiles = allFiles?.filter(
                    (file) =>
                        file.type === "file" &&
                        file.name.toLowerCase().endsWith(".sv") &&
                        file.content
                ) || [];

                const parsedModules: ParsedModule[] = svFiles.flatMap((file) => {
                    try {
                        return parseSystemVerilogModules(file.content);
                    } catch (err) {
                        console.warn(`Failed to parse modules in ${file.name}`, err);
                        return [];
                    }
                });

                const graph = createDiagramFromParsedModule(parsedTopModule, parsedModules);

                const fileName = diagramFile.name.replace(/\.sv$/i, ".bd");
                const filePath = diagramFile.absolutePath.replace(/[^/]+$/, fileName);

                saveFileMutation.mutate({
                    repoId: repositoryId,
                    path: filePath,
                    content: JSON.stringify(graph.toJSON(), null, 2),
                }, {
                    onSuccess: () => {
                        toast.success("Diagram generated");
                        addGeneratedFileToTree(fileName, filePath);
                        setOpen(false);
                    },
                    onError: (err) => {
                        toast.error("Failed to save file: " + err.message);
                    },
                });
            } else if (isVHDL) {
                const parsedTopEntity = parseVHDLTopEntity(fileData.content as string);

                console.log(parsedTopEntity);

                const vhdlFiles = allFiles?.filter(
                    (file) =>
                        file.type === "file" &&
                        (file.name.toLowerCase().endsWith(".vhd") || file.name.toLowerCase().endsWith(".vhdl")) &&
                        file.content
                ) || [];

                const parsedEntities: ParsedModule[] = vhdlFiles.flatMap((file) => {
                    try {
                        return parseVhdlEntities(file.content);
                    } catch (err) {
                        console.warn(`Failed to parse VHDL in ${file.name}`, err);
                        return [];
                    }
                });

                const graph = createDiagramFromParsedModule(parsedTopEntity, parsedEntities);


                const fileName = diagramFile.name.replace(/\.(vhd|vhdl)$/i, ".bd");
                const filePath = diagramFile.absolutePath.replace(/[^/]+$/, fileName);

                saveFileMutation.mutate({
                    repoId: repositoryId,
                    path: filePath,
                    content: JSON.stringify(graph.toJSON(), null, 2),
                }, {
                    onSuccess: () => {
                        toast.success("Diagram generated");
                        addGeneratedFileToTree(fileName, filePath);
                        setOpen(false);
                    },
                    onError: (err) => {
                        toast.error("Failed to save file: " + err.message);
                    },
                });
            } else {
                toast.error("Unsupported file type for diagram generation.");
            }
        } catch (err) {
            toast.error("Failed to generate diagram: " + (err as Error).message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex w-full cursor-default flex-row items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
                Generate Diagram
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">Generate Diagram</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 mt-4">
                    <Button onClick={handleGenerateDiagram} disabled={isFileLoading}>
                        {isFileLoading ? "Loading..." : "Generate Diagram"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
