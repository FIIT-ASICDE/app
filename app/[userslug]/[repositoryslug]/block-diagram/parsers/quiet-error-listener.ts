import { ANTLRErrorListener, RecognitionException, Recognizer } from 'antlr4ts';
import { Token } from "antlr4ts/Token";
import { ATNSimulator } from "antlr4ts/atn";

export class QuietErrorListener implements ANTLRErrorListener<Token> {
    syntaxError(
        recognizer: Recognizer<Token, ATNSimulator>,
        offendingSymbol: Token | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined
    ): void {
        console.log(recognizer, offendingSymbol, line, charPositionInLine, msg, e);
    }
}
