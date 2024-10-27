// lib/auth.ts
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from './session';

const prisma = new PrismaClient();

export async function authenticate(req: NextApiRequest) {
    const sessionId = getSession(req);

    const headers = req.headers as unknown as Headers
    const csrfToken = headers.get('x-csrf-token');

    if (!sessionId || !csrfToken) {
        console.log("User is not authenticated");
        return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    const session = await prisma.sessions.findUnique({
        where: {
            sessionId: sessionId,
            csrfToken: csrfToken,
        },
        include: { user: true },
    });

    if (!session) {
        return NextResponse.json({ error: 'Session not found' }, { status: 401 });
    }

    return session;
}
