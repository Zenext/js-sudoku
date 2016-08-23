class Solver {
	constructor() {

	}

	solve(board) {
		this.nakedSingles(board);
	}

	nakedSingles(board) {
		board.updateCandidates();
		console.log(board)
	}
}

export default Solver;