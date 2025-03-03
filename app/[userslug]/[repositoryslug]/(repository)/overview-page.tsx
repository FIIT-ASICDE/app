import { FileItem, Repository, RepositoryItem } from "@/lib/types/repository";
import { Calendar } from "lucide-react";

import { MarkdownRenderer } from "@/components/file/markdown-renderer";
import { getDateString } from "@/components/generic/generic";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewPageProps {
    repository: Repository;
}

export default function OverviewPage({ repository }: OverviewPageProps) {
    function findReadMe(tree?: Array<RepositoryItem>): FileItem | undefined {
        if (!tree) return undefined;

        for (const file of tree) {
            if (
                file.name.toLowerCase() === "readme.md" &&
                file.type === "file"
            ) {
                return file;
            }

            if (file.type === "directory") {
                const found = findReadMe(file.children);
                if (found) {
                    return found;
                }
            }
        }
        return undefined;
    }

    const readMeFile: RepositoryItem | undefined = findReadMe(repository.tree);

    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="flex w-full flex-col gap-y-3 md:w-1/3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-start">
                            <div className="mb-4">{repository.description}</div>
                            {repository.createdAt && (
                                <div className="flex items-center text-muted-foreground">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    {getDateString(
                                        "Created",
                                        repository.createdAt,
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-2/3">
                {readMeFile && (
                    <MarkdownRenderer content={readMeFile.content} />
                )}
            </main>
        </div>
    );
}
