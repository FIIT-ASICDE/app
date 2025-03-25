import { BottomPanelContentTab } from "@/lib/types/editor";

import { SimulationTabContent } from "@/components/editor/bottom-panel-content/simulation-tab-content";
import { SynthesisTabContent } from "@/components/editor/bottom-panel-content/synthesis-tab-content";

interface BottomPanelTabContentProps {
    activeBottomPanelContent: BottomPanelContentTab;
    handleCloseBottomPanel: () => void;
}

export const BottomPanelTabContent = ({
    activeBottomPanelContent,
    handleCloseBottomPanel,
}: BottomPanelTabContentProps) => {
    return (
        <div className="flex h-full">
            {activeBottomPanelContent === "simulation" && (
                <SimulationTabContent
                    handleCloseBottomPanel={handleCloseBottomPanel}
                />
            )}

            {activeBottomPanelContent === "synthesis" && (
                <SynthesisTabContent
                    handleCloseBottomPanel={handleCloseBottomPanel}
                />
            )}
        </div>
    );
};
