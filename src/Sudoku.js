import Board from './Board';
import {shuffle} from './utils';

class Sudoku {
    constructor(tokens) {
        this.tokens = tokens;
    }

    generate() {
        const emptyBoard = Board.create();
        //simply run solver on an empty board and then dig holes in it
        const board = this._dig(this.solve(emptyBoard, false));
        
        return board.getMatrix();
    }

    _dig(board, givens = 40) {
        const cells = shuffle(this._getAllCells());
        let cell, solvable, value, x, y;
        let removed = 0;

        board = board.clone();

        for (let i = 0; i < cells.length; i++) {
            if (removed >= cells.length - givens) {
                break;
            }

            x = cells[i].x;
            y = cells[i].y;
            value = board.get(x, y);
            board.set(x, y, 0);

            solvable = this.solve(board, true).solvable;

            if (!solvable) {
                board.set(x, y, value);
                continue;
            }

            removed++;
        }

        return board;
    }

    solve(board, unique) {
        return this._backtrack(board.clone(), board.getEmptyCell(), unique);
    }

    _backtrack(board, cell, unique) {
        //TODO: take out clone method from Array.prototype
        const possibles = this.tokens.clone();
        const {x, y} = cell;
        let solutions = 0;
        let nextCell, value, solvable;

        for (let i = 0; i < possibles.length; i++) {
            value = possibles[i];

            if (board.isCellValid(x, y, value)) {
                solutions++;
                
                if (unique && solutions > 1) {
                    board.solvable = false;
                    return board;
                }

                board.set(x, y, value);
                nextCell = board.getEmptyCell();

                if (!nextCell || this._backtrack(board, nextCell, unique).solvable === true) {
                    board.solvable = true;
                    return board;
                }
            }
        }

        board.set(x, y, 0);
        board.solvable = false;
        return board;
    }

    _getAllCells() {
        const arr = [];
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                arr.push({x, y});
            }
        }

        return arr;
    }
}

export default Sudoku;