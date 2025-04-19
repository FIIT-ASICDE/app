import { Module } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/module";
import { Port } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/port";
import { JointJSInputPort } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/io/JointJSInputPort";
import { JointJSOutputPort } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/io/JointJSOutputPort";
import { JointJSModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/modules/JointJSModule";
import {
    CustomPort,
    ParsedTopModule,
} from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/interfaces";
import { dia, shapes } from "@joint/core";
import { v4 as uuidv4 } from "uuid";

/** Скрыть кружок и линию у порта, чтобы не мешался */
const hidePort = (element: dia.Element, portId: string) => {
    element.portProp(portId, 'attrs/circle', { display: 'none' });
    element.portProp(portId, 'attrs/portCircle/cx', element.getPort(portId)?.group === 'input' ? 3 : -3);
    element.portProp(portId, 'attrs/portCircle', { display: 'none' });
    element.portProp(portId, 'attrs/portLine', { display: 'none' });
};

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

export const createDiagramFromParsedModule = (
    parsedTopModule: ParsedTopModule | null
): dia.Graph => {
    const graph = new dia.Graph({}, { cellNamespace: shapes });
    if (!parsedTopModule) return graph;

    // 1) Рисуем топ‑порты
    const topPortEls: Record<string, dia.Element> = {};
    parsedTopModule.ports.forEach((port, i) => {
        const posX = port.direction === "input" ? 100 : 600;
        const posY = 100 + i * 100;
        const pd = new Port();
        pd.name = port.name;
        pd.position = { x: posX, y: posY };
        pd.dataBandwidth = port.width;
        const el =
            port.direction === "input"
                ? JointJSInputPort(pd)
                : JointJSOutputPort(pd);
        topPortEls[port.name] = el;
        graph.addCell(el);
    });

    // 2) Рисуем sub‑модули (только один раз на инстанс)
    const subEls: Record<string, dia.Element> = {};
    parsedTopModule.subModules.forEach((sub, i) => {
        if (subEls[sub.instanceName]) return;       // уже нарисовали
        const md = new Module();
        md.name = sub.moduleName;
        md.instance = sub.instanceName;

        md.inPorts = sub.portConnections
            .filter((c) => c.direction === "input")
            .map((c) => ({ name: c.portName, bandwidth: c.width }));
        md.outPorts = sub.portConnections
            .filter((c) => c.direction === "output")
            .map((c) => ({ name: c.portName, bandwidth: c.width }));

        const el = JointJSModule(md, []);
        el.position(300, 100 + i * 200);
        graph.addCell(el);
        subEls[sub.instanceName] = el;
    });

    // 3) Собираем сети по сигналам
    type Conn = { el: dia.Element; portId: string; direction: "input" | "output" };
    const nets: Record<string, Conn[]> = {};

    // 3a) порты sub‑модулей
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
                direction: c.direction,  // вход/выход sub‑модуля
            });
        });
    });

    // 3b) топ‑порты
    parsedTopModule.ports.forEach((port) => {
        const el = topPortEls[port.name];
        if (!el) return;
        const p = el.getPorts()?.[0];
        if (!p) return;
        nets[port.name] ||= [];
        // **инвертируем**: топ‑вход — источник, топ‑выход — приёмник
        const dir: "output" | "input" =
            port.direction === "input" ? "output" : "input";
        nets[port.name].push({ el, portId: p.id, direction: dir });
    });

    // 4) Стягиваем каждую сеть: из каждого источника → ко всем приёмникам
    Object.values(nets).forEach((conns) => {
        const sources = conns.filter((c) => c.direction === "output");
        const sinks   = conns.filter((c) => c.direction === "input");
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
