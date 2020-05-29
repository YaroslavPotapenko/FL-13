const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const responseCodeForGET = 200;
const responseCodeForPOST = 201;
const responseCodeForPUTandDELETE = 204;
const list = appContainer.querySelector('.users-list');

function getUsers() {
	showLoading();
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3000/users', true);
	xhr.onload = function() {
		if (this.status === responseCodeForGET) {
			const users = JSON.parse(this.responseText);
			let output = '';
			for (const i in users) {
				if (users) {			
					output += `<li class="user card" id="${users[i].id}">
									<ul class="list-group bg-light">
										<li class="list-group-item">${users[i].id}</li>
										<input class="list-group-item name" value="${users[i].name}"></input>
										<input class="list-group-item username" value="${users[i].username}"></input>
										<li class="m-3">
											<button class="edit btn btn-info">Update</button>
											<button class="delete btn btn-danger">Delete</button>
										</li>
									</ul>
								</li>`;
				}
			} 
			document.querySelector('.users-list').innerHTML = output;
			hideLoading();
		}
	}
	xhr.onerror = function() {
		console.log('Something went wrong');
		hideLoading();
	}
	xhr.send(null);
}
getUsers();

list.addEventListener('click', editUser);
function editUser(e) {
	const editButtons = document.querySelectorAll('.edit');
	for (let i = 0; i < editButtons.length; i++) {
		if (e.target === editButtons[i]) {
			editButtons[i].setAttribute('disabled','disabled');
			let currentId = e.target.parentElement.parentElement.parentElement.id;
			const xhr = new XMLHttpRequest();
			xhr.open('PUT', 'http://localhost:3000/users/' + currentId, true);
			showLoading();
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onload = function() {
				if (this.status === responseCodeForPUTandDELETE) {
					editButtons[i].removeAttribute('disabled');
					hideLoading();
				}
			}
			xhr.onerror = function() {
				console.log('Something went wrong');
				hideLoading();
			}
			if (!e.target.parentElement.previousElementSibling.previousElementSibling.value ||
				!e.target.parentElement.previousElementSibling.value) {
				console.log('Write Name');
			} else {
				xhr.send(JSON.stringify({
					name: e.target.parentElement.previousElementSibling.previousElementSibling.value,
					username: e.target.parentElement.previousElementSibling.value
				}));
			}
			getUsers();
		}
	}
}

document.addEventListener('click', addUser);
function addUser(e) {
	const addButton = document.querySelector('.add');
	if (e.target === addButton) {
		let name = e.target.parentElement.children[0];
		let userName = e.target.parentElement.children[1];
		addButton.setAttribute('disabled','disabled');
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:3000/users/', true);
		showLoading();
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function() {
			if(this.status === responseCodeForPOST){
				addButton.removeAttribute('disabled');
				name.value = '';
				userName.value = '';
				getUsers();
				hideLoading();
			}
		}
		xhr.onerror = function() {
			console.log('Something went wrong');
			hideLoading();
		}
		xhr.send(JSON.stringify({
			name: name.value,
			username: userName.value
		}));
	}
}

list.addEventListener('click', deleteUser);
function deleteUser(e) {
	const deleteButtons = document.querySelectorAll('.delete');
	for (let i = 0; i < deleteButtons.length; i++) {
		if (e.target === deleteButtons[i]) {
			let currentId = e.target.parentElement.parentElement.parentElement.id;
			const xhr = new XMLHttpRequest();
			xhr.open('DELETE', 'http://localhost:3000/users/' + currentId, true);
			xhr.setRequestHeader('Authorization', 'admin');
			showLoading();
			xhr.onload = function() {
				if (this.status === responseCodeForPUTandDELETE) {
					hideLoading();
					getUsers();
				}
			}
			xhr.onerror = function() {
				console.log('Something went wrong');
				hideLoading();
			}
			xhr.send(null);
		}
	}
}

function showLoading() {
	document.querySelector('.loading').style.display = 'block';
	document.querySelector('.users-list').style.display = 'none';
}

function hideLoading() {
	document.querySelector('.loading').style.display = 'none';
	document.querySelector('.users-list').style.display = 'block';
}
