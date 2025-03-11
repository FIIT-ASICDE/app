import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { DynamicTitle } from "@/components/dynamic-title-link/dynamic-title";
import { SelectItem } from "@/components/ui/select";
import { GithubRepoDisplay } from "@/lib/types/repository";

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
            <div className="flex flex-row items-center space-x-3 min-w-0 w-[315px]">
                <AvatarDisplay
                    displayType="select"
                    image={repository.ownerImage}
                    name={repository.ownerName}
                />
                <DynamicTitle
                    title={repository.githubFullName}
                    className="truncate text-foreground hover:text-foreground text-sm font-normal tracking-normal leading-normal"
                />
            </div>
        </SelectItem>
    );
};