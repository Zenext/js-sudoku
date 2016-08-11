const Board = {
    create(empty = true, matrix = null) {
        const self = Object.create(Board);
        self._matrix = matrix || self._createEmptyBoard();
        self._solvable = null;

        return self;
    },

    set(x, y, value) {
        this._matrix[x][y] = value;
    },

    get(x, y) {
        return this._matrix[x][y];
    },

    isCellValid(x, y, value) {
        const row = this.isRowSafe(x, value);
        const col = this.isColSafe(y, value);
        const block = this.isBlockSafe(x, y, value);

        return (row && col && block);
    },

    isRowSafe(x, value) {
        const row = this._matrix[x];

        return !row.includes(value);
    },

    isColSafe(y, value) {
        let col, i;

        for (i = 0; i < 9; i++) {
            col = this._matrix[i];
            if (col[y] === value)
                return false;
        }

        return true;
    },

    isBlockSafe(row, col, value) {
        //TODO: allow different sizings
        const blockSize = 3;
        let leftColumn = 0;
        let topRow = 0;

        while (col >= leftColumn + blockSize) {
            leftColumn += blockSize;
        }

        while (row >= topRow + blockSize) {
            topRow += blockSize;
        }

        for (let i = topRow; i < topRow + blockSize; i++) {
            for (let j = leftColumn; j < leftColumn + blockSize; j++) {
                if (this._matrix[i][j] === value)
                    return false;
            }
        }

        return true;
    },

    getEmptyCell() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                //TODO: define 'empty' value
                if (this._matrix[x][y] === 0)
                    return {x, y};
            }
        }

        return null;
    },

    clone() {
        return this.create(false, this._matrix.clone());
    },

    set solvable(isSolvable) {
        this._solvable = isSolvable;
    },

    get solvable() {
        return this._solvable;
    },

    getMatrix() {
        return this._matrix.clone();
    },

    _createEmptyBoard() {
        const board = [];

        for (let x = 0; x < 9; x++) {
            board[x] = [];
            for (let y = 0; y < 9; y++) {
                board[x][y] = 0;
            }
        }

        return board;
    }
}

export default Board;