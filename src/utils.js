function randomValue(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

function randomFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};

export {
	randomValue,
	randomFromArray
}