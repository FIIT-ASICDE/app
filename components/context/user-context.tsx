"use client";

import { api } from "@/lib/trpc/react";
import { User } from "@/lib/types/user";
import { ReactNode, createContext, useContext } from "react";

type UserContextType = {
    user: User;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    userId: string;
    children: ReactNode;
}

export function UserProvider({ children, userId }: UserProviderProps) {
    const [user] = api.user.byId.useSuspenseQuery(userId);

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
