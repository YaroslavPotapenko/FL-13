class Fighter {
	constructor(fighter) {
		const maxHp = fighter.hp;
		let win = 0;
		let loss = 0;
		this.getName = () => fighter.name;
		this.getDamage = () => fighter.damage;
		this.getStrength = () => fighter.strength;
		this.getAgility = () => fighter.agility;
		this.getHealth = () => fighter.hp;
		this.attack = function (defender) {
			const maxRandom = 100;
			let success = Math.floor(Math.random() * (maxRandom + 1));
			if (success >= defender.getAgility() + defender.getStrength()) {
				defender.dealDamage(this.getDamage());
				console.log(`${this.getName()} make ${this.getDamage()} damage to ${defender.getName()}`);
			} else {
				console.log(`${this.getName()} attack missed`);
			}
		};
		this.logCombatHistory = function () {
			console.log(`Name: ${fighter.name}, Wins: ${win}, Losses: ${loss}`);
		};
		this.heal = function (num) {
			fighter.hp + num <= maxHp ? fighter.hp += num : fighter.hp = maxHp;
		};
		this.dealDamage = function (num) {
			fighter.hp - num > 0 ? fighter.hp -= num : fighter.hp = 0;
		};
		this.addWin = function () {
			win++;
		};
		this.addLoss = function () {
			loss++;
		};
	}
}

const fighter1 = new Fighter({name: 'Maximus', damage: 20, strength: 20, agility: 15, hp: 100});
const fighter2 = new Fighter({name: 'Commodus', damage: 25, strength: 25, agility: 20, hp: 90}); 

function battle(fighter1, fighter2){	
	let count = 0;	
	if ( fighter1.getHealth() === 0 ) {
		console.log(`${fighter1.getName()} is dead and can"t fight`);
		return;
	}
	if ( fighter2.getHealth() === 0 ) {
		console.log(`${fighter2.getName()} is dead and can't fight`);
		return;
	}
	console.log('Battle started');
	while ( fighter1.getHealth() !== 0 && fighter2.getHealth() !== 0 ) {
		const two = 2;
		if ( count % two ===0 ){
			fighter1.attack(fighter2);			
		} else {
			fighter2.attack(fighter1);
		}		
		count++;
	}	
	if ( fighter1.getHealth() === 0 ) {
		fighter1.addLoss();
		fighter2.addWin();
		console.log(`${fighter2.getName()} has won!`);
	} else {
		fighter2.addLoss();
		fighter1.addWin();
		console.log(`${fighter1.getName()} has won!`);
	}
}