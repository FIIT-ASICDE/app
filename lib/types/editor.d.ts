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

export type SynthesisType =
    | "yosys";

type SimulationConfiguration = {
    type: SimulationType;
    testBench: FileItem | FileDisplayItem;
};

type SynthesisConfiguration = {
    type: SynthesisType;
    file: FileItem | FileDisplayItem;
};

export type Configuration = {
    simulation: SimulationConfiguration;
    synthesis: SynthesisConfiguration;
};

export type SimulationTab =
    | "all"
    | "errors"
    | "lastSimulation";

type SimulationOutputType =
    | "info"
    | "error"
    | "warning";

interface SimulationOutput {
    type: SimulationOutputType;
    content: string;
}
