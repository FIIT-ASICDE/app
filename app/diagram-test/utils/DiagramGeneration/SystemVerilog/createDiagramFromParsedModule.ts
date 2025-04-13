import { Module } from "@/app/diagram-test/components/Shapes/classes/module";
import { Port } from "@/app/diagram-test/components/Shapes/classes/port";
import { JointJSInputPort } from "@/app/diagram-test/components/Shapes/io/JointJSInputPort";
import { JointJSOutputPort } from "@/app/diagram-test/components/Shapes/io/JointJSOutputPort";
import { JointJSModule } from "@/app/diagram-test/components/Shapes/modules/JointJSModule";
import { ParsedModule, ParsedTopModule } from "@/app/diagram-test/utils/DiagramGeneration/interfaces";
import { dia, shapes } from '@joint/core';
import { v4 as uuidv4 } from 'uuid';

const hidePort = (element: dia.Element, portId: string) => {
    element.portProp(portId, 'attrs/circle', { display: 'none' });
    element.portProp(portId, 'attrs/portCircle/cx', element.getPort(portId)?.group === 'input' ? 3 : -3);
    element.portProp(portId, 'attrs/portCircle', { display: 'none' });
    element.portProp(portId, 'attrs/portLine', { display: 'none' });
};


const createLink = (sourceId: string, sourcePortId: string, targetId: string, targetPortId: string): dia.Link => {
    return new shapes.standard.Link({
        attrs: {
            line: {
                stroke: '#000',
                strokeWidth: 1,
                targetMarker: {
                    type: 'classic',
                    stroke: '#000',
                    fill: '#000',
                },
            },
            vertex: {
                r: 5,
                fill: '#33a1ff',
                stroke: '#000',
                strokeWidth: 1,
            },
        },
        source: { id: sourceId, magnet: 'portCircle', port: sourcePortId },
        target: { id: targetId, magnet: 'portCircle', port: targetPortId },
        interactive: {
            vertexAdd: true,
            vertexMove: true,
            vertexRemove: true,
            arrowheadMove: false,
        },
        id: uuidv4(),
    });
};


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
                    bandwidth: p.width || 1,
                }));

                moduleData.outPorts = outputPorts.map((p) => ({
                    name: p.name,
                    bandwidth: p.width || 1,
                }));
            }

            const element = JointJSModule(moduleData, []);
            element.position(posX, posY);
            graph.addCell(element);

            const subModuleOutputPorts: Record<string, { element: dia.Element, portId: string }> = {};
            element.getPorts().filter(p => p.group === 'output').forEach((p) => {
                subModuleOutputPorts[p.name] = {
                    element,
                    portId: p.id
                };
            });

            sub.portConnections.forEach((conn) => {
                const sourceElement = portElements[conn.connectedTo];
                if (!sourceElement) return;

                const sourcePortId = sourceElement.getPorts()[0]?.id;
                const targetPortId = element.getPorts().find((p) => p.name === conn.portName)?.id;

                if (!sourcePortId || !targetPortId) return;

                hidePort(sourceElement, sourcePortId);
                hidePort(element, targetPortId);

                const link = createLink(
                    sourceElement.id.toString(),
                    sourcePortId,
                    element.id.toString(),
                    targetPortId
                );
                graph.addCell(link);
            });
            // Добавить после первого foreach parsedTopModule.subModules.forEach(...)

            parsedTopModule.subModules.forEach((targetSub) => {
                targetSub.portConnections.forEach((conn) => {
                    if (portElements[conn.connectedTo]) return;

                    const source = subModuleOutputPorts[conn.connectedTo];
                    if (!source) return;

                    const targetElement = graph.getElements().find((el) =>
                        el.attributes.name === targetSub.instanceName
                    );
                    if (!targetElement) return;

                    const targetPortId = targetElement.getPorts().find((p) => p.name === conn.portName)?.id;
                    if (!targetPortId) return;

                    hidePort(source.element, source.portId);
                    hidePort(targetElement, targetPortId);

                    const link = createLink(
                        source.element.id.toString(),
                        source.portId,
                        targetElement.id.toString(),
                        targetPortId
                    );
                    graph.addCell(link);
                });
            });
        });

        return graph;
    }
    else {
        return graph;
    }

};
