import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationMember } from "@/lib/types/organisation";
import { cn } from "@/lib/utils";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { DynamicTitle } from "@/components/dynamic-title-link/dynamic-title";
import { getCardStripe } from "@/components/generic/generic";
import { ManageMemberDialog } from "@/components/organisations/members/manage-member-dialog";
import { RoleBadge } from "@/components/organisations/members/role-badge";
import { Card, CardContent } from "@/components/ui/card";

interface OrganisationMemberCardProps {
    organisationId: string;
    organisationMember: OrganisationMember;
    userIsAdmin: boolean;
    className?: string;
}

export const MemberCard = ({
    organisationId,
    organisationMember,
    userIsAdmin,
    className,
}: OrganisationMemberCardProps) => {
    const memberLink: string = "/" + organisationMember.username;

    return (
        <Card
            className={cn(
                "max-w-full pl-1.5 shadow-lg",
                getCardStripe("member"),
                className,
            )}
        >
            <CardContent className="flex flex-row items-center justify-between p-4">
                <div className="flex min-w-0 flex-row items-center gap-x-3">
                    <AvatarDisplay
                        displayType={"card"}
                        image={imgSrc(organisationMember.image)}
                        name={organisationMember.username}
                    />
                    <div className="flex flex-col gap-x-3">
                        <span className="text-lg">
                            {organisationMember.name +
                                " " +
                                organisationMember.surname}
                        </span>
                        <DynamicTitle
                            title={organisationMember.username}
                            link={memberLink}
                            className="text-sm tracking-normal"
                        />
                    </div>
                </div>
                <div className="flex flex-shrink-0 flex-row space-x-3">
                    {userIsAdmin && organisationMember.role === "member" && (
                        <ManageMemberDialog
                            organisationId={organisationId}
                            organisationMember={organisationMember}
                        />
                    )}
                    <RoleBadge role={organisationMember.role} />
                </div>
            </CardContent>
        </Card>
    );
};
