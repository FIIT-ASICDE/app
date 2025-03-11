// pages/diagram-test/hooks/useJointJS.ts

import { useEffect, useRef } from 'react';
import { dia, shapes, linkTools, elementTools } from "@joint/core";
import { useDiagramContext } from '../context/useDiagramContext';
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
        // Если это тот же элемент, что и выходной порт, пропускаем
        if (elem.id === sourceElemId) return;

        const ports = elem.get('ports')?.items || [];
        ports.forEach((p) => {
            // Интересуют только input-порты
            if (p.group === 'input') {
                const portBw = p.bandwidth ?? -1;
                if (portBw === neededBw) {
                    // Подсвечиваем зелёным
                    elem.portProp(p.id, 'attrs/portCircle/fill', 'green');
                } else {
                    // Иначе — красным
                    elem.portProp(p.id, 'attrs/portCircle/fill', 'red');
                }
            }
        });
    });
}
function getPortBandwidth(cell: dia.Cell, portId: string): number {
    const ports = cell.get('ports')?.items ?? [];
    console.log(ports);
    const found = ports.find((p: any) => p.id === portId);
    return found?.bandwidth ?? -1;
}

function resetAllPortsColor(graph: dia.Graph) {
    // Сбрасываем порты к "стандартным" цветам
    // (предполагаю, что input был #fff, output — #e3d12d, но подстраивайте под свой код)
    const elements = graph.getElements();
    elements.forEach((elem) => {
        const ports = elem.get('ports')?.items || [];
        ports.forEach((p) => {
            if (p.group === 'input') {
                elem.portProp(p.id, 'attrs/portCircle/fill', '#fff');
            } else {
                // output — можно вернуть желтый (если у вас так было)
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
    const { graph, setSelectedElement, setPaper, isPanning, removeElement, hasFormErrors } = useDiagramContext();
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
                        // Разрешаем взаимодействие с вершинами соединения
                        return {
                            vertexAdd: true,     // добавление новых вершин
                            vertexMove: true,    // перемещение вершин
                            vertexRemove: true,  // удаление вершин
                            arrowheadMove: false, // перемещение стрелок
                            labelMove: false      // перемещение меток
                        };
                    }
                    return true; // Для остальных элементов
                },
                cellViewNamespace: { standard: shapes.standard }, // Используем кастомные формы
                defaultLink: () => new shapes.standard.Link({
                    // router: {
                    //     name: 'manhattan',  // или 'metro' / 'orthogonal' / 'manhattan' / etc.
                    //     args: { jumpSize: 10 } // Размер «переброса» через другую линию
                    //
                    // }, // Линии пойдут с изломами, как угловые пути
                    // connector: { name: 'normal' },   // Можно также использовать 'rounded', 'smooth' или другой тип
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

                    // Если пытаемся соединить порты одного и того же элемента, запрещаем
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

                    // Если хотя бы один из портов не определён, запрещаем соединение
                    if (!sourcePortId || !targetPortId) {
                        return false;
                    }

                    const sourceBw = getPortBandwidth(sourceView.model, sourcePortId);
                    const targetBw = getPortBandwidth(targetView.model, targetPortId);
                    console.log(sourceBw);
                    console.log(targetBw);

                    if (sourceBw < 0 || targetBw < 0) {
                        return false;
                    }

                    // Если bandwidth не совпадает, запрещаем соединение
                    if (sourceBw !== targetBw) {
                        return false;
                    }

                    // Разрешаем соединять только output -> input
                    if (sourcePortGroup !== 'output' || targetPortGroup !== 'input') {
                        return false;
                    }

                    // Проверяем, нет ли уже связи, ведущей в тот же target-порт
                    const links = graph.getLinks();
                    const targetElementId = targetView.model.id;
                    for (const link of links) {
                        if (link.id !== linkView.model.id) {
                            const linkTarget = link.get('target');
                            if (
                                linkTarget.id === targetElementId &&
                                linkTarget.port === targetPortId
                            ) {
                                return false; // Этот порт уже занят
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

                setSelectedElement(null);

                if (isLinkingRef.current) {
                    resetAllPortsColor(graph);
                    isLinkingRef.current = false;
                }
            });


            // Начало соединения
            paper.on('element:magnet:pointerdown', (elementView, evt, magnet, x, y) => {
                if (!magnet) return;
                const sourcePortGroup = magnet.getAttribute('port-group');
                if (sourcePortGroup === 'output') {
                    const portId = getPort(magnet);
                    if (!portId) return;
                    const sourceBw = getPortBandwidth(elementView.model, portId);
                    currentLinkBandwidthRef.current = Math.ceil(Math.log2(sourceBw)) || 1;
                    isLinkingRef.current = true;
                    const sourceElemId = elementView.model.id;
                    highlightAllInputPorts(graph, sourceBw, sourceElemId);
                }
            });

            // Обработка окончания соединения (успешного или отменённого)
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

                    targetElement.portProp(targetPortId, 'attrs/portCircle/cx', 3);
                    targetElement.portProp(targetPortId, 'attrs/portCircle', { display: 'none'});
                    targetElement.portProp(targetPortId, 'attrs/portLine', { display: 'none' });
                }
            });



            // Обработка добавления связей
            graph.on('add', (cell) => {
                if (cell.isLink()) {
                    console.log('Связь добавлена:', cell);
                    // Здесь можно обработать сохранение связи или другие действия
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
                        // Вернём атрибуты порта к исходным
                        sourceElement.portProp(sourcePortId, 'attrs/circle', { display: '' });

                        sourceElement.portProp(sourcePortId, 'attrs/portCircle/cx', 20);
                        sourceElement.portProp(sourcePortId, 'attrs/portCircle', { display: '' });
                        sourceElement.portProp(sourcePortId, 'attrs/portLine', { display: '' });

                    }

                    if (targetElement && targetPortId) {
                        targetElement.portProp(targetPortId, 'attrs/circle', { display: '' });

                        targetElement.portProp(targetPortId, 'attrs/portCircle/cx', -20);
                        targetElement.portProp(targetPortId, 'attrs/portCircle', { display: '' });
                        targetElement.portProp(targetPortId, 'attrs/portLine', { display: '' });
                    }
                }
            });


            paperRef.current = paper;

            return () => {
                paper.remove();
                setPaper(null); // Очистка Paper из контекста
            };
        }
    }, [paperElement, graph, setSelectedElement, setPaper]);


    useEffect(() => {
        if (paperRef.current) {
            const paper = paperRef.current;

            const handleBlankPointerDown = (event: MouseEvent, x: number, y: number) => {
                if (isPanning) {
                    isDragging.current = true;
                    lastClientX.current = event.clientX;
                    lastClientY.current = event.clientY;
                    paperElement.current!.classList.add('grabbing');
                }
            };

            const handlePointerMove = (event: MouseEvent) => {
                if (isPanning && isDragging.current) {
                    const dx = event.clientX - lastClientX.current;
                    const dy = event.clientY - lastClientY.current;
                    lastClientX.current = event.clientX;
                    lastClientY.current = event.clientY;

                    translation.current.x += dx;
                    translation.current.y += dy;

                    paper.translate(translation.current.x, translation.current.y);
                }
            };
            const handlePointerUp = () => {
                if (isPanning && isDragging.current) {
                    isDragging.current = false;
                    paperElement.current!.classList.remove('grabbing');
                }
            };

            // Связываем события
            paper.on('blank:pointerdown', handleBlankPointerDown as any);
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('mouseup', handlePointerUp);

            return () => {
                paper.off('blank:pointerdown', handleBlankPointerDown);
                window.removeEventListener('mousemove', handlePointerMove);
                window.removeEventListener('mouseup', handlePointerUp);
            };
        }
    }, [isPanning]);

    useEffect(() => {
        if (paperRef.current) {
            const paper = paperRef.current;
            const elements = graph.getElements();
            elements.forEach(element => {
                if (isPanning) {
                    element.prop('interactive', false);
                } else {
                    element.prop('interactive', true);
                }
            });
        }
    }, [isPanning, graph]);

    return paperRef.current;
};

export default useJointJS;
