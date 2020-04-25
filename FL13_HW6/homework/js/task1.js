const percentage = 100;
const numbersAfterComma = 2;
const checkNumber = parseInt(prompt('enter your check number please'));
isNaN(checkNumber) || checkNumber < 0 || checkNumber.length < 1 ? alert('Invalid input data') : checkNumber;
const tip = parseInt(prompt('enter tip percentage'));
let tipAmount, total;

isNaN(tip) || 0 > tip > percentage || tip.length < 1 ? alert('Invalid input data') : tip;
checkNumber !== undefined && tip !== undefined ? tipAmount = tip/percentage * checkNumber : null;
total = checkNumber + tipAmount;

Math.ceil(total) - total > 0 ? total.toFixed(numbersAfterComma) : total;
isNaN(total) ? null : alert(`Check number: ${checkNumber} 
Tip: ${tip}%
Tip amount: ${tipAmount}
Total sum to pay: ${total.toFixed(numbersAfterComma)}`);