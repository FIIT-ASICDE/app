import { OnboardedUser } from "@/lib/types/user";

import { HeaderDropdown } from "@/components/header/header-dropdown";
import { ReactElement } from "react";

interface NavigationLoggedInProps {
    user: OnboardedUser;
}

/**
 * Navigation component for the logged-in user
 *
 * @param {NavigationLoggedInProps} props - Component props
 * @returns {ReactElement} Navigation component
 */
export const NavigationLoggedIn = ({
    user
}: NavigationLoggedInProps): ReactElement => {
    return (
        <nav className="absolute right-0 mr-2 flex flex-row items-center gap-x-3">
            <HeaderDropdown user={user} />
        </nav>
    );
};
