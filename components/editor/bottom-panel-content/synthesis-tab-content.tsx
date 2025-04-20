import { ChevronRight } from "lucide-react";

import { CloseButton } from "@/components/editor/navigation/close-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Configuration } from "@/lib/types/editor";
import { ReactElement } from "react";

interface SynthesisTabContentProps {
    handleCloseBottomPanel: () => void;
    configuration: Configuration | undefined;
}

/**
 * Synthesis tab content for the bottom panel on editor page
 *
 * @param {SynthesisTabContentProps} props - Component props
 * @returns {ReactElement} Synthesis tab content component
 */
export const SynthesisTabContent = ({
    handleCloseBottomPanel,
    configuration,
}: SynthesisTabContentProps): ReactElement => {
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
                        <span className="text-sm">
                            Synthesis output terminal
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">Type: {configuration?.synthesis.type}</span>
                        <span className="text-muted-foreground text-sm">TestBench: {configuration?.synthesis.file.absolutePath}</span>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
