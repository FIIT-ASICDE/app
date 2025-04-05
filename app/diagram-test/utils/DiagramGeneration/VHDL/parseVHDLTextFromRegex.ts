export interface VhdlStructField {
    name: string;
    type: string;
    startBit: number;
    endBit: number;
    bandwidth: number;
}

export interface VhdlStructType {
    name: string;
    fields: VhdlStructField[];
}

export interface VhdlPackage {
    name: string;
    structs: VhdlStructType[];
}


export function parseVHDLTextFromRegex(text: string): VhdlPackage[] {
    const packages: VhdlPackage[] = [];

    const packageRegex = /package\s+(\w+)\s+is([\s\S]*?)end\s+package/gi;
    let match;

    while ((match = packageRegex.exec(text)) !== null) {
        const packageName = match[1];
        const packageBody = match[2];
        const pkg: VhdlPackage = {
            name: packageName,
            structs: []
        };

        const recordRegex = /type\s+(\w+)\s+is\s+record([\s\S]*?)end\s+record\s*;/gi;
        let recordMatch;

        while ((recordMatch = recordRegex.exec(packageBody)) !== null) {
            const recordName = recordMatch[1];
            const recordBody = recordMatch[2];

            const fields: VhdlStructField[] = [];

            const lines = recordBody
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(Boolean);

            let bitPointer = 0;

            for (const line of lines) {
                const fieldMatch = line.match(/(\w+)\s*:\s*([^;]+);?/);
                if (fieldMatch) {
                    const name = fieldMatch[1];
                    const rawType = fieldMatch[2].trim();
                    let bandwidth = 1;

                    // Match std_logic_vector(x downto y)
                    const vectorMatch = rawType.match(/std_logic_vector\s*\(\s*(\d+)\s+downto\s+(\d+)\s*\)/i);
                    if (vectorMatch) {
                        const high = parseInt(vectorMatch[1]);
                        const low = parseInt(vectorMatch[2]);
                        bandwidth = Math.abs(high - low) + 1;
                    }

                    const startBit = bitPointer;
                    const endBit = bitPointer + bandwidth - 1;
                    bitPointer += bandwidth;

                    fields.push({
                        name,
                        type: rawType,
                        startBit,
                        endBit,
                        bandwidth
                    });
                }
            }

            pkg.structs.push({
                name: recordName,
                fields,
            });
        }

        packages.push(pkg);
    }

    return packages;
}
