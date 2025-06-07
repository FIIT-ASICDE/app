import {
    BottomPanelContentTab,
    Configuration,
    SimulationOutput,
    SynthesisOutput,
} from "@/lib/types/editor";
import { ReactElement } from "react";

import { SimulationTabContent } from "@/components/editor/bottom-panel-content/simulation-tab-content";
import { SynthesisTabContent } from "@/components/editor/bottom-panel-content/synthesis-tab-content";

interface BottomPanelTabContentProps {
    activeBottomPanelContent: BottomPanelContentTab;
    handleCloseBottomPanel: () => void;
    configuration: Configuration | undefined;
    simulationOutput: Array<SimulationOutput>;
    lastSimulation: string | null;
    synthesisOutput: Array<SynthesisOutput>;
    lastSynthesis: string | null;
    onStartSimulationAction: () => void;
    onStartSynthesisAction: () => void;
}

/**
 * Tab content of the bottom panel on editor page
 *
 * @param {BottomPanelTabContentProps} props - Component props
 * @returns {ReactElement} Tab content component
 */
export const BottomPanelTabContent = ({
    activeBottomPanelContent,
    handleCloseBottomPanel,
    configuration,
    simulationOutput,
    lastSimulation,
    synthesisOutput,
    lastSynthesis,
    onStartSimulationAction,
    onStartSynthesisAction
}: BottomPanelTabContentProps): ReactElement => {
    return (
        <div className="flex h-full">
            {activeBottomPanelContent === "simulation" && (
                <SimulationTabContent
                    handleCloseBottomPanel={handleCloseBottomPanel}
                    configuration={configuration}
                    simulationOutput={simulationOutput}
                    lastSimulation={lastSimulation}
                    onStartSimulationAction={onStartSimulationAction}
                />
            )}

            {activeBottomPanelContent === "synthesis" && (
                <SynthesisTabContent
                    handleCloseBottomPanel={handleCloseBottomPanel}
                    configuration={configuration}
                    synthesisOutput={synthesisOutput}
                    lastSynthesis={lastSynthesis}
                    onStartSynthesisAction={onStartSynthesisAction}
                />
            )}
        </div>
    );
};
