"use client";

import { RepositoryFile, RepositoryFilePreview } from "@/lib/types/repository";
import { File as FileIcon, Folder } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { getTimeDeltaString } from "@/components/generic/generic";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const verilogExample = `
// FIFO Module
module fifo #(
    parameter int DEPTH = 16,   // Depth of the FIFO
    parameter int WIDTH = 8     // Data width
) (
    input  logic                  clk,        // Clock signal
    input  logic                  reset,      // Reset signal
    input  logic                  wr_en,      // Write enable
    input  logic                  rd_en,      // Read enable
    input  logic [WIDTH-1:0]      wr_data,    // Write data
    output logic [WIDTH-1:0]      rd_data,    // Read data
    output logic                  full,       // Full flag
    output logic                  empty       // Empty flag
);

    // Internal signals
    logic [WIDTH-1:0] mem [0:DEPTH-1];
    logic [$clog2(DEPTH):0] wr_ptr, rd_ptr, count;

    // Combinational logic for full and empty flags
    always_comb begin
        full  = (count == DEPTH);
        empty = (count == 0);
    end

    // Write logic
    always_ff @(posedge clk or posedge reset) begin
        if (reset) begin
            wr_ptr <= 0;
        end else if (wr_en && !full) begin
            mem[wr_ptr] <= wr_data;
            wr_ptr <= wr_ptr + 1;
        end
    end

    // Read logic
    always_ff @(posedge clk or posedge reset) begin
        if (reset) begin
            rd_ptr <= 0;
        end else if (rd_en && !empty) begin
            rd_data <= mem[rd_ptr];
            rd_ptr <= rd_ptr + 1;
        end else if (empty) begin
            rd_data <= '0; // Default read data on empty FIFO
        end
    end

    // Count logic
    always_ff @(posedge clk or posedge reset) begin
        if (reset) begin
            count <= 0;
        end else if (wr_en && !full && rd_en && !empty) begin
            count <= count; // No change
        end else if (wr_en && !full) begin
            count <= count + 1;
        end else if (rd_en && !empty) begin
            count <= count - 1;
        end
    end

endmodule

// Testbench for FIFO
module fifo_tb;

    parameter int DEPTH = 16;
    parameter int WIDTH = 8;

    // Testbench signals
    logic                 clk;
    logic                 reset;
    logic                 wr_en;
    logic                 rd_en;
    logic [WIDTH-1:0]     wr_data;
    logic [WIDTH-1:0]     rd_data;
    logic                 full;
    logic                 empty;

    // Instantiate the FIFO
    fifo #(DEPTH, WIDTH) uut (
        .clk(clk),
        .reset(reset),
        .wr_en(wr_en),
        .rd_en(rd_en),
        .wr_data(wr_data),
        .rd_data(rd_data),
        .full(full),
        .empty(empty)
    );

    // Clock generation
    initial begin
        clk = 0;
        forever #5 clk = ~clk; // 10ns period
    end

    // Stimulus logic
    initial begin
        // Initialize signals
        reset = 1;
        wr_en = 0;
        rd_en = 0;
        wr_data = 0;

        // Release reset
        #20 reset = 0;

        // Write data into FIFO
        for (int i = 0; i < 20; i++) begin
            @(posedge clk);
            wr_en = 1;
            wr_data = i;
        end

        @(posedge clk);
        wr_en = 0;

        // Read data from FIFO
        for (int i = 0; i < 20; i++) begin
            @(posedge clk);
            rd_en = 1;
        end

        @(posedge clk);
        rd_en = 0;

        // Final check
        $finish;
    end

    // Assertions
    always_ff @(posedge clk) begin
        assert(full == (uut.count == DEPTH))
            else $fatal("Full flag mismatch!");

        assert(empty == (uut.count == 0))
            else $fatal("Empty flag mismatch!");

        if (rd_en && empty)
            $fatal("Reading from an empty FIFO!");
    end

endmodule
`;

const markdownExample: string = `# 🚀 Awesome Project

Welcome to the Awesome Project! This README demonstrates various Markdown features.

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Installation

To get started with this project, follow these steps:

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/username/awesome-project.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`bash
   cd awesome-project
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## 🚦 Usage

Here's a quick example of how to use the main function:

\`\`\`javascript
const awesomeProject = require('awesome-project');

const result = awesomeProject.doSomethingAwesome();
console.log(result);
\`\`\`

## ✨ Features

- **Fast**: Optimized for speed
- **Flexible**: Easily customizable
- **Secure**: Built with security in mind

### Feature Comparison

| Feature       | Awesome Project | Other Projects |
|---------------|-----------------|-----------------|
| Speed         | ⚡⚡⚡          | ⚡             |
| Flexibility   | 🔧🔧🔧          | 🔧             |
| Security      | 🔒🔒🔒          | 🔒             |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

For more details, please read our [CONTRIBUTING.md](CONTRIBUTING.md) file.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 Acknowledgements

- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [Shields.io](https://shields.io/)
- [Choose an Open Source License](https://choosealicense.com)

## 📊 Project Status

![Build Status](https://img.shields.io/travis/username/awesome-project.svg)
![Downloads](https://img.shields.io/github/downloads/username/awesome-project/total.svg)
![Version](https://img.shields.io/github/v/release/username/awesome-project.svg)

`;

interface FileExplorerProps {
    tree: RepositoryFile[];
    setFilePreviewAction: Dispatch<
        SetStateAction<RepositoryFilePreview | undefined>
    >;
}

export default function FileExplorer({
    tree,
    setFilePreviewAction,
}: FileExplorerProps) {
    const [files, setFiles] = useState<RepositoryFile[]>(tree);
    const [directoryStack, setDirectoryStack] = useState<RepositoryFile[][]>(
        [],
    );

    const handleRowClick = (element: RepositoryFile) => {
        if (element.isDirectory && element.children) {
            setDirectoryStack((prevStack) => [...prevStack, files]);
            setFiles(element.children);
            return;
        }
        if (!element.isDirectory) {
            if (element.language === "markdown") {
                setFilePreviewAction({
                    name: element.name,
                    language: element.language,
                    content: markdownExample,
                    lastActivity: element.lastActivity,
                });
            } else {
                setFilePreviewAction({
                    name: element.name,
                    language: element.language,
                    content: verilogExample,
                    lastActivity: element.lastActivity,
                });
            }
        }
    };

    const handleBackClick = () => {
        setDirectoryStack((prevStack) => {
            const newStack = [...prevStack];
            const lastDirectory = newStack.pop();
            setFiles(lastDirectory || tree);
            return newStack;
        });
    };

    return (
        <Card className="w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">
                            Last activity
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {directoryStack.length > 0 && (
                        <TableRow
                            className="cursor-pointer hover:bg-accent"
                            onClick={handleBackClick}
                        >
                            <TableCell className="flex flex-row items-center gap-x-3 font-semibold">
                                <Folder className="h-5 w-5 text-muted-foreground" />
                                <span>..</span>
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    )}
                    {files.map((element) => (
                        <TableRow
                            key={element.name}
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => handleRowClick(element)}
                        >
                            <TableCell className="flex flex-row items-center gap-x-3">
                                {element.isDirectory ? (
                                    <Folder
                                        className="h-5 w-5 text-muted-foreground"
                                        fill={"currentColor"}
                                    />
                                ) : (
                                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                                )}
                                <span className="font-semibold">
                                    {element.name}
                                </span>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">
                                {getTimeDeltaString(element.lastActivity)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
