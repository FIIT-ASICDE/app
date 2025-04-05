export interface StructField {
    name: string;
    type: string;
    startBit: number;
    endBit: number;
    bandwidth: number;
}

export interface StructType {
    name: string;
    fields: StructField[];
    isPacked: boolean;
}

export interface Package {
    name: string;
    structs: StructType[];
}

/**
 * Improved parser for SystemVerilog using regular expressions.
 * Handles packed structs and assigns correct startBit, endBit, and bandwidth.
 */
export function parseSystemVerilogTextFromRegex(svText: string): Package[] {
    const packages: Package[] = [];

    const packageRegex = /package\s+(\w+)\s*;([\s\S]*?)endpackage\s*:?\s*(\1)?/gi;
    let pkgMatch;

    while ((pkgMatch = packageRegex.exec(svText)) !== null) {
        const [, pkgName, pkgContent] = pkgMatch;
        const structs: StructType[] = [];

        const structRegex = /typedef\s+struct\s+(packed\s+)?\{([\s\S]*?)\}\s+(\w+)\s*;/gi;
        let structMatch;

        while ((structMatch = structRegex.exec(pkgContent)) !== null) {
            const isPacked = !!structMatch[1];
            const structBody = structMatch[2];
            const structName = structMatch[3];

            const lines = structBody
                .split(';')
                .map(line => line.trim())
                .filter(line => line.length > 0);

            const fields: StructField[] = [];
            let bitPointer = 0;

            for (const line of lines) {
                const fieldRegex = /(?:(logic|bit|reg)?\s*(\[\s*(\d+)\s*:\s*(\d+)\s*\])?)?\s*(\w+)\s*$/;
                const match = line.match(fieldRegex);

                if (match) {
                    const [, baseType, range, highStr, lowStr, name] = match;
                    const high = highStr ? parseInt(highStr, 10) : undefined;
                    const low = lowStr ? parseInt(lowStr, 10) : undefined;

                    const bandwidth =
                        high !== undefined && low !== undefined
                            ? Math.abs(high - low) + 1
                            : 1;

                    const startBit = bitPointer;
                    const endBit = bitPointer + bandwidth - 1;
                    bitPointer += bandwidth;

                    fields.push({
                        name,
                        type: baseType ? `${baseType} ${range || ''}`.trim() : 'logic',
                        startBit,
                        endBit,
                        bandwidth,
                    });
                } else {
                    // fallback
                    const parts = line.split(/\s+/);
                    const name = parts.pop()!;
                    const startBit = bitPointer;
                    const endBit = bitPointer;
                    bitPointer += 1;

                    fields.push({
                        name,
                        type: parts.join(' ') || 'logic',
                        startBit,
                        endBit,
                        bandwidth: 1,
                    });
                }
            }

            structs.push({ name: structName, fields, isPacked });
        }

        packages.push({ name: pkgName, structs });
    }

    return packages;
}
