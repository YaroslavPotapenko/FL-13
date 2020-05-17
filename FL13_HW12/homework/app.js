window.addEventListener('hashchange', updateState);
window.addEventListener('load', updateState);
window.addEventListener('popstate', e => {
	if (url.hash === '' && url.search === '') {
		div.textContent = ''
	}
	updateState(e.state);
});

const root = document.getElementById('root');
let navEl,
links,
book,
linkMod,
secElem = 2,
edit,
add,
id = 0,
items,
timeOut = 300,
div;

items = localStorage.getItem('book') ? JSON.parse(localStorage.getItem('book')) : [];
div = document.createElement('div');
root.appendChild(div).classList.add('book');
let url = new URL(window.location);

function createListBooksSection(data) {	
	let div = document.createElement('div');
	root.appendChild(div).classList.add('list-books');
	let ul = document.createElement('ul');
	ul.classList.add('nav');
	div.appendChild(ul);

	data.forEach(element => {
		let li = document.createElement('li');
		ul.appendChild(li);
		let a = document.createElement('a');
		li.appendChild(a);
		a.textContent = element.name;
		a.setAttribute('href',`?id={${element.id}}#preview`);
		let button = document.createElement('input');
		li.appendChild(button);
		button.setAttribute('type','button')
		button.value = 'edit';

		button.addEventListener('click', e => {
			e.target.setAttribute('href',`?id={${element.id}}#edit`)
			let state;
			if (e.target.tagName !== 'INPUT') {
				return;
			}
			state = {
				page : e.target.getAttribute('href')
			}
			history.pushState(state, '', state.page);
			updateState(state);
			e.preventDefault();
			let save = document.getElementById('save');
			save.addEventListener('click', () => {
				
				let bookName = document.getElementsByName('name');
				let bookAuthor = document.getElementsByName('author');
				let bookImage = document.getElementsByName('image');
				let bookPlot = document.getElementsByName('plot');
				let editedBook = {
					name : bookName[0].value,
					author : bookAuthor[0].value,
					image : bookImage[0].value,
					plot : bookPlot[0].value,
					id : element.id
				};
				items.splice(element.id,1,editedBook);
				localStorage.setItem('book', JSON.stringify(items));
				
				save.setAttribute('href',`?id={${element.id}}#preview`);
				
				window.setTimeout(() => {
					alert('Book successfully updated');
				},timeOut);
			})
			save.addEventListener('click', e => {
				let state;				
				if (e.target.tagName !== 'INPUT') {
					return;
				}
				state = {
					page : e.target.getAttribute('href')
				}
				history.pushState(state, '', state.page);
				updateState(state);
				e.preventDefault();
			})
			let cancel = document.getElementById('cancel');
			cancel.addEventListener('click', () => {
				if (confirm('Discard changes?')) {
					history.back();
					updateState();
				}
			})
		})
		id = element.id;
		id++;
	});

	let add = document.createElement('input');
	ul.appendChild(add);
	add.value = 'add';
	add.setAttribute('type','button');
	add.addEventListener('click', e => {
		e.target.setAttribute('href',`#add`)
		let state;
		if (e.target.tagName !== 'INPUT') {
			return;
		}
		state = {
			page : e.target.getAttribute('href')
		}
		history.pushState(state, '', state.page);
		updateState(state);
		e.preventDefault();
		let inputs = document.getElementsByTagName('input');
		let submit = inputs['submit'];
		
		submit.addEventListener('click', () => {
			let bookName = document.getElementsByName('name');
			let bookAuthor = document.getElementsByName('author');
			let bookImage = document.getElementsByName('image');
			let bookPlot = document.getElementsByName('plot');
			let newBook = {
				name : bookName[0].value,
				author : bookAuthor[0].value,
				image : bookImage[0].value,
				plot : bookPlot[0].value,
				id : id++
			};
			items.push(newBook);
			localStorage.setItem('book', JSON.stringify(items));
			root.removeChild(div);
			createListBooksSection(items);
			history.pushState(state, '', state.page);
			updateState(state);
			window.location = '';
		});
	});
	
}
createListBooksSection(items);

links = {
	'?id={0}#preview' : `
		<figure>
			<img class="image" src="${items[0].image}" alt="preview">
			<figcaption class="book-name">${items[0].name}</figcaption>
		</figure>
		<p>${items[0].author}</p>
		<span>${items[0].plot}</span>
	`,
	'?id={1}#preview' : `
		<figure>
			<img class="image" src="${items[1].image}" alt="preview">
			<figcaption class="book-name">${items[1].name}</figcaption>
		</figure>
		<p>${items[1].author}</p>
		<span>${items[1].plot}</span>
	`,
	'?id={2}#preview' : `
		<figure>
			<img class="image" src="${items[secElem].image}" alt="preview">
			<figcaption class="book-name">${items[secElem].name}</figcaption>
		</figure>
		<p>${items[secElem].author}</p>
		<span>${items[secElem].plot}</span>
	`
}
edit = {
	'?id={0}#edit' : `
		<ul>
			<li>
				<input value='${items[0].name}' name='name'>
			</li>
			<li>
				<input value='${items[0].author}' name='author'>
			</li>
			<li>
				<input value='${items[0].image}' name='image'>
			</li>
			<li>
				<input value='${items[0].plot}' name='plot'>
			</li>
			<li>
				<input type='button' id='save' value='save'>
			</li>
			<li>
				<input type='button' id='cancel' value='cancel'>
			</li>
		</ul>
	`,
	'?id={1}#edit' : `
		<ul>
			<li>
				<input value='${items[1].name}' name='name'>
			</li>
			<li>
				<input value='${items[1].author}' name='author'>
			</li>
			<li>
				<input value='${items[1].image}' name='image'>
			</li>
			<li>
				<input value='${items[1].plot}' name='plot'>
			</li>
			<li>
				<input type='button' id='save' value='save'>
			</li>
			<li>
				<input type='button' id='cancel' value='cancel'>
			</li>
		</ul>
	`,
	'?id={2}#edit' : `
		<ul>
			<li>
				<input value='${items[secElem].name}' name='name'>
			</li>
			<li>
				<input value='${items[secElem].author}' name='author'>
			</li>
			<li>
				<input value='${items[secElem].image}' name='image'>
			</li>
			<li>
				<input value='${items[secElem].plot}' name='plot'>
			</li>
			<li>
				<input type='button' id='save' value='save'>
			</li>
			<li>
				<input type='button' id='cancel' value='cancel'>
			</li>
		</ul>
	`
}
add = {
	'#add' : `
		<ul>
			<li>
				<input required placeholder='enter name please' name='name'>
			</li>
			<li>
				<input required placeholder='enter author please' name='author'>
			</li>
			<li>
				<input required placeholder='enter image url please' name='image'>
			</li>
			<li>
				<input required placeholder='enter plot please' name='plot'>
			</li>
			<li>
				<input type="submit" name='submit' value='add book'>
			</li>
		</ul>
	`	
}
navEl = document.querySelector('.nav');
book = document.querySelector('.book');

function updateState(state) {
	if (!state) {
		return;
	}
	if ( links[state.page] ) {
		book.innerHTML = links[state.page] || ''
	} else if ( edit[state.page] ) {
		book.innerHTML = edit[state.page] || ''
	} else if ( add[state.page] ) {
		book.innerHTML = add[state.page] || ''
	} else {
		book.innerHTML = ''
	}
}

navEl.addEventListener('click', e => {
	let state;
	if (e.target.tagName !== 'A') {
		return;
	}
	state = {
		page : e.target.getAttribute('href')
	}
	history.pushState(state, '', state.page);
	updateState(state);
	e.preventDefault();	
});