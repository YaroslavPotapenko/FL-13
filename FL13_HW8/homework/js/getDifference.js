let isBigger = (a,b) => a > b;
let getDifference = (a,b) => isBigger(a,b) === true ? a - b : b - a;
console.log(getDifference(5,3));