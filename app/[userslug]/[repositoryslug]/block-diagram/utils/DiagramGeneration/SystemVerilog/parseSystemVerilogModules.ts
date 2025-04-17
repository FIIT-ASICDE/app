import { ParsedModule, ModulePort } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/interfaces";


export function parseSystemVerilogModules(text: string): ParsedModule[] {
    const modules: ParsedModule[] = [];

    const moduleRegex = /module\s+(\w+)\s*\(([\s\S]*?)\)\s*;([\s\S]*?)endmodule/gm;
    let match: RegExpExecArray | null;

    while ((match = moduleRegex.exec(text)) !== null) {
        const [, moduleName, portBlock] = match;
        const ports: ModulePort[] = [];

        const portLineRegex = /(input|output|inout)\s+(?:logic|bit)?\s*(?:\[(\d+):(\d+)\])?\s*(\w+)/g;
        let portMatch: RegExpExecArray | null;

        while ((portMatch = portLineRegex.exec(portBlock)) !== null) {
            const [, dir, msb, lsb, name] = portMatch;
            const width = msb && lsb ? Math.abs(parseInt(msb) - parseInt(lsb)) + 1 : 1;

            ports.push({
                direction: dir as ModulePort['direction'],
                name,
                width
            });
        }

        modules.push({ name: moduleName, ports });
    }

    return modules;
}
