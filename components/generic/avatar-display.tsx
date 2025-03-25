import { AvatarDisplayType, AvatarProportions } from "@/lib/types/generic";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarDisplayProps {
    displayType: AvatarDisplayType;
    image?: string;
    name: string;
    className?: string;
}

export const AvatarDisplay = ({
    displayType,
    image,
    name,
    className,
}: AvatarDisplayProps) => {
    const getAvatarProportions = (): AvatarProportions => {
        switch (displayType) {
            case "profile":
                return {
                    avatarSize: "w-20 h-20",
                    fallbackFontSize: "text-2xl",
                };
            case "heading":
                return {
                    avatarSize: "w-12 h-12",
                    fallbackFontSize: "text-xl",
                };
            case "card":
                return {
                    avatarSize: "w-10 h-10",
                    fallbackFontSize: "text-lg",
                };
            case "select":
                return {
                    avatarSize: "w-7 h-7",
                    fallbackFontSize: "text-base",
                };
            default:
                return {
                    avatarSize: "",
                    fallbackFontSize: "",
                };
        }
    };

    const avatarProportions: AvatarProportions = getAvatarProportions();

    return (
        <Avatar
            className={cn(
                "overflow-hidden rounded-full hover:opacity-80",
                avatarProportions.avatarSize,
            )}
        >
            <AvatarImage src={image} alt={name + "'s icon"} />
            <AvatarFallback
                className={cn(
                    "text-muted-foreground",
                    avatarProportions.fallbackFontSize,
                    className,
                )}
            >
                {name ? name[0].toUpperCase() : ""}
            </AvatarFallback>
        </Avatar>
    );
};
