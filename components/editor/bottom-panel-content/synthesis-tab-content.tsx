import { CloseButton } from "@/components/editor/navigation/close-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

interface SynthesisTabContentProps {
    handleCloseBottomPanel: () => void;
}

export const SynthesisTabContent = ({
    handleCloseBottomPanel,
}: SynthesisTabContentProps) => {
    return (
        <div className="relative w-full text-nowrap p-4 pt-14">
            <header className="absolute left-4 right-4 top-4 flex flex-row items-center justify-between">
                <span className="text-xl font-medium">Synthesis</span>
                <CloseButton
                    onClick={handleCloseBottomPanel}
                    tooltip="Close panel"
                />
            </header>
            <ScrollArea className="h-full w-full">
                <div className="space-y-0">
                    <div className="flex flex-row items-center gap-x-2 text-muted-foreground">
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-sm">Synthesis output terminal</span>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
