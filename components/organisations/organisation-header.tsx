"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationDisplay } from "@/lib/types/organisation";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { EditOrganisationDialog } from "@/components/organisations/edit-organisation-dialog";
import { OrganisationNavigation } from "@/components/organisations/organisation-navigation";

interface OrganisationHeaderProps {
    organisation: OrganisationDisplay;
}

export const OrganisationHeader = ({
    organisation,
}: OrganisationHeaderProps) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-6 px-6 py-4">
                <AvatarDisplay
                    displayType={"heading"}
                    image={imgSrc(organisation.image)}
                    name={organisation.name}
                />
                <h3 className="text-xl font-semibold leading-none tracking-tight text-primary">
                    {organisation.name}
                </h3>
                <EditOrganisationDialog organisation={organisation} />
            </div>
            <OrganisationNavigation organisation={organisation} />
        </div>
    );
};
