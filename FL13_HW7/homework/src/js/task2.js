let game = confirm('Do you want to play a game?');
if(!game) {
	alert('You did not become a billionaire, but can.');
} else {
	const attempts = 3;
	const numBigger = 5;
	const doublePrize = 2;
	const counter = 2;
	const pow = 2;
	while(game) {
		let maxRange = 5;
		let totalPrize = 0;
		let prize = 100;
		let continueGame = true;
		while (continueGame) {
			let randomNumber = Math.floor(Math.random() * (maxRange + 1));
			let isNumber = false;
			for (let i = 0; i < attempts; i++) {
				let currentPossiblePrize = prize / Math.pow(pow, i);
				let userNumber = Number(prompt(
					`Choose a roulette pocket number from 0 to ${maxRange}
Attempts left:  ${attempts - i}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${currentPossiblePrize}$`));
				if (randomNumber === userNumber) {
					totalPrize += currentPossiblePrize;
					currentPossiblePrize *= pow;
					break;
				} else {
					if (i === counter) {
						isNumber = true;
						break;
					}
				}
			}
			if (isNumber) {
				break;
			}
			continueGame = confirm(`Congratulation, you won! Your prize is: ${totalPrize}$. Do you want to continue?`);
			if (continueGame) {
				maxRange += numBigger;
				prize *= doublePrize;
			} else {
				break;
			}
		}
		alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
		game = confirm('Do you want to play again?');
	}
}