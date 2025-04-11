import { ModulePort, ParsedModule } from "@/app/diagram-test/utils/DiagramGeneration/interfaces";

export function parseVhdlEntities(text: string): ParsedModule[] {
    const entities: ParsedModule[] = [];

    const entityRegex = /entity\s+(\w+)\s+is\s+port\s*\(([\s\S]*?)\);\s*end\s+\1\s*;/gi;
    let match: RegExpExecArray | null;

    while ((match = entityRegex.exec(text)) !== null) {
        const [, entityName, portBlock] = match;
        const ports: ModulePort[] = [];

        const portLines = portBlock.split(/;\s*\n?/).map(line => line.trim()).filter(Boolean);

        for (const line of portLines) {
            const portMatch = line.match(/(\w+)\s*:\s*(in|out)\s+(.+)/i);
            if (portMatch) {
                const [, portName, direction, typeStr] = portMatch;
                const cleanType = typeStr.trim();
                let width: number | undefined = 1;

                const vectorMatch = cleanType.match(/std_logic_vector\s*\(\s*(\d+)\s+downto\s+(\d+)\s*\)/i);
                if (vectorMatch) {
                    const high = parseInt(vectorMatch[1], 10);
                    const low = parseInt(vectorMatch[2], 10);
                    width = Math.abs(high - low) + 1;
                }

                ports.push({
                    name: portName,
                    direction: direction.toLowerCase() as ModulePort['direction'],
                    type: cleanType,
                    width
                });
            }
        }

        entities.push({ name: entityName, ports });
    }

    return entities;
}
