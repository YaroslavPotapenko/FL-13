const TIME = new Date().getHours();
const DAY = 8;
const EVENING = 20;
const PASS_LENGTH = 4;
let currentTime,pass,login;

DAY < TIME && TIME <= EVENING ? currentTime = 'day' : currentTime = 'night';

class Requirement {
	constructor(name, password) {
		this.name = name;
		this.password = password;
	}
	greets() {
		alert(`Good ${currentTime}, dear ${this.name}!`);
	}
}

const USER = new Requirement('User', 'UserPass');
const ADMIN = new Requirement('Admin', 'RootPass');

login = prompt('Enter your login please');

switch (login) {
	case USER.name:
		pass = prompt('Enter your password please');
		pass === USER.password ? USER.greets() : alert('Wrong password');
	break;
	case ADMIN.name:
		pass = prompt('Enter your password please');
		pass === ADMIN.password ? ADMIN.greets() : alert('Wrong password');
	break;
	default:
		if (login === null || login === '') {
			alert('Canceled');
		} else if (login.length < PASS_LENGTH) {
			alert('I don\'t know any users having name length less than 4 symbols');
		} else {
			alert('I don’t know you');
		}
	break;
}