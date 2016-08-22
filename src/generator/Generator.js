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

    _dig(board, givens = 17) {
        board = board.clone();

        const cells = shuffle(board.getMatrix());
        let solvable, value, cell;
        let removed = 0;

        for (cell of cells) {
            if (removed >= cells.length - givens) {
                break;
            }

            value = cell.value;
            cell.value = 0;

            solvable = this.fill(board).solvable;

            if (!solvable) {
                cell.value = value;
                continue;
            }

            removed++;
        }

        return board;
    }

    fill(board) {
        const copy = board.clone();
    	return this._backtrack(copy, copy.getEmptyCell());
    }

    _backtrack(board, cell) {
        const possibles = this.tokens;
        let nextCell, value;

        for (let i = 0; i < possibles.length; i++) {
            value = possibles[i];

            if (board.isCellValid(cell, value)) {

                cell.value = value;
                nextCell = board.getEmptyCell();

                if (!nextCell || this._backtrack(board, nextCell).solvable === true) {
                    board.solvable = true;
                    return board;
                }
            }
        }

        cell.value = 0;
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