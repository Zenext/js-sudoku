import R from 'ramda';

class Solver {
	constructor() {

	}

	solve(board) {
		board.updateCandidates();

		this.nakedSingles(board);
		this.hiddenSingles(board);
		this.hiddenSingles(board);
		this.hiddenSingles(board);
		this.hiddenSingles(board);
	}

	nakedSingles(board) {
		const cells = board.getEmptyCells();

		for (let cell of cells) {
			if (cell.candidates.length === 1) {
				cell.value = R.head(cell.candidates);
				cell.candidates = [];
				cell.nakedSingles = 0x6666ff; //TODO: remove, for debugging
			}
		}
	}

	hiddenSingles(board) {
		const houses = board.getAllHouses();
		let candidates, occur, uniq;

		for (let house of houses) {
			candidates = [];
			for (let cell of house) {
				candidates.push(cell.candidates);
			}

			candidates = R.flatten(candidates);
			occur = R.countBy(Math.abs)(candidates);
			uniq = R.map(
				parseInt,
				R.keys(R.filter(n => n === 1, occur))
			);

			for (let value of uniq) {
				for (let cell of house) {
					if (cell.candidates.includes(value)) {
						cell.value = value;
						cell.candidates = [];
						cell.hiddenSingles = 0x6dfa7d; //TODO: remove, for debugging
					}
				}
			}
			
		}
	}
}

export default Solver;