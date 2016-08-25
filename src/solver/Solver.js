import R from 'ramda';

class Solver {
    constructor() {

    }

    solve(board) {
        board.updateCandidates();
        
        this.nakedSingles(board);
        this.hiddenSingles(board);
        this.nakedPairs(board);
    }

    nakedSingles(board) {
        const cells = board.getEmptyCells();

        for (let cell of cells) {
            if (cell.candidates.length === 1) {
                cell.value = R.head(cell.candidates);
                cell.candidates = [];
                cell.nakedSingles = 0x6666ff; //TODO: remove, for debugging
                board.updateCandidates();
            }
        }
    }

    hiddenSingles(board) {
        const houses = board.getAllHouses();
        let candidates, occur, uniq;

        for (let house of houses) {
            candidates = R.flatten(house.map(cell => cell.candidates));
            occur = R.countBy(Math.abs)(candidates);
            for (let cell of house) {
                cell.candidates.forEach(value => {
                    if (occur[value] === 1) {
                        cell.value = value;
                        cell.candidates = [];
                        cell.hiddenSingles = 0x6dfa7d; //TODO: remove, for debugging
                        board.updateCandidates();
                    }
                })
            }
        }
    }

    nakedPairs(board) {
        const houses = board.getAllHouses();
        let pairs, values, cells;

        for (let house of houses) {
            //get cells that have only two candidates i.e. pairs
            pairs = house.filter(c => c.candidates.length === 2);
            if (pairs.length !== 2)
                continue;

            //if both cells have the same candidates
            if (R.equals(pairs[0].candidates, pairs[1].candidates)) {
                values = pairs[0].candidates;
                //get all other cells
                cells = R.without(pairs, house);
                cells.forEach(c => c.candidates = R.without(values, c.candidates));
                board.updateCandidates();
            }
        }
    }
}

export default Solver;