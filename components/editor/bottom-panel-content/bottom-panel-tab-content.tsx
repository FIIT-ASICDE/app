import { BottomPanelContentTab, Configuration } from "@/lib/types/editor";

import { SimulationTabContent } from "@/components/editor/bottom-panel-content/simulation-tab-content";
import { SynthesisTabContent } from "@/components/editor/bottom-panel-content/synthesis-tab-content";

interface BottomPanelTabContentProps {
    activeBottomPanelContent: BottomPanelContentTab;
    handleCloseBottomPanel: () => void;
    configuration: Configuration | undefined;
    simulationOutput: Array<string>;
}

export const BottomPanelTabContent = ({
    activeBottomPanelContent,
    handleCloseBottomPanel,
    configuration,
    simulationOutput
}: BottomPanelTabContentProps) => {
    return (
        <div className="flex h-full">
            {activeBottomPanelContent === "simulation" && (
                <SimulationTabContent
                    handleCloseBottomPanel={handleCloseBottomPanel}
                    configuration={configuration}
                    simulationOutput={simulationOutput}
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
