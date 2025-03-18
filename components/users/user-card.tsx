import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { RepositoryDisplay } from "@/lib/types/repository";
import { UserDisplay } from "@/lib/types/user";
import { cn } from "@/lib/utils";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { getCardStripe } from "@/components/generic/generic";
import { InviteUserDialog } from "@/components/invitations/invite-user-dialog";
import { Card, CardContent } from "@/components/ui/card";

interface UserCardProps {
    user: UserDisplay;
    usersOrganisations: Array<OrganisationDisplay>;
    usersRepositories: Array<RepositoryDisplay>;
    className?: string;
}

export const UserCard = ({
    user,
    usersOrganisations,
    usersRepositories,
    className,
}: UserCardProps) => {
    const userLink: string = "/" + user.username;

    return (
        <Card
            className={cn(
                "max-w-full pl-1.5 shadow-lg",
                getCardStripe("member"),
                className,
            )}
        >
            <CardContent className="flex flex-row items-center justify-between gap-x-3 p-4">
                <div className="flex min-w-0 flex-row items-center gap-x-3">
                    <AvatarDisplay
                        displayType={"card"}
                        image={imgSrc(user.image)}
                        name={user.username}
                    />
                    <DynamicTitle
                        title={user.username}
                        link={userLink}
                        className="tracking-normal"
                        tooltipVisible
                    />
                </div>
                <div className="flex flex-shrink-0 flex-row space-x-3">
                    <InviteUserDialog
                        selectedUser={user}
                        usersOrganisations={usersOrganisations}
                        usersRepositories={usersRepositories}
                    />
                </div>
            </CardContent>
        </Card>
    );
};
