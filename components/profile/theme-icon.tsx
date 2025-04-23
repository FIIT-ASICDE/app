import { Moon, Sun } from "lucide-react";
import { ReactElement } from "react";

interface ThemeIconProps {
    theme: string | undefined;
    className?: string;
    filled?: boolean;
}

/**
 * Icon component corresponding to the current user's theme
 *
 * @param {ThemeIconProps} props - Component props
 * @returns {ReactElement} Icon
 */
export const ThemeIcon = ({
    theme,
    className,
    filled,
}: ThemeIconProps): ReactElement => {
    if (theme === "light") {
        if (filled) {
            return <Sun className={className} fill={"currentColor"} />;
        } else {
            return <Sun className={className} />;
        }
    } else {
        if (filled) {
            return <Moon className={className} fill={"currentColor"} />;
        } else {
            return <Moon className={className} />;
        }
    }
};
