import { auth } from "@/auth";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

interface HandlerParams<T> {
    request: Request;
    params: T;
    session: Session | null;
}

type Handler<T = unknown> = (params: HandlerParams<T>) => Promise<NextResponse>;

export function authenticate<T>(handler: Handler<T>) {
    return async (request: Request, params: T) => {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 },
            );
        }

        return handler({ request, params, session });
    };
}
