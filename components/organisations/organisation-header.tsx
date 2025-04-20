"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { ReactElement } from "react";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { EditOrganisationDialog } from "@/components/organisations/edit-organisation-dialog";
import { OrganisationNavigation } from "@/components/organisations/organisation-navigation";

interface OrganisationHeaderProps {
    organisation: OrganisationDisplay;
}

/**
 * Header component used on the organisation page
 *
 * @param {OrganisationHeaderProps} props - Component props
 * @returns {ReactElement} Header component
 */
export const OrganisationHeader = ({
    organisation,
}: OrganisationHeaderProps): ReactElement => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex min-w-0 flex-row items-center space-x-6 px-6 py-4">
                <AvatarDisplay
                    displayType={"heading"}
                    image={imgSrc(organisation.image)}
                    name={organisation.name}
                />
                <DynamicTitle title={organisation.name} />
                <EditOrganisationDialog organisation={organisation} />
            </div>
            <OrganisationNavigation organisation={organisation} />
        </div>
    );
};
