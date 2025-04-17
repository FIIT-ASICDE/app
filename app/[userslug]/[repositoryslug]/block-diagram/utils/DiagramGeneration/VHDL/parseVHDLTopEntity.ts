import { ParsedTopModule, TopModulePort, SubModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/interfaces";

/**
 * Парсим VHDL-топ entity и его submodules
 * Возвращаем { name, ports, subModules }
 */
export function parseVHDLTopEntity(text: string): ParsedTopModule | null {
    // 1. Находим entity + порты
    // Пример: entity top_module is port ( ... );
    //         end top_module;
    console.log(text);

    const entityRegex = /entity\s+(\w+)\s+is\s+port\s*\(([\s\S]*?)\);\s*end(\s+entity)?\s+\1\s*;/i;
    const entityMatch = entityRegex.exec(text);
    if (!entityMatch) {
        return null;
    }

    const [, entityName, portBlock] = entityMatch;

    // 2. Разберём порты
    // Пример строки:
    //   clk : in std_logic
    //   data_in : in std_logic_vector(7 downto 0)
    //
    // Нам нужно достать name, direction, width
    const portLineRegex = /(\w+)\s*:\s*(in|out)\s+(.+)/gi;
    const vectorRegex = /std_logic_vector\s*\(\s*(\d+)\s+downto\s+(\d+)\s*\)/i;

    const ports: TopModulePort[] = [];

    let matchPort: RegExpExecArray | null;
    while ((matchPort = portLineRegex.exec(portBlock)) !== null) {
        const [, portName, dir, typeStr] = matchPort;

        let width = 1;
        const vecMatch = vectorRegex.exec(typeStr);
        if (vecMatch) {
            const [ , high, low ] = vecMatch;
            width = Math.abs(parseInt(high, 10) - parseInt(low, 10)) + 1;
        }

        ports.push({
            name: portName,
            direction: dir.toLowerCase() as TopModulePort['direction'], // 'in'|'out'
            width
        });
    }

    // Мапа, чтобы быстро найти ширину «по имени сигнала»
    // (например, submodule может подключаться к «data_in»)
    const portWidthMap = new Map<string, number>(
        ports.map((p) => [p.name, p.width])
    );

    // 3. Парсим subModules внутри architecture.
    // Ищем:
    //   instance_name : entity work.module_name
    //     port map ( sig => top_sig, ... );
    //
    // Пример:
    //   instance_newModule_1 : entity work.newModule_1
    //   port map (
    //       data_in => data_in,
    //       ...
    //   );
    //
    // Regex упрощённый, на реальном проекте может понадобиться улучшить.
    const subModuleRegex = /(\w+)\s*:\s*entity\s+work\.(\w+)\s+port\s+map\s*\(([\s\S]*?)\);\s*/gi;
    const portConnectionRegex = /(\w+)\s*=>\s*(\w+)/g;

    const subModules: SubModule[] = [];
    let matchSub: RegExpExecArray | null;
    while ((matchSub = subModuleRegex.exec(text)) !== null) {
        const [ , instanceName, moduleName, connectionsBlock ] = matchSub;

        // Список { portName, connectedTo, width }
        const portConnections: SubModule['portConnections'] = [];

        let matchConn: RegExpExecArray | null;
        while ((matchConn = portConnectionRegex.exec(connectionsBlock)) !== null) {
            const [, subPort, connectedSig ] = matchConn;
            const w = portWidthMap.get(connectedSig) || 1;
            portConnections.push({
                portName: subPort,
                connectedTo: connectedSig,
                width: w
            });
        }

        subModules.push({
            moduleName,
            instanceName,
            portConnections
        });
    }

    // 4. Возвращаем ParsedTopModule
    return {
        name: entityName,
        ports,
        subModules
    };
}
