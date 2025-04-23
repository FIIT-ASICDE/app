import { ANTLRErrorListener, RecognitionException, Recognizer } from 'antlr4ts';

export class QuietErrorListener implements ANTLRErrorListener<any> {
    syntaxError(
        recognizer: Recognizer<any, any>,
        offendingSymbol: any,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined
    ): void {
        // Просто ничего не делаем, либо логируем кастомно:
        // console.warn(`ANTLR error at ${line}:${charPositionInLine} -> ${msg}`);
    }
}
