import {randomFromArray} from '../utils';

const possiblesxx = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

let _board;
let _tokens;

function solve(board, tokens) {
	_board = Array.from(board);
    _tokens = tokens || [1, 2, 3, 4, 5, 6, 7, 8, 9];

	backtrack(getEmptyCell())

	return _board;
};

function backtrack(pos) {
	const possibles = Array.from(_tokens);
	const {x, y} = pos;
	let value, nextCell;

	if (isLastCell(pos))
		return true;

	while (possibles.length > 0) {
		value = randomFromArray(possibles);
		possibles.splice(possibles.indexOf(value), 1);

		if (isValid(x, y, value)) {
			_board[x][y] = value;
			nextCell = getEmptyCell();

			if (!nextCell || backtrack(nextCell) === true)
				return true;
		}
	}

	_board[x][y] = 0;
	return false;
};

function isLastCell(pos) {
	return (pos.x === 9 && pos.y === 9);
};

function getEmptyCell() {
	for (let x = 0; x < 9; x++) {
		for (let y = 0; y < 9; y++) {
			if (_board[x][y] === 0)
				return {x, y};
		}
	}

	return null;
};

function isValid(x, y, value) {
	return isRowSafe(x, value) &&
		   isColSafe(y, value) &&
		   isBlockSafe(x, y, value)
};

function isRowSafe(row, value) {
	const arr = _board[row];

	return !arr.includes(value);
};

function isColSafe(col, value) {
	let row;

	for (let i = 0; i < 9; i++) {
		row = _board[i];
		if (row[col] === value)
			return false;
	}

	return true;
};

function isBlockSafe(row, col, value) {
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
			if (_board[i][j] === value)
				return false;
		}
	}

	return true;
};

export {
	solve
}