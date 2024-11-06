import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import prisma from "./prisma";
import { randomBytes } from "node:crypto";

// https://next-auth.js.org/configuration/options#jwt
// https://next-auth.js.org/tutorials/securing-pages-and-api-routes
// https://next-auth.js.org/getting-started/client

/* TODO - pridat GitHub a Google providers */

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || randomBytes(32).toString("hex"),
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
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            return session;
        },
    },
});
