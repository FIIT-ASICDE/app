import { authenticate } from "@/lib/authenticate";
import { handleError } from "@/lib/handlers/error-handling";
import { addRepo } from "@/lib/services/repo-service";
import { RepoCreation } from "@/types/RepoCreation.type";
import { Repo } from "@prisma/client";
import { NextResponse } from "next/server";

async function createRepo(request: Request) {
    try {
        const requestJson: RepoCreation = await request.json();
        const respone: Repo = await addRepo(requestJson);
        return NextResponse.json(respone, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}

export const POST = authenticate(({ request }) => {
    return createRepo(request);
});
