import {solve} from '../solver/Solver';
import Cell from '../Cell';
import {randomValue, randomFromArray, shuffle} from '../utils';

function generate(givens) {
	//simply run solver on an empty board
	const {board} = solve(createEmptyBoard(), false);
	const finalBoard = dig(board, 32);

	return finalBoard;
};

function dig(board, givens) {
	const cells = shuffle(getAllCells());
	let cell, solvable, value;
	let removed = 0;

	board = board.clone();

	for (let i = 0; i < cells.length; i++) {
		if (removed >= cells.length - givens) {
			break;
		}

		cell = cells[i];
		value = board[cell.x][cell.y];
		board[cell.x][cell.y] = 0;

		solvable = solve(board.clone(), true).solvable;

		if (!solvable) {
			board[cell.x][cell.y] = value;
			continue;
		}

		removed++;
	}

	return board;
};

function getAllCells() {
	const arr = [];
	for (let x = 0; x < 9; x++) {
		for (let y = 0; y < 9; y++) {
			arr.push({x, y});
		}
	}

	return arr;
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
}

export {
	generate
}
