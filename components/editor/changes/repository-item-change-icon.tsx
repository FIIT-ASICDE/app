import { RepositoryItemChange } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { CircleDot, CirclePlus, CircleX, MoveUpRight, Pen } from "lucide-react";

interface ItemChangeIconProps {
    itemChange: RepositoryItemChange;
    className?: string;
}

export const RepositoryItemChangeIcon = ({
    itemChange,
    className,
}: ItemChangeIconProps) => {
    const fullClassName: string = cn("w-4 h-4", className);

    switch (itemChange.change.type) {
        case "added":
            return (
                <CirclePlus className={cn(fullClassName, "text-green-900")} />
            );
        case "modified":
            return <CircleDot className={cn(fullClassName, "text-blue-500")} />;
        case "deleted":
            return (
                <CircleX className={cn(fullClassName, "text-destructive")} />
            );
        case "renamed":
            return <Pen className={cn(fullClassName, "text-yellow-500")} />;
        case "moved":
            return (
                <MoveUpRight
                    className={cn(fullClassName, "text-badge-admin")}
                />
            );
    }
};
