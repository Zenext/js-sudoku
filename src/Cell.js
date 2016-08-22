const Cell = {
	create() {
		const self = Object.create(Cell);
		self.candidates = [];
		self.houses = {};
		self.value = 0;

		return self;
	}
};

export default Cell;