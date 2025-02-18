import { ChevronRight, File, Folder } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const Tree = ({ item }: { item: Array<string> | string }) => {
    const [name, ...items] = Array.isArray(item) ? item : [item];

    if (!items.length) {
        return (
            <div role="button" className="data-[active=true]:bg-transparent">
                <File />
                {name}
            </div>
        );
    }

    return (
        <li className="group/menu-item relative">
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                defaultOpen={name === "components" || name === "ui"}
            >
                <CollapsibleTrigger asChild>
                    <div role="button">
                        <ChevronRight className="transition-transform" />
                        <Folder />
                        {name}
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <ul className="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden">
                        {items.map((subItem, index) => (
                            <Tree key={index} item={subItem} />
                        ))}
                    </ul>
                </CollapsibleContent>
            </Collapsible>
        </li>
    );
};
