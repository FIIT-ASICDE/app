import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest) {
    try {

        const session = await authenticate(req);

        if (session instanceof NextResponse) {
            return session;
        }

        // TODO - gettnut aj ostante potrebne data z databazy, na zaklade userId a podobne

        return NextResponse.json({ username: session.user.username }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
