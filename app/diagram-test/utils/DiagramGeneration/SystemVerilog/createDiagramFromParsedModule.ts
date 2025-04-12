import { Module } from "@/app/diagram-test/components/Shapes/classes/module";
import { Port } from "@/app/diagram-test/components/Shapes/classes/port";
import { JointJSInputPort } from "@/app/diagram-test/components/Shapes/io/JointJSInputPort";
import { JointJSOutputPort } from "@/app/diagram-test/components/Shapes/io/JointJSOutputPort";
import { JointJSModule } from "@/app/diagram-test/components/Shapes/modules/JointJSModule";
import { ParsedModule, ParsedTopModule } from "@/app/diagram-test/utils/DiagramGeneration/interfaces";
import { dia, shapes } from '@joint/core';


export const createDiagramFromParsedModule = (
    parsedTopModule: ParsedTopModule | null,
    parsedModules: ParsedModule[],
): dia.Graph => {
    const graph = new dia.Graph({}, { cellNamespace: shapes });

    const portElements: Record<string, dia.Element> = {};

    if (parsedTopModule){
        parsedTopModule.ports.forEach((port, index) => {
            const posX = port.direction === "input" ? 100 : 600;
            const posY = 100 + index * 100;

            const portData = new Port();
            portData.name = port.name;
            portData.position = { x: posX, y: posY };
            portData.dataBandwidth = port.width;

            const portElement =
                port.direction === "input"
                    ? JointJSInputPort(portData)
                    : JointJSOutputPort(portData);

            portElements[port.name] = portElement;
            graph.addCell(portElement);
        });

        parsedTopModule.subModules.forEach((sub, index) => {
            const foundModule = parsedModules.find(m => m.name === sub.moduleName);
            const posX = 300;
            const posY = 100 + index * 200;

            const moduleData = new Module();
            moduleData.name = sub.moduleName;
            moduleData.instance = sub.instanceName;

            if (foundModule) {
                const inputPorts = foundModule.ports.filter(p => p.direction === 'input' || p.direction === 'in');
                const outputPorts = foundModule.ports.filter(p => p.direction === 'output' || p.direction === 'out');

                moduleData.inPorts = inputPorts.map((p) => ({
                    name: p.name,
                    dataBandwidth: p.width || 1,
                }));

                moduleData.outPorts = outputPorts.map((p) => ({
                    name: p.name,
                    dataBandwidth: p.width || 1,
                }));
            }

            const element = JointJSModule(moduleData, []);
            element.position(posX, posY);
            graph.addCell(element);

            sub.portConnections.forEach((conn) => {
                const sourcePort = portElements[conn.connectedTo];
                const targetPortName = conn.portName;

                if (!sourcePort) return;

                const link = new shapes.standard.Link();
                link.source(sourcePort);
                link.target({
                    id: element.id,
                    port: targetPortName,
                });
                graph.addCell(link);
            });
        });

        return graph;
    }
    else {
        return graph;
    }

};
