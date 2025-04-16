import { CloseButton } from "@/components/editor/navigation/close-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Configuration, SimulationOutput, SimulationTab } from "@/lib/types/editor";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SimulationTabContentProps {
    handleCloseBottomPanel: () => void;
    configuration: Configuration | undefined;
    simulationOutput: Array<SimulationOutput>;
}

export const SimulationTabContent = ({
    handleCloseBottomPanel,
    simulationOutput
}: SimulationTabContentProps) => {
    const [activeTab, setActiveTab] = useState<SimulationTab>("all");

    return (
        <div className="relative w-full text-nowrap p-4 pt-14">
            <header className="absolute left-4 right-4 top-4 flex flex-row items-center justify-between">
                <div className="flex flex-row gap-x-3 items-baseline font-medium">
                    <span className={cn("text-xl cursor-pointer underline-offset-4 decoration-accent",
                            activeTab === "all" ? "underline" : "text-muted-foreground hover:underline"
                        )} onClick={() => setActiveTab("all")}>
                        Simulation
                    </span>
                    <span className={cn("text-base cursor-pointer underline-offset-4 decoration-accent",
                        activeTab === "errors" ? "underline" : "text-muted-foreground hover:underline"
                    )} onClick={() => setActiveTab("errors")}>
                        Errors
                    </span>
                    <span className={cn("text-base cursor-pointer underline-offset-4 decoration-accent",
                        activeTab === "warnings" ? "underline" : "text-muted-foreground hover:underline"
                    )} onClick={() => setActiveTab("warnings")}>
                        Warnings
                    </span>
                </div>
                <CloseButton
                    onClick={handleCloseBottomPanel}
                    tooltip="Close panel"
                />
            </header>
            <ScrollArea className="h-full w-full mt-4">
                {activeTab === "all" && (
                    <div className="space-y-0 font-mono text-muted-foreground text-sm">
                        {simulationOutput.map((line: SimulationOutput, index: number) => (
                            <div key={index}>{line.content}</div>
                        ))}
                    </div>
                )}

                {activeTab === "errors" && (
                    <div className="space-y-0 font-mono text-muted-foreground text-sm">

                    </div>
                )}

                {activeTab === "warnings" && (
                    <div className="space-y-0 font-mono text-muted-foreground text-sm">

                    </div>
                )}
            </ScrollArea>
        </div>
    );
};
