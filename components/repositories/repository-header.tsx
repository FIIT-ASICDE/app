import { imgSrc } from "@/lib/client-file-utils";
import { Repository } from "@/lib/types/repository";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { EditRepositoryDialog } from "@/components/repositories/edit-repository-dialog";
import { RepositoryNavigation } from "@/components/repositories/repository-navigation";

interface RepositoryHeaderProps {
    repository: Repository;
    canEdit: boolean;
}

export const RepositoryHeader = ({
    canEdit,
    repository,
}: RepositoryHeaderProps) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex min-w-0 flex-row items-center space-x-6 px-6 py-4">
                <AvatarDisplay
                    displayType={"heading"}
                    name={repository.ownerName}
                    image={imgSrc(repository.ownerImage)}
                />
                <DynamicTitle
                    title={repository.ownerName + "/" + repository.name}
                    tooltipVisible
                />
                {canEdit && <EditRepositoryDialog repository={repository} />}
            </div>
            <RepositoryNavigation repository={repository} />
        </div>
    );
};
