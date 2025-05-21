/**
 * This module converts a parsed module description into a visual block diagram using JointJS.
 */

import { Module } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/module";
import { Port } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/port";
import { JointJsInputPort } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/io/joint-js-input-port";
import { JointJsOutputPort } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/io/joint-js-output-port";
import { JointJsModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/modules/joint-js-module";
import {
    CustomPort,
    ParsedTopModule,
} from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/diagram-generation/interfaces";
import { dia, shapes } from "@joint/core";
import { v4 as uuidv4 } from "uuid";

/**
 * Hides the visual representation of a port on a diagram element
 * Used to create cleaner diagrams where connection points are not visible
 * @param element - The diagram element containing the port
 * @param portId - Identifier of the port to hide
 */
const hidePort = (element: dia.Element, portId: string) => {
    element.portProp(portId, 'attrs/circle', { display: 'none' });
    element.portProp(portId, 'attrs/portCircle/cx', element.getPort(portId)?.group === 'input' ? 3 : -3);
    element.portProp(portId, 'attrs/portCircle', { display: 'none' });
    element.portProp(portId, 'attrs/portLine', { display: 'none' });
};

/**
 * Creates a connection link between two ports in the diagram
 * @param sourceId - ID of the source element
 * @param sourcePortId - ID of the source port
 * @param targetId - ID of the target element
 * @param targetPortId - ID of the target port
 * @returns A JointJS Link object representing the connection
 */
const createLink = (
    sourceId: string,
    sourcePortId: string,
    targetId: string,
    targetPortId: string
): dia.Link => {
    return new shapes.standard.Link({
        attrs: {
            line: {
                stroke: "#000",
                strokeWidth: 1,
                targetMarker: {
                    type: "classic",
                    stroke: "#000",
                    fill: "#000",
                },
            },
        },
        source: { id: sourceId, magnet: "portCircle", port: sourcePortId },
        target: { id: targetId, magnet: "portCircle", port: targetPortId },
        id: uuidv4(),
    });
};

/**
 * Creates a complete block diagram from a parsed module description
 * @param parsedTopModule - Parsed description of the top-level module
 * @returns A JointJS graph containing the complete block diagram
 */
export const createDiagramFromParsedModule = (
    parsedTopModule: ParsedTopModule | null
): dia.Graph => {
    // Initialize empty graph
    const graph = new dia.Graph({}, { cellNamespace: shapes });
    if (!parsedTopModule) return graph;

    // Create and position top-level ports
    const topPortEls: Record<string, dia.Element> = {};
    parsedTopModule.ports.forEach((port, i) => {
        const posX = port.direction === "input" ? 100 : 600;  // Inputs on left, outputs on right
        const posY = 100 + i * 100;  // Vertical spacing between ports
        const pd = new Port();
        pd.name = port.name;
        pd.position = { x: posX, y: posY };
        pd.dataBandwidth = port.width;
        const el =
            port.direction === "input"
                ? JointJsInputPort(pd)
                : JointJsOutputPort(pd);
        topPortEls[port.name] = el;
        graph.addCell(el);
    });

    // Create submodules and their ports
    const subEls: Record<string, dia.Element> = {};
    parsedTopModule.subModules.forEach((sub, i) => {
        if (subEls[sub.instanceName]) return;  // Skip if module already exists
        const md = new Module();
        md.name = sub.moduleName;
        md.instance = sub.instanceName;

        // Create input and output port definitions
        md.inPorts = sub.portConnections
            .filter((c) => c.direction === "input")
            .map((c) => ({ name: c.portName, bandwidth: c.width }));
        md.outPorts = sub.portConnections
            .filter((c) => c.direction === "output")
            .map((c) => ({ name: c.portName, bandwidth: c.width }));

        // Create and position the module element
        const el = JointJsModule(md, []);
        el.position(300, 100 + i * 200);  // Center modules between inputs and outputs
        graph.addCell(el);
        subEls[sub.instanceName] = el;
    });

    // Define connection type for net mapping
    type Conn = { el: dia.Element; portId: string; direction: 'input' | 'output' | 'inout' | 'in' | 'out'};
    const nets: Record<string, Conn[]> = {};

    // Map connections for submodules
    parsedTopModule.subModules.forEach((sub) => {
        const el = subEls[sub.instanceName];
        const ports = el.getPorts() as CustomPort[];
        sub.portConnections.forEach((c) => {
            const cp = ports.find((p) => p.name === c.portName);
            if (!cp) return;
            nets[c.connectedTo] ||= [];
            nets[c.connectedTo].push({
                el,
                portId: cp.id,
                direction: c.direction,
            });
        });
    });

    // Map connections for top-level ports
    parsedTopModule.ports.forEach((port) => {
        const el = topPortEls[port.name];
        if (!el) return;
        const p = el.getPorts()?.[0];
        if (!p) return;
        nets[port.name] ||= [];
        // Invert direction for top-level ports: inputs are sources, outputs are sinks
        const dir: "output" | "input" =
            port.direction === "input" ? "output" : "input";
        const portId = p.id || '';
        nets[port.name].push({ el, portId: portId, direction: dir });
    });

    // Create all connections in the diagram
    Object.values(nets).forEach((conns) => {
        // Separate sources and sinks for each net
        const sources = conns.filter((c) => c.direction === "output");
        const sinks   = conns.filter((c) => c.direction === "input");
        // Create links from each source to each sink
        sources.forEach((src) => {
            sinks.forEach((snk) => {
                hidePort(src.el, src.portId);
                hidePort(snk.el, snk.portId);
                const link = createLink(
                    src.el.id.toString(),
                    src.portId,
                    snk.el.id.toString(),
                    snk.portId
                );
                graph.addCell(link);
            });
        });
    });

    return graph;
};
