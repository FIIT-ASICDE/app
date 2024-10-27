import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, name, surname, email, password } = body;

        const hashedPassword: string = await bcrypt.hash(password, 10);

        await prisma.users.create({
            data: {
                username,
                name,
                surname,
                email,
                password: hashedPassword,
                role: 'USER',
            },
        });

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error processing registration:', error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
