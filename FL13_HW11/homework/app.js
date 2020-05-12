const data = [
	{
		'folder': true,
		'title': 'Pictures',
		'children': [
			{
				'title': 'logo.png'
			},
			{
				'folder': true,
				'title': 'Vacations',
				'children': [
					{
						'title': 'spain.jpeg'
					}
				]
			}
		]
	},
	{
		'folder': true,
		'title': 'Desktop',
		'children': [
			{
				'folder': true,
				'title': 'screenshots',
				'children': null
			}
		]
	},
	{
		'folder': true,
		'title': 'Downloads',
		'children': [
			{
				'folder': true,
				'title': 'JS',
				'children': null
			},
			{
				'title': 'nvm-setup.exe'
			},
			{
				'title': 'node.exe'
			}
		]
	},
	{
		'title': 'credentials.txt'
	}
];
const rootNode = document.getElementById('root');

const ul = document.querySelector('ul');
const li = document.querySelector('li');
const ico = document.querySelector('i');

function createTree(data) {
	let ul = document.createElement('ul');
	rootNode.appendChild(ul);
	data.forEach(item => {
		let li = document.createElement('li');
		li.textContent = item.title;
		ul.appendChild(li);
		if (item.hasOwnProperty('folder')) {
			let ico = document.createElement('i');
			li.appendChild(ico);
			ico.setAttribute('class','material-icons folder');
			ico.textContent = 'folder'
		}
		if (item.children) {
			li.appendChild(createTree(item.children)).setAttribute('hidden','hidden');
		}
		if (item.children === null) {
			li.appendChild(createTree([{'title' : 'folder is empty'}])).setAttribute('hidden','hidden');
		}
	});
	return ul;
}

rootNode.addEventListener('click', event => {
	console.log(event.target);
	
	for (let i=0; event.target.children[i]; i++ ) {
		if (event.target.children[i].parentElement !== rootNode) {
			event.target.children[i].toggleAttribute('hidden');

			event.target.children[i].hasAttribute('hidden') ?
			event.target.querySelector('i').textContent = 'folder' :
			event.target.querySelector('i').textContent = 'folder_open';
		}
	}
	
});

rootNode.appendChild(createTree(data));

rootNode.addEventListener( 'contextmenu', event => {
	let elToEdit = event.target;
	let ul = document.createElement('ul');
	rootNode.appendChild(ul);

	event.preventDefault();
	ul.style.top = `${event.clientY}px`;
	ul.style.left = `${event.clientX}px`;
	ul.classList.add('active');

	document.addEventListener('click', event => {
		let two = 2;
		if (event.button !== two) {
			ul.classList.remove('active');
		}
	}, false);

	ul.addEventListener('click', event => {
		event.stopPropagation();
	}, false);

	let data2 = ['rename', 'delete'];
	for (let i = 0, ln = data2.length; i < ln; i++) {
		let li = document.createElement('li');
		li.textContent = data2[i];
		ul.appendChild(li);
		ul.classList.add('right-click-menu');

		li.addEventListener('click', event => {
			let target = event.target;
			if (target.textContent === 'rename') {
				elToEdit !== rootNode ? elToEdit.setAttribute('contenteditable', 'true') : null;
				elToEdit.focus();
			}
			if (target.textContent === 'delete') {
				elToEdit !== rootNode && elToEdit.textContent !== 'folder is empty' ? elToEdit.remove() : null;
			}
			ul.classList.remove('active');
		})
	}
}, false);
