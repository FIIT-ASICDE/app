import { dia } from '@joint/core';

// Маппинг логических операторов для логических элементов
const operatorMap: { [key: string]: string } = {
    and: '&',
    or: '|',
    nand: '~&',
    nor: '~|',
    xor: '^',
    xnor: '~^'
};

/**
 * Генерирует SystemVerilog‑код, представляющий всю диаграмму в виде одного модуля.
 * I/O‑элементы (elType 'input' и 'output') становятся портами модуля.
 * Логические элементы (например, and, or, ...) обрабатываются через assign‑выражения.
 */
export function generateSystemVerilogCode(graph: dia.Graph): string {
    const cells = graph.getCells();

    // Определяем I/O‑элементы и логические блоки
    const inputCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'input');
    const outputCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'output');
    const logicCells = cells.filter(cell =>
        !cell.isLink() &&
        ['and', 'or', 'nand', 'nor', 'xor', 'xnor'].includes(cell.attributes.elType)
    );
    const links = cells.filter(cell => cell.isLink());

    // Вспомогательная функция для получения имени порта из I/O‑элемента
    function getPortName(cell: dia.Cell): string {
        const label = cell.attributes.attrs?.label?.text;
        return label ? label.trim() : cell.id;
    }

    // 1. Генерируем портовые объявления для верхнего модуля.
    const portDeclarations: string[] = [];
    inputCells.forEach(cell => {
        const name = getPortName(cell);
        const bw = cell.attributes.bandwidth || 1;
        if (bw > 1) {
            portDeclarations.push(`  input logic [${bw - 1}:0] ${name}`);
        } else {
            portDeclarations.push(`  input logic ${name}`);
        }
    });
    outputCells.forEach(cell => {
        const name = getPortName(cell);
        const bw = cell.attributes.bandwidth || 1;
        if (bw > 1) {
            portDeclarations.push(`  output logic [${bw - 1}:0] ${name}`);
        } else {
            portDeclarations.push(`  output logic ${name}`);
        }
    });

    // Задаем имя верхнего модуля (можно расширить, например, взять из одного из модулей)
    const moduleName = 'newmod';

    let code = `// SystemVerilog code generated from diagram\n\n`;
    code += `module ${moduleName} (\n${portDeclarations.join(',\n')}\n);\n\n`;

    // 2. Для логических элементов создаем внутренние сигналы (nets).
    const logicNetNames: { [key: string]: string } = {};
    logicCells.forEach(cell => {
        const netName = `${cell.attributes.elType}_${cell.id.slice(0, 5)}_net`;
        logicNetNames[cell.id] = netName;
        // Объявляем внутренний сигнал (предполагаем 1 бит, можно расширить)
        code += `logic ${netName};\n`;
    });
    if (logicCells.length > 0) code += `\n`;

    // 3. Создаем карту соединений по ссылкам.
    // Ключ: "<cellId>:<portId>", значение: внешнее имя (если I/O) или внутренний net (если логика)
    const connectionMap: { [key: string]: string } = {};

    // Вспомогательная функция: если элемент является I/O, то возвращаем его портовое имя, иначе — его внутренний net.
    function getSignalName(cell: dia.Cell | null, port: any): string {
        if (!cell) return '';
        const elType = cell.attributes.elType;
        if (elType === 'input' || elType === 'output') {
            return getPortName(cell);
        } else {
            return logicNetNames[cell.id];
        }
    }

    links.forEach(link => {
        const source = link.get('source');
        const target = link.get('target');
        const sourceCell = graph.getCell(source.id);
        const targetCell = graph.getCell(target.id);

        const srcSignal = getSignalName(sourceCell, source);
        const tgtSignal = getSignalName(targetCell, target);

        if (source.id && source.port) {
            connectionMap[`${source.id}:${source.port}`] = srcSignal;
        }
        if (target.id && target.port) {
            connectionMap[`${target.id}:${target.port}`] = tgtSignal;
        }
    });

    // 4. Генерируем assign-выражения для логических элементов.
    // Для каждого логического элемента собираем подключенные входы и его выход.
    logicCells.forEach(cell => {
        const type = cell.attributes.elType; // например, 'and'
        const netName = logicNetNames[cell.id];
        const cellPorts = cell.attributes.ports?.items || [];
        const inputPorts = cellPorts.filter((p: any) => p.group === 'input');
        const outputPorts = cellPorts.filter((p: any) => p.group === 'output');

        // Для каждого входного порта ищем подключение в connectionMap
        const inputSignals: string[] = inputPorts.map((p: any, index: number) => {
            const key = `${cell.id}:${p.id}`;
            return connectionMap[key] || '/* unconnected */';
        });

        // Объединяем входы с оператором (оператор для типа, например, '&' для and)
        const op = operatorMap[type] || '&';
        const expr = inputSignals.join(` ${op} `) || '/* unconnected */';

        // Генерируем присваивание для логического элемента
        code += `assign ${netName} = ${expr};\n`;

        // Если у логического элемента есть выход, соединяем его с внешним портом
        if (outputPorts.length > 0) {
            const key = `${cell.id}:${outputPorts[0].id}`;
            const outSignal = connectionMap[key];
            if (outSignal) {
                code += `assign ${outSignal} = ${netName};\n`;
            }
        }
        code += `\n`;
    });

    code += `// End of generated code\nendmodule\n`;

    return code;
}
