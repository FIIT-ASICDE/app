import { SimulationConfiguration, SimulationType } from "@/lib/types/editor";
import { FileDisplayItem, FileItem } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { Play, Settings } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SimulationButtonProps {
    setSimulationOpen: Dispatch<SetStateAction<boolean>>;
    onStartSimulation: (
        selectedType: SimulationType,
        selectedFile: FileDisplayItem | FileItem,
    ) => void;
    simulationConfiguration: SimulationConfiguration | undefined;
}

export const SimulationButton = ({
    setSimulationOpen,
    onStartSimulation,
    simulationConfiguration,
}: SimulationButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md p-0",
                        "text-header-foreground",
                        "hover:bg-header-button-hover hover:text-header-foreground",
                    )}
                    onClick={() => {
                        if (!simulationConfiguration) {
                            setSimulationOpen(true);
                        } else {
                            onStartSimulation(
                                simulationConfiguration.simulationType,
                                simulationConfiguration.testBenchFile,
                            );
                        }
                    }}
                >
                    <Play className="h-5 w-5" />
                </button>
            </TooltipTrigger>
            <TooltipContent
                side="right"
                className="flex flex-row items-center gap-x-8"
            >
                <span>Simulation</span>
                {simulationConfiguration && (
                    <div
                        className="flex cursor-pointer flex-row items-center gap-x-2 text-muted-foreground hover:underline"
                        onClick={() => setSimulationOpen(true)}
                    >
                        <Settings className="h-4 w-4" />
                        Edit configuration
                    </div>
                )}
            </TooltipContent>
        </Tooltip>
    );
};
