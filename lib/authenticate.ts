import { auth } from "@/auth";
import { NextResponse } from "next/server";

export function authenticate(handler: Function) {
    return async (req: Request, context: any) => {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 },
            );
        }

        return handler(req, context, session);
    };
}