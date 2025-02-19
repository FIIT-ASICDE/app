import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationMember } from "@/lib/types/organisation";
import Link from "next/link";

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
                        <Link href={"/" + organisationMember.username}>
                            <span className="m-0 max-w-full overflow-hidden truncate whitespace-nowrap p-0 text-sm font-semibold leading-none tracking-tight text-primary underline-offset-4 hover:underline">
                                {organisationMember.username}
                            </span>
                        </Link>
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
