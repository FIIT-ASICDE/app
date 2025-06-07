"use client";

import { useEffect } from "react";
import { CommandElementGroup } from "@/lib/types/generic";
import { OnboardedUser } from "@/lib/types/user";
import Link from "next/link";
import { Dispatch, ReactElement, SetStateAction } from "react";

import { CommandOptions } from "@/components/command/command-options";
import {
    CommandDialog,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CommandBarDialogProps {
    user: OnboardedUser;
    commandOpen: boolean;
    setCommandOpen: Dispatch<SetStateAction<boolean>>;
}
/**
 * Command bar dialog for quick navigation from the header
 *
 * @param {CommandBarDialogProps} props - Component props
 * @returns {ReactElement} Dialog component
 */
export const CommandBarDialog = ({
    user,
    commandOpen,
    setCommandOpen,
}: CommandBarDialogProps): ReactElement => {
    const commandOptions: Array<CommandElementGroup> = CommandOptions({ user });

    useEffect(() => {
        const handleEnter = (e: KeyboardEvent) => {
            if (!commandOpen) return;
            if (e.key === "Enter") {
                const selected = document.querySelector(
                    '[cmdk-item][aria-selected="true"]'
                ) as HTMLElement | null;
    
                if (selected) {
                    e.preventDefault();
                    selected.click();
                }
            }
        };
    
        window.addEventListener("keydown", handleEnter);
        return () => window.removeEventListener("keydown", handleEnter);
    }, [commandOpen]);

    return (
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <ScrollArea className="max-h-[300px]">
                <CommandList className="max-h-[90vh] overflow-clip p-0">
                    {commandOptions.map(
                        (group: CommandElementGroup, index: number) => (
                            <div key={index}>
                                <CommandGroup heading={group.groupDisplayTitle}>
                                    {group.elements.map((element, i) => (
                                        <Link
                                            href={element.link}
                                            key={i}
                                            onClick={() =>
                                                setCommandOpen(false)
                                            }
                                        >
                                            <CommandItem className="cursor-pointer">
                                                <element.icon className="text-muted-foreground" />
                                                <span>
                                                    {element.displayTitle}
                                                </span>
                                                {element.shortcut && (
                                                    <CommandShortcut>
                                                        {element.shortcut.join(
                                                            "+",
                                                        )}
                                                    </CommandShortcut>
                                                )}
                                            </CommandItem>
                                        </Link>
                                    ))}
                                </CommandGroup>
                                {index < commandOptions.length - 1 && (
                                    <CommandSeparator />
                                )}
                            </div>
                        ),
                    )}
                </CommandList>
            </ScrollArea>
        </CommandDialog>
    );
};
