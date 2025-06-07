"use client";

import { OnboardedUser } from "@/lib/types/user";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { CommandBarDialog } from "@/components/command/command-bar-dialog";
import { Button } from "@/components/ui/button";

interface CommandBarProps {
    user: OnboardedUser;
}

/**
 * Command bar component used in the header
 *
 * @param {CommandBarProps} props - Component props
 * @returns {ReactElement} Command bar component
 */
export const CommandBar = ({ user }: CommandBarProps): React.ReactElement => {
    const [commandOpen, setCommandOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
            const isShortcut = (isMac && e.metaKey && e.key === "k") || (!isMac && e.ctrlKey && e.key === "k");

            if (isShortcut) {
                e.preventDefault();
                setCommandOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <Button
                size="icon"
                variant="ghost"
                className="mr-2 rounded-full p-2 hover:bg-header-button-hover transition-all"
                onClick={() => setCommandOpen(true)}
            >
                <Search className="text-muted-foreground" />
            </Button>

            <CommandBarDialog
                user={user}
                commandOpen={commandOpen}
                setCommandOpen={setCommandOpen}
            />
        </>
    );
};
