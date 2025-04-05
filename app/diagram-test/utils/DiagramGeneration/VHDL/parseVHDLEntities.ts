export interface VhdlEntityPort {
    name: string;
    direction: 'in' | 'out';
    type: string;
    width?: number;
}

export interface VhdlEntity {
    name: string;
    ports: VhdlEntityPort[];
}


export function parseVhdlEntities(vhdlText: string): VhdlEntity[] {
    const entities: VhdlEntity[] = [];

    const entityRegex = /entity\s+(\w+)\s+is\s+port\s*\(([\s\S]*?)\);\s*end\s+\1\s*;/gi;
    let match: RegExpExecArray | null;

    while ((match = entityRegex.exec(vhdlText)) !== null) {
        const [, entityName, portBlock] = match;
        const portLines = portBlock.split(/;\s*\n?/).map(line => line.trim()).filter(Boolean);

        const ports: VhdlEntityPort[] = [];

        for (const line of portLines) {
            const portMatch = line.match(/(\w+)\s*:\s*(in|out)\s+(.+)/i);
            if (portMatch) {
                const [, portName, direction, typeStr] = portMatch;
                const cleanType = typeStr.trim();
                let width: number | undefined = undefined;
                
                const vectorMatch = cleanType.match(/std_logic_vector\s*\(\s*(\d+)\s+downto\s+(\d+)\s*\)/i);
                if (vectorMatch) {
                    const high = parseInt(vectorMatch[1], 10);
                    const low = parseInt(vectorMatch[2], 10);
                    width = Math.abs(high - low) + 1;
                } else {
                    width = 1;
                }

                ports.push({
                    name: portName,
                    direction: direction.toLowerCase() as 'in' | 'out',
                    type: cleanType,
                    width
                });
            }
        }

        entities.push({
            name: entityName,
            ports
        });
    }

    return entities;
}
