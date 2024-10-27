import { NextApiRequest } from 'next';
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

interface Session {
    sessionId: string;
    userId: string;
}

export function getSession(req: NextApiRequest): string | null {
    const cookies = req.cookies as unknown as RequestCookies;
    const sessionId = cookies!.get("session")!.value;

    if (!sessionId) {
        return null;
    }

    return sessionId ;
}
