"use client";

import { OnboardedUser } from "@/lib/types/user";
import { Search } from "lucide-react";
import { ReactElement, useState } from "react";

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
export const CommandBar = ({ user }: CommandBarProps): ReactElement => {
    const [commandOpen, setCommandOpen] = useState(false);

    return (
        <>
            <Button
                className="mx-auto w-auto border-none bg-header-button-hover font-normal text-muted-foreground"
                onClick={() => setCommandOpen(true)}
            >
                <Search className="text-muted-foreground" />
                Type a command or search...
            </Button>

            <CommandBarDialog
                user={user}
                commandOpen={commandOpen}
                setCommandOpen={setCommandOpen}
            />
        </>
    );
};
