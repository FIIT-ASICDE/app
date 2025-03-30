import { FileDisplayItem, FileItem } from "@/lib/types/repository";

export type SidebarContentTab = "fileExplorer" | "search" | "sourceControl";

export type BottomPanelContentTab =
    | "simulation"
    | "synthesis"
    | "terminal"
    | "settings";

export type SimulationType =
    | "verilatorC++"
    | "verilatorSystemVerilog"
    | "icarusVerilog";

export type SimulationConfiguration = {
    simulationType: SimulationType;
    testBenchFile: FileDisplayItem | FileItem;
};
