import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";

import prisma from "./prisma";
import { $Enums } from ".prisma/client";

declare module "next-auth" {
    import UserRole = $Enums.UserRole;

    interface User {
        username?: string;
        surname?: string;
    }
    interface Session {
        user: {
            id: string; // overwrites the id?: string in DefaultSession['user']
            username: string;
            surname: string;
            image?: string;
            role: UserRole;
        } & DefaultSession["user"];
    }
}

const providers: Provider[] = [GitHub];

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider();
            return { id: providerData.id, name: providerData.name };
        } else {
            return { id: provider.id, name: provider.name };
        }
    })
    .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: { signIn: "/login" },
    // If you want to change session strategy, then also auth in editor server
    // must be also reimplemented
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.name;
                token.surname = "REMOVE";
                token.image = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.username = token.name as string;
            session.user.surname = "REMOVE";
            session.user.image = token.image as string;
            session.user.role = "USER";
            return session;
        },
    },
});
