import Generator from './generator/Generator';
import Solver from './solver/Solver';

class Sudoku {
    constructor(tokens) {
        this.tokens = tokens;
        this.board = null;
        this.generator = new Generator(tokens);
        this.solver = new Solver(tokens);
    }

    generate() {
    	this.board = this.generator.generate();
    	this.solver.solve(this.board);
    	return this.board.getMatrix();
    }

    solve(board) {
    	return this.solver.solve(this.board);
    }
}

export default Sudoku;