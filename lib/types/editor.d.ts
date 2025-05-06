import { FileDisplayItem, FileItem } from "@/lib/types/repository";

export type SidebarContentTab =
    | "fileExplorer"
    | "search"
    | "sourceControl"
    | "configuration";

export type BottomPanelContentTab =
    | "simulation"
    | "synthesis"
    | "terminal"
    | "settings";

export type SimulationType =
    | "verilatorC++"
    | "verilatorSystemVerilog"
    | "icarusVerilog";

export type SynthesisType = "yosys";

type SimulationConfiguration = {
    type: SimulationType | undefined;
    testBench: FileItem | FileDisplayItem | undefined;
};

type SynthesisConfiguration = {
    type: SynthesisType | undefined;
    file: FileItem | FileDisplayItem | undefined;
};

export type Configuration = {
    simulation: SimulationConfiguration | undefined;
    synthesis: SynthesisConfiguration | undefined;
};

interface SynthesisOutput {
    type: SimulationOutputType;
    content: string;
}
export type SynthesisTab = "all" | "errors" | "lastSynthesis";

export type SimulationTab = "all" | "errors" | "lastSimulation";

type SimulationOutputType = "info" | "error" | "warning";

interface SimulationOutput {
    type: SimulationOutputType;
    content: string;
}
