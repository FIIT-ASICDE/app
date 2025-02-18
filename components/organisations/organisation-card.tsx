import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationRole } from "@/lib/types/organisation";
import { UsersRound } from "lucide-react";
import Link from "next/link";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { RoleBadge } from "@/components/organisations/members/role-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OrganisationCardProps {
    id: string;
    name: string;
    image?: string;
    description?: string;
    role?: OrganisationRole;
    memberCount?: number;
}

export const OrganisationCard = ({
    name,
    image,
    description,
    role,
    memberCount,
}: OrganisationCardProps) => {
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-x-3">
                        <AvatarDisplay
                            displayType={"select"}
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
                    <div className="flex flex-row items-center gap-x-3">
                        {role !== undefined && <RoleBadge role={role} />}
                        {memberCount && (
                            <div className="flex w-12 flex-row items-center gap-x-1 text-muted-foreground">
                                <UsersRound className="h-5 w-5" />
                                {memberCount}
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>{description}</p>
            </CardContent>
        </Card>
    );
};
