import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationMember } from "@/lib/types/organisation";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { ManageMemberDialog } from "@/components/organisations/members/manage-member-dialog";
import { RoleBadge } from "@/components/organisations/members/role-badge";
import { Card, CardContent } from "@/components/ui/card";

interface OrganisationMemberCardProps {
    organisationId: string;
    organisationMember: OrganisationMember;
    userIsAdmin: boolean;
}

export const OrganisationMemberCard = ({
    organisationId,
    organisationMember,
    userIsAdmin,
}: OrganisationMemberCardProps) => {
    return (
        <Card key={organisationMember.id} className="min-w-[380px]">
            <CardContent className="flex flex-row items-center justify-between p-4">
                <div className="flex flex-row items-center gap-x-3">
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
                        <span className="text-sm text-muted-foreground">
                            {organisationMember.username}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row space-x-3">
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
