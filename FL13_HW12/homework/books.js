const books = [
	{
		name : 'JavaScript: The Good Parts',
		author : 'Douglas Crockford',
		image : 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg',
		plot : `Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Est maxime aliquid veritatis eligendi quod possimus harum neque odit architecto consequatur?`,
		id : '0'
	},
	{
		name : 'Eloquent JavaScript',
		author : 'Marijn Haverbeke',
		image : 'https://m.media-amazon.com/images/I/51-5ZXYtcML.jpg',
		plot : `Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Est maxime aliquid veritatis eligendi quod possimus harum neque odit architecto consequatur?`,
		id : '1'
	},
	{
		name : 'JavaScript Patterns',
		author : 'Stoyan Stefanov',
		image : 'https://images-na.ssl-images-amazon.com/images/I/511Gt98oEAL._SX379_BO1,204,203,200_.jpg',
		plot : `Lorem ipsum dolor sit amet consectetur adipisicing elit.
		Est maxime aliquid veritatis eligendi quod possimus harum neque odit architecto consequatur?`,
		id : '2'
	}
]
localStorage.getItem('book') ? null : localStorage.setItem('book', JSON.stringify(books));