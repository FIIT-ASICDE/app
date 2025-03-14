"use client";

import type {
    LanguageStatistics,
    LanguageStatisticsItem,
} from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { ChartPie } from "lucide-react";
import { ReactElement, useState } from "react";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Sector,
    type SectorProps,
} from "recharts";

import { languageColors } from "@/components/generic/generic";
import { NoData } from "@/components/generic/no-data";
import { Label } from "@/components/ui/label";

interface LanguageStatisticsChartProps {
    languageStatistics: LanguageStatistics;
}

type ActiveShapeProps = Omit<
    SectorProps,
    "cx" | "cy" | "innerRadius" | "outerRadius"
> & {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
};

export default function LanguageStatisticsChart({
    languageStatistics,
}: LanguageStatisticsChartProps) {
    const [activeIndex, setActiveIndex] = useState<number | undefined>();

    if (languageStatistics.percentages.length === 0) {
        return (
            <NoData
                icon={ChartPie}
                message="No language statistics data found."
                className="m-6"
            />
        );
    }

    const chartData = languageStatistics.percentages.map(
        (languageStatisticsItem: LanguageStatisticsItem) => ({
            ...languageStatisticsItem,
            value: languageStatisticsItem.percentage,
        }),
    );

    const onPieEnter = (_: unknown, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(undefined);
    };

    const renderActiveShape = ((props: ActiveShapeProps) => {
        return (
            <g>
                <Sector
                    cx={props.cx}
                    cy={props.cy}
                    innerRadius={props.innerRadius}
                    outerRadius={props.outerRadius + 4}
                    startAngle={props.startAngle}
                    endAngle={props.endAngle}
                    fill={props.fill}
                />
            </g>
        );
    }) as unknown as (props: object) => ReactElement;

    languageStatistics.percentages.forEach((item) => {
        console.log(item.language);
    });

    return (
        <div className="relative mx-auto w-full rounded-lg">
            <div className="relative h-[170px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                        >
                            {chartData.map((item, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        languageColors[item.language] || languageColors["default"]
                                    }
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-6 flex flex-col space-y-0">
                {chartData.map((item, index) => (
                    <Label
                        key={index}
                        className={cn(
                            "grid grid-cols-2 rounded px-2 py-1.5 font-normal",
                            activeIndex === index && "bg-accent",
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{
                                    backgroundColor:
                                        languageColors[item.language] || languageColors["default"],
                                }}
                            />
                            {item.language}
                        </div>
                        <span className="flex flex-row justify-end gap-x-3 text-right text-sm">
                            <span className="inline text-muted-foreground md:hidden xl:inline">
                                {item.loc} lines
                            </span>
                            <span>{item.percentage.toFixed(1)}%</span>
                        </span>
                    </Label>
                ))}
            </div>
        </div>
    );
}
