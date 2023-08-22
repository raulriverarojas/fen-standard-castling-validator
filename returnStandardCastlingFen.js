import { makeFen, parseCastlingFen, parseFen } from 'chessops/fen.js';
import { Chess } from 'chessops/chess.js';
const fen="r2k4/1pp4p/1p3p2/4pPp1/4P3/P2P2P1/1P5P/6K1 b q - 0 1"
let new_fen=fen
const setup = parseFen(fen).unwrap();
/* const setup = parseFen('r1bqkbnr/ppp3pp/2np4/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR b KQkq - 0 4').unwrap();  */

let castlingPart="-"
let iterable=setup.unmovedRooks[Symbol.iterator]();
const w_castling_squares=[]
const b_castling_squares=[]
const kings_in_starting={
    //check if white king on its starting square
    'w':setup.board.king.has(4)&&setup.board.white.has(4),
    //check same thing for black king
    'b':setup.board.king.has(60)&&setup.board.black.has(60)
}
let result = iterable.next();
while (!result.done) {
    if(setup.board.black.has(result.value)) b_castling_squares.push(result.value)
    else if (setup.board.white.has(result.value)) w_castling_squares.push(result.value)
    result = iterable.next();
  }
//populate arrays to contain possible black and white castling squares
if ((kings_in_starting['w']&&w_castling_squares)||(kings_in_starting['b']&&b_castling_squares)){
    castlingPart="K".repeat(w_castling_squares.includes(7)?1:0)+"Q".repeat(w_castling_squares.includes(0)?1:0)+"k".repeat(b_castling_squares.includes(63)?1:0)+"q".repeat(b_castling_squares.includes(56)?1:0)
}
setup.unmovedRooks=parseCastlingFen(setup.board,castlingPart).unwrap()
new_fen=makeFen(setup)
console.log(new_fen)
//rebuild castling part of fen for standard rules
//# sourceMappingURL=test.js.map
