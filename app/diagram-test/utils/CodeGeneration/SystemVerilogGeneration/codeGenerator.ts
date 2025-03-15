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
    const bitManipulationCells = cells.filter(cell =>
        !cell.isLink() &&
        ['bitSelect', 'bitCombine'].includes(cell.attributes.elType)
    );
    const moduleCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'newModule');
    const sramCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'ram');
    const registerCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'register');
    const links = cells.filter(cell => cell.isLink());


    const excludedNames = new Set([
        ...moduleCells.map(cell => cell.attributes.name),
        ...sramCells.map(cell => cell.attributes.name),
        ...registerCells.map(cell => cell.attributes.name),
    ]);

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
            code += `logic [${(1 << bw) - 1}:0] ${netName};\n`; // 2^bandwidth
        } else if (cell.attributes.elType === 'encoder') {
            code += `logic [${Math.ceil(Math.log2(bw)) - 1}:0] ${netName};\n`; // log2(bandwidth)
        }
    });
    code += `\n`;

    const connectionMap: { [key: string]: string[] } = {};
    const outputConnectionMap: { [key: string]: string[] } = {};
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
        const targetName = getPortName(targetCell);
        const sourceKey = `${link.get('source').id}:${link.get('source').port}`;
        if (!outputConnectionMap[sourceKey]) {
            outputConnectionMap[sourceKey] = [];
        }
        outputConnectionMap[sourceKey].push(targetName);
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


        const inputPorts = cellPorts.filter(p => p.group === 'input');
        const inputKey = `${cell.id}:${inputPorts[0]?.id}`;
        const inputSignal = connectionMap[inputKey] ? connectionMap[inputKey][0] : '/* unconnected */';


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
    bitManipulationCells.forEach(cell => {
        const type = cell.attributes.elType;
        const netName = elementNames[cell.id];
        const cellPorts = cell.attributes.ports?.items || [];

        if (type === 'bitSelect') {

            const inputPort = cellPorts.find(p => p.group === 'input');
            const inputKey = `${cell.id}:${inputPort?.id}`;
            const inputSignal = connectionMap[inputKey] ? connectionMap[inputKey][0] : '/* unconnected */';

            let bitStart = 0;
            code += `logic [${inputPort.bandwidth - 1}:0] ${netName};\n`;

            cellPorts.filter(p => p.group === 'output').forEach(outputPort => {
                const outputKey = `${cell.id}:${outputPort.id}`;
                const outputSignal = connectionMap[outputKey] ? connectionMap[outputKey][0] : outputPort.name;
                const bitEnd = bitStart + outputPort.bandwidth - 1;

                code += `assign ${outputSignal} = ${netName}[${bitEnd}:${bitStart}];\n`;
                bitStart += outputPort.bandwidth;
            });

            code += `\n`;
        }

        if (type === 'bitCombine') {

            const inputPorts = cellPorts.filter(p => p.group === 'input').reverse();
            const inputSignals = inputPorts.map(p => {
                const key = `${cell.id}:${p.id}`;
                return connectionMap[key] ? connectionMap[key][0] : '/* unconnected */';
            });

            const outputPort = cellPorts.find(p => p.group === 'output');
            const outputKey = `${cell.id}:${outputPort?.id}`;
            const outputSignal = connectionMap[outputKey] ? connectionMap[outputKey][0] : netName;

            code += `logic [${outputPort.bandwidth - 1}:0] ${netName};\n`;
            code += `assign ${netName} = {${inputSignals.join(', ')}};\n`;
            code += `assign ${outputSignal} = ${netName};\n\n`;
        }
    });
    moduleCells.forEach(cell => {
        const moduleName = cell.attributes.name;
        const instanceName = cell.attributes.instance;
        const cellPorts = cell.attributes.ports?.items || [];

        const inputPorts = cellPorts.filter(p => p.group === 'input');
        const outputPorts = cellPorts.filter(p => p.group === 'output');

        let portMappings = inputPorts.map(p => {
            const key = `${cell.id}:${p.id}`;
            const connectedSignal = connectionMap[key] ? connectionMap[key][0] : '/* unconnected */';
            return `.${p.name}(${connectedSignal})`;
        });

        portMappings = portMappings.concat(outputPorts.map(p => {
            const key = `${cell.id}:${p.id}`;
            const outputConnectedSignal = outputConnectionMap[key] ? outputConnectionMap[key][0] : '/* unconnected */';
            return `.${p.name}(${outputConnectedSignal})`;
        }));

        code += `${moduleName} ${instanceName} (\n`;
        code += `    ${portMappings.join(',\n    ')}\n`;
        code += `);\n\n`;
    });


    registerCells.forEach(cell => {
        const regName = getPortName(cell);
        const bw = cell.attributes.bandwidth;

        const clkKey = `${cell.id}:clk`;
        const rstKey = `${cell.id}:rst`;
        const enKey = `${cell.id}:en`;
        const dKey = `${cell.id}:d`;
        const qKey = `${cell.id}:q`;

        const clkSignal = connectionMap[clkKey] ? connectionMap[clkKey][0] : '/* unconnected */';
        const rstSignal = connectionMap[rstKey] ? connectionMap[rstKey][0] : '/* unconnected */';
        const enSignal = connectionMap[enKey] ? connectionMap[enKey][0] : '1\'b1'; // Если нет en, подразумеваем, что всегда включено
        const dSignal = connectionMap[dKey] ? connectionMap[dKey][0] : '/* unconnected */';
        const qSignal = outputConnectionMap[qKey] ? outputConnectionMap[qKey][0] : regName;

        // clk
        const clkEdge = cell.attributes.clkEdge === 'falling' ? 'negedge' : 'posedge';

        // rst
        let rstCondition = '';
        if (cell.attributes.resetPort) {
            const rstEdge = cell.attributes.rstEdge === 'falling' ? 'negedge' : 'posedge';
            if (cell.attributes.rstType === 'async') {
                rstCondition = ` or ${rstEdge} ${rstSignal}`;
            }
        }

        // always_ff
        code += `always_ff @(${clkEdge} ${clkSignal}${rstCondition}) begin\n`;

        // resetPort
        if (cell.attributes.resetPort) {
            code += `    if (${rstSignal})\n`;
            code += `        ${qSignal} <= '0;\n`;
        }

        // enablePort
        if (cell.attributes.enablePort) {
            if (cell.attributes.resetPort){
                code += `    else if (${enSignal})\n`;
            }
            else {
                code += `    if (${enSignal})\n`;
            }

        } else if (cell.attributes.resetPort) {
            code += `    else\n`;
        }

        // qInverted
        const dAssignment = cell.attributes.qInverted ? `~${dSignal}` : dSignal;
        code += `        ${qSignal} <= ${dAssignment};\n`;

        code += `end\n\n`;
    });
    sramCells.forEach(cell => {
        const ramName = getPortName(cell);
        const dataWidth = cell.attributes.bandwidth;
        const depth = 1 << cell.attributes.addressBandwidth; // 2^addressBandwidth

        const clkKey = `${cell.id}:clk`;
        const dataInKey = `${cell.id}:data_in`;
        const addrKey = `${cell.id}:addr`;
        const weKey = `${cell.id}:we`;
        const dataOutKey = `${cell.id}:data_out`;

        const clkSignal = connectionMap[clkKey] ? connectionMap[clkKey][0] : '/* unconnected */';
        const dataInSignal = connectionMap[dataInKey] ? connectionMap[dataInKey][0] : '/* unconnected */';
        const addrSignal = connectionMap[addrKey] ? connectionMap[addrKey][0] : '/* unconnected */';
        const weSignal = connectionMap[weKey] ? connectionMap[weKey][0] : '/* unconnected */';
        const dataOutSignal = outputConnectionMap[dataOutKey] ? outputConnectionMap[dataOutKey][0] : ramName;

        // Определяем edge для clk
        const clkEdge = cell.attributes.clkEdge === 'falling' ? 'negedge' : 'posedge';

        // Объявляем память
        code += `logic [${dataWidth - 1}:0] ${ramName} [0:${depth - 1}];\n\n`;

        // always_ff блок для записи
        code += `always_ff @(${clkEdge} ${clkSignal}) begin\n`;
        code += `    if (${weSignal})\n`;
        code += `        ${ramName}[${addrSignal}] <= ${dataInSignal};\n`;
        code += `end\n\n`;

        // assign для чтения
        code += `assign ${dataOutSignal} = ${ramName}[${addrSignal}];\n\n`;
    });

    outputCells.forEach(cell => {
        const outputName = getPortName(cell);
        const inputKey = `${cell.id}:${cell.attributes.ports.items[0].id}`;
        console.log(inputKey);
        console.log(connectionMap);

        if (connectionMap[inputKey] && !excludedNames.has(connectionMap[inputKey][0])) {
            connectionMap[inputKey].forEach(inputSignal => {
                code += `assign ${outputName} = ${inputSignal};\n`;
            });
        }
    });


    code += `// End of generated code\nendmodule\n`;

    return code;
}
