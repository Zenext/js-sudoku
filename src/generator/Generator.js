import {solve} from '../solver/Solver';

let _board;

function generate(width, height) {
	//simply run solver on an empty board
	_board = solve(createEmptyBoard());
	dig();

	return board;
};

function dig() {
	const {x, y} = getFilledCell();	
	_board[x][y] = 0;


};

function getFilledCell() {
	const x = randomValue(1, 9);
	const y = randomValue(1, 9);

	if (_board[x][y] === 0)
		getFilledCell(_board);

	return {x, y};
};

function createEmptyBoard() {
	const board = [];

	for (let x = 0; x < 9; x++) {
		board[x] = [];
		for (let y = 0; y < 9; y++) {
			board[x][y] = 0;
		}
	}

	return board;
};

export {
	generate
}
