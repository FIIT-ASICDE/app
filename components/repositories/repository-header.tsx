import { imgSrc } from "@/lib/client-file-utils";
import { Repository } from "@/lib/types/repository";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
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
        <div className="flex flex-col items-center justify-between pb-6 sm:flex-row sm:pb-0">
            <div className="flex flex-row items-center space-x-6 px-6 py-4">
                <AvatarDisplay
                    displayType={"heading"}
                    name={repository.ownerName}
                    image={imgSrc(repository.ownerImage)}
                />
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-primary">
                    {repository.ownerName + "/" + repository.name}
                </h3>
                {canEdit && <EditRepositoryDialog repository={repository} />}
            </div>
            <RepositoryNavigation repository={repository} />
        </div>
    );
};
