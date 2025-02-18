import { Moon, Sun } from "lucide-react";

interface ThemeIconProps {
    theme: string | undefined;
    className?: string;
    filled?: boolean;
}

export const ThemeIcon = ({ theme, className, filled }: ThemeIconProps) => {
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
