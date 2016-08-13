import Board from '../Board';
import {shuffle} from '../utils';

class Generator {
	constructor(tokens) {
		this.tokens = shuffle(tokens);
		this.difficulty = null;
		this.givens = null;
	}

	generate() {
        const emptyBoard = Board.create();
        const board = this._dig(this.fill(emptyBoard));

        return board.getMatrix();
    }

    _dig(board, givens = 40) {
        const cells = shuffle(this._getAllCells());
        let solvable, value, cell, x, y;
        let removed = 0;

        board = board.clone();

        for (cell of cells) {
            if (removed >= cells.length - givens) {
                break;
            }

            x = cell.x;
            y = cell.y;
            value = board.get(x, y);
            board.set(x, y, 0);

            solvable = this.fill(board).solvable;

            if (!solvable) {
                board.set(x, y, value);
                continue;
            }

            removed++;
        }

        return board;
    }

    fill(board) {
    	return this._backtrack(board.clone(), board.getEmptyCell());
    }

    _backtrack(board, cell) {
        const possibles = this.tokens;
        const {x, y} = cell;
        let nextCell, value;

        for (let i = 0; i < possibles.length; i++) {
            value = possibles[i];

            if (board.isCellValid(x, y, value)) {

                board.set(x, y, value);
                nextCell = board.getEmptyCell();

                if (!nextCell || this._backtrack(board, nextCell).solvable === true) {
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

export default Generator;