import { OrganizationRole } from "@prisma/client";
import { Shield, UserRound } from "lucide-react";

interface RoleIconProps {
    role: OrganizationRole;
    className?: string;
}

export const RoleIcon = ({ role, className }: RoleIconProps) => {
    if (role === "ADMIN") {
        return <Shield className={className} />;
    } else {
        return <UserRound className={className} />;
    }
};
