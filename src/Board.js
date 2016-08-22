import R from 'ramda';
import Cell from './Cell';
import deepcopy from 'deepcopy';

const Board = {
    create(empty = true, matrix = null) {
        const self = Object.create(Board);

        self._matrix = matrix || self._createEmptyBoard();
        self._solvable = null;
        self._houses = self._setupHouses();

        return self;
    },

    _setupHouses() {
        const boardSize = 9;
        const houses = {};
        let cell;
        let count = 0;
        houses.horizontal = R.splitEvery(9, this._matrix);
        houses.vertical = R.times(_ => [], 9);
        houses.blocks = R.times(_ => [], 9);

        //map horizontal house id to cell
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                houses.horizontal[i][j].houses.horizontal = i;
            }
        }

        //verticals
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                houses.vertical[j][i] = houses.horizontal[i][j];
                houses.vertical[j][i].houses.vertical = j;
            }
        }

        //blocks
        for (let i = 0; i < 9; i++) {
            if (i > 0 && i % 3 === 0)
                count += 3;

            for (let j = 0; j < 9; j++) {
                houses.blocks[Math.floor(j / 3) + count].push(houses.horizontal[i][j]);
                houses.horizontal[i][j].houses.block = Math.floor(j / 3) + count; 
            }
        }
        
        return houses;
    },

    isCellValid(cell, value) {
        const horz = this._houses.horizontal[cell.houses.horizontal];
        const vert = this._houses.vertical[cell.houses.vertical];
        const block = this._houses.blocks[cell.houses.block];

        for (let house of [horz, vert, block]) {
            for (let c of house) {
                if (Object.is(cell, c))
                    continue;

                if (c.value === value)
                    return false;
            }
        }

        return true;
    },

    getEmptyCell() {
        let cell;

        for (cell of this._matrix) {
            if (cell.value === 0)
                return cell;
        }

        return null;
    },

    clone() {
        return this.create(false, deepcopy(this._matrix));
    },

    set solvable(isSolvable) {
        this._solvable = isSolvable;
    },

    get solvable() {
        return this._solvable;
    },

    getMatrix() {
        return this._matrix;
    },

    _createEmptyBoard() {
        return R.times(Cell.create, 81);
    }
}

export default Board;