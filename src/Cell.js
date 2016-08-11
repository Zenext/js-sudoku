const Cell = {
	create(x, y) {
		var obj = Object.create(this);
		obj.x = x;
		obj.y = y;
		obj.value = 0;

		return obj;
	},

	set(value) {
		this.value = value;
	},

	isEmpty() {
		return this.value === 0;
	}
};

export default Cell;