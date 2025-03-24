import { dia } from "@joint/core";


const operatorMapVHDL: { [key: string]: string } = {
    and: 'AND',
    or: 'OR',
    nand: 'AND',
    nor: 'OR',
    xor: 'XOR',
    xnor: 'XOR',
    not: 'NOT'
};
const complexLogicMapVHDL: { [key: string]: string } = {
    alu: '+',
    comparator: ''
};


export function generateVHDLCode(graph: dia.Graph): string {
    const cells = graph.getCells();

    const inputCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'input');
    const outputCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'output');
    const multiplexerCells = cells.filter(cell => !cell.isLink() && cell.attributes.elType === 'multiplexer');
    const logicCells = cells.filter(cell =>
        !cell.isLink() &&
        Object.keys(operatorMapVHDL).includes(cell.attributes.elType)
    );
    const complexLogicCells = cells.filter(cell =>
        !cell.isLink() &&
        Object.keys(complexLogicMapVHDL).includes(cell.attributes.elType)
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
        if (bw > 1) {
            portDeclarations.push(`    ${name} : IN STD_LOGIC_VECTOR(${bw - 1} DOWNTO 0)`);
        } else {
            portDeclarations.push(`    ${name} : IN STD_LOGIC`);
        }
    });

    outputCells.forEach(cell => {
        const name = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        if (bw > 1) {
            portDeclarations.push(`    ${name} : OUT STD_LOGIC_VECTOR(${bw - 1} DOWNTO 0)`);
        } else {
            portDeclarations.push(`    ${name} : OUT STD_LOGIC`);
        }
    });

    const moduleName = 'new_module';

    let code = `-- VHDL code generated from diagram\n\n`;
    code += `ENTITY ${moduleName} IS\n`;
    code += `    PORT (\n${portDeclarations.join(";\n")}\n    );\n`;
    code += `END ENTITY ${moduleName};\n\n`;

    code += `ARCHITECTURE Behavioral OF ${moduleName} IS\n`;


    const elementNames: { [key: string]: string } = {};
    logicCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;
        if (bw > 1) {
            code += `    SIGNAL ${netName} : STD_LOGIC_VECTOR(${bw - 1} DOWNTO 0);\n`;
        } else {
            code += `    SIGNAL ${netName} : STD_LOGIC;\n`;
        }
    });
    multiplexerCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;
        if (bw > 1) {
            code += `    SIGNAL ${netName} : STD_LOGIC_VECTOR(${bw - 1} DOWNTO 0);\n`;
        } else {
            code += `    SIGNAL ${netName} : STD_LOGIC;\n`;
        }
    });
    complexLogicCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;
        if (cell.attributes.elType === 'comparator') {
            code += `    SIGNAL ${netName} : STD_LOGIC;\n`;
        } else {
            code += `    SIGNAL ${netName} : STD_LOGIC_VECTOR(${bw} DOWNTO 0);\n`;
        }
    });
    encodeDecodeCells.forEach(cell => {
        const netName = getPortName(cell);
        const bw: number = cell.attributes.bandwidth;
        elementNames[cell.id] = netName;
        if (cell.attributes.elType === 'decoder') {
            code += `    SIGNAL ${netName} : STD_LOGIC_VECTOR(${(1 << bw) - 1} DOWNTO 0);\n`; // 2^bandwidth
        } else if (cell.attributes.elType === 'encoder') {
            code += `    SIGNAL ${netName} : STD_LOGIC_VECTOR(${Math.ceil(Math.log2(bw)) - 1} DOWNTO 0);\n`; // log2(bandwidth)
        }
    });
    code += `\n\n`;
    code += `BEGIN\n`;

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
            return connectionMap[key] ? connectionMap[key].join(` ${operatorMapVHDL[type]} `) : "'0'";
        });
        console.log(inputSignals);


        let expr = inputSignals.join(` ${operatorMapVHDL[type]} `) || "'0'";
        console.log(expr);
        if (type === 'nand' || type === 'nor' || type === 'xnor') {
            expr = `NOT (${expr})`;
        }
        if (type === 'not') {
            expr = `NOT ${inputSignals[0] || "'0'"}`;
        }

        code += `    ${netName} <= ${expr};\n`;

        const outputPorts = cellPorts.filter(p => p.group === 'output');
        outputPorts.forEach(p => {
            const key = `${cell.id}:${p.id}`;
            if (connectionMap[key]) {
                connectionMap[key].forEach(outSignal => {
                    code += `    ${outSignal} <= ${netName};\n`;
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
            return connectionMap[key] ? connectionMap[key][0] : "'0'";
        });
        let expr = '';

        if (type === 'alu') {
            const aluType = cell.attributes.aluType || "+";
            expr = `${inputSignals.join(` ${aluType} `) || "'0'"}`;
            code += `    ${netName} <= ${expr};\n`;
        }
        else if (type === 'comparator') {
            const comparatorType = cell.attributes.comparatorType || "=";
            expr = `${inputSignals.join(` ${comparatorType} `) || "'0'"}`;
            code += `    ${netName} <= '1' WHEN ${expr} ELSE '0';\n`;
        }

        const outputPorts = cellPorts.filter(p => p.group === 'output');
        outputPorts.forEach(p => {
            const key = `${cell.id}:${p.id}`;
            if (connectionMap[key]) {
                connectionMap[key].forEach(outSignal => {
                    code += `    ${outSignal} <= ${netName};\n`;
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
        const selectSignal = connectionMap[selectKey] ? connectionMap[selectKey][0] : "'0'";

        const inSignals = Array.from({ length: inPorts }, (_, i) => {
            const key = `${cell.id}:input${i + 1}`;
            return connectionMap[key] ? connectionMap[key][0] : "'0'";
        });

        if (inPorts === 2) {
            code += `    ${netName} <= ${inSignals[1]} WHEN ${selectSignal} = '1' ELSE ${inSignals[0]};\n\n`;
        } else {
            code += `    PROCESS (${selectSignal}, ${inSignals.join(", ")})\n`;
            code += `    BEGIN\n`;
            code += `        CASE ${selectSignal} IS\n`;

            for (let i = 0; i < inPorts; i++) {
                code += `            WHEN "${i.toString(2).padStart(Math.ceil(Math.log2(inPorts)), '0')}" => ${netName} <= ${inSignals[i]};\n`;
            }

            code += `            WHEN OTHERS => ${netName} <= (OTHERS => 'X');\n`;
            code += `        END CASE;\n`;
            code += `    END PROCESS;\n\n`;
        }
    });

    encodeDecodeCells.forEach(cell => {
        const type = cell.attributes.elType;
        const netName = elementNames[cell.id];
        const cellPorts = cell.attributes.ports?.items || [];


        const inputPorts = cellPorts.filter(p => p.group === 'input');
        const inputKey = `${cell.id}:${inputPorts[0]?.id}`;
        const inputSignal = connectionMap[inputKey] ? connectionMap[inputKey][0] : "'0'";

        if (type === 'decoder') {
            const bw = cell.attributes.bandwidth;
            const outputSize = 1 << bw;  // 2^bandwidth
            const defaultValue = `${'0'.repeat(outputSize)}`;
            code += `    PROCESS (${inputSignal})\n`;
            code += `    BEGIN\n`;
            code += `        CASE ${inputSignal} IS\n`;

            for (let i = 0; i < outputSize; i++) {
                code += `            WHEN "${i.toString(2).padStart(bw, '0')}" => ${netName} <= "${(1 << i).toString(2).padStart(outputSize, '0')}";\n`;
            }

            code += `            WHEN OTHERS => ${netName} <= (OTHERS => '0');\n`;
            code += `        END CASE;\n`;
            code += `    END PROCESS;\n\n`;
        }

        if (type === 'encoder') {
            const bw = cell.attributes.bandwidth;
            const outBits = Math.ceil(Math.log2(bw));
            const defaultValue = `'b${'0'.repeat(outBits)}`;

            code += `    PROCESS (${inputSignal})\n`;
            code += `    BEGIN\n`;
            code += `        CASE ${inputSignal} IS\n`;

            for (let i = 0; i < bw; i++) {
                code += `            WHEN "${(1 << i).toString(2).padStart(bw, '0')}" => ${netName} <= "${i.toString(2).padStart(outBits, '0')}";\n`;
            }

            code += `            WHEN OTHERS => ${netName} <= (OTHERS => '0');\n`;
            code += `        END CASE;\n`;
            code += `    END PROCESS;\n\n`;
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
        const enSignal = connectionMap[enKey] ? connectionMap[enKey][0] : '1\'b1';
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

        const clkEdge = cell.attributes.clkEdge === 'falling' ? 'negedge' : 'posedge';

        code += `logic [${dataWidth - 1}:0] ${ramName} [0:${depth - 1}];\n\n`;

        code += `always_ff @(${clkEdge} ${clkSignal}) begin\n`;
        code += `    if (${weSignal})\n`;
        code += `        ${ramName}[${addrSignal}] <= ${dataInSignal};\n`;
        code += `end\n\n`;

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
