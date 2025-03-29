import { useEffect, useRef } from 'react';
import { dia, shapes, linkTools, elementTools, V } from "@joint/core";
import { useDiagramContext } from "@/app/diagram-test/context/useDiagramContext";
import './jointjs.css'

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
    sourceElemId: string
) {
    const elements = graph.getElements();
    elements.forEach((elem) => {
        if (elem.id === sourceElemId) return;

        const ports = elem.get('ports')?.items || [];
        ports.forEach((p) => {
            if (p.group === 'input') {
                let portBw = p.bandwidth ?? -1;
                if (elem.attributes.elType === 'splitter') {
                    const ports = elem.get('ports')?.items ?? [];
                    const outputPorts = ports.filter((p: any) => p.group === 'output');
                    const maxEndBit = outputPorts.reduce((max: number, p: any) => {
                        const bw = p.endBit ?? 0;
                        return bw > max ? bw : max;
                    }, 0);
                    portBw = maxEndBit + 1;
                }
                if (elem.attributes.elType === 'splitter' && portBw <= neededBw){
                    elem.portProp(p.id, 'attrs/portCircle/fill', 'green');
                }
                else if (elem.attributes.elType !== 'splitter' && portBw === neededBw) {
                    elem.portProp(p.id, 'attrs/portCircle/fill', 'green');
                } else {
                    elem.portProp(p.id, 'attrs/portCircle/fill', 'red');
                }
            }
        });
    });
}
function getPortBandwidth(cell: dia.Cell, portId: string): number {
    const ports = cell.get('ports')?.items ?? [];
    const found = ports.find((p: any) => p.id === portId);
    return found?.bandwidth ?? -1;
}

function resetAllPortsColor(graph: dia.Graph) {

    const elements = graph.getElements();
    elements.forEach((elem) => {
        const ports = elem.get('ports')?.items || [];
        ports.forEach((p) => {
            if (p.group === 'input') {
                elem.portProp(p.id, 'attrs/portCircle/fill', '#fff');
            } else {
                elem.portProp(p.id, 'attrs/portCircle/fill', '#e3d12d');
            }
        });
    });
}

function getPort(magnet: Element | null): string | null {
    if (!magnet) return null;
    let port = magnet.getAttribute('port');
    if (!port && magnet.parentElement) {
        port = magnet.parentElement.getAttribute('port');
    }
    return port;
}


const useJointJS = (paperElement: React.RefObject<HTMLDivElement>) => {
    const { graph, setSelectedElement, setPaper, removeElement, hasFormErrors } = useDiagramContext();
    console.log(hasFormErrors);
    const paperRef = useRef<dia.Paper | null>(null);
    const selectedCellViewRef = useRef<dia.CellView | null>(null);
    const isDragging = useRef(false);
    const lastClientX = useRef(0);
    const lastClientY = useRef(0);
    const translation = useRef({ x: 0, y: 0 });
    const isLinkingRef = useRef<boolean>(false);
    const currentLinkBandwidthRef = useRef<number>(1);



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
        if (paperElement.current && !paperRef.current) {
            console.log(paperElement.current)
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

                    const sourcePortId = getPort(sourceMagnet);
                    const sourcePortGroup = getPortGroup(sourceMagnet);
                    const targetPortId = getPort(targetMagnet);
                    const targetPortGroup = getPortGroup(targetMagnet);

                    if (!sourcePortId || !targetPortId) {
                        return false;
                    }

                    const sourceBw = getPortBandwidth(sourceView.model, sourcePortId);
                    let targetBw = getPortBandwidth(targetView.model, targetPortId);

                    if (targetView.model.attributes.elType === 'splitter') {
                        const ports = targetView.model.get('ports')?.items ?? [];
                        const outputPorts = ports.filter((p: any) => p.group === 'output');
                        const maxEndBit = outputPorts.reduce((max: number, p: any) => {
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

            paper.on('cell:pointerclick', (cellView) => {

                if (hasFormErrorsRef.current) {
                    console.log("Cannot switch, form has errors.");
                    return;
                }
                console.log(hasFormErrors);
                removeAllTools(paper);

                if (selectedCellViewRef.current) {
                    selectedCellViewRef.current.unhighlight('image', { highlighter: highlightSettings });
                }

                cellView.highlight('image', { highlighter: highlightSettings });

                selectedCellViewRef.current = cellView;
                setSelectedElement(cellView.model);
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

            paper.on('link:pointerup', (linkView, evt, x, y) => {

                const link = linkView.model;
                const target = link.get('target');

                if (!target || !target.port) {

                    graph.removeCells([link]);

                    resetAllPortsColor(graph);
                    isLinkingRef.current = false;
                }
            });
            let selectedElements: dia.Element[] = [];

            const clearSelection = () => {
                console.log(selectedElements);
                selectedElements.forEach((el) => {
                    paper.findViewByModel(el)?.unhighlight();
                });
                selectedElements = [];
            };


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
                            action: function(evt) {
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


            paper.on('element:magnet:pointerdown', (elementView, evt, magnet, x, y) => {
                if (!magnet) return;
                const sourcePortGroup = magnet.getAttribute('port-group');
                if (sourcePortGroup === 'output') {
                    const portId = getPort(magnet);
                    if (!portId) return;
                    const sourceBw = getPortBandwidth(elementView.model, portId);
                    currentLinkBandwidthRef.current = (sourceBw === 1) ? 1 : 3;
                    isLinkingRef.current = true;
                    const sourceElemId = elementView.model.id;
                    highlightAllInputPorts(graph, sourceBw, sourceElemId);
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

            let selectionRect: SVGRectElement | null = null;
            let origin = { x: 0, y: 0 };

            paper.on('blank:pointerdown', (evt: dia.Event, x: number, y: number) => {
                origin = { x, y };
                selectionRect = V('rect', {
                    x,
                    y,
                    width: 1,
                    height: 1,
                    fill: 'rgba(0, 153, 255, 0.2)',
                    stroke: '#3399ff',
                    'stroke-dasharray': '5,5',
                }).node as SVGRectElement;

                paper.svg.appendChild(selectionRect);
            });
            paper.on('blank:pointermove', (evt: dia.Event, x: number, y: number) => {
                if (!selectionRect) return;

                const rect = {
                    x: Math.min(x, origin.x),
                    y: Math.min(y, origin.y),
                    width: Math.abs(x - origin.x),
                    height: Math.abs(y - origin.y),
                };

                V(selectionRect).attr(rect);
            });



            paper.on('blank:pointerup', () => {

                if (!selectionRect) return;

                const bbox = V(selectionRect).bbox();
                paper.svg.removeChild(selectionRect);
                selectionRect = null;

                selectedElements = graph.getElements().filter((el) => {
                    return el.getBBox().intersect(bbox);
                });

                console.log(selectedElements);

                selectedElements.forEach((el) => {
                    paper.findViewByModel(el)?.highlight();
                });
            });
            let dragStartPoint: { x: number; y: number } | null = null;
            let isDraggingSelection = false;

            paper.on('element:pointerdown', (elementView, evt, x, y) => {
                const model = elementView.model;

                const alreadySelected = selectedElements.includes(model);
                const isMulti = evt.ctrlKey || evt.metaKey;

                console.log(selectedElements);

                if (!alreadySelected && !isMulti) {
                    clearSelection();
                }

                if (!alreadySelected) {
                    selectedElements.push(model);
                    elementView.highlight();
                }

                dragStartPoint = { x, y };
                isDraggingSelection = true;
            });

            paper.on('element:pointermove', (elementView, evt, x, y) => {
                if (!isDraggingSelection || !dragStartPoint) return;

                const dx = x - dragStartPoint.x;
                const dy = y - dragStartPoint.y;

                selectedElements.forEach((el) => {
                    const pos = el.position();
                    el.position(pos.x + dx, pos.y + dy);
                });

                dragStartPoint = { x, y };
            });

            paper.on('element:pointerup', () => {
                dragStartPoint = null;
                isDraggingSelection = false;
            });


            paperRef.current = paper;

            return () => {
                paper.remove();
                setPaper(null);
            };
        }
    }, [paperElement, graph, setSelectedElement, setPaper]);


    return paperRef.current;
};

export default useJointJS;
