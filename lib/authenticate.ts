import { auth } from "@/auth";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

interface HandlerParams<T> {
    request: Request;
    params: Promise<T>;
    session: Session | null;
    query: URLSearchParams;
}

type Handler<T = unknown> = (params: HandlerParams<T>) => Promise<NextResponse>;

export function authenticate<T>(handler: Handler<T>) {
    return async (request: Request, params: { params: Promise<T> }) => {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 },
            );
        }

        const url = new URL(request.url);
        const query = url.searchParams;

        return handler({ request, params: params.params, session, query });
    };
}
