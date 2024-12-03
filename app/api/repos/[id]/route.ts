import { authenticate } from "@/lib/authenticate";
import { handleError } from "@/lib/handlers/error-handling";
import { deleteRepo, getRepo, updateRepo } from "@/lib/services/repo-service";
import { RepoCreation } from "@/types/RepoCreation.type";
import { Repo } from "@prisma/client";
import { NextResponse } from "next/server";

async function getRepoById(params: Promise<{ id?: string }>) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Missing id parameter" },
            { status: 400 },
        );
    }

    try {
        const response: Repo = await getRepo(id);
        return NextResponse.json(response);
    } catch (error) {
        return handleError(error);
    }
}

async function deleteRepoById(params: Promise<{ id?: string }>) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Missing id parameter" },
            { status: 400 },
        );
    }

    try {
        await deleteRepo(id);
        return NextResponse.json("Repo deleted.", { status: 204 });
    } catch (error) {
        return handleError(error);
    }
}

async function updateRepoById(
    request: Request,
    params: Promise<{ id?: string }>,
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { message: "Missing id parameter" },
            { status: 400 },
        );
    }

    try {
        const reqisetJson: RepoCreation = await request.json();
        const response: Repo = await updateRepo(id, reqisetJson);
        return NextResponse.json(response, { status: 204 });
    } catch (error) {
        return handleError(error);
    }
}

export const GET = authenticate<{ id?: string }>(({ params }) =>
    getRepoById(params),
);

export const PUT = authenticate<{ id?: string }>(({ params, request }) => {
    return updateRepoById(request, params);
});

export const DELETE = authenticate<{ id?: string }>(({ params }) =>
    deleteRepoById(params),
);
