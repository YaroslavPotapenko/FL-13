const time = new Date().getHours();
const day = 8;
const evening = 20;
let passLength = 4;
let currentTime,pass,login;

day < time && time <= evening ? currentTime = 'day' : currentTime = 'night';

class Requirement {
	constructor(name, password) {
		this.name = name;
		this.password = password;
	}
	greets() {
		alert(`Good ${currentTime}, dear ${this.name}!`);
	}
}

const user = new Requirement('User', 'UserPass');
const admin = new Requirement('Admin', 'RootPass');

login = prompt('Enter your login please');

switch (login) {
	case user.name:
		pass = prompt('Enter your password please');
		pass === user.password ? user.greets() : alert('Wrong password');
	break;
	case admin.name:
		pass = prompt('Enter your password please');
		pass === admin.password ? admin.greets() : alert('Wrong password');
	break;
	default:
		if (login === null || login === '') {
			alert('Canceled');
		} else if (login.length < passLength) {
			alert('I don\'t know any users having name length less than 4 symbols');
		} else {
			alert('I don’t know you');
		}
	break;
}