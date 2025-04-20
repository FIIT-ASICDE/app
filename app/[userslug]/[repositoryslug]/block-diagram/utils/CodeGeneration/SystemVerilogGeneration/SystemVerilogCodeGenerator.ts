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
    alu: '+',
    comparator: '<'
};


export function generateSystemVerilogCode(graph: dia.Graph, topModuleName: string): string {
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
        ['splitter', 'combiner'].includes(cell.attributes.elType)
    );
    const moduleCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'module');
    const sramCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'sram');
    const registerCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'register');
    const links = cells.filter(cell => cell.isLink());
    const splitterTable: { name: string, connectedTo: string, connectedFrom: string, startBit: number, endBit: number }[] = [];


    const excludedNames = new Set([
        ...moduleCells.map(cell => cell.attributes.name),
        ...sramCells.map(cell => cell.attributes.name),
        ...registerCells.map(cell => cell.attributes.name),
    ]);

    function getPortName(cell: dia.Cell): string {
        return cell.attributes.name;
    }
    function getBitSelectedSignal(signal: string, netName: string): string {
        const bitSelectEntry = splitterTable.find(entry =>
            entry.name === signal && entry.connectedTo === netName
        );
        if (bitSelectEntry) {
            return `${bitSelectEntry.connectedFrom}[${bitSelectEntry.endBit}:${bitSelectEntry.startBit}]`;
        }
        return signal;
    }

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

    const portDeclarations: string[] = [];
    inputCells.forEach(cell => {
        const name = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        const isStruct = cell.attributes.isStruct;
        const structPackage = cell.attributes.structPackage;
        const structTypeDef = cell.attributes.structTypeDef;
        if (isStruct && structPackage && structTypeDef) {
            portDeclarations.push(`  input ${structPackage}::${structTypeDef} ${name}`);
        } else {
            portDeclarations.push(`  input logic${bw > 1 ? ` [${bw - 1}:0]` : ''} ${name}`);
        }
    });
    outputCells.forEach(cell => {
        const name = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        const isStruct = cell.attributes.isStruct;
        const structPackage = cell.attributes.structPackage;
        const structTypeDef = cell.attributes.structTypeDef;
        if (isStruct && structPackage && structTypeDef) {
            portDeclarations.push(`  output ${structPackage}::${structTypeDef} ${name}`);
        } else {
            portDeclarations.push(`  output logic${bw > 1 ? ` [${bw - 1}:0]` : ''} ${name}`);
        }
    });

    let code = `module ${topModuleName} (\n${portDeclarations.join(',\n')}\n);\n\n`;

    const elementNames: { [key: string]: string } = {};
    logicCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;
        code += `logic${bw > 1 ? ` [${bw - 1}:0]` : ''} ${netName};\n`;
    });
    bitManipulationCells.forEach(cell => {
        const netName = getPortName(cell);
        const cellPorts = cell.attributes.ports?.items || [];
        elementNames[cell.id] = netName;
        const isStruct = cell.attributes.isStruct;
        const structPackage = cell.attributes.structPackage;
        const structTypeDef = cell.attributes.structTypeDef;

        if (cell.attributes.elType === 'combiner') {
            const outPort = cellPorts.find(p => p.group === 'output');
            if (isStruct && structPackage && structTypeDef) {
                code += `${structPackage}::${structTypeDef} ${netName};\n`;
            } else {
                code += `logic${outPort.bandwidth > 1 ? ` [${outPort.bandwidth - 1}:0]` : ''} ${netName};\n`;
            }
        }
    });
    multiplexerCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;
        const isStruct = cell.attributes.isStruct;
        const structPackage = cell.attributes.structPackage;
        const structTypeDef = cell.attributes.structTypeDef;
        if (isStruct && structPackage && structTypeDef) {
            code += `${structPackage}::${structTypeDef} ${netName};\n`;
        } else {
            code += `logic${bw > 1 ? ` [${bw - 1}:0]` : ''} ${netName};\n`;
        }
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



    bitManipulationCells.forEach(cell => {
        const type = cell.attributes.elType;
        const netName = elementNames[cell.id];
        const cellPorts = cell.attributes.ports?.items || [];

        if (type === 'splitter') {


            const inputPort = cellPorts.find(p => p.group === 'input');
            const inputKey = `${cell.id}:${inputPort?.id}`;
            const inputSignal = connectionMap[inputKey] ? connectionMap[inputKey][0] : '/* unconnected */';

            cellPorts.filter(p => p.group === 'output').forEach(outputPort => {
                const outputKey = `${cell.id}:${outputPort.id}`;
                const outputSignal = outputConnectionMap[outputKey] ? outputConnectionMap[outputKey][0] : '/* unconnected */';
                const bitStart = outputPort.startBit;
                const bitEnd = outputPort.endBit;
                splitterTable.push({
                    name: netName,
                    connectedTo: outputSignal,
                    connectedFrom: inputSignal,
                    startBit: bitStart,
                    endBit: bitEnd
                });
            });

            code += `\n`;
        }

        if (type === 'combiner') {

            const inputPorts = cellPorts.filter(p => p.group === 'input').reverse();
            const inputSignals = inputPorts.map(p => {
                const key = `${cell.id}:${p.id}`;
                return connectionMap[key] ? getBitSelectedSignal(connectionMap[key][0], netName) : '/* unconnected */';
            });
            code += `assign ${netName} = {${inputSignals.join(', ')}};\n`;
        }
    });

    logicCells.forEach(cell => {
        const type = cell.attributes.elType;
        const netName = elementNames[cell.id];
        const cellPorts = cell.attributes.ports?.items || [];
        const inputPorts = cellPorts.filter(p => p.group === 'input');

        const inputSignals = inputPorts.map(p => {
            const key = `${cell.id}:${p.id}`;
            return connectionMap[key] ? getBitSelectedSignal(connectionMap[key][0], netName) : '/* unconnected */';
        });

        let expr = inputSignals.join(` ${operatorMap[type]} `) || '/* unconnected */';
        if (type === 'nand' || type === 'nor' || type === 'xnor') {
            expr = `~(${expr})`;
        }
        if (type === 'not') {
            expr = `~${inputSignals[0] || '/* unconnected */'}`;
        }

        code += `assign ${netName} = ${expr};\n`;

        code += `\n`;
    });
    complexLogicCells.forEach(cell => {
        const type = cell.attributes.elType;
        const netName = elementNames[cell.id];
        const cellPorts = cell.attributes.ports?.items || [];
        const inputPorts = cellPorts.filter(p => p.group === 'input');

        const inputSignals = inputPorts.map(p => {
            const key = `${cell.id}:${p.id}`;
            return connectionMap[key] ? getBitSelectedSignal(connectionMap[key][0], netName) : '/* unconnected */';
        });

        let expr;
        if (type === 'alu') {
            expr = `${inputSignals.join(` ${cell.attributes.aluType} `) || '/* unconnected */'}`;
        }
        if (type === 'comparator') {
            expr = `(${inputSignals.join(` ${cell.attributes.comparatorType} `) || '/* unconnected */'})`;
        }

        code += `assign ${netName} = ${expr};\n`;

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
        const selectSignal = connectionMap[selectKey] ? getBitSelectedSignal(connectionMap[selectKey][0], netName) : '/* unconnected */';

        if (inPorts === 2) {
            const inSignals = [0, 1].map(i => {
                const key = `${cell.id}:input${i + 1}`;
                return connectionMap[key] ? getBitSelectedSignal(connectionMap[key][0], netName) : '/* unconnected */';
            });
            code += `assign ${netName} = ${selectSignal} ? ${inSignals[1]} : ${inSignals[0]};\n`;
        } else {
            code += `always_comb begin\n`;
            code += `    case (${selectSignal})\n`;
            for (let i = 0; i < inPorts; i++) {
                const key = `${cell.id}:input${i + 1}`;
                const inSignal = connectionMap[key] ? getBitSelectedSignal(connectionMap[key][0], netName) : '/* unconnected */';
                code += `        ${inPorts === 4 ? '2' : '3'}'b${i.toString(2).padStart(inPorts === 4 ? 2 : 3, '0')}: ${netName} = ${inSignal};\n`;
            }
            code += `        default: ${netName} = '0;\n`;
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
        const inputSignal = connectionMap[inputKey] ? getBitSelectedSignal(connectionMap[inputKey][0], netName) : '/* unconnected */';


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
            const connectedSignal = connectionMap[key] ? getBitSelectedSignal(connectionMap[key][0], moduleName) : '/* unconnected */';
            return `.${p.name}(${connectedSignal})`;
        });

        portMappings = portMappings.concat(outputPorts.map(p => {
            const key = `${cell.id}:${p.id}`;
            const outputConnectedSignal = outputConnectionMap[key] ? getBitSelectedSignal(outputConnectionMap[key][0], moduleName) : '/* unconnected */';
            return `.${p.name}(${outputConnectedSignal})`;
        }));

        code += `${moduleName} ${instanceName} (\n`;
        code += `    ${portMappings.join(',\n    ')}\n`;
        code += `);\n\n`;
    });


    registerCells.forEach(cell => {
        const regName = getPortName(cell);

        const clkKey = `${cell.id}:clk`;
        const rstKey = `${cell.id}:rst`;
        const enKey = `${cell.id}:en`;
        const dKey = `${cell.id}:d`;
        const qKey = `${cell.id}:q`;
        const qInvertedKey = `${cell.id}:qInverted`;

        const clkSignal = connectionMap[clkKey] ? getBitSelectedSignal(connectionMap[clkKey][0], regName) : '/* unconnected */';
        const rstSignal = connectionMap[rstKey] ? getBitSelectedSignal(connectionMap[rstKey][0], regName)  : '/* unconnected */';
        const enSignal = connectionMap[enKey] ? getBitSelectedSignal(connectionMap[enKey][0], regName) : '1\'b1';
        const dSignal = connectionMap[dKey] ? getBitSelectedSignal(connectionMap[dKey][0], regName) : '/* unconnected */';
        const qSignal = outputConnectionMap[qKey] ? getBitSelectedSignal(outputConnectionMap[qKey][0], regName) : regName;
        const qInvertedSignal = outputConnectionMap[qInvertedKey] ? getBitSelectedSignal(outputConnectionMap[qInvertedKey][0], regName) : regName;

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
            code += `    if (${rstSignal}) begin\n`;
            code += `        ${qSignal} <= '0;\n`;
            if (cell.attributes.enablePort) {
                code += `    end else if (${enSignal}) begin\n`;
            }
            else {
                code += `    end else begin\n`;
            }
            if (cell.attributes.qInverted) {
                code += `        ${qInvertedSignal} <= ~${dSignal};\n`;
            }
            code += `        ${qSignal} <= ${dSignal};\n`;
            code += `    end\n`;
        }
        else if (cell.attributes.enablePort) {
            code += `    if (${enSignal}) begin\n`;
            if (cell.attributes.qInverted) {
                code += `        ${qInvertedSignal} <= ~${dSignal};\n`;
            }
            code += `        ${qSignal} <= ${dSignal};\n`;
            code += `    end\n`;
        }
        else {
            if (cell.attributes.qInverted) {
                code += `    ${qInvertedSignal} <= ~${dSignal};\n`;
            }
            code += `    ${qSignal} <= ${dSignal};\n`;
        }

        code += `end\n\n`;
    });
    sramCells.forEach(cell => {
        const sramName = getPortName(cell);
        const isStruct = cell.attributes.isStruct;
        const structPkg = cell.attributes.structPackage;
        const structType = cell.attributes.structTypeDef;

        const dataWidth = cell.attributes.bandwidth;
        const depth = 1 << cell.attributes.addressBandwidth; // 2^addressBandwidth

        const clkKey = `${cell.id}:clk`;
        const dataInKey = `${cell.id}:data_in`;
        const addrKey = `${cell.id}:addr`;
        const weKey = `${cell.id}:we`;
        const dataOutKey = `${cell.id}:data_out`;

        const clkSignal = connectionMap[clkKey] ? getBitSelectedSignal(connectionMap[clkKey][0], sramName) : '/* unconnected */';
        const dataInSignal = connectionMap[dataInKey] ? getBitSelectedSignal(connectionMap[dataInKey][0], sramName) : '/* unconnected */';
        const addrSignal = connectionMap[addrKey] ? getBitSelectedSignal(connectionMap[addrKey][0], sramName) : '/* unconnected */';
        const weSignal = connectionMap[weKey] ? getBitSelectedSignal(connectionMap[weKey][0], sramName) : '/* unconnected */';
        const dataOutSignal = outputConnectionMap[dataOutKey] ? getBitSelectedSignal(outputConnectionMap[dataOutKey][0], sramName) : sramName;

        const clkEdge = cell.attributes.clkEdge === 'falling' ? 'negedge' : 'posedge';

        if (isStruct && structPkg && structType) {
            code += `${structPkg}::${structType} ${sramName} [0:${depth - 1}];\n\n`;
        } else {
            code += `logic [${dataWidth - 1}:0] ${sramName} [0:${depth - 1}];\n\n`;
        }

        code += `always_ff @(${clkEdge} ${clkSignal}) begin\n`;
        code += `    if (${weSignal}) begin\n`;
        code += `        ${sramName}[${addrSignal}] <= ${dataInSignal};\n`;
        code += `    end\n`;
        code += `end\n\n`;

        code += `assign ${dataOutSignal} = ${sramName}[${addrSignal}];\n\n`;
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

    code += `endmodule`;


    return code;
}
