// pages/diagram-test/hooks/useJointJS.ts

import { useEffect, useRef } from 'react';
import { dia, shapes } from "@joint/core";
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

const useJointJS = (paperElement: React.RefObject<HTMLDivElement>) => {
    const { graph, setSelectedElement, setPaper, isPanning } = useDiagramContext();
    const paperRef = useRef<dia.Paper | null>(null);
    const selectedCellViewRef = useRef<dia.CellView | null>(null);
    const isDragging = useRef(false);
    const lastClientX = useRef(0);
    const lastClientY = useRef(0);
    const translation = useRef({ x: 0, y: 0 }); // Текущее смещение
    const originalPortStyles = useRef<Map<string, string>>(new Map());

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
                interactive: true,
                cellViewNamespace: shapes, // Используем кастомные формы
                defaultLink: () => new shapes.standard.Link({
                    // router: {
                    //     name: 'manhattan',  // или 'metro' / 'orthogonal' / 'manhattan' / etc.
                    //     args: { jumpSize: 10 } // Размер «переброса» через другую линию
                    //
                    // }, // Линии пойдут с изломами, как угловые пути
                    // connector: { name: 'normal' },   // Можно также использовать 'rounded', 'smooth' или другой тип
                    attrs: {
                        line: {
                            stroke: '#000',
                            strokeWidth: 2,
                            targetMarker: {
                                type: 'classic',
                                stroke: '#000',
                                fill: '#000'
                            }
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
                linkPinning: false,
                markAvailable: true,
                snapLinks: { radius: 75 },
                validateConnection: function(sourceView, sourceMagnet, targetView, targetMagnet, end, linkView) {
                    // Запретить соединение самого себя
                    if (sourceView === targetView) {
                        return false;
                    }
                    // Разрешить соединение только из портов
                    if (!sourceMagnet || !targetMagnet) {
                        return false;
                    }
                    const sourcePortGroup = sourceMagnet.getAttribute('port-group');
                    const targetPortGroup = targetMagnet.getAttribute('port-group');

                    const links = graph.getLinks();
                    const targetId = targetView.model.id;
                    const targetPortId = targetMagnet.getAttribute('port');
                    for (let i = 0; i < links.length; i++) {
                        const link = links[i];
                        if (link.id !== linkView.model.id && // Ensure it's not checking the current link being drawn
                            link.get('target').id === targetId && link.get('target').port === targetPortId) {
                            return false; // There's already a link connected to this port
                        }
                    }

                    return sourcePortGroup === 'output' && targetPortGroup === 'input';
                },
            });


            // Устанавливаем Paper в контекст
            setPaper(paper);

            paper.on('cell:pointerclick', (cellView) => {
                console.log(cellView)
                if (selectedCellViewRef.current) {
                    console.log(selectedCellViewRef.current);
                    selectedCellViewRef.current.unhighlight('image', { highlighter: highlightSettings });

                }

                cellView.highlight('image', { highlighter: highlightSettings });

                selectedCellViewRef.current = cellView;
                setSelectedElement(cellView.model);
            });


            paper.on('blank:pointerclick', () => {
                if (selectedCellViewRef.current) {
                    selectedCellViewRef.current.unhighlight('image', { highlighter: highlightSettings });
                    selectedCellViewRef.current = null;
                }
                setSelectedElement(null);
            });





            // Начало соединения
            paper.on('element:magnet:pointerdown', (elementView, evt, magnet, x, y) => {
                if (!magnet) return;
                const sourcePortGroup = magnet.getAttribute('port-group');
                console.log(sourcePortGroup)
                if (sourcePortGroup === 'output') {
                    console.log('Начато соединение с output порта');
                }
            });
            // Обработка окончания соединения (успешного или отменённого)
            paper.on('link:connect link:disconnect', () => {
                // Можно добавить действия при подключении или отключении связей
                console.log('Состояние связей изменено');
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
                    targetElement.portProp(targetPortId, 'attrs/portCircle', { display: 'none' });
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