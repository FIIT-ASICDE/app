import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, name, surname, email, password } = body;

        if (!username || !name || !surname || !email || !password) {
            return NextResponse.json(
                { error: "Missing required field", errorCode: "missing_field" },
                { status: 400 },
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must contain at least 8 characters", errorCode: "password_length" },
                { status: 400 },
            );
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this username or email already exists" },
                { status: 409 },
            );
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                username,
                name,
                surname,
                email,
                password: hashedPassword,
                role: "USER",
            },
        });

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 },
        );
    } catch (error) {
        console.error("Error processing registration:", error);
        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 },
        );
    }
}
