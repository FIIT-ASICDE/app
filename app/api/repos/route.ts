import { handleError } from "@/lib/handlers/error-handling";
import { addRepo } from "@/lib/services/repo-service";
import { RepoCreation } from "@/types/RepoCreation.type";
import { Repo } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const requestJson: RepoCreation = await request.json();
        const respone: Repo = await addRepo(requestJson);
        return NextResponse.json(respone, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}