import {
    Configuration,
    SimulationType,
    SynthesisType,
} from "@/lib/types/editor";
import { FileDisplayItem, FileItem, Repository } from "@/lib/types/repository";
import { Portal } from "@radix-ui/react-portal";
import { FileIcon, Info, Save } from "lucide-react";
import {
    Dispatch,
    ReactElement,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { toast } from "sonner";

import { CloseButton } from "@/components/editor/navigation/close-button";
import { getFilesFromRepo } from "@/components/generic/generic";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface ConfigurationTabContentProps {
    repository: Repository;
    handleCloseSidebarAction: () => void;
    configuration: Configuration | undefined;
    setConfigurationAction: Dispatch<SetStateAction<Configuration | undefined>>;
}

/**
 * Tab content component that lets the user change the configuration of simulation and synthesis
 *
 * @param {ConfigurationTabContentProps} props - Component props
 * @returns {ReactElement} Tab content component
 */
export const ConfigurationTabContent = ({
    repository,
    handleCloseSidebarAction,
    configuration,
    setConfigurationAction,
}: ConfigurationTabContentProps): ReactElement => {
    const [selectedSimulationType, setSelectedSimulationType] = useState<
        SimulationType | undefined
    >(undefined);
    const [
        selectedSimulationTestBenchFile,
        setSelectedSimulationTestBenchFile,
    ] = useState<FileDisplayItem | FileItem | undefined>(undefined);

    const [selectedSynthesisType, setSelectedSynthesisType] = useState<
        SynthesisType | undefined
    >("yosys");
    const [selectedSynthesisFile, setSelectedSynthesisFile] = useState<
        FileDisplayItem | FileItem | undefined
    >(undefined);

    const [simulationFileSelectOpen, setSimulationFileSelectOpen] =
        useState<boolean>(false);
    const [hoveredType, setHoveredType] = useState<SimulationType>();

    const [synthesisFileSelectOpen, setSynthesisFileSelectOpen] =
        useState<boolean>(false);

    const files: Array<FileItem | FileDisplayItem> = getFilesFromRepo(
        repository.tree,
    );

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
    }, [hoveredType]);

    const getSimulationTypeInfo = () => {
        if (!hoveredType) return undefined;

        const getSimulationTypeContent = () => {
            switch (hoveredType) {
                case "verilatorC++":
                    return "Verilator C++ requires a C++ TestBench file.";
                case "verilatorSystemVerilog":
                    return "Verilator SystemVerilog requires a SystemVerilog TestBench file.";
                case "icarusVerilog":
                    return "Icarus Verilog requires a Verilog TestBench file.";
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

    const getSimulationFiles = () => {
        if (files.length <= 0) return [];

        if (selectedSimulationType === undefined) {
            return files;
        }

        if (selectedSimulationType === "verilatorC++") {
            return files.filter(
                (fileItem: FileItem | FileDisplayItem) =>
                    fileItem.language === "c++",
            );
        } else if (selectedSimulationType === "verilatorSystemVerilog") {
            return files.filter(
                (fileItem: FileItem | FileDisplayItem) =>
                    fileItem.language === "system verilog",
            );
        } else {
            return files.filter(
                (fileItem: FileItem | FileDisplayItem) =>
                    fileItem.language === "verilog",
            );
        }
    };

    const getSynthesisFiles = () => {
        if (files.length <= 0) return [];

        if (selectedSynthesisType === undefined) {
            return files;
        }

        if (selectedSynthesisType === "yosys") {
            return files.filter(
                (fileItem: FileItem | FileDisplayItem) =>
                    fileItem.language === "verilog",
            );
        }
        return files;
    };

    const getGroupHeading = () => {
        switch (selectedSimulationType) {
            case "verilatorC++":
                return "C++ files in " + repository.name;
            case "verilatorSystemVerilog":
                return "System Verilog files in " + repository.name;
            case "icarusVerilog":
                return "Verilog files in " + repository.name;
            default:
                return "Files in " + repository.name;
        }
    };

    return (
        <div className="relative flex h-full w-full flex-col">
            <header className="flex w-full flex-col gap-y-3 p-4">
                <div className="flex flex-row items-center justify-between gap-x-3">
                    <span className="pr-8 text-lg font-medium">
                        Configuration
                    </span>
                    <CloseButton
                        onClick={handleCloseSidebarAction}
                        tooltip="Close sidebar"
                        className="absolute right-4 top-4"
                    />
                </div>
            </header>

            <Separator />

            <ScrollArea className="relative h-full w-full">
                <div className="text-nowrap p-4">
                    <div className="space-y-7">
                        <div className="space-y-2">
                            <Label className="font-medium text-muted-foreground">
                                Simulation
                            </Label>
                            <div className="space-y-1">
                                <div className="flex flex-col gap-y-2">
                                    <div className="relative">
                                        <Select
                                            value={selectedSimulationType}
                                            onValueChange={(
                                                value: SimulationType,
                                            ) => {
                                                setHoveredType(undefined);
                                                setSelectedSimulationType(
                                                    value,
                                                );
                                                setSelectedSimulationTestBenchFile(
                                                    undefined,
                                                );
                                            }}
                                        >
                                            <SelectTrigger
                                                ref={selectTriggerRef}
                                            >
                                                <SelectValue placeholder="Select simulation type" />
                                            </SelectTrigger>
                                            <SelectContent className="relative">
                                                <SelectItem
                                                    value="verilatorC++"
                                                    onMouseEnter={() =>
                                                        setHoveredType(
                                                            "verilatorC++",
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredType(
                                                            undefined,
                                                        )
                                                    }
                                                >
                                                    Verilator C++
                                                </SelectItem>
                                                <SelectItem
                                                    value="verilatorSystemVerilog"
                                                    onMouseEnter={() =>
                                                        setHoveredType(
                                                            "verilatorSystemVerilog",
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredType(
                                                            undefined,
                                                        )
                                                    }
                                                >
                                                    Verilator SystemVerilog
                                                </SelectItem>
                                                <SelectItem
                                                    value="icarusVerilog"
                                                    onMouseEnter={() =>
                                                        setHoveredType(
                                                            "icarusVerilog",
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredType(
                                                            undefined,
                                                        )
                                                    }
                                                >
                                                    Icarus Verilog
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {getSimulationTypeInfo()}
                                    </div>

                                    <Button
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-normal ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                        onClick={() =>
                                            setSimulationFileSelectOpen(true)
                                        }
                                    >
                                        {selectedSimulationTestBenchFile ? (
                                            <div className="flex flex-row items-center justify-start gap-x-2 text-foreground">
                                                <FileIcon className="h-4 w-4 text-muted-foreground" />
                                                {
                                                    selectedSimulationTestBenchFile.name
                                                }
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                Select a TestBench file
                                            </span>
                                        )}
                                    </Button>
                                </div>

                                <CommandDialog
                                    open={simulationFileSelectOpen}
                                    onOpenChange={setSimulationFileSelectOpen}
                                >
                                    <CommandInput placeholder="Select a TestBench file..." />
                                    <ScrollArea className="h-full max-h-60">
                                        <CommandList>
                                            <CommandGroup
                                                heading={getGroupHeading()}
                                            >
                                                {getSimulationFiles().map(
                                                    (
                                                        fileItem:
                                                            | FileItem
                                                            | FileDisplayItem,
                                                    ) => (
                                                        <CommandItem
                                                            key={
                                                                fileItem.absolutePath
                                                            }
                                                            onSelect={() => {
                                                                setSimulationFileSelectOpen(
                                                                    false,
                                                                );
                                                                setSelectedSimulationTestBenchFile(
                                                                    fileItem,
                                                                );
                                                            }}
                                                            className="flex flex-row items-center gap-x-2"
                                                        >
                                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                                            {fileItem.name}
                                                        </CommandItem>
                                                    ),
                                                )}
                                                <CommandEmpty>
                                                    {selectedSimulationType ===
                                                    "verilatorC++"
                                                        ? "No C++ files found"
                                                        : selectedSimulationType ===
                                                            "verilatorSystemVerilog"
                                                          ? "No SystemVerilog files found"
                                                          : "No Verilog files found"}
                                                </CommandEmpty>
                                            </CommandGroup>
                                        </CommandList>
                                    </ScrollArea>
                                </CommandDialog>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-medium text-muted-foreground">
                                Synthesis
                            </Label>
                            <div className="space-y-1">
                                <div className="flex flex-col gap-y-2">
                                    <div className="relative">
                                        <Select
                                            defaultValue="yosys"
                                            value={selectedSynthesisType}
                                            onValueChange={(
                                                value: SynthesisType,
                                            ) => {
                                                setSelectedSynthesisType(value);
                                                setSelectedSynthesisFile(
                                                    undefined,
                                                );
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select synthesis type" />
                                            </SelectTrigger>
                                            <SelectContent className="relative">
                                                <SelectItem value="yosys">
                                                    Yosys
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-normal ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                        onClick={() =>
                                            setSynthesisFileSelectOpen(true)
                                        }
                                    >
                                        {selectedSynthesisFile ? (
                                            <div className="flex flex-row items-center justify-start gap-x-2 text-foreground">
                                                <FileIcon className="h-4 w-4 text-muted-foreground" />
                                                {selectedSynthesisFile.name}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                Select a Verilog file
                                            </span>
                                        )}
                                    </Button>
                                </div>

                                <CommandDialog
                                    open={synthesisFileSelectOpen}
                                    onOpenChange={setSynthesisFileSelectOpen}
                                >
                                    <CommandInput placeholder="Select a file..." />
                                    <ScrollArea className="h-full max-h-60">
                                        <CommandList>
                                            <CommandGroup
                                                heading={
                                                    "Verilog files in " +
                                                    repository.name
                                                }
                                            >
                                                {getSynthesisFiles().map(
                                                    (
                                                        fileItem:
                                                            | FileItem
                                                            | FileDisplayItem,
                                                    ) => (
                                                        <CommandItem
                                                            key={
                                                                fileItem.absolutePath
                                                            }
                                                            onSelect={() => {
                                                                setSynthesisFileSelectOpen(
                                                                    false,
                                                                );
                                                                setSelectedSynthesisFile(
                                                                    fileItem,
                                                                );
                                                            }}
                                                            className="flex flex-row items-center gap-x-2"
                                                        >
                                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                                            {fileItem.name}
                                                        </CommandItem>
                                                    ),
                                                )}
                                                <CommandEmpty>
                                                    No Verilog files found
                                                </CommandEmpty>
                                            </CommandGroup>
                                        </CommandList>
                                    </ScrollArea>
                                </CommandDialog>
                            </div>
                        </div>

                        <div className="flex w-full flex-row gap-x-3">
                            <Button
                                variant="outline"
                                className="w-1/2"
                                onClick={() => handleCloseSidebarAction()}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="default"
                                className="w-1/2 hover:bg-primary-button-hover"
                                disabled={
                                    selectedSimulationType === undefined ||
                                    selectedSimulationTestBenchFile ===
                                        undefined ||
                                    selectedSynthesisType === undefined ||
                                    selectedSynthesisFile === undefined
                                }
                                onClick={() => {
                                    if (
                                        selectedSimulationType &&
                                        selectedSimulationTestBenchFile &&
                                        selectedSynthesisType &&
                                        selectedSynthesisFile
                                    ) {
                                        const newConfiguration: Configuration =
                                            {
                                                ...configuration,
                                                simulation: {
                                                    type: selectedSimulationType,
                                                    testBench:
                                                        selectedSimulationTestBenchFile,
                                                },
                                                synthesis: {
                                                    type: selectedSynthesisType,
                                                    file: selectedSynthesisFile,
                                                },
                                            };
                                        setConfigurationAction(
                                            newConfiguration,
                                        );
                                        localStorage.setItem(
                                            "configuration",
                                            JSON.stringify(newConfiguration),
                                        );

                                        toast.success(
                                            "Configuration saved successfully",
                                        );

                                        handleCloseSidebarAction();
                                    } else {
                                        toast.error(
                                            "Every input has to be filled to save a configuration",
                                        );
                                    }
                                }}
                            >
                                <Save />
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
