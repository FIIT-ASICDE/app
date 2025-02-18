"use client";

import { Search } from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";

import { CommandBarDialog } from "@/components/command-bar-dialog/command-bar-dialog";
import { Button } from "@/components/ui/button";

interface CommandBarProps {
    user: Session["user"];
}

export const CommandBar = ({ user }: CommandBarProps) => {
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
