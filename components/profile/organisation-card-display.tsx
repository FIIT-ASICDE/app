import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationRole } from "@/lib/types/organisation";
import { UsersRound } from "lucide-react";
import Link from "next/link";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { RoleBadge } from "@/components/organisations/members/role-badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

interface OrganisationCardDisplayProps {
    id?: string;
    name: string;
    image?: string;
    role?: OrganisationRole;
    memberCount?: number;
}

export const OrganisationCardDisplay = ({
    name,
    image,
    role,
    memberCount,
}: OrganisationCardDisplayProps) => {
    return (
        <Card className="p-0">
            <CardHeader className="p-3">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-x-3">
                        <AvatarDisplay
                            displayType={"card"}
                            image={imgSrc(image)}
                            name={name}
                        />
                        <Link href={"/orgs/" + name}>
                            <Button
                                variant="link"
                                className="m-0 p-0 text-xl font-semibold leading-none tracking-tight"
                            >
                                {name}
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-x-3">
                        {role && <RoleBadge role={role} />}
                        {memberCount && (
                            <div className="flex flex-row items-center justify-end gap-x-2 text-muted-foreground">
                                <UsersRound className="h-5 w-5" />
                                <div className="w-8">{memberCount}</div>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};
