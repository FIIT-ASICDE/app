import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Repository } from "@/lib/types/repository";

interface SearchTabContentProps {
    repository: Repository;
}

export const SearchTabContent = ({
    repository,
}: SearchTabContentProps) => {
    const [repositorySearchTerm, setRepositorySearchTerm] = useState<string>("");

    return (
        <div className="text-nowrap p-4">
            <header className="pb-4 text-xl font-medium">Search</header>
            <div className="space-y-3">
                <div className="relative w-full">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={"Search in " + repository.name}
                        value={repositorySearchTerm}
                        onChange={(e) =>
                            setRepositorySearchTerm(e.target.value)
                        }
                        className="pl-9"
                    />
                </div>
            </div>
        </div>
    );
};