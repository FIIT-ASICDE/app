import { env } from "@/env";
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id: string; // overwrites the id?: string in DefaultSession['user']
        } & DefaultSession["user"];
    }
}

const providers: Provider[] = [
    GitHub({
        // added repo so that we can read user's repos
        authorization: { params: { scope: "repo read:user user:email" } },
    }),
];

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
    secret: env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers,
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account?.provider === "github") {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
});
