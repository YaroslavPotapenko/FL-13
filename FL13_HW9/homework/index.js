const INDEX = {
	substitute : {
		min_range : 10,
		max_range : 20
	},
	formatDate : {
		requirement_format : 10
	}
}

function convert() {
	let res= [];
	for (let i = 0; i < [...arguments].length; i++) {
		typeof [...arguments][i] === 'string' ?
		res[i] = parseInt([...arguments][i],10) :
		res[i] = [...arguments][i] + '';
	}

	return res;
}

function executeforEach(arr, callback) {
	let i, length = arr.length;
	for (i = 0; i < length; i = i + 1) {
		callback(arr[i], i, arr);
	}
}

function mapArray(arr, callback) {
	let res = [];
	executeforEach(arr, el => typeof el === 'string' ?
	res.push(callback(parseInt(el))) :
	res.push(callback(el)))

	return res;
}

function filterArray(arr, callback) {
	let res = [];
	executeforEach(arr, el => callback(el) === true ? res.push(el) : null );

	return res;
}

function containsValue(arr, char) {
	let result = false;
	executeforEach(arr, function(ch) {
		ch === char ? result = ch === char : result
	});

	return result;
}

function flipOver(str) {
	let result = '';
	let i, length = str.length;
	for (i = length - 1; i >=0; i --) {
		result+=str[i];
	}

	return result;
}

function makeListFromRange(arr) {
	let result = [];
	for (let i = arr[0]; i <= arr[1]; i++) {
		result.push(i);
	}

	return result;
}

const fruits = [
	{ name: 'apple', weight: 0.5 },
	{ name: 'pineapple', weight: 2 }
];
function getArrayOfKeys(arr, str) {
	let res = [];
	executeforEach( arr, el => res.push(el[str]) )
	
	return res;
}

function substitute(arr) {
	let res = [];
	mapArray(arr, el => el > INDEX.substitute.min_range &&
	el < INDEX.substitute.max_range ? res.push('*') : res.push(el) );

	return res;
}

const date = new Date(2020, 0, 2);
function getPastDay(date,amount) {
	let ms = 86400000;
	let difference = amount * ms;

	return new Date(date - difference).getDate();
}

function formatDate(date) {
	let month = date.getMonth();
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();

	month < INDEX.formatDate.requirement_format ? month = '0' + (month + 1) : month = month + 1;
	day < INDEX.formatDate.requirement_format ? day = '0' + day : day;
	hours < INDEX.formatDate.requirement_format ? hours = '0' + hours : hours;
	minutes < INDEX.formatDate.requirement_format ? minutes = '0' + minutes : minutes;
	
	return `${date.getFullYear()}/${month}/${day} ${hours}:${minutes}`;
}