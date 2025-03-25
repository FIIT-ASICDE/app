import { SimulationConfiguration, SimulationType } from "@/lib/types/editor";
import {
    FileDisplayItem,
    FileItem,
    Repository,
    RepositoryItem,
} from "@/lib/types/repository";
import { Portal } from "@radix-ui/react-portal";
import { FileIcon, Info, Play } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SimulationDialogProps {
    repository: Repository;
    onStartSimulation: (
        selectedType: SimulationType,
        selectedFile: RepositoryItem,
    ) => void;
    simulationOpen: boolean;
    setSimulationOpen: Dispatch<SetStateAction<boolean>>;
    setSimulationConfiguration: Dispatch<
        SetStateAction<SimulationConfiguration | undefined>
    >;
}

export const SimulationDialog = ({
    repository,
    onStartSimulation,
    simulationOpen,
    setSimulationOpen,
    setSimulationConfiguration,
}: SimulationDialogProps) => {
    const [selectedType, setSelectedType] = useState<SimulationType>();
    const [selectedFile, setSelectedFile] = useState<
        FileDisplayItem | FileItem
    >();

    const [fileSelectOpen, setFileSelectOpen] = useState<boolean>(false);
    const [hoveredType, setHoveredType] = useState<SimulationType>();

    const files: Array<FileDisplayItem | FileItem> =
        repository.tree?.filter(
            (repositoryItem: RepositoryItem) =>
                repositoryItem.type === "file" ||
                repositoryItem.type === "file-display",
        ) ?? [];

    const selectTriggerRef = useRef<HTMLButtonElement | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{
        top: number;
        left: number;
    }>({ top: 0, left: 0 });

    useEffect(() => {
        if (selectTriggerRef.current) {
            const rect = selectTriggerRef.current.getBoundingClientRect();
            setTooltipPosition({ top: rect.top, left: rect.right + 10 });
        }
    }, [hoveredType, simulationOpen]);

    const getSimulationTypeInfo = () => {
        if (!hoveredType) return undefined;

        const getSimulationTypeContent = () => {
            switch (hoveredType) {
                case "verilatorC++":
                    return "Verilator C++ requires a C++ TestBench file.";
                case "verilatorSystemVerilog":
                    return "Verilator SystemVerilog requires a SystemVerilog TestBench file.";
                case "icarusVerilog":
                    return "Icarus Verilog requires a SystemVerilog TestBench file.";
            }
        };

        return (
            <Portal>
                <div
                    className="fixed z-50 flex w-64 flex-row items-center gap-x-2 rounded border border-accent bg-card p-2 text-sm shadow"
                    style={{
                        top: tooltipPosition.top,
                        left: tooltipPosition.left,
                    }}
                >
                    <Info className="mr-2 block max-h-5 min-h-5 min-w-5 max-w-5 text-muted-foreground" />
                    {getSimulationTypeContent()}
                </div>
            </Portal>
        );
    };

    const getFiles = () => {
        if (files.length <= 0) return [];

        if (selectedType === undefined) {
            return files;
        }

        if (selectedType === "verilatorC++") {
            return files.filter(
                (fileItem: FileItem | FileDisplayItem) =>
                    fileItem.language === "cpp",
            );
        }
        return files.filter(
            (fileItem: FileItem | FileDisplayItem) =>
                fileItem.language === "systemVerilog",
        );
    };

    const getGroupHeading = () => {
        switch (selectedType) {
            case "verilatorC++":
                return "C++ files in " + repository.name;
            case "verilatorSystemVerilog":
                return "System Verilog files in " + repository.name;
            case "icarusVerilog":
                return "System Verilog files in " + repository.name;
            default:
                return "Files in " + repository.name;
        }
    };

    const getSimulationMessage = () => {
        if (selectedType === undefined || selectedFile === undefined) {
            return undefined;
        }

        const typeTitle: string =
            selectedType === "verilatorC++"
                ? "Verilator C++"
                : selectedType === "verilatorSystemVerilog"
                  ? "Verilator System Verilog"
                  : "Icarus Verilog";
        const fileName: string =
            selectedFile.name.split("/").pop() ?? selectedFile.name;

        return (
            <p className="text-sm text-muted-foreground">
                You are about to start a
                <span className="text-foreground"> {typeTitle} </span>
                simulation with
                <span className="text-foreground"> {fileName} </span>
                as your TestBench file.
            </p>
        );
    };

    return (
        <Dialog open={simulationOpen} onOpenChange={setSimulationOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Simulation
                    </DialogTitle>
                    <DialogDescription>
                        You can start the simulation of your project by
                        selecting a simulation type and a TestBench file.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-y-2">
                    <Label className="text-sm text-muted-foreground">
                        Simulation type
                    </Label>
                    <div className="relative">
                        <Select
                            value={selectedType}
                            onValueChange={(value: SimulationType) => {
                                setHoveredType(undefined);
                                setSelectedType(value);
                                setSelectedFile(undefined);
                            }}
                        >
                            <SelectTrigger ref={selectTriggerRef}>
                                <SelectValue placeholder="Select simulation type" />
                            </SelectTrigger>
                            <SelectContent className="relative">
                                <SelectItem
                                    value="verilatorC++"
                                    onMouseEnter={() =>
                                        setHoveredType("verilatorC++")
                                    }
                                    onMouseLeave={() =>
                                        setHoveredType(undefined)
                                    }
                                >
                                    Verilator C++
                                </SelectItem>
                                <SelectItem
                                    value="verilatorSystemVerilog"
                                    onMouseEnter={() =>
                                        setHoveredType("verilatorSystemVerilog")
                                    }
                                    onMouseLeave={() =>
                                        setHoveredType(undefined)
                                    }
                                >
                                    Verilator SystemVerilog
                                </SelectItem>
                                <SelectItem
                                    value="icarusVerilog"
                                    onMouseEnter={() =>
                                        setHoveredType("icarusVerilog")
                                    }
                                    onMouseLeave={() =>
                                        setHoveredType(undefined)
                                    }
                                >
                                    Icarus Verilog
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {getSimulationTypeInfo()}
                    </div>
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label className="text-sm text-muted-foreground">
                        TestBench file
                    </Label>
                    <Button
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-normal ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        onClick={() => setFileSelectOpen(true)}
                    >
                        {selectedFile ? (
                            <div className="flex flex-row items-center justify-start gap-x-2">
                                <FileIcon className="h-4 w-4 text-muted-foreground" />
                                {selectedFile.name}
                            </div>
                        ) : (
                            "Select a TestBench file"
                        )}
                    </Button>
                </div>

                <CommandDialog
                    open={fileSelectOpen}
                    onOpenChange={setFileSelectOpen}
                >
                    <CommandInput placeholder="Select a TestBench file..." />
                    <ScrollArea className="h-full max-h-60">
                        <CommandList>
                            <CommandGroup heading={getGroupHeading()}>
                                {getFiles().map(
                                    (fileItem: FileItem | FileDisplayItem) => (
                                        <CommandItem
                                            key={fileItem.name}
                                            onSelect={() => {
                                                setFileSelectOpen(false);
                                                setSelectedFile(fileItem);
                                            }}
                                            className="flex flex-row items-center gap-x-2"
                                        >
                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                            {fileItem.name}
                                        </CommandItem>
                                    ),
                                )}
                                <CommandEmpty>
                                    {selectedType === "verilatorC++"
                                        ? "No C++ files found"
                                        : "No SystemVerilog files found"}
                                </CommandEmpty>
                            </CommandGroup>
                        </CommandList>
                    </ScrollArea>
                </CommandDialog>

                {getSimulationMessage()}

                <DialogFooter className="mt-5 w-full">
                    <Button
                        variant="default"
                        className="w-full hover:bg-primary-button-hover"
                        onClick={() => {
                            setSelectedType(undefined);
                            setSelectedFile(undefined);
                            setSimulationOpen(false);
                            setSimulationConfiguration({
                                simulationType: selectedType!,
                                testBenchFile: selectedFile!,
                            });
                            console.log("simulation configured");
                            onStartSimulation(selectedType!, selectedFile!);
                        }}
                        disabled={
                            selectedType === undefined ||
                            selectedFile === undefined
                        }
                    >
                        <Play />
                        Start simulation
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
