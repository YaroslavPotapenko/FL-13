function countPoints (games) {
	return games.reduce((total, [x, ,y]) => total + (x > y ? 3 : x === y), 0);
}
console.log(countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']));