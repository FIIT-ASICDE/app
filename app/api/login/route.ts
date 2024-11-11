import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { usernameOrEmail, password } = body;

        if (!usernameOrEmail || !password) {
            return NextResponse.json(
                { error: "Username or email and password are required", errorCode: "missing_field" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must contain at least 8 characters", errorCode: "password_length" },
                { status: 400 },
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found", errorCode: "user_not_found" },
                { status: 404 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Incorrect password", errorCode: "incorrect_password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing login:", error);
        return NextResponse.json(
            { error: "Login failed due to server error" },
            { status: 500 }
        );
    }
}
