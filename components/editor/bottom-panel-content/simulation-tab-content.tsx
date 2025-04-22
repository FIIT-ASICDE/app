import {
    Configuration,
    SimulationOutput,
    SimulationTab,
} from "@/lib/types/editor";
import { cn } from "@/lib/utils";
import { ReactElement, useState } from "react";

import { CloseButton } from "@/components/editor/navigation/close-button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SimulationTabContentProps {
    handleCloseBottomPanel: () => void;
    configuration: Configuration | undefined;
    simulationOutput: Array<SimulationOutput>;
    lastSimulation: string | null;
}

/**
 * Simulation tab content for the bottom panel on editor page
 *
 * @param {SimulationTabContentProps} props - Component props
 * @returns {ReactElement} Simulation tab content component
 */
export const SimulationTabContent = ({
    handleCloseBottomPanel,
    simulationOutput,
    lastSimulation,
}: SimulationTabContentProps): ReactElement => {
    const [activeTab, setActiveTab] = useState<SimulationTab>("all");

    return (
        <div className="relative w-full text-nowrap p-4 pt-14">
            <header className="absolute left-4 right-4 top-4 flex flex-row items-center justify-between">
                <div className="flex flex-row items-baseline gap-x-3 font-medium">
                    <span
                        className={cn(
                            "cursor-pointer text-xl decoration-accent underline-offset-4",
                            activeTab === "all"
                                ? "underline"
                                : "text-muted-foreground hover:underline",
                        )}
                        onClick={() => setActiveTab("all")}
                    >
                        Simulation
                    </span>
                    <span
                        className={cn(
                            "cursor-pointer text-xl decoration-accent underline-offset-4",
                            activeTab === "errors"
                                ? "underline"
                                : "text-muted-foreground hover:underline",
                        )}
                        onClick={() => setActiveTab("errors")}
                    >
                        Errors
                    </span>
                    <span
                        className={cn(
                            "cursor-pointer text-xl decoration-accent underline-offset-4",
                            activeTab === "lastSimulation"
                                ? "underline"
                                : "text-muted-foreground hover:underline",
                        )}
                        onClick={() => setActiveTab("lastSimulation")}
                    >
                        Last finished simulation
                    </span>
                </div>
                <CloseButton
                    onClick={handleCloseBottomPanel}
                    tooltip="Close panel"
                />
            </header>
            <ScrollArea className="mt-4 h-full w-full">
                {activeTab === "all" && (
                    <div className="space-y-0 font-mono text-sm text-muted-foreground">
                        {simulationOutput.map(
                            (line: SimulationOutput, index: number) => (
                                <span key={index} className="text-wrap">
                                    {line.content}
                                    <br />
                                </span>
                            ),
                        )}
                    </div>
                )}

                {activeTab === "errors" && (
                    <div className="space-y-0 font-mono text-sm text-muted-foreground">
                        {simulationOutput
                            .filter((line: SimulationOutput) => line.type === "error")
                            .map((line: SimulationOutput, index: number) => (
                                <span key={index} className="text-wrap">
                                    {line.content}
                                    <br />
                                </span>
                            ))}
                    </div>
                )}

                {activeTab === "lastSimulation" && lastSimulation != null && (
                    <div className="space-y-0 font-mono text-sm text-muted-foreground">
                        {lastSimulation.split("\n").map((line: string, index: number) => (
                            <span key={index} className="text-wrap">
                                {line}
                                <br />
                            </span>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};
