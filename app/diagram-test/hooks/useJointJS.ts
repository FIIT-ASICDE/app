import { useDiagramContext } from "@/app/diagram-test/context/useDiagramContext";
import { V, dia, elementTools, linkTools, shapes } from "@joint/core";
import { useEffect, useRef } from 'react';
import { CustomPort } from "@/app/diagram-test/utils/DiagramGeneration/interfaces";


const highlightSettings = {
    name: 'stroke',
    options: {
        attrs: {
            stroke: '#ffa500',
            'stroke-width': 3,
            'stroke-dasharray': '5,5'
        }
    }
};


function highlightAllInputPorts(
    graph: dia.Graph,
    neededBw: number,
    sourceElemId: string,
    sourcePort: CustomPort
) {
    const elements = graph.getElements();
    elements.forEach((elem) => {
        if (elem.id === sourceElemId) return;

        const ports: CustomPort[] = elem.get('ports')?.items || [];
        ports.forEach((p: CustomPort) => {
            if (p.group === 'input') {
                if (sourcePort.isStruct) {
                    if (areStructPortsCompatible(sourcePort, p)) {
                        elem.portProp(p.id, 'attrs/portCircle/fill', 'green');
                    }
                    else {
                        elem.portProp(p.id, 'attrs/portCircle/fill', 'red');
                    }
                }
                else {
                    let portBw = p.bandwidth ?? -1;
                    if (elem.attributes.elType === 'splitter') {
                        const ports: CustomPort[] = elem.get('ports')?.items ?? [];
                        const outputPorts: CustomPort[] = ports.filter((p: CustomPort) => p.group === 'output');
                        const maxEndBit = outputPorts.reduce((max: number, p: CustomPort) => {
                            const bw = p.endBit ?? 0;
                            return bw > max ? bw : max;
                        }, 0);
                        portBw = maxEndBit + 1;
                    }
                    if (p.isStruct) {
                        elem.portProp(p.id, 'attrs/portCircle/fill', 'red');
                    }
                    else if (elem.attributes.elType === 'splitter' && portBw <= neededBw){
                        elem.portProp(p.id, 'attrs/portCircle/fill', 'green');
                    }
                    else if (elem.attributes.elType !== 'splitter' && portBw === neededBw) {
                        elem.portProp(p.id, 'attrs/portCircle/fill', 'green');
                    } else {
                        elem.portProp(p.id, 'attrs/portCircle/fill', 'red');
                    }
                }
            }
        });
    });
}
function getPortBandwidth(cell: dia.Cell, portId: string): number {
    const ports = cell.get('ports')?.items ?? [];
    const found = ports.find((p: CustomPort) => p.id === portId);
    return found?.bandwidth ?? -1;
}

function resetAllPortsColor(graph: dia.Graph) {

    const elements = graph.getElements();
    elements.forEach((elem) => {
        const ports: CustomPort[] = elem.get('ports')?.items || [];
        ports.forEach((p) => {
            if (p.group === 'input') {
                elem.portProp(p.id, 'attrs/portCircle/fill', '#fff');
            } else {
                elem.portProp(p.id, 'attrs/portCircle/fill', '#e3d12d');
            }
        });
    });
}

function getPortId(magnet: Element | null): string | null {
    if (!magnet) return null;
    let port = magnet.getAttribute('port');
    if (!port && magnet.parentElement) {
        port = magnet.parentElement.getAttribute('port');
    }
    return port;
}
function getPort(cell: dia.Cell, portId: string| null) {
    return cell.get('ports')?.items?.find((p: CustomPort) => p.id === portId);
}

function areStructPortsCompatible(sourcePort: CustomPort, targetPort: CustomPort): boolean {
    return (
        sourcePort.structPackage === targetPort.structPackage &&
        sourcePort.structTypeDef === targetPort.structTypeDef
    );
}



const useJointJS = (paperElement: React.RefObject<HTMLDivElement>, isReady: boolean) => {
    const { graph, setSelectedElement, setPaper, hasFormErrors } = useDiagramContext();
    const paperRef = useRef<dia.Paper | null>(null);
    const selectedCellViewRef = useRef<dia.CellView | null>(null);
    const isLinkingRef = useRef<boolean>(false);
    const currentLinkBandwidthRef = useRef<number>(1);


    const selectedElementsRef = useRef<dia.Element[]>([]);
    const selectionRectRef = useRef<SVGRectElement | null>(null);
    const selectionOriginRef = useRef({ x: 0, y: 0 });
    const isDraggingSelectionRef = useRef(false);
    const dragStartPointRef = useRef<{ x: number; y: number } | null>(null);


    const removeAllTools = (paper: dia.Paper) => {
        const elements = graph.getElements();
        elements.forEach(element => {
            const elementView = paper.findViewByModel(element);
            if (elementView) elementView.removeTools();
        });

        const links = graph.getLinks();
        links.forEach(link => {
            const linkView = paper.findViewByModel(link);
            if (linkView) linkView.removeTools();
        });
    };


    const hasFormErrorsRef = useRef(hasFormErrors);

    useEffect(() => {
        hasFormErrorsRef.current = hasFormErrors;
    }, [hasFormErrors]);

    useEffect(() => {
        if (paperElement.current && !paperRef.current && isReady) {

            const paper = new dia.Paper({
                el: paperElement.current,
                model: graph,
                width: '100%',
                height: '100%',
                gridSize: 10,
                drawGrid: true,
                background: { color: '#f9f9f9' },
                interactive: function(cellView) {
                    if (cellView.model.isLink()) {
                        return {
                            vertexAdd: true,
                            vertexMove: true,
                            vertexRemove: true,
                            arrowheadMove: false,
                            labelMove: false
                        };
                    }
                    return true;
                },
                cellViewNamespace: { standard: shapes.standard },
                defaultLink: () => new shapes.standard.Link({
                    interactive: {
                        vertexAdd: true,
                        vertexMove: true,
                        vertexRemove: true,
                        arrowheadMove: false
                    },
                    attrs: {
                        line: {
                            stroke: '#000',
                            strokeWidth: currentLinkBandwidthRef.current,
                            targetMarker: {
                                type: 'classic',
                                stroke: '#000',
                                fill: '#000'
                            }
                        },
                        vertex: {
                            r: 5,
                            fill: '#33a1ff',
                            stroke: '#000',
                            strokeWidth: 1
                        }
                    }
                }),
                defaultConnector: {
                    name: 'jumpover',
                    args: {
                        size: 7
                    }
                },
                defaultAnchor: {
                    name: 'perpendicular',
                    args: {
                        padding: 15
                    }
                },
                defaultRouter: {
                    name: 'manhattan',
                    args: {
                        step: 15,
                        args: { jumpSize: 10 }
                    }
                },
                defaultLinkAnchor: {
                    name: 'connectionPerpendicular'
                },
                linkPinning: true,
                markAvailable: true,
                snapLinks: { radius: 75 },
                validateConnection: function (
                    sourceView: dia.CellView,
                    sourceMagnet: Element | null,
                    targetView: dia.CellView,
                    targetMagnet: Element | null,
                    end: string,
                    linkView: dia.LinkView
                ): boolean {

                    if (sourceView.model.id === targetView.model.id) {
                        return false;
                    }

                    if (!sourceMagnet || !targetMagnet) {
                        return false;
                    }

                    function getPortGroup(magnet: Element | null): string | null {
                        if (!magnet) return null;
                        let group = magnet.getAttribute('port-group');
                        if (!group && magnet.parentElement) {
                            group = magnet.parentElement.getAttribute('port-group');
                        }
                        return group;
                    }

                    const sourcePortId = getPortId(sourceMagnet);
                    const sourcePortGroup = getPortGroup(sourceMagnet);
                    const targetPortId = getPortId(targetMagnet);
                    const targetPortGroup = getPortGroup(targetMagnet);
                    const sourcePort = getPort(sourceView.model, sourcePortId);
                    const targetPort = getPort(targetView.model, targetPortId);

                    if (!sourcePortId || !targetPortId) {
                        return false;
                    }
                    console.log("Ports")

                    if (!sourcePort.isStruct && !targetPort.isStruct) {
                        const sourceBw = getPortBandwidth(sourceView.model, sourcePortId);
                        let targetBw = getPortBandwidth(targetView.model, targetPortId);

                        if (targetView.model.attributes.elType === 'splitter') {
                            const ports = targetView.model.get('ports')?.items ?? [];
                            const outputPorts = ports.filter((p: CustomPort) => p.group === 'output');
                            const maxEndBit = outputPorts.reduce((max: number, p: CustomPort) => {
                                const bw = p.endBit ?? 0;
                                return bw > max ? bw : max;
                            }, 0);
                            targetBw = maxEndBit + 1;
                        }

                        if (sourceBw < 0 || targetBw < 0) {
                            return false;
                        }

                        if (targetView.model.attributes.elType === 'splitter' && sourceBw < targetBw){
                            return false;
                        }
                        if (targetView.model.attributes.elType !== 'splitter' && sourceBw !== targetBw) {
                            return false;
                        }
                    }
                    else {
                        if (!areStructPortsCompatible(sourcePort, targetPort)) {
                            return false;
                        }
                    }

                    if (sourcePortGroup !== 'output' || targetPortGroup !== 'input') {
                        return false;
                    }

                    const links = graph.getLinks();
                    const targetElementId = targetView.model.id;
                    for (const link of links) {
                        if (link.id !== linkView.model.id) {
                            const linkTarget = link.get('target');
                            if (
                                linkTarget.id === targetElementId &&
                                linkTarget.port === targetPortId
                            ) {
                                return false;
                            }
                        }
                    }
                    return true;

                },
            });

            setPaper(paper);

            const clearSelection = () => {
                selectedElementsRef.current.forEach((el) => {
                    const view = paper.findViewByModel(el);
                    if (view) {
                        view.unhighlight(null, {
                            name: 'stroke',
                            options: {
                                attrs: {
                                    stroke: '#3399ff',
                                    'stroke-width': 2,
                                    'stroke-dasharray': '5,5'
                                }
                            }
                        });
                    }
                });
                selectedElementsRef.current = [];
            };

            paper.on('cell:pointerclick', (cellView) => {

                if (hasFormErrorsRef.current) {
                    console.log("Cannot switch, form has errors.");
                    return;
                }

                if (!isDraggingSelectionRef.current) {
                    removeAllTools(paper);

                    clearSelection();

                    if (selectedCellViewRef.current) {
                        selectedCellViewRef.current.unhighlight('image', { highlighter: highlightSettings });
                    }

                    cellView.highlight('image', { highlighter: highlightSettings });
                    selectedCellViewRef.current = cellView;
                    setSelectedElement(cellView.model);
                }

                isDraggingSelectionRef.current = false;
            });


            const linkTool = new dia.ToolsView({
                tools: [
                    new linkTools.Vertices(),
                    new linkTools.Remove()
                ]
            });

            paper.on('link:pointerclick', (linkView) => {
                linkView.addTools(linkTool);
            });

            paper.on('link:pointerup', (linkView) => {

                const link = linkView.model;
                const target = link.get('target');

                if (!target || !target.port) {

                    graph.removeCells([link]);

                    resetAllPortsColor(graph);
                    isLinkingRef.current = false;
                }
            });
            const selectedElements: dia.Element[] = [];




            paper.on('element:pointerclick', (elementView) => {

                if (hasFormErrorsRef.current) {
                    console.log("Cannot switch, form has errors.");
                    return;
                }
                
                const elementModel = elementView.model;

                const elementTool = new dia.ToolsView({
                    tools: [
                        new elementTools.Remove({
                            x: '100%',
                            y: 0,
                            offset: { x: 10, y: -10 },
                            markup: [
                                {
                                    tagName: 'circle',
                                    selector: 'button',
                                    attributes: {
                                        'r': 7,
                                        'fill': '#FF1D00',
                                        'cursor': 'pointer'
                                    }
                                },
                                {
                                    tagName: 'path',
                                    selector: 'icon',
                                    attributes: {
                                        'd': 'M -3 -3 3 3 M -3 3 3 -3',
                                        'fill': 'none',
                                        'stroke': '#FFFFFF',
                                        'stroke-width': 2,
                                        'pointer-events': 'none'
                                    }
                                }
                            ],
                            action: function() {
                                graph.removeCells([elementModel]);
                                setSelectedElement(null);
                            }
                        })
                    ]
                });

                elementView.addTools(elementTool);
            });

            paper.on('blank:pointerclick', () => {
                removeAllTools(paper);

                if (selectedCellViewRef.current) {
                    selectedCellViewRef.current.unhighlight('image', { highlighter: highlightSettings });
                    selectedCellViewRef.current = null;
                }

                console.log(selectedElements);
                clearSelection();

                setSelectedElement(null);

                if (isLinkingRef.current) {
                    resetAllPortsColor(graph);
                    isLinkingRef.current = false;
                }
            });


            paper.on('element:magnet:pointerdown', (elementView, evt, magnet) => {
                if (!magnet) return;
                const sourcePortGroup = magnet.getAttribute('port-group');
                if (sourcePortGroup === 'output') {
                    const portId = getPortId(magnet);
                    const sourcePort = getPort(elementView.model, portId);
                    if (!portId) return;
                    const sourceBw = getPortBandwidth(elementView.model, portId);
                    currentLinkBandwidthRef.current = (sourceBw === 1) ? 1 : 3;
                    isLinkingRef.current = true;
                    const sourceElemId = elementView.model.id;
                    highlightAllInputPorts(graph, sourceBw, sourceElemId, sourcePort);
                }
            });

            paper.on('link:connect link:disconnect', () => {
                resetAllPortsColor(graph);
                isLinkingRef.current = false;
            });
            paper.on('link:connect', (linkView) => {
                const link = linkView.model;
                const sourcePortId = link.get('source').port;
                const targetPortId = link.get('target').port;

                const sourceElement = graph.getCell(link.get('source').id) as dia.Element;
                const targetElement = graph.getCell(link.get('target').id) as dia.Element;

                if (sourceElement && sourcePortId) {
                    sourceElement.portProp(sourcePortId, 'attrs/circle', { display: 'none' });

                    sourceElement.portProp(sourcePortId, 'attrs/portCircle/cx', -3);
                    sourceElement.portProp(sourcePortId, 'attrs/portCircle', { display: 'none' });
                    sourceElement.portProp(sourcePortId, 'attrs/portLine', { display: 'none' });
                }
                if (targetElement && targetPortId) {
                    targetElement.portProp(targetPortId, 'attrs/circle', { display: 'none' });
                    if (targetPortId === 'select') {
                        targetElement.portProp(targetPortId, 'args/y', 23);
                    }
                    else if (targetPortId === 'rst') {
                        targetElement.portProp(targetPortId, 'args/y', 10);
                    }
                    else if (targetPortId === 'clk' && targetElement.attributes.elType === 'ram') {
                        targetElement.portProp(targetPortId, 'args/y', 10);
                    }
                    else {
                        targetElement.portProp(targetPortId, 'attrs/portCircle/cx', 3);
                    }
                    targetElement.portProp(targetPortId, 'attrs/portCircle', { display: 'none'});
                    targetElement.portProp(targetPortId, 'attrs/portLine', { display: 'none' });
                }
            });


            graph.on('add', (cell) => {
                if (cell.isLink()) {
                    console.log('Cell created:', cell);
                }
            });

            graph.on('remove', (cell) => {
                if (cell.isLink()) {
                    const link = cell;
                    const sourcePortId = link.get('source').port;
                    const targetPortId = link.get('target').port;

                    const sourceElement = graph.getCell(link.get('source').id) as dia.Element;
                    const targetElement = graph.getCell(link.get('target').id) as dia.Element;

                    if (sourceElement && sourcePortId) {
                        sourceElement.portProp(sourcePortId, 'attrs/circle', { display: '' });

                        sourceElement.portProp(sourcePortId, 'attrs/portCircle/cx', 20);
                        sourceElement.portProp(sourcePortId, 'attrs/portCircle', { display: '' });
                        sourceElement.portProp(sourcePortId, 'attrs/portLine', { display: '' });

                    }

                    if (targetElement && targetPortId) {
                        targetElement.portProp(targetPortId, 'attrs/circle', { display: '' });
                        if (targetPortId === 'select') {
                            targetElement.portProp(targetPortId, 'args/y', 0);
                        }
                        else if (targetPortId === 'rst') {
                            targetElement.portProp(targetPortId, 'args/y', -15);
                        }
                        else if (targetPortId === 'clk' && targetElement.attributes.elType === 'ram') {
                            targetElement.portProp(targetPortId, 'args/y', -15);
                        }
                        else {
                            targetElement.portProp(targetPortId, 'attrs/portCircle/cx', -20);
                        }
                        targetElement.portProp(targetPortId, 'attrs/portCircle', { display: '' });
                        targetElement.portProp(targetPortId, 'attrs/portLine', { display: '' });
                    }
                }
            });


            paper.on('blank:pointerdown', (evt: dia.Event, x: number, y: number) => {
                clearSelection();

                selectionOriginRef.current = { x, y };
                selectionRectRef.current = V('rect', {
                    x,
                    y,
                    width: 1,
                    height: 1,
                    fill: 'rgba(0, 153, 255, 0.2)',
                    stroke: '#3399ff',
                    'stroke-dasharray': '5,5',
                }).node as SVGRectElement;

                paper.svg.appendChild(selectionRectRef.current);
            });

            paper.on('blank:pointermove', (evt: dia.Event, x: number, y: number) => {
                if (!selectionRectRef.current) return;

                const rect = {
                    x: Math.min(x, selectionOriginRef.current.x),
                    y: Math.min(y, selectionOriginRef.current.y),
                    width: Math.abs(x - selectionOriginRef.current.x),
                    height: Math.abs(y - selectionOriginRef.current.y),
                };

                V(selectionRectRef.current).attr(rect);
            });


            paper.on('blank:pointerup', () => {
                if (!selectionRectRef.current) return;

                const bbox = V(selectionRectRef.current).bbox();
                paper.svg.removeChild(selectionRectRef.current);
                selectionRectRef.current = null;

                selectedElementsRef.current = graph.getElements().filter((el) => {
                    return el.getBBox().intersect(bbox);
                });

                if (selectedElementsRef.current.length === 1) {
                    const singleElement = selectedElementsRef.current[0];
                    const view = paper.findViewByModel(singleElement);

                    if (view) {
                        view.highlight('image', { highlighter: highlightSettings });
                        selectedCellViewRef.current = view;

                        const elementTool = new dia.ToolsView({
                            tools: [
                                new elementTools.Remove({
                                    x: '100%',
                                    y: 0,
                                    offset: { x: 10, y: -10 },
                                    markup: [
                                        {
                                            tagName: 'circle',
                                            selector: 'button',
                                            attributes: {
                                                'r': 7,
                                                'fill': '#FF1D00',
                                                'cursor': 'pointer'
                                            }
                                        },
                                        {
                                            tagName: 'path',
                                            selector: 'icon',
                                            attributes: {
                                                'd': 'M -3 -3 3 3 M -3 3 3 -3',
                                                'fill': 'none',
                                                'stroke': '#FFFFFF',
                                                'stroke-width': 2,
                                                'pointer-events': 'none'
                                            }
                                        }
                                    ],
                                    action: function() {
                                        graph.removeCells([singleElement]);
                                        setSelectedElement(null);
                                    }
                                })
                            ]
                        });
                        view.addTools(elementTool);
                    }

                    setSelectedElement(singleElement);
                    selectedElementsRef.current = [];
                } else if (selectedElementsRef.current.length > 1) {
                    selectedElementsRef.current.forEach((el) => {
                        const view = paper.findViewByModel(el);
                        if (view) {
                            view.highlight(null, {
                                name: 'stroke',
                                options: {
                                    attrs: {
                                        stroke: '#3399ff',
                                        'stroke-width': 2,
                                        'stroke-dasharray': '5,5'
                                    }
                                }
                            });
                        }
                    });
                }
            });


            paper.on('element:pointerdown', (elementView, evt, x, y) => {
                const model = elementView.model as dia.Element;

                const isSelected = selectedElementsRef.current.some(el => el.id === model.id);

                if (!isSelected && !(evt.ctrlKey || evt.metaKey)) {
                    removeAllTools(paper);

                    clearSelection();

                    if (selectedCellViewRef.current) {
                        selectedCellViewRef.current.unhighlight('image', { highlighter: highlightSettings });
                    }

                    elementView.highlight('image', { highlighter: highlightSettings });
                    selectedCellViewRef.current = elementView;
                    setSelectedElement(model);

                    const elementTool = new dia.ToolsView({
                        tools: [
                            new elementTools.Remove({
                                x: '100%',
                                y: 0,
                                offset: { x: 10, y: -10 },
                                markup: [
                                    {
                                        tagName: 'circle',
                                        selector: 'button',
                                        attributes: {
                                            'r': 7,
                                            'fill': '#FF1D00',
                                            'cursor': 'pointer'
                                        }
                                    },
                                    {
                                        tagName: 'path',
                                        selector: 'icon',
                                        attributes: {
                                            'd': 'M -3 -3 3 3 M -3 3 3 -3',
                                            'fill': 'none',
                                            'stroke': '#FFFFFF',
                                            'stroke-width': 2,
                                            'pointer-events': 'none'
                                        }
                                    }
                                ],
                                action: function() {
                                    graph.removeCells([model]);
                                    setSelectedElement(null);
                                }
                            })
                        ]
                    });
                    elementView.addTools(elementTool);
                }
                else if (!isSelected && (evt.ctrlKey || evt.metaKey)) {
                    selectedElementsRef.current.push(model);
                    elementView.highlight(null, {
                        name: 'stroke',
                        options: {
                            attrs: {
                                stroke: '#3399ff',
                                'stroke-width': 2,
                                'stroke-dasharray': '5,5'
                            }
                        }
                    });
                }

                dragStartPointRef.current = { x, y };
                isDraggingSelectionRef.current = true;
            });

            paper.on('element:pointermove', (elementView, evt, x, y) => {
                if (!isDraggingSelectionRef.current || !dragStartPointRef.current) return;

                const dx = x - dragStartPointRef.current.x;
                const dy = y - dragStartPointRef.current.y;

                if (selectedElementsRef.current.length > 0) {
                    selectedElementsRef.current.forEach((el) => {
                        const pos = el.position();
                        el.position(pos.x + dx, pos.y + dy);
                    });
                }
                else {
                    const pos = elementView.model.position();
                    elementView.model.position(pos.x + dx, pos.y + dy);
                }

                dragStartPointRef.current = { x, y };
            });

            paper.on('element:pointerup', () => {
                dragStartPointRef.current = null;
            });


            paperRef.current = paper;

            return () => {
                paper.remove();
                setPaper(null);
            };
        }

    }, [paperElement, graph, setSelectedElement, setPaper, isReady]);


    return paperRef.current;
};

export default useJointJS;
