import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationMember } from "@/lib/types/organisation";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { ManageMemberDialog } from "@/components/organisations/members/manage-member-dialog";
import { RoleBadge } from "@/components/organisations/members/role-badge";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicTitleLink } from "@/components/dynamic-title-link/dynamic-title-link";

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
    className
}: OrganisationMemberCardProps) => {
    const memberLink: string = "/" + organisationMember.username;

    return (
        <Card key={organisationMember.id} className={className}>
            <CardContent className="flex flex-row items-center justify-between p-4">
                <div className="flex flex-row items-center gap-x-3 min-w-0">
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
                        <DynamicTitleLink
                            title={organisationMember.username}
                            link={memberLink}
                            className="text-sm tracking-normal"
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-3 flex-shrink-0">
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
