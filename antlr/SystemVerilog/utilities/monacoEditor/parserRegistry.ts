type ParserFunction = (code: string, uri: string) => void;

const parserRegistry: Record<string, ParserFunction> = {};

export function registerParser(language: string, parser: ParserFunction) {
  parserRegistry[language] = parser;
}

export function getParser(language: string): ParserFunction | undefined {
  return parserRegistry[language];
}
