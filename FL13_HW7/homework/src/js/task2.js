let game = confirm('Do you want to play a game?');
if(!game) {
	alert('You did not become a billionaire, but can.');
} else {
	const ATTEMPTS = 3;
	const NUM_BIGGER = 5;
	const DOUBLE_PRIZE = 2;
	const COUNTER = 2;
	const POW = 2;
	while(game) {
		let maxRange = 5;
		let totalPrize = 0;
		let prize = 100;
		let continueGame = true;
		while (continueGame) {
			let randomNumber = Math.floor(Math.random() * (maxRange + 1));
			let isNumber = false;
			for (let i = 0; i < ATTEMPTS; i++) {
				let currentPossiblePrize = prize / Math.pow(POW, i);
				let userNumber = Number(prompt(
					`Choose a roulette pocket number from 0 to ${maxRange}
Attempts left:  ${ATTEMPTS - i}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${currentPossiblePrize}$`));
				if (randomNumber === userNumber) {
					totalPrize += currentPossiblePrize;
					currentPossiblePrize *= POW;
					break;
				} else {
					if (i === COUNTER) {
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
				maxRange += NUM_BIGGER;
				prize *= DOUBLE_PRIZE;
			} else {
				break;
			}
		}
		alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
		game = confirm('Do you want to play again?');
	}
}