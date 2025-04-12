import {ParsedTopModule, TopModulePort, SubModule } from "app/diagram-test/utils/DiagramGeneration/interfaces"

export function parseSystemVerilogTopModule(text: string): ParsedTopModule | null {
    const moduleRegex = /module\s+(\w+)\s*\(([\s\S]*?)\)\s*;([\s\S]*?)endmodule/gm;
    const portLineRegex = /(input|output|inout)\s+(?:logic|bit)?\s*(?:\[(\d+):(\d+)\])?\s*(\w+)/g;
    const subModuleRegex = /(\w+)\s+(\w+)\s*\(\s*([\s\S]*?)\s*\)\s*;/gm;
    const portConnectionRegex = /\.(\w+)\s*\(\s*(\w+)\s*\)/g;

    const match = moduleRegex.exec(text);
    if (!match) return null;

    const [, moduleName, portBlock, body] = match;

    const ports: TopModulePort[] = [];
    let portMatch: RegExpExecArray | null;
    while ((portMatch = portLineRegex.exec(portBlock)) !== null) {
        const [, dir, msb, lsb, name] = portMatch;
        const width = msb && lsb ? Math.abs(parseInt(msb) - parseInt(lsb)) + 1 : 1;
        ports.push({ direction: dir as TopModulePort['direction'], name, width });
    }

    const portWidthMap = new Map(ports.map(p => [p.name, p.width]));

    const subModules: SubModule[] = [];
    let subMatch: RegExpExecArray | null;
    while ((subMatch = subModuleRegex.exec(body)) !== null) {
        const [, subModuleName, instanceName, connectionsBlock] = subMatch;
        const portConnections: SubModule['portConnections'] = [];

        let connMatch: RegExpExecArray | null;
        while ((connMatch = portConnectionRegex.exec(connectionsBlock)) !== null) {
            const [, subPort, connectedTo] = connMatch;
            const width = portWidthMap.get(connectedTo) || 1;
            portConnections.push({ portName: subPort, connectedTo, width });
        }

        subModules.push({ moduleName: subModuleName, instanceName, portConnections });
    }

    return { name: moduleName, ports, subModules };
}
