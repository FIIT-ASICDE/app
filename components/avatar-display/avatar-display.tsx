import { AvatarDisplayType } from "@/lib/types/generic";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarDisplayProps {
    displayType: AvatarDisplayType;
    image?: string;
    name: string;
}

export const AvatarDisplay = ({
    displayType,
    image,
    name,
}: AvatarDisplayProps) => {
    const getAvatarSize = () => {
        switch (displayType) {
            case "heading":
                return "w-12 h-12";
            case "card":
                return "w-10 h-10";
            case "select":
                return "w-7 h-7";
            case "profile":
                return "w-20 h-20";
            default:
                return "";
        }
    };

    return (
        <Avatar
            className={cn(
                "overflow-hidden rounded-full hover:opacity-80",
                getAvatarSize(),
            )}
        >
            <AvatarImage src={image} alt={name + "'s icon"} />
            <AvatarFallback
                className={cn(
                    "text-lg text-muted-foreground",
                    displayType === "profile" ? "text-2xl" : "text-lg",
                )}
            >
                {name ? name[0].toUpperCase() : ""}
            </AvatarFallback>
        </Avatar>
    );
};
