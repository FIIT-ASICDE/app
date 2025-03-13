import { dia } from "@joint/core";


const operatorMap: { [key: string]: string } = {
    and: '&',
    or: '|',
    nand: '&',
    nor: '|',
    xor: '^',
    xnor: '^',
    not: '~'
};
const complexLogicMap: { [key: string]: string } = {
    adder: '+',
    subtractor: '-',
    comparator: '<'
};


export function generateSystemVerilogCode(graph: dia.Graph): string {
    const cells = graph.getCells();

    const inputCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'input');
    const outputCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'output');
    const multiplexerCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'multiplexer');
    const logicCells = cells.filter(cell =>
        !cell.isLink() &&
        Object.keys(operatorMap).includes(cell.attributes.elType)
    );
    const complexLogicCells = cells.filter(cell =>
        !cell.isLink() &&
        Object.keys(complexLogicMap).includes(cell.attributes.elType)
    );
    const encodeDecodeCells = cells.filter(cell =>
        !cell.isLink() &&
        ['decoder', 'encoder'].includes(cell.attributes.elType)
    );
    const links = cells.filter(cell => cell.isLink());

    function getPortName(cell: dia.Cell): string {
        return cell.attributes.name;
    }

    const portDeclarations: string[] = [];
    inputCells.forEach(cell => {
        const name = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        portDeclarations.push(`  input logic${bw > 1 ? ` [${bw - 1}:0]` : ''} ${name}`);
    });
    outputCells.forEach(cell => {
        const name = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        portDeclarations.push(`  output logic${bw > 1 ? ` [${bw - 1}:0]` : ''} ${name}`);
    });

    const moduleName = 'new_module';

    let code = `// SystemVerilog code generated from diagram\n\n`;
    code += `module ${moduleName} (\n${portDeclarations.join(',\n')}\n);\n\n`;

    const elementNames: { [key: string]: string } = {};
    logicCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;
        code += `logic${bw > 1 ? ` [${bw - 1}:0]` : ''} ${netName};\n`;
    });
    multiplexerCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;
        code += `logic${bw > 1 ? ` [${bw - 1}:0]` : ''} ${netName};\n`;
    });
    complexLogicCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;
        if (cell.attributes.elType === 'comparator') {
            code += `logic ${netName};\n`;
        }
        else {
            code += `logic [${bw}:0] ${netName};\n`;
        }
    });
    encodeDecodeCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;

        if (cell.attributes.elType === 'decoder') {
            code += `logic [${(1 << bw) - 1}:0] ${netName};\n`; // 2^bandwidth - количество выходов
        } else if (cell.attributes.elType === 'encoder') {
            code += `logic [${Math.ceil(Math.log2(bw)) - 1}:0] ${netName};\n`; // log2(bandwidth) бит на выходе
        }
    });
    code += `\n`;

    const connectionMap: { [key: string]: string[] } = {};
    links.forEach(link => {
        const sourceCell = graph.getCell(link.get('source').id);
        const targetCell = graph.getCell(link.get('target').id);

        if (sourceCell && targetCell) {
            const sourceName = getPortName(sourceCell);
            const targetKey = `${link.get('target').id}:${link.get('target').port}`;

            if (!connectionMap[targetKey]) {
                connectionMap[targetKey] = [];
            }
            connectionMap[targetKey].push(sourceName);
        }
    });

    logicCells.forEach(cell => {
        const type = cell.attributes.elType;
        const netName = elementNames[cell.id];
        const cellPorts = cell.attributes.ports?.items || [];
        const inputPorts = cellPorts.filter(p => p.group === 'input');

        const inputSignals = inputPorts.map(p => {
            const key = `${cell.id}:${p.id}`;
            return connectionMap[key] ? connectionMap[key].join(` ${operatorMap[type]} `) : '/* unconnected */';
        });

        let expr = inputSignals.join(` ${operatorMap[type]} `) || '/* unconnected */';
        if (type === 'nand' || type === 'nor' || type === 'xnor') {
            expr = `~(${expr})`;
        }
        if (type === 'not') {
            expr = `~${inputSignals[0] || '/* unconnected */'}`;
        }

        code += `assign ${netName} = ${expr};\n`;

        const outputPorts = cellPorts.filter(p => p.group === 'output');
        outputPorts.forEach(p => {
            const key = `${cell.id}:${p.id}`;
            if (connectionMap[key]) {
                connectionMap[key].forEach(outSignal => {
                    code += `assign ${outSignal} = ${netName};\n`;
                });
            }
        });
        code += `\n`;
    });
    complexLogicCells.forEach(cell => {
        const type = cell.attributes.elType;
        const netName = elementNames[cell.id];
        const cellPorts = cell.attributes.ports?.items || [];
        const inputPorts = cellPorts.filter(p => p.group === 'input');

        const inputSignals = inputPorts.map(p => {
            const key = `${cell.id}:${p.id}`;
            return connectionMap[key] ? connectionMap[key].join(` ${operatorMap[type]} `) : '/* unconnected */';
        });

        let expr = inputSignals.join(` ${complexLogicMap[type]} `) || '/* unconnected */';
        if (type === 'comparator') {
            expr = `(${inputSignals.join(` ${cell.attributes.comparatorType} `) || '/* unconnected */'})`;
        }

        code += `assign ${netName} = ${expr};\n`;

        const outputPorts = cellPorts.filter(p => p.group === 'output');
        outputPorts.forEach(p => {
            const key = `${cell.id}:${p.id}`;
            if (connectionMap[key]) {
                connectionMap[key].forEach(outSignal => {
                    code += `assign ${outSignal} = ${netName};\n`;
                });
            }
        });
        code += `\n`;
    });

    multiplexerCells.forEach(cell => {
        const netName = getPortName(cell);
        const inPorts = cell.attributes.inPorts;
        const cellPorts = cell.attributes.ports?.items || [];
        const selectPort = cellPorts.find(p => p.id === 'select');
        const outputPort = cellPorts.find(p => p.group === 'output');

        if (!selectPort || !outputPort) return;

        const selectKey = `${cell.id}:${selectPort.id}`;
        const selectSignal = connectionMap[selectKey] ? connectionMap[selectKey][0] : '/* unconnected */';
        const outputKey = `${cell.id}:${outputPort.id}`;
        const outputSignal = connectionMap[outputKey] ? connectionMap[outputKey][0] : netName;

        if (inPorts === 2) {
            const inSignals = [0, 1].map(i => {
                const key = `${cell.id}:input${i + 1}`;
                return connectionMap[key] ? connectionMap[key][0] : '/* unconnected */';
            });
            code += `assign ${outputSignal} = ${selectSignal} ? ${inSignals[1]} : ${inSignals[0]};\n`;
        } else {
            code += `always_comb begin\n`;
            code += `    case (${selectSignal})\n`;
            for (let i = 0; i < inPorts; i++) {
                const key = `${cell.id}:input${i + 1}`;
                const inSignal = connectionMap[key] ? connectionMap[key][0] : '/* unconnected */';
                code += `        ${inPorts === 4 ? '2' : '3'}'b${i.toString(2).padStart(inPorts === 4 ? 2 : 3, '0')}: ${outputSignal} = ${inSignal};\n`;
            }
            code += `        default: ${outputSignal} = {WIDTH{1'bx}};\n`;
            code += `    endcase\n`;
            code += `end\n\n`;
        }
    });
    encodeDecodeCells.forEach(cell => {
        const type = cell.attributes.elType;
        const netName = elementNames[cell.id];
        const cellPorts = cell.attributes.ports?.items || [];

        // Входной порт (один для decoder, несколько для encoder)
        const inputPorts = cellPorts.filter(p => p.group === 'input');
        const inputKey = `${cell.id}:${inputPorts[0]?.id}`;
        const inputSignal = connectionMap[inputKey] ? connectionMap[inputKey][0] : '/* unconnected */';

        // Выходной порт
        const outputPort = cellPorts.find(p => p.group === 'output');
        const outputKey = `${cell.id}:${outputPort?.id}`;
        const outputSignal = connectionMap[outputKey] ? connectionMap[outputKey][0] : netName;

        if (type === 'decoder') {
            const bw = cell.attributes.bandwidth;
            const outputSize = 1 << bw;  // 2^bandwidth
            const defaultValue = `'b${'0'.repeat(outputSize)}`;
            code += `always_comb begin\n`;
            code += `    case (${inputSignal})\n`;

            for (let i = 0; i < outputSize; i++) {
                code += `        ${bw}'b${i.toString(2).padStart(bw, '0')}: ${netName} = ${outputSize}'b${(1 << i).toString(2).padStart(outputSize, '0')};\n`;
            }

            code += `        default: ${netName} = ${outputSize}${defaultValue};\n`;
            code += `    endcase\n`;
            code += `end\n\n`;

            code += `assign ${outputSignal} = ${netName};\n\n`;
        }

        if (type === 'encoder') {
            const bw = cell.attributes.bandwidth;
            const outBits = Math.ceil(Math.log2(bw));
            const defaultValue = `'b${'0'.repeat(outBits)}`;

            code += `always_comb begin\n`;
            code += `    case (${inputSignal})\n`;

            for (let i = 0; i < bw; i++) {
                code += `        ${bw}'b${(1 << i).toString(2).padStart(bw, '0')}: ${netName} = ${outBits}'b${i.toString(2).padStart(outBits, '0')};\n`;
            }

            code += `        default: ${netName} = ${outBits}${defaultValue};\n`;
            code += `    endcase\n`;
            code += `end\n\n`;

            code += `assign ${outputSignal} = ${netName};\n\n`;
        }
    });

    outputCells.forEach(cell => {
        const outputName = getPortName(cell);
        const inputKey = `${cell.id}:${cell.attributes.ports.items[0].id}`;
        if (connectionMap[inputKey]) {
            connectionMap[inputKey].forEach(inputSignal => {
                code += `assign ${outputName} = ${inputSignal};\n`;
            });
        }
    });


    code += `// End of generated code\nendmodule\n`;

    return code;
}
