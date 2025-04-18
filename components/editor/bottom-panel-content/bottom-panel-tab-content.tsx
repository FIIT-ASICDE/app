import { BottomPanelContentTab, Configuration, SimulationOutput } from "@/lib/types/editor";

import { SimulationTabContent } from "@/components/editor/bottom-panel-content/simulation-tab-content";
import { SynthesisTabContent } from "@/components/editor/bottom-panel-content/synthesis-tab-content";

interface BottomPanelTabContentProps {
    activeBottomPanelContent: BottomPanelContentTab;
    handleCloseBottomPanel: () => void;
    configuration: Configuration | undefined;
    simulationOutput: Array<SimulationOutput>;
    lastSimulation: string | null;
}

export const BottomPanelTabContent = ({
    activeBottomPanelContent,
    handleCloseBottomPanel,
    configuration,
    simulationOutput,
    lastSimulation
}: BottomPanelTabContentProps) => {
    return (
        <div className="flex h-full">
            {activeBottomPanelContent === "simulation" && (
                <SimulationTabContent
                    handleCloseBottomPanel={handleCloseBottomPanel}
                    configuration={configuration}
                    simulationOutput={simulationOutput}
                    lastSimulation={lastSimulation}
                />
            )}

            {activeBottomPanelContent === "synthesis" && (
                <SynthesisTabContent
                    handleCloseBottomPanel={handleCloseBottomPanel}
                    configuration={configuration}
                />
            )}
        </div>
    );
};
