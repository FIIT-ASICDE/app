import { RepositoryVisibility } from "@/lib/types/repository";
import { Globe, Lock } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface VisibilityRadioGroupProps {
    handleVisibilityChange: (visibility: RepositoryVisibility) => void;
    repositoryVisibility: RepositoryVisibility;
    setRepositoryVisibility: Dispatch<SetStateAction<RepositoryVisibility>>;
}

export const VisibilityRadioGroup = ({
    handleVisibilityChange,
    repositoryVisibility,
    setRepositoryVisibility,
}: VisibilityRadioGroupProps) => {
    return (
        <RadioGroup
            onValueChange={handleVisibilityChange}
            defaultValue={"public"}
            className="flex flex-col"
        >
            <div
                className="flex cursor-pointer flex-row items-center space-x-3 rounded px-3 py-2 hover:bg-accent"
                role="button"
                onClick={() => setRepositoryVisibility("public")}
            >
                <RadioGroupItem
                    value="public"
                    checked={repositoryVisibility === "public"}
                />
                <Label className="flex cursor-pointer items-center gap-x-2 font-normal">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-base">Public</p>
                        <p className="text-sm text-muted-foreground">
                            Anyone can see this repository.
                        </p>
                    </div>
                </Label>
            </div>
            <div
                className="flex cursor-pointer flex-row items-center space-x-3 rounded px-3 py-2 hover:bg-accent"
                role="button"
                onClick={() => setRepositoryVisibility("private")}
            >
                <RadioGroupItem
                    value="private"
                    checked={repositoryVisibility === "private"}
                />
                <Label className="flex cursor-pointer items-center gap-x-2 font-normal">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-base">Private</p>
                        <p className="text-sm text-muted-foreground">
                            Only you can see this repository.
                        </p>
                    </div>
                </Label>
            </div>
        </RadioGroup>
    );
};
