import { GithubRepoDisplay } from "@/lib/types/repository";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { DynamicTitle } from "@/components/dynamic-title-link/dynamic-title";
import { SelectItem } from "@/components/ui/select";

interface SelectRepositoryItemProps {
    repository: GithubRepoDisplay;
}

export const SelectRepositoryItem = ({
    repository,
}: SelectRepositoryItemProps) => {
    return (
        <SelectItem
            value={repository.name}
            className="cursor-pointer hover:bg-accent"
        >
            <div className="flex w-[315px] min-w-0 flex-row items-center space-x-3">
                <AvatarDisplay
                    displayType="select"
                    image={repository.ownerImage}
                    name={repository.ownerName}
                />
                <DynamicTitle
                    title={repository.githubFullName}
                    className="truncate text-sm font-normal leading-normal tracking-normal text-foreground hover:text-foreground"
                />
            </div>
        </SelectItem>
    );
};
