function positiveSum(arr) {
    return arr.reduce((sum, current) => current >=0 ? sum + current : 0, 0);
}
console.log(positiveSum([0,-3,5,7]));