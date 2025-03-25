import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Play, Settings } from "lucide-react";
import { SimulationConfiguration, SimulationType } from "@/lib/types/editor";
import { Dispatch, SetStateAction } from "react";
import { FileDisplayItem, FileItem } from "@/lib/types/repository";

interface SimulationButtonProps {
    setSimulationOpen: Dispatch<SetStateAction<boolean>>;
    onStartSimulation: (selectedType: SimulationType, selectedFile: FileDisplayItem | FileItem) => void;
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
                            onStartSimulation(simulationConfiguration.simulationType, simulationConfiguration.testBenchFile);
                        }
                    }}
                >
                    <Play className="h-5 w-5" />
                </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex flex-row gap-x-8 items-center">
                <span>Simulation</span>
                {simulationConfiguration && (
                    <div
                        className="hover:underline cursor-pointer text-muted-foreground flex flex-row items-center gap-x-2"
                        onClick={() => setSimulationOpen(true)}
                    >
                        <Settings className="w-4 h-4" />
                        Edit configuration
                    </div>
                )}
            </TooltipContent>
        </Tooltip>
    );
};