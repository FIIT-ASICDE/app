import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *       - User
 *     description: Register new user in app.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request. Missing required field. Password must contain at least 8 characters. User with this username or email already exists.
 *       500:
 *         description: Registration failed.
 */
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
