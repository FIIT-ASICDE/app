"use client";

import { OrganisationDisplay } from "@/lib/types/organisation";
import { Repository, RepositoryFile } from "@/lib/types/repository";
import { Calendar } from "lucide-react";

import { ReadMeFilePreview } from "@/components/file/read-me-file-preview";
import { getDateString } from "@/components/generic/generic";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewPageProps {
    userSlug: string;
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

const markdownContentExample: string = `# 🚀 Awesome Project

Welcome to the Awesome Project! This README demonstrates various Markdown features.

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Installation

To get started with this project, follow these steps:

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/username/awesome-project.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`bash
   cd awesome-project
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## 🚦 Usage

Here's a quick example of how to use the main function:

\`\`\`javascript
const awesomeProject = require('awesome-project');

const result = awesomeProject.doSomethingAwesome();
console.log(result);
\`\`\`

## ✨ Features

- **Fast**: Optimized for speed
- **Flexible**: Easily customizable
- **Secure**: Built with security in mind

### Feature Comparison

| Feature       | Awesome Project | Other Projects |
|---------------|-----------------|-----------------|
| Speed         | ⚡⚡⚡          | ⚡             |
| Flexibility   | 🔧🔧🔧          | 🔧             |
| Security      | 🔒🔒🔒          | 🔒             |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

For more details, please read our [CONTRIBUTING.md](CONTRIBUTING.md) file.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 Acknowledgements

- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [Shields.io](https://shields.io/)
- [Choose an Open Source License](https://choosealicense.com)

## 📊 Project Status

![Build Status](https://img.shields.io/travis/username/awesome-project.svg)
![Downloads](https://img.shields.io/github/downloads/username/awesome-project/total.svg)
![Version](https://img.shields.io/github/v/release/username/awesome-project.svg)

`;

export default function OverviewPage({} /* userSlug */ : OverviewPageProps) {
    const repository: Repository = data.repository;

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
    console.log(readMeFile);

    if (!repository) {
        return <>Loading repository...</>;
    }

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
                    <ReadMeFilePreview
                        name={readMeFile.name}
                        language={readMeFile.language}
                        content={markdownContentExample}
                        lastActivity={readMeFile.lastActivity}
                    />
                )}
            </main>
        </div>
    );
}
