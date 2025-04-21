"use client";

import { api } from "@/lib/trpc/react";
import { OnboardedUser } from "@/lib/types/user";
import { ReactElement, ReactNode, createContext, useContext } from "react";

type UserContextType = {
    user: OnboardedUser;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    userId: string;
    children: ReactNode;
}

/**
 * Component that provides the current user
 *
 * @param {UserProviderProps} props - Component props
 * @returns {ReactElement} User provider component
 */
export function UserProvider({
    children,
    userId,
}: UserProviderProps): ReactElement {
    const [user] = api.user.byId.useSuspenseQuery(userId);

    if (!user || user.type !== "onboarded") {
        throw new Error("expected user not to be undefined or to be onboarded");
    }

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}

/**
 * Function to get the current user
 *
 * @returns {UserContextType} User context
 */
export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
