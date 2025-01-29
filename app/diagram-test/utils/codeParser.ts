// pages/diagram-test/utils/codeParser.ts

import { dia, shapes } from "@joint/core";

// Пример функции для генерации SystemVerilog из графа
export const generateSystemVerilog = (graph: dia.Graph): string => {
    let code = '// Сгенерированный SystemVerilog код\n';
    const elements = graph.getElements();
    const links = graph.getLinks();

    elements.forEach(element => {
        const type = element.get('type');
        const id = element.id;
        const label = element.attr('label/text');
        const position = element.position();

        switch(type) {
            case 'custom.PortedRectangle':
                code += `// Rectangle: ${label} at (${position.x}, ${position.y})\n`;
                break;
            case 'standard.Circle':
                code += `// Circle: ${label} at (${position.x}, ${position.y})\n`;
                break;
            case 'standard.Polygon':
                code += `// Polygon (MUX): ${label} at (${position.x}, ${position.y})\n`;
                break;
            // Добавьте остальные типы
            default:
                code += `// Unknown type: ${type} at (${position.x}, ${position.y})\n`;
                break;
        }
    });

    links.forEach(link => {
        const source = link.getSource();
        const target = link.getTarget();
        const sourceId = source.id;
        const targetId = target.id;
        code += `// Связь: ${sourceId} -> ${targetId}\n`;
    });

    return code;
};

// Пример функции для парсинга SystemVerilog в граф
export const parseSystemVerilog = (code: string, graph: dia.Graph) => {
    // Реализуйте парсинг кода и создание элементов графа
    // Для примера, будем использовать простую логику
    graph.clear();

    const lines = code.split('\n');
    const elementMap: { [id: string]: dia.Element } = {};

    lines.forEach(line => {
        if (line.startsWith('//')) {
            const content = line.replace('//', '').trim();
            if (content.startsWith('Rectangle:')) {
                const parts = content.split(' at ');
                const label = parts[0].replace('Rectangle:', '').trim();
                const position = parts[1].replace(/[()]/g, '').split(',').map(Number);
                const rect = new shapes.standard.Rectangle();
                rect.resize(100, 40);
                rect.attr({
                    label: { text: label, fill: 'white' },
                    body: { fill: '#3498db' }
                });
                rect.position(position[0], position[1]);
                graph.addCell(rect);
                elementMap[rect.id] = rect;
            } else if (content.startsWith('Circle:')) {
                const parts = content.split(' at ');
                const label = parts[0].replace('Circle:', '').trim();
                const position = parts[1].replace(/[()]/g, '').split(',').map(Number);
                const circle = new shapes.standard.Circle();
                circle.resize(80, 80);
                circle.attr({
                    label: { text: label, fill: 'white' },
                    body: { fill: '#2ecc71' }
                });
                circle.position(position[0], position[1]);
                graph.addCell(circle);
                elementMap[circle.id] = circle;
            } else if (content.startsWith('Polygon')) {
                const parts = content.split(' at ');
                const label = parts[0].replace('Polygon (MUX):', '').trim();
                const position = parts[1].replace(/[()]/g, '').split(',').map(Number);
                const polygon = new shapes.standard.Polygon();
                polygon.resize(100, 60);
                polygon.attr({
                    label: { text: label, fill: 'white' },
                    body: { fill: '#e67e22' }
                });
                polygon.position(position[0], position[1]);
                graph.addCell(polygon);
                elementMap[polygon.id] = polygon;
            } else if (content.startsWith('Связь:')) {
                const parts = content.replace('Связь:', '').trim().split('->').map(s => s.trim());
                const sourceId = parts[0];
                const targetId = parts[1];
                const link = new shapes.standard.Link();
                link.source({ id: sourceId, port: 'bottom' }); // Предполагаем порт 'bottom'
                link.target({ id: targetId, port: 'top' }); // Предполагаем порт 'top'
                link.attr({
                    line: { stroke: '#000', strokeWidth: 2 }
                });
                graph.addCell(link);
            }
        }
    });
};
