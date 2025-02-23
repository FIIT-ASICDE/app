import { CommandElementGroup } from "@/lib/types/generic";
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";

import { CommandOptions } from "@/components/generic/generic";
import {
    CommandDialog,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";

interface CommandBarDialogProps {
    user: Session["user"];
    commandOpen: boolean;
    setCommandOpen: Dispatch<SetStateAction<boolean>>;
}

export const CommandBarDialog = ({
    user,
    commandOpen,
    setCommandOpen,
}: CommandBarDialogProps) => {
    return (
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                {CommandOptions({ user }).map(
                    (group: CommandElementGroup, index: number) => (
                        <div key={index}>
                            <CommandGroup heading={group.groupDisplayTitle}>
                                {group.elements.map((element, i) => (
                                    <Link href={element.link} key={i} onClick={() => setCommandOpen(false)}>
                                        <CommandItem
                                            className="cursor-pointer"
                                        >
                                            <element.icon className="text-muted-foreground" />
                                            <span>{element.displayTitle}</span>
                                            {element.shortcut && (
                                                <CommandShortcut>
                                                    {element.shortcut.join("+")}
                                                </CommandShortcut>
                                            )}
                                        </CommandItem>
                                    </Link>
                                ))}
                            </CommandGroup>
                            {index < CommandOptions({ user }).length - 1 && (
                                <CommandSeparator />
                            )}
                        </div>
                    ),
                )}
            </CommandList>
        </CommandDialog>
    );
};
