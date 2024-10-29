import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie'
import { v4 as uuidv4 } from 'uuid'
import { randomBytes } from "node:crypto";

const prisma = new PrismaClient();

// https://nextjs.org/docs/pages/building-your-application/authentication

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { usernameOrEmail, password } = body;

        const user = await prisma.users.findFirst({
            where: {
                OR: [
                    { username: usernameOrEmail! },
                    { email: usernameOrEmail! }
                ],
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password!, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const sessionId = uuidv4()
        const csrfToken = randomBytes(32).toString('hex');

        const existingSession = await prisma.sessions.findFirst({
            where: { userId: user.id },
        });

        if (existingSession) {
            await prisma.sessions.update({
                where: { id: existingSession.id },
                data: { sessionId, csrfToken, updatedAt: new Date() },
            });
        } else {
            await prisma.sessions.create({
                data: { sessionId, userId: user.id, csrfToken, createdAt: new Date() },
            });
        }

        const cookie = serialize('session', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // jeden týždeň = 7 dni, TODO - bude treba zmeniť na najmenej
            path: '/',
        })

        const response = NextResponse.json({message: 'Login successful', status: 200});
        response.headers.set('Set-Cookie', cookie);
        response.headers.set('X-CSRF-Token', csrfToken);

        return response
    } catch (error) {
        console.error('Error processing login:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}



