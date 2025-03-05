"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { UserDisplay } from "@/lib/types/user";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { useUser } from "@/components/context/user-context";
import { DynamicTitle } from "@/components/dynamic-title-link/dynamic-title";
import { BlockContributorDialog } from "@/components/repositories/block-contributor-dialog";

interface ContributorCardProps {
    contributor: UserDisplay;
    repositoryId: string;
}

export const ContributorCard = ({
    contributor,
    repositoryId,
}: ContributorCardProps) => {
    const { user } = useUser();

    const contributorLink: string = "/" + contributor.username;

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex min-w-0 flex-row items-center gap-x-3">
                <AvatarDisplay
                    displayType={"card"}
                    image={imgSrc(contributor.image)}
                    name={contributor.username}
                />
                <DynamicTitle
                    title={contributor.username}
                    link={contributorLink}
                    className="text-base"
                />
            </div>
            {contributor.id !== user.id && (
                <BlockContributorDialog
                    contributor={contributor}
                    repositoryId={repositoryId}
                />
            )}
        </div>
    );
};
