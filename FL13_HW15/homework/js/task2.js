const speedIncrease = 20;
const timerForVehicleDrive = 2000;
const timerForVehicleStop = 1500;
const differenceBetweenCurrentSpeedAndMaxSpeed = 30;
let timerId,
speed = 0,
maxSpeed;
function Vehicle(color,engine) {
	this.color = color;
	this.engine = engine;
	this.maxSpeed = 70;
	this.model === undefined ? this.model = 'uknown model' : this.model;
}

Vehicle.prototype.getInfo = function() {
	return {
		engine : this.engine,
		color : this.color,
		maxSpeed : this.maxSpeed,
		model : this.model
	}
}
Vehicle.prototype.drive = function() {	
	let type = this.__proto__.constructor.name;
	let model = this.model;
	type === 'Motorcycle' ? console.log('Let’s drive') : null;
	if (!timerId) {
		timerId = setTimeout(function tick() {
			speed += speedIncrease;
			speed > maxSpeed ? console.log('speed is too high, SLOW DOWN!') : null;
			console.log(speed);
			timerId = setTimeout(tick, timerForVehicleDrive);
			
			if (type === 'Motorcycle' && maxSpeed - speed <= differenceBetweenCurrentSpeedAndMaxSpeed ) {
				console.log('Engine overheating');
				clearTimeout(timerId);
				timerId = setTimeout(function tick() {
					speed > 0 ? speed -= speedIncrease : null;
					console.log(speed);
					let timerId = setTimeout(tick, timerForVehicleStop);
					if (speed <= 0) {
						clearTimeout(timerId);		
						console.log(`${type} ${model} is stopped. Good drive`);
					}
				}, timerForVehicleStop);
			}
		}, timerForVehicleDrive);
	}
}

Vehicle.prototype.stop = function() {
	let type = this.__proto__.constructor.name;
	let model = this.model;
	let maxSpeed = speed;
	clearTimeout(timerId);
	timerId = setTimeout(function tick() {
		speed > 0 ? speed -= speedIncrease : null;
		console.log(speed);
		let timerId = setTimeout(tick, timerForVehicleStop);
		if (speed <= 0) {
			clearTimeout(timerId);		
			switch (type) {
				case 'Vehicle':
					console.log(`${type} is stopped. Maximum speed during the drive was ${maxSpeed}`);
				break;
				case 'Car':
					console.log(`${type} ${model} is stopped. Maximum speed during the drive was ${maxSpeed}`);
				break;
				case 'Motorcycle':
					console.log(`${type} ${model} is stopped. Good drive`);
				break;
				default:
				break;
			}
		}
	}, timerForVehicleStop);
}

function Car(model, color, engine) {
	this.model = model;
	this.color = color;
	this.engine = engine;
	maxSpeed = this.maxSpeed = 80;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.changeColor = function(newColor) {	
	this.color === newColor ?
	console.log('The selected color is the same as the previous, please choose another one') :
	this.color = newColor;
}
Car.prototype.upgradeEngine = function(newEngine, maxSpeed) {
	if (!speed) {
		this.engine = newEngine;
		this.maxSpeed = maxSpeed;
	} else {
		console.log('You can upgrade engine only if car is stopped');
	}
}

function Motorcycle(model, color, engine) {
	this.model = model;
	this.color = color;
	this.engine = engine;
	maxSpeed = this.maxSpeed = 90;
	this.type = 'Motorcycle';
}
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;