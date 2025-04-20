import { RepositoryItemChange } from "@/lib/types/repository";
import { ReactElement } from "react";

import { getChangeContent } from "@/components/generic/generic";

interface ChangesTableProps {
    expanded: boolean;
    commitChanges: Array<RepositoryItemChange>;
}

/**
 * Table component that displays changes made on a repository
 *
 * @param {ChangesTableProps} props - Component props
 * @returns {ReactElement} Table component
 */
export const ChangesTable = ({
    expanded,
    commitChanges,
}: ChangesTableProps): ReactElement => {
    if (!expanded) {
        return <></>;
    }

    return (
        <tr>
            <td colSpan={5} className="p-0">
                <div className="rounded bg-background p-4">
                    <table className="w-full border border-accent bg-card text-sm shadow-2xl">
                        <thead className="bg-accent">
                            <tr className="border-b border-muted-foreground">
                                <th className="px-4 py-2 text-left font-medium">
                                    File
                                </th>
                                <th className="px-4 py-2 text-right font-medium">
                                    Change
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {commitChanges && commitChanges.length > 0 ? (
                                commitChanges.map(
                                    (
                                        change: RepositoryItemChange,
                                        index: number,
                                    ) => (
                                        <tr
                                            key={index + change.itemPath}
                                            className="border-b border-accent"
                                        >
                                            <td className="px-4 py-2">
                                                {change.itemPath}
                                            </td>
                                            <td className="mr-4 flex flex-row justify-end px-4 py-3 text-muted-foreground">
                                                {getChangeContent(change)}
                                            </td>
                                        </tr>
                                    ),
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="px-4 py-2 text-center"
                                    >
                                        No changes
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    );
};
