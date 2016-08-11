function randomValue(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

function randomFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};

Array.prototype.clone = function() {
    var arr = this.slice(0);
    for( var i = 0; i < this.length; i++ ) {
        if( this[i].clone ) {
            //recursion
            arr[i] = this[i].clone();
        }
    }
    return arr;
};

function shuffle(array) {
  array = array.clone();

  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export {
	randomValue,
	randomFromArray,
  shuffle
}