import { CloseButton } from "@/components/editor/navigation/close-button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SynthesisTabContentProps {
    handleCloseBottomPanel: () => void;
}

export const SynthesisTabContent = ({
    handleCloseBottomPanel,
}: SynthesisTabContentProps) => {
    return (
        <ScrollArea className="relative h-full w-full">
            <div className="text-nowrap p-4">
                <header className="flex flex-row items-center justify-between pb-4">
                    <span className="text-xl font-medium">Synthesis</span>
                    <CloseButton onClick={handleCloseBottomPanel} />
                </header>
                <div className="space-y-3"></div>
            </div>
        </ScrollArea>
    );
};
