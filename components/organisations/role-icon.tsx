import { OrganisationRole } from "@/lib/types/organisation";
import { Shield, UserRound } from "lucide-react";

interface RoleIconProps {
    role: OrganisationRole;
    className?: string;
}

export const RoleIcon = ({ role, className }: RoleIconProps) => {
    if (role === "admin") {
        return <Shield className={className} />;
    } else {
        return <UserRound className={className} />;
    }
};
