import { handleError } from "@/lib/handlers/error-handling";
import { deleteRepo, getRepo, updateRepo } from "@/lib/services/repo-service";
import { RepoCreation } from "@/types/RepoCreation.type";
import { Repo } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const response: Repo = await getRepo(id);
        return NextResponse.json(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const reqisetJson: RepoCreation = await request.json()
        const response: Repo = await updateRepo(id, reqisetJson)
        return NextResponse.json(response, { status: 204 });
    } catch (error) {
        return handleError(error);
    }
}

export async function DELETE({ params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await deleteRepo(id)
        return NextResponse.json("Repo deleted.", { status: 204 });
    } catch (error) {
        return handleError(error);
    }
}