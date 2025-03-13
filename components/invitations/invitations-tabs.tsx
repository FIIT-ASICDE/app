"use client";

import { InvitationsTab } from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleDot, CircleX } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";

interface InvitationsTabsProps {
    tab: InvitationsTab;
    setTabAction: Dispatch<SetStateAction<InvitationsTab>>;
}

export const InvitationsTabs = ({
    tab,
    setTabAction,
}: InvitationsTabsProps) => {
    return (
        <div className="flex w-full flex-row gap-3">
            <Button
                variant={tab === "pending" ? "secondary" : "outline"}
                className="flex w-1/3 flex-row gap-x-3 md:w-full"
                onClick={() => setTabAction("pending")}
            >
                <CircleDot />
                Pending
            </Button>
            <Button
                variant={tab === "accepted" ? "secondary" : "outline"}
                className={cn(
                    "flex w-1/3 flex-row gap-x-3 border-green-900 hover:bg-green-900 hover:text-white md:w-full",
                    tab === "accepted" && "bg-green-900",
                )}
                onClick={() => setTabAction("accepted")}
            >
                <CircleCheck />
                Accepted
            </Button>
            <Button
                variant={tab === "declined" ? "destructive" : "outline"}
                className="flex w-1/3 flex-row gap-x-3 border-destructive hover:bg-destructive hover:text-destructive-foreground md:w-full"
                onClick={() => setTabAction("declined")}
            >
                <CircleX />
                Declined
            </Button>
        </div>
    );
};
