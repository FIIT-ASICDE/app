import { Prisma } from "@prisma/client";
import { HttpError } from "lib/errors/HttpError";
import { NextResponse } from "next/server";

export function handleError(error: unknown): NextResponse {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            return NextResponse.json({
                statusCode: 409,
                message: "Unique constraint failed:" + error.meta,
            });
        } else if (error.code === "P2025") {
            return NextResponse.json({
                statusCode: 404,
                message: "Record not found.",
            });
        }
    } else if (error instanceof HttpError) {
        return NextResponse.json(
            { message: error.message },
            { status: error.statusCode },
        );
    }

    return NextResponse.json({ message: error }, { status: 500 });
}
