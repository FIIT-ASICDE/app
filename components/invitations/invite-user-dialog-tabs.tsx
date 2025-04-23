import { InviteUserTab, OrganisationDisplay } from "@/lib/types/organisation";
import { RepositoryDisplay } from "@/lib/types/repository";
import { Building, Folder } from "lucide-react";
import { Dispatch, ReactElement, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface InviteUserDialogTabsProps {
    activeInviteUserTab: InviteUserTab;
    setActiveInviteUserTab: Dispatch<SetStateAction<InviteUserTab>>;
    usersOrganisations: Array<OrganisationDisplay>;
    usersRepositories: Array<RepositoryDisplay>;
    setSelectedOrganisation: Dispatch<
        SetStateAction<OrganisationDisplay | undefined>
    >;
    setSelectedRepository: Dispatch<
        SetStateAction<RepositoryDisplay | undefined>
    >;
}

/**
 * Tabs component displaying the option between inviting to an organisation and to a repository
 *
 * @param {InviteUserDialogTabsProps} props - Component props
 * @returns {ReactElement} Tabs component
 */
export const InviteUserDialogTabs = ({
    activeInviteUserTab,
    setActiveInviteUserTab,
    usersOrganisations,
    usersRepositories,
    setSelectedOrganisation,
    setSelectedRepository,
}: InviteUserDialogTabsProps): ReactElement => {
    return (
        <div className="flex w-full flex-row gap-x-3">
            {usersOrganisations.length === 0 ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className="flex w-1/2 cursor-not-allowed flex-row items-center justify-center gap-x-2"
                            role="button"
                        >
                            <Button
                                variant={
                                    activeInviteUserTab === "toOrganisation"
                                        ? "secondary"
                                        : "outline"
                                }
                                className="w-full"
                                disabled
                            >
                                <Building />
                                <span>Organisation</span>
                            </Button>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        You are not an admin of any organisation.
                    </TooltipContent>
                </Tooltip>
            ) : (
                <Button
                    variant={
                        activeInviteUserTab === "toOrganisation"
                            ? "secondary"
                            : "outline"
                    }
                    onClick={() => {
                        setSelectedRepository(undefined);
                        setActiveInviteUserTab("toOrganisation");
                    }}
                    className="flex w-1/2 flex-row items-center justify-center gap-x-2"
                >
                    <Building />
                    <span>Organisation</span>
                </Button>
            )}

            {usersRepositories.length === 0 ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className="flex w-1/2 cursor-not-allowed flex-row items-center justify-center gap-x-2"
                            role="button"
                        >
                            <Button
                                variant={
                                    activeInviteUserTab === "onRepository"
                                        ? "secondary"
                                        : "outline"
                                }
                                className="w-full"
                                disabled
                            >
                                <Folder />
                                <span>Repository</span>
                            </Button>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        You are not an owner of any repository.
                    </TooltipContent>
                </Tooltip>
            ) : (
                <Button
                    variant={
                        activeInviteUserTab === "onRepository"
                            ? "secondary"
                            : "outline"
                    }
                    onClick={() => {
                        setSelectedOrganisation(undefined);
                        setActiveInviteUserTab("onRepository");
                    }}
                    className="flex w-1/2 flex-row items-center justify-center gap-x-2"
                >
                    <Folder />
                    <span>Repository</span>
                </Button>
            )}
        </div>
    );
};
