import { Session } from "next-auth";

import { HeaderDropdown } from "@/components/header/header-dropdown";

interface NavigationLoggedInProps {
    user: Session["user"];
}

export const NavigationLoggedIn = ({ user }: NavigationLoggedInProps) => {
    return (
        <nav className="absolute right-0 mr-2 flex flex-row items-center gap-x-3">
            <HeaderDropdown user={user} />
        </nav>
    );
};
