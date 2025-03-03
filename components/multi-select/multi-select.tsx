"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { UserDisplay } from "@/lib/types/user";
import { Command as CommandPrimitive } from "cmdk";
import { Loader2, UsersRound } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MultiSelectProps {
    placeholder: string;
    elements: Array<UserDisplay>;
    value: Array<UserDisplay>;
    onInputChange?: (value: string) => void;
    filterValues?: (value: UserDisplay) => boolean;
    onChangeAction: (value: Array<UserDisplay>) => void;
    isLoading?: boolean;
}

export const MultiSelect = ({
    placeholder,
    elements,
    value,
    onInputChange,
    onChangeAction,
    filterValues,
    isLoading,
}: MultiSelectProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState("");

    const onInput = (value: string) => {
        setInputValue(value);
        onInputChange?.(value);
    };

    const handleUnselect = React.useCallback(
        (element: UserDisplay) => {
            onChangeAction(value.filter((s) => s.id !== element.id));
        },
        [onChangeAction, value],
    );

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        onChangeAction(value.slice(0, -1));
                    }
                }
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        [onChangeAction, value],
    );

    const selectables = elements
        .filter((element) => !value.some((v) => v.id === element.id))
        .filter((element) => filterValues?.(element) ?? true);

    return (
        <Command
            shouldFilter={false}
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent"
        >
            <div className="group rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex flex-wrap gap-3">
                    {value.map((element) => {
                        return (
                            <Tooltip key={element.username}>
                                <TooltipTrigger asChild>
                                    <button
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUnselect(element);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onClick={() => handleUnselect(element)}
                                    >
                                        <AvatarDisplay
                                            key={element.id}
                                            displayType="select"
                                            image={imgSrc(element.image)}
                                            name={element.username}
                                        />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {element.username}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                    <div className="relative h-full w-full items-center">
                        <UsersRound className="absolute top-0.5 h-4 w-4 align-middle text-muted-foreground" />
                        <CommandPrimitive.Input
                            ref={inputRef}
                            value={inputValue}
                            onValueChange={onInput}
                            onBlur={() => setOpen(false)}
                            onFocus={() => setOpen(true)}
                            placeholder={placeholder}
                            className="ml-2 w-full flex-1 pl-5 outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                </div>
            </div>

            <div className="relative mt-2">
                <CommandList>
                    {isLoading && (
                        <div className="animate-in absolute top-0 z-10 flex h-12 w-full items-center justify-center rounded-md border bg-popover text-center text-popover-foreground outline-none">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}
                    {open && selectables.length > 0 && (
                        <div className="animate-in absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground outline-none">
                            <CommandGroup className="h-12 overflow-auto">
                                {selectables.map((element) => {
                                    return (
                                        <CommandItem
                                            key={element.id}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={() => {
                                                onInput("");
                                                onChangeAction([
                                                    ...value,
                                                    element,
                                                ]);
                                            }}
                                            className={"cursor-pointer"}
                                        >
                                            <AvatarDisplay
                                                displayType={"select"}
                                                image={imgSrc(element.image)}
                                                name={element.username}
                                            />
                                            {element.username}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </div>
                    )}
                </CommandList>
            </div>
        </Command>
    );
};
