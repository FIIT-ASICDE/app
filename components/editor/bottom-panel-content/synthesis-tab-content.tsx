import { 
    Configuration,
    SynthesisOutput,
    SynthesisTab,
} from "@/lib/types/editor";
import { ReactElement, useState } from "react";
import { cn } from "@/lib/utils";

import { CloseButton } from "@/components/editor/navigation/close-button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SynthesisTabContentProps {
    handleCloseBottomPanel: () => void;
    configuration: Configuration | undefined;
    synthesisOutput: Array<SynthesisOutput>;
    lastSynthesis: string | null;
}

/**
 * Synthesis tab content for the bottom panel on editor page
 *
 * @param {SynthesisTabContentProps} props - Component props
 * @returns {ReactElement} Synthesis tab content component
 */
export const SynthesisTabContent = ({
    handleCloseBottomPanel,
    synthesisOutput,
    lastSynthesis
}: SynthesisTabContentProps): ReactElement => {
    const [activeTab, setActiveTab] = useState<SynthesisTab>("all");

    return (
        <div className="relative w-full text-nowrap p-4 pt-14">
            <header className="absolute left-4 right-4 top-4 flex flex-row items-center justify-between">
                <div className="flex flex-row items-baseline gap-x-3 font-medium">
                    <span
                        className={cn(
                            "cursor-pointer text-xl decoration-accent underline-offset-4",
                            activeTab === "all"
                                ? "underline"
                                : "text-muted-foreground hover:underline",
                        )}
                        onClick={() => setActiveTab("all")}
                    >
                        Synthesis
                    </span>
                    <span
                        className={cn(
                            "cursor-pointer text-xl decoration-accent underline-offset-4",
                            activeTab === "errors"
                                ? "underline"
                                : "text-muted-foreground hover:underline",
                        )}
                        onClick={() => setActiveTab("errors")}
                    >
                        Errors
                    </span>
                    <span
                        className={cn(
                            "cursor-pointer text-xl decoration-accent underline-offset-4",
                            activeTab === "lastSynthesis"
                                ? "underline"
                                : "text-muted-foreground hover:underline",
                        )}
                        onClick={() => setActiveTab("lastSynthesis")}
                    >
                        Last finished synthesis
                    </span>
                </div>
                <CloseButton
                    onClick={handleCloseBottomPanel}
                    tooltip="Close panel"
                />
            </header>
            <ScrollArea className="mt-4 h-full w-full">
                {activeTab === "all" && (
                    <div className="space-y-0 font-mono text-sm text-muted-foreground">
                        {synthesisOutput.map(
                            (line: SynthesisOutput, index: number) => (
                                <span key={index}>
                                    {line.content}
                                    <br />
                                </span>
                            ),
                        )}
                    </div>
                )}

                {activeTab === "errors" && (
                    <div className="space-y-0 font-mono text-sm text-muted-foreground">
                        {synthesisOutput
                            .filter((line) => line.type === "error")
                            .map((line, index) => (
                                <span key={index}>
                                    {line.content}
                                    <br />
                                </span>
                            ))}
                    </div>
                )}

                {activeTab === "lastSynthesis" && lastSynthesis != null && (
                    <div className="space-y-0 font-mono text-sm text-muted-foreground">
                        {lastSynthesis.split("\n").map((line, idx) => (
                            <div key={idx}>{line}</div>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};
