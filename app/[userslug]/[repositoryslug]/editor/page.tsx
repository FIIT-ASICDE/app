"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import EditorNavigation from "@/components/editor/editor-navigation";
import { SidebarTree, TreeNode } from "@/components/tree/sidebar-tree";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
    Sidebar,
    SidebarContent,
    SidebarInset,
    SidebarMenu,
    SidebarProvider,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const data = {
    changes: [
        {
            file: "README.md",
            state: "M",
        },
        {
            file: "api/hello/route.ts",
            state: "U",
        },
        {
            file: "app/layout.tsx",
            state: "M",
        },
    ],
    repository: {
        owner: "kili",
        title: "active-repo",
    },
    tree: [
        [
            "app",
            [
                "api",
                ["hello", ["route.ts"]],
                "page.tsx",
                "layout.tsx",
                ["blog", ["page.tsx"]],
            ],
        ],
        [
            "components",
            ["ui", "button.tsx", "card.tsx"],
            "header.tsx",
            "footer.tsx",
        ],
        ["lib", ["util.ts"]],
        ["public", "favicon.ico", "vercel.svg"],
        ".eslintrc.json",
        ".gitignore",
        "next.config.js",
        "tailwind.config.js",
        "package.json",
        "README.md",
    ] satisfies TreeNode[],
};

const DynamicEditor = dynamic(() => import("@/components/editor/editor"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export default function EditorPage() {
    const [activeSidebarContent, setActiveSidebarContent] =
        useState<string>("fileExplorer");

    const displayFilePath = () => {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Directory</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>File</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    };

    return (
        <div className="flex h-screen w-screen">
            <div className="absolute left-14 w-full flex-1">
                <SidebarProvider>
                    <Sidebar className="absolute left-0 flex-1">
                        <SidebarContent className="p-2">
                            <Tabs defaultValue={"fileExplorer"}>
                                <EditorNavigation
                                    activeSidebarContent={activeSidebarContent}
                                    setActiveSidebarContentAction={
                                        setActiveSidebarContent
                                    }
                                />
                                <TabsContent value={"fileExplorer"}>
                                    <header className="px-3 pb-3.5 pt-0 text-xl font-medium">
                                        {data.repository.owner +
                                            "/" +
                                            data.repository.title}
                                    </header>
                                    <SidebarMenu className="p-1">
                                        {data.tree.map((item, index) => (
                                            <SidebarTree
                                                key={index}
                                                item={item}
                                            />
                                        ))}
                                    </SidebarMenu>
                                </TabsContent>
                                <TabsContent value={"search"}>
                                    <header className="px-3 pb-3.5 pt-0 text-xl font-medium">
                                        Search
                                    </header>
                                    <SidebarMenu className="space-y-3 px-3">
                                        <Input
                                            type="search"
                                            placeholder={`Search in ${data.repository.title}`}
                                        />
                                    </SidebarMenu>
                                </TabsContent>
                                <TabsContent value={"sourceControl"}>
                                    <header className="px-3 pb-3.5 pt-0 text-xl font-medium">
                                        Source control
                                    </header>
                                    <SidebarMenu className="px-3">
                                        <p className="text-sm">
                                            Here the source control with GitHub
                                            should be implemented.
                                        </p>
                                        <div className="grid grid-cols-2 gap-x-1">
                                            <p className="text-center text-sm">
                                                Warnings:{" "}
                                                <span className="text-yellow-400">
                                                    10
                                                </span>
                                            </p>
                                            <p className="text-center text-sm">
                                                Errors:{" "}
                                                <span className="text-red-500">
                                                    3
                                                </span>
                                            </p>
                                        </div>
                                    </SidebarMenu>
                                </TabsContent>
                            </Tabs>
                        </SidebarContent>
                        <SidebarRail />
                    </Sidebar>
                    <SidebarInset>
                        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
                            {displayFilePath()}
                        </header>
                        <DynamicEditor filePath="/testing-collab" />
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </div>
    );
}
