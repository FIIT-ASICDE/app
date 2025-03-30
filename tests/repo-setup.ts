import { createRepositoryFormSchema } from "@/lib/schemas/repo-schemas";
import { testingTRPC } from "@/tests/setup";
import { User } from "@prisma/client";

export async function createRepositoryForUser(
    user: User,
    trpc: Awaited<ReturnType<typeof testingTRPC>>,
) {
    const repositoryInput = {
        ownerId: user.id,
        name: "test-repo",
        description: "This is a test repository.",
        visibility: "public",
    };

    const parsedInput = createRepositoryFormSchema.parse(repositoryInput);
    return await trpc.repo.create(parsedInput);
}
