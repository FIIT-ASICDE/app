type ElementTypeKey =
        | 'input' | 'output' | 'and' | 'or' | 'xor' | 'xnor' | 'nand' | 'nor' | 'not'
        | 'alu' | 'comparator' | 'decoder' | 'encoder'
        | 'multiplexer' | 'splitter' | 'combiner'
        | 'sram' | 'register' | 'module';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elementTypes: Record<ElementTypeKey, { class: any; create: any }> = {
        'input': { class: Port, create: JointJsInputPort },
        'output': { class: Port, create: JointJsOutputPort },
        'and': { class: AndGate, create: AndGate },
        'or': { class: OrGate, create: OrGate },
        'xor': { class: XorGate, create: XorGate },
        'xnor': { class: XnorGate, create: XnorGate },
        'nand': { class: NandGate, create: NandGate },
        'nor': { class: NorGate, create: NorGate },
        'not': { class: NotGate, create: NotGate },
        'alu': { class: Alu, create: Alu },
        'comparator': { class: Comparator, create: Comparator },
        'decoder': { class: Decoder, create: Decoder },
        'encoder': { class: Encoder, create: Encoder },
        'multiplexer': { class: Multiplexer, create: Multiplexer },
        'splitter': { class: Splitter, create: Splitter },
        'combiner': { class: Combiner, create: Combiner },
        'sram': { class: Sram, create: Sram },
        'register': { class: Register, create: Register },
        'module': { class: Module, create: Module }
    }; 