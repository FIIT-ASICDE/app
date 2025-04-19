// testParseTopModules.ts

import { parseTopModule, ParsedModule, ParsedTopModule } from './parseTopModule';

// 1) Предварительно распаршенные модули (submodule_a, submodule_b, submodule_c)
const externalModules: ParsedModule[] = [
    {
        name: 'submodule_a',
        ports: [
            { name: 'clk',       direction: 'input',  width: 1 },
            { name: 'reset',     direction: 'input',  width: 1 },
            { name: 'data_in',   direction: 'input',  width: 8 },
            { name: 'valid_in',  direction: 'input',  width: 1 },
            { name: 'data_out',  direction: 'output', width: 8 },
            { name: 'valid_out', direction: 'output', width: 1 },
            { name: 'ready',     direction: 'output', width: 1 },
        ],
    },
    {
        name: 'submodule_b',
        ports: [
            { name: 'clk',      direction: 'input',  width: 1 },
            { name: 'reset',    direction: 'input',  width: 1 },
            { name: 'data_in',  direction: 'input',  width: 8 },
            { name: 'valid_in', direction: 'input',  width: 1 },
            { name: 'mode',     direction: 'input',  width: 2 },
            { name: 'result',   direction: 'output', width: 16 },
            { name: 'done',     direction: 'output', width: 1 },
        ],
    },
    {
        name: 'submodule_c',
        ports: [
            { name: 'clk',      direction: 'input',  width: 1 },
            { name: 'reset',    direction: 'input',  width: 1 },
            { name: 'data_in',  direction: 'input',  width: 16 },
            { name: 'valid_in', direction: 'input',  width: 1 },
            { name: 'overflow', direction: 'output', width: 1 },
            { name: 'data_out', direction: 'output', width: 16 },
        ],
    },
];

// 2) Текст top-модуля
const topModuleCode = `
module top_module(
    input  logic        clk,
    input  logic        reset,
    input  logic [7:0]  data_in,
    input  logic        valid_in,
    input  logic [1:0]  mode,
    output logic [15:0] result_out,
    output logic        valid_out,
    output logic        overflow,
    output logic        ready
);

    logic [7:0]  a_data_out;
    logic        a_valid_out;
    logic        a_ready;
    
    logic [15:0] b_result;
    logic        b_done;
    
    logic [15:0] c_data_out;
    logic        c_overflow;

    submodule_a u_submodule_a(
        .clk(clk),
        .reset(reset),
        .data_in(data_in),
        .valid_in(valid_in),
        .data_out(a_data_out),
        .valid_out(a_valid_out),
        .ready(a_ready)
    );
    
    submodule_b u_submodule_b(
        .clk(clk),
        .reset(reset),
        .data_in(a_data_out),
        .valid_in(a_valid_out),
        .mode(mode),
        .result(b_result),
        .done(b_done)
    );
    
    submodule_c u_submodule_c(
        .clk(clk),
        .reset(reset),
        .data_in(b_result),
        .valid_in(b_done),
        .overflow(c_overflow),
        .data_out(c_data_out)
    );

endmodule
`;

// 3) Парсим и выводим результат
const parsed: ParsedTopModule[] = parseTopModule(topModuleCode, externalModules);
console.log(JSON.stringify(parsed, null, 2));
