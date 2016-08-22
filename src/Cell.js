const Cell = {
	create() {
		const self = Object.create(Cell);
		self.candidates = [];
		self.houses = {};
		self.value = 0;

		return self;
	},

	isEmpty() {
		return this.value === 0;
	}
};

export default Cell;