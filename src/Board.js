const rows = 9;
const columns = 9;
const board = [];

function initBoard() {
	for (let r = 0; r < rows; r++) {
		board[r] = [];
		for (let c = 0; c < columns; c++) {
			board[r][c] = 0;
		}
	}
	console.log(board)
	return board;
};

function generate(givens) {
	var board = initBoard();
	let cell;

	for (let i = 0; i < givens; i++) {
		placeGiven();
	}
	
	return board;
};

function placeGiven() {
	const cell = randomCell();
	const value = randomValue(1, 9);
	const row = cell.row;
	const col = cell.col;

	if (board[row][col] || !isValid(cell, value))
		placeGiven();
	else
		board[row][col] = value;
};

function isValid(cell, value) {
	const row = cell.row;
	const col = cell.col;

	return isRowSafe(row, value) &&
		   isColSafe(col, value) &&
		   isBlockSafe(row, col, value)
};

function isRowSafe(row, value) {
	const arr = board[row];

	return !arr.includes(value);
};

function isColSafe(col, value) {
	let row;

	for (let i = 0; i < rows; i++) {
		row = board[i];
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
			if (board[i][j] === value)
				return false;
		}
	}

	return true;
};

function randomCell() {
	const row = randomValue(0, 8);
	const col = randomValue(0, 8);

	return {row, col};
};

function randomValue(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export {generate};