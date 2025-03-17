import { RepositoryItemChange } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import {
    MoveUpRight,
    Pen,
    Plus,
    X,
    CircleDot
} from "lucide-react";

interface ItemChangeIconProps {
    itemChange: RepositoryItemChange;
    className?: string;
}

export const RepositoryItemChangeIcon = ({
    itemChange,
    className,
}: ItemChangeIconProps) => {
    const fullClassName: string = cn("w-4 h-4", className);
    
    switch (itemChange.changeType) {
        case "added":
            return <Plus className={fullClassName} />
        case "modified":
            return <CircleDot className={fullClassName} />
        case "deleted":
            return <X className={fullClassName} />
        case "renamed":
            return <Pen className={fullClassName} />;
        case "moved":
            return <MoveUpRight className={fullClassName} />
    }
};