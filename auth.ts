import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import prisma from "./prisma";
import { $Enums } from ".prisma/client";

import UserRole = $Enums.UserRole;

// https://next-auth.js.org/configuration/options#jwt
// https://next-auth.js.org/tutorials/securing-pages-and-api-routes
// https://next-auth.js.org/getting-started/client

/* TODO - pridat GitHub a Google providers */

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

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    throw new Error("Missing required field!");
                }

                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.password) {
                    throw new Error("Invalid email or password");
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    surname: user.surname,
                    role: user.role,
                    image: user.image,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.surname = user.surname;
                token.image = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.username = token.username as string;
            session.user.surname = token.surname as string;
            session.user.image = token.image as string;
            session.user.role = token.role as UserRole;
            return session;
        },
    },
});
