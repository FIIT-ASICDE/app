import { ScrollArea } from "@/components/ui/scroll-area";
import { CloseButton } from "@/components/editor/navigation/close-button";

interface SimulationTabContentProps {
    handleCloseBottomPanel: () => void;
}

export const SimulationTabContent = ({
    handleCloseBottomPanel,
}: SimulationTabContentProps) => {
    return (
        <ScrollArea className="h-full w-full relative">
            <div className="p-4 text-nowrap">
                <header className="flex flex-row items-center justify-between pb-4">
                    <span className="text-xl font-medium">Simulation</span>
                    <CloseButton onClick={handleCloseBottomPanel} />
                </header>
                <div className="space-y-3">

                </div>
            </div>
        </ScrollArea>
    );
};