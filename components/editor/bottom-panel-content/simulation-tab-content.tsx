import { CloseButton } from "@/components/editor/navigation/close-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Configuration } from "@/lib/types/editor";

interface SimulationTabContentProps {
    handleCloseBottomPanel: () => void;
    configuration: Configuration | undefined;
    simulationOutput: Array<string>;
}

export const SimulationTabContent = ({
    handleCloseBottomPanel,
    simulationOutput
}: SimulationTabContentProps) => {
    return (
        <div className="relative w-full text-nowrap p-4 pt-14">
            <header className="absolute left-4 right-4 top-4 flex flex-row items-center justify-between">
                <span className="text-xl font-medium">Simulation</span>
                <CloseButton
                    onClick={handleCloseBottomPanel}
                    tooltip="Close panel"
                />
            </header>
            <ScrollArea className="h-full w-full mt-4">
                <div className="space-y-0 font-mono text-black-400 text-sm">
                    {simulationOutput.map((line: string, i: number) => (
                        <div key={i}>{line}</div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
