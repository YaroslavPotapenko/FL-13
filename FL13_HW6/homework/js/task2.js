const middleChar = prompt('enter something please');
let regexp = /\S/g;
let even = 2;

if (regexp.test(middleChar)) {
	middleChar.length % even === 0 ?
	alert( middleChar[ middleChar.length / even - 1 ] + middleChar[middleChar.length / even] ) :
	alert( middleChar[(middleChar.length - 1) / even] );
} else {
	alert('Invalid value');
}