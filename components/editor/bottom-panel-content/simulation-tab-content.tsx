import { CloseButton } from "@/components/editor/navigation/close-button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SimulationTabContentProps {
    handleCloseBottomPanel: () => void;
}

export const SimulationTabContent = ({
    handleCloseBottomPanel,
}: SimulationTabContentProps) => {
    return (
        <ScrollArea className="relative h-full w-full">
            <div className="text-nowrap p-4">
                <header className="flex flex-row items-center justify-between pb-4">
                    <span className="text-xl font-medium">Simulation</span>
                    <CloseButton onClick={handleCloseBottomPanel} />
                </header>
                <div className="space-y-3"></div>
            </div>
        </ScrollArea>
    );
};
