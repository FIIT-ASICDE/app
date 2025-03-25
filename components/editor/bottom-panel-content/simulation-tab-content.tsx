import { CloseButton } from "@/components/editor/navigation/close-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

interface SimulationTabContentProps {
    handleCloseBottomPanel: () => void;
}

export const SimulationTabContent = ({
    handleCloseBottomPanel,
}: SimulationTabContentProps) => {
    return (
        <div className="relative text-nowrap p-4 pt-14 w-full">
            <header className="absolute right-4 top-4 left-4 flex flex-row items-center justify-between">
                <span className="text-xl font-medium">Simulation</span>
                <CloseButton onClick={handleCloseBottomPanel} />
            </header>
            <ScrollArea className="h-full w-full">
                <div className="space-y-0">
                    {Array(100).fill(1).map((n: number) => n + 1)
                        .map((n: number, index: number) => (
                            <div key={index} className="flex flex-row items-center gap-x-2">
                                <ChevronRight className="text-muted-foreground w-4 h-4" />
                                Line {n}
                            </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
