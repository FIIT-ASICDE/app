import { OrganisationDisplay } from "@/lib/types/organisation";
import { Repository, RepositoryFile } from "@/lib/types/repository";
import { Calendar } from "lucide-react";

import { MarkdownRenderer } from "@/components/file/markdown-renderer";
import { getDateString } from "@/components/generic/generic";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewPageProps {
    repository: Repository;
}

const data = {
    repository: {
        id: "86db4870-15bf-4999-8f03-99eb3d66d6a6",
        ownerId: "021bb1eb-7f88-4159-ba26-440d86f58962",
        ownerName: "kili",
        ownerImage: "/avatars/avatar1.png",
        name: "repository1",
        visibility: "public",
        description:
            "repository1 is an innovative and collaborative project aimed at simplifying data transformation workflows. It provides a collection of modular scripts, utilities, and APIs for processing and analyzing large datasets efficiently.",
        favorite: false,
        pinned: false,
        createdAt: new Date(),
        userRole: "contributor",
        tree: [
            {
                name: "item_0_0",
                isDirectory: true,
                lastActivity: new Date("2024-10-02T02:41:50.225066"),
                children: [
                    {
                        name: "item_1_0",
                        isDirectory: false,
                        lastActivity: new Date("2024-03-02T05:18:53.700529"),
                        language: "verilog",
                    } satisfies RepositoryFile,
                ],
            } satisfies RepositoryFile,
            {
                name: "item_0_3",
                isDirectory: true,
                lastActivity: new Date("2024-12-15T22:37:47.561361"),
                children: [
                    {
                        name: "item_1_0",
                        isDirectory: false,
                        lastActivity: new Date("2024-02-21T13:58:13.774926"),
                        language: "verilog",
                    } satisfies RepositoryFile,
                    {
                        name: "item_1_1",
                        isDirectory: false,
                        lastActivity: new Date("2024-04-26T08:01:56.397667"),
                        language: "verilog",
                    } satisfies RepositoryFile,
                    {
                        name: "item_1_2",
                        isDirectory: false,
                        lastActivity: new Date("2024-07-14T15:02:01.475375"),
                        language: "verilog",
                    } satisfies RepositoryFile,
                    {
                        name: "item_1_3",
                        isDirectory: false,
                        lastActivity: new Date("2024-04-23T05:29:12.743968"),
                        language: "verilog",
                    } satisfies RepositoryFile,
                    {
                        name: "item_1_4",
                        isDirectory: true,
                        lastActivity: new Date("2024-03-05T23:28:22.697188"),
                        children: [
                            {
                                name: "item_2_0",
                                isDirectory: false,
                                lastActivity: new Date(
                                    "2024-09-04T22:55:14.291073",
                                ),
                                language: "verilog",
                            } satisfies RepositoryFile,
                            {
                                name: "item_2_1",
                                isDirectory: false,
                                lastActivity: new Date(
                                    "2024-04-27T17:50:20.043923",
                                ),
                                language: "verilog",
                            } satisfies RepositoryFile,
                            {
                                name: "item_2_2",
                                isDirectory: false,
                                lastActivity: new Date(
                                    "2024-09-01T04:43:56.959758",
                                ),
                                language: "verilog",
                            } satisfies RepositoryFile,
                            {
                                name: "item_2_3",
                                isDirectory: false,
                                lastActivity: new Date(
                                    "2024-02-08T00:25:07.978191",
                                ),
                                language: "verilog",
                            } satisfies RepositoryFile,
                        ],
                    } satisfies RepositoryFile,
                ],
            } satisfies RepositoryFile,
            {
                name: "item_0_1",
                isDirectory: false,
                lastActivity: new Date("2024-02-23T10:02:34.898574"),
            } satisfies RepositoryFile,
            {
                name: "item_0_2",
                isDirectory: false,
                lastActivity: new Date("2024-01-20T11:12:08.289148"),
            } satisfies RepositoryFile,
            {
                name: "README.md",
                isDirectory: false,
                lastActivity: new Date("2023-01-20T11:12:08.289148"),
                language: "markdown",
            },
        ] satisfies Array<RepositoryFile>,
    } satisfies Repository,
    usersOrganisations: [
        {
            id: "f3f67850-e8cf-428d-84ae-853c46031f46",
            name: "Google",
            image: "/avatars/organisation-avatar1.png",
            memberCount: 30,
            userRole: "admin",
        } satisfies OrganisationDisplay,
        {
            id: "313b8b5a-6348-4742-a4f8-ce78a0188c70",
            name: "Microsoft",
            image: "/avatars/organisation-avatar2.png",
            memberCount: 5,
            userRole: "member",
        } satisfies OrganisationDisplay,
        {
            id: "c0b62ada-c8c7-4574-91a4-a007a75181f5",
            name: "ASICDE",
            image: "/avatars/organisation-avatar3.jpg",
            memberCount: 160,
            userRole: "member",
        } satisfies OrganisationDisplay,
    ] satisfies Array<OrganisationDisplay>,
};

export default function OverviewPage({ repository }: OverviewPageProps) {
    function findReadMe(
        tree: Array<RepositoryFile>,
    ): RepositoryFile | undefined {
        for (const file of tree) {
            if (file.name.toLowerCase() === "readme.md" && !file.isDirectory) {
                return file;
            }
            if (file.isDirectory && file.children) {
                const found = findReadMe(file.children);
                if (found) {
                    return found;
                }
            }
        }
        return undefined;
    }

    const readMeFile: RepositoryFile | undefined = findReadMe(
        data.repository.tree,
    );

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
                {readMeFile && readMeFile.content && (
                    <MarkdownRenderer content={readMeFile.content} />
                )}
            </main>
        </div>
    );
}
