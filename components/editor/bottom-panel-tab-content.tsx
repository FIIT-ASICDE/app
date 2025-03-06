import { BottomPanelContentTab } from "@/lib/types/editor";

interface BottomPanelTabContentProps {
    activeBottomPanelContent: BottomPanelContentTab;
}

export const BottomPanelTabContent = ({
    activeBottomPanelContent,
}: BottomPanelTabContentProps) => {
    return (
        <div className="p-2">
            {activeBottomPanelContent === "terminal" && (
                <div className="text-nowrap p-2">
                    <header className="pb-4 text-xl font-medium">
                        Terminal
                    </header>
                </div>
            )}

            {activeBottomPanelContent === "settings" && (
                <div className="text-nowrap p-2">
                    <header className="pb-4 text-xl font-medium">
                        Settings
                    </header>
                </div>
            )}
        </div>
    );
};