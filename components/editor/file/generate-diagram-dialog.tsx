/**
 * Dialog component for generating block diagrams from HDL source files.
 * Supports both SystemVerilog (.sv) and VHDL (.vhd/.vhdl) input files.
 * The component handles parsing HDL files, creating visual diagrams,
 * and saving them in the repository.
 */

import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { RepositoryItem, FileDisplayItem } from "@/lib/types/repository";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createDiagramFromParsedModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/diagram-generation/create-diagram-from-parsed-module";
import {
    parseModules
} from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/system-verilog/parse-modules";
import { ParsedModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/diagram-generation/interfaces";
import { parseEntities } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/vhdl/parse-entities";
import {
    parseTopModule
} from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/system-verilog/parse-top-module";
import {
    parseTopEntity
} from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/vhdl/parse-top-entity";

/**
 * Props interface for the GenerateDiagramDialog component
 */
interface GenerateDiagramDialogProps {
    /** ID of the current repository */
    repositoryId: string;
    /** HDL source file to generate diagram from */
    diagramFile: RepositoryItem;
    /** Repository file tree structure */
    tree: RepositoryItem[];
    /** Function to update the file tree */
    setTree: (items: RepositoryItem[]) => void;
}

/**
 * Dialog component that provides functionality to generate block diagrams from HDL source files.
 * Supports both SystemVerilog and VHDL input files.
 */
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

    // Load source file content when dialog is opened
    const { data: fileData, isLoading: isFileLoading } = api.repo.loadRepoItem.useQuery({
        ownerSlug: ownerName as string,
        repositorySlug: repoName as string,
        path: diagramFile.absolutePath,
        loadItemsDisplaysDepth: 0,
    }, {
        enabled: open && !!ownerName && !!repoName,
    });

    // Load all HDL files in the repository for module/entity parsing
    const { data: allFiles } = api.repo.loadAllFilesInRepo.useQuery({
        ownerSlug: ownerName!,
        repositorySlug: repoName!,
    }, {
        enabled: open && !!ownerName && !!repoName,
    });

    /**
     * Adds a newly generated diagram file to the repository tree
     * @param name - Name of the generated diagram file
     * @param absolutePath - Full path of the file in the repository
     */
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

    /**
     * Main handler for diagram generation. Processes the input HDL file and creates
     * a corresponding block diagram. The function:
     * 1. Determines the HDL language (SystemVerilog or VHDL)
     * 2. Parses all related HDL files in the repository
     * 3. Creates a visual diagram representation
     * 4. Saves the diagram as a .bd file
     */
    const handleGenerateDiagram = () => {
        if (!fileData || !('content' in fileData)) {
            toast.error("Failed to load module content");
            return;
        }
        const isSystemVerilog = diagramFile.name.toLowerCase().endsWith(".sv");
        const isVHDL = diagramFile.name.toLowerCase().endsWith(".vhd") || diagramFile.name.toLowerCase().endsWith(".vhdl");
        try {
            // SystemVerilog processing path
            if (isSystemVerilog) {
                // Parse all SystemVerilog files in the repository
                const svFiles = allFiles?.filter(
                    (file) =>
                        file.type === "file" &&
                        file.name.toLowerCase().endsWith(".sv") &&
                        file.content
                ) || [];
                const parsedModules: ParsedModule[] = svFiles.flatMap((file) => {
                    try {
                        return parseModules(file.content);
                    } catch (err) {
                        console.warn(`Failed to parse modules in ${file.name}`, err);
                        return [];
                    }
                });
                // Parse the top module and create diagram
                const parsedTopModule = parseTopModule(fileData.content as string, parsedModules);
                const graph = createDiagramFromParsedModule(parsedTopModule);
                const fileName = diagramFile.name.replace(/\.sv$/i, ".bd");
                const filePath = diagramFile.absolutePath.replace(/[^/]+$/, fileName);
                
                // Save the generated diagram
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
            } 
            // VHDL processing path
            else if (isVHDL) {
                // Parse all VHDL files in the repository
                const vhdlFiles = allFiles?.filter(
                    (file) =>
                        file.type === "file" &&
                        (file.name.toLowerCase().endsWith(".vhd") || file.name.toLowerCase().endsWith(".vhdl")) &&
                        file.content
                ) || [];

                const parsedEntities: ParsedModule[] = vhdlFiles.flatMap((file) => {
                    try {
                        return parseEntities(file.content.toUpperCase());
                    } catch (err) {
                        console.warn(`Failed to parse VHDL in ${file.name}`, err);
                        return [];
                    }
                });
                
                // Parse the top entity and create diagram
                const parsedTopEntity = parseTopEntity((fileData.content as string).toUpperCase(), parsedEntities);
                const graph = createDiagramFromParsedModule(parsedTopEntity);

                const fileName = diagramFile.name.replace(/\.(vhd|vhdl)$/i, ".bd");
                const filePath = diagramFile.absolutePath.replace(/[^/]+$/, fileName);

                // Save the generated diagram
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
