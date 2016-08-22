import Generator from './generator/Generator';
import Solver from './solver/Solver';

class Sudoku {
    constructor(tokens) {
        this.tokens = tokens;
        this.generator = new Generator(tokens);
        this.solver = new Solver(tokens);
    }

    generate() {
        return this.generator.generate();
    }
}

export default Sudoku;