import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, name, surname, email, password } = body;

        if (!username || !name || !surname || !email || !password) {
            return NextResponse.json(
                { error: "Missing required field" },
                { status: 400 },
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must contain at least 8 characters" },
                { status: 400 },
            );
        }

        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this username or email already exists" },
                { status: 400 },
            );
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);

        await prisma.users.create({
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
