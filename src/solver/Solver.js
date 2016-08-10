import {randomFromArray} from '../utils';

const possiblesxx = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

let _board;
let _tokens;
let _unique;

function solve(board, unique, tokens) {
	_board = board;
	_tokens = tokens || [1, 2, 3, 4, 5, 6, 7, 8, 9];
	_unique = unique;

	const solvable = backtrack(getEmptyCell());

	if (solvable)
		return {board: _board, solvable};
	
	return {board: [], solvable};
};

function backtrack(pos) {
	const possibles = Array.from(_tokens);
	const {x, y} = pos;
	let value, nextCell;
	let solutions = 0;

	for (let i = 0; i < possibles.length; i++) {
		value = possibles[i];

		if (isValid(x, y, value)) {
			solutions++;
			
			if (_unique && solutions > 1) {
				return false;
			}

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
	return (pos.x === 8 && pos.y === 8);
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