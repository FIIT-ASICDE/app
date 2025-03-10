import { RepositoryOverview } from "@/lib/types/repository";
import { Calendar, FileX2 } from "lucide-react";

import { MarkdownRenderer } from "@/components/file/markdown-renderer";
import { getDateString } from "@/components/generic/generic";
import { NoData } from "@/components/no-data/no-data";
import LanguageStatisticsChart from "@/components/repositories/language-statistics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewPageProps {
    repository: RepositoryOverview;
}

export default function OverviewPage({ repository }: OverviewPageProps) {
    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="flex w-full flex-col gap-y-3 md:w-1/3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-start">
                            {repository.description && (
                                <div className="mb-4">
                                    {repository.description}
                                </div>
                            )}
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

                <Card>
                    <CardHeader>
                        <CardTitle>Language statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LanguageStatisticsChart
                            languageStatistics={repository.stats}
                        />
                    </CardContent>
                </Card>
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-2/3">
                {repository.readme ? (
                    <MarkdownRenderer content={repository.readme.content} />
                ) : (
                    <NoData
                        icon={FileX2}
                        message={"No README.md file found."}
                        className="m-6"
                    />
                )}
            </main>
        </div>
    );
}
