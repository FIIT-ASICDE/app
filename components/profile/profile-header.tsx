import { imgSrc } from "@/lib/client-file-utils";
import { OnboardedUser } from "@/lib/types/user";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { ProfileNavigation } from "@/components/profile/profile-navigation";

interface ProfileHeaderProps {
    profile: OnboardedUser;
    isItMe: boolean;
}

export const ProfileHeader = ({ profile, isItMe }: ProfileHeaderProps) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-6 px-6 py-4">
                <AvatarDisplay
                    displayType={"heading"}
                    image={imgSrc(profile.image)}
                    name={profile.name + " " + profile.surname}
                />
                <div className="flex flex-col space-y-1">
                    <h3 className="text-xl font-semibold leading-none tracking-tight text-primary">
                        {profile.name} {profile.surname}
                    </h3>
                    <span className="text-muted-foreground">
                        {profile.username}
                    </span>
                </div>
                <EditProfileDialog profile={profile} />
            </div>
            <ProfileNavigation isItMe={isItMe} profile={profile} />
        </div>
    );
};
